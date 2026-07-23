"use server";

import prisma from "@/lib/db";

export async function submitCommissionRequest(formData: FormData) {
  // Extract the fields using the `name` attributes from our HTML inputs
  const clientName = formData.get("name") as string;
  const clientEmail = formData.get("email") as string;
  const canvasSize = formData.get("size") as string;
  const notes = formData.get("concept") as string;

  // Basic validation check
  if (!clientName || !clientEmail || !canvasSize || !notes) {
    throw new Error("Missing required fields");
  }

  // Insert the data into Supabase
  await prisma.commissionRequest.create({
    data: {
      clientName,
      clientEmail,
      canvasSize,
      notes,
    },
  });

  return { success: true };
}