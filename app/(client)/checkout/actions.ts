"use server";

import prisma from "@/lib/db";
import { generateUPIQRCode } from "@/lib/upi";

export async function processCheckout(formData: {
  artworkId: string;
  size: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  agreedToTerms: boolean;
  agreedToNonCopy: boolean;
  agreedToNoRemake: boolean;
}) {
  // 1. Create the Order in the database
  const order = await prisma.order.create({
    data: {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      shippingAddress: formData.shippingAddress,
      totalAmount: formData.price,
      agreedToTerms: formData.agreedToTerms,
      agreedToNonCopy: formData.agreedToNonCopy,
      agreedToNoRemake: formData.agreedToNoRemake,
      
      // Create the connected OrderItem at the exact same time
      items: {
        create: {
          artworkId: formData.artworkId,
          size: formData.size,
          price: formData.price,
        }
      }
    }
  });

  // 2. Generate the dynamic QR code for this specific order
  const qrCodeDataUrl = await generateUPIQRCode(order.totalAmount, order.id);

  // 3. Return the payload to the frontend so it can display the success page
  return {
    success: true,
    orderId: order.id,
    qrCode: qrCodeDataUrl,
    amount: order.totalAmount
  };
}   