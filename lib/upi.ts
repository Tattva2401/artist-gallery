import QRCode from 'qrcode';

export async function generateUPIQRCode(amount: number, orderId: string): Promise<string> {
  // Pull the UPI ID from your .env.local file
  const upiId = process.env.NEXT_PUBLIC_STUDIO_UPI_ID;
  
  if (!upiId) {
    throw new Error("UPI ID is not configured in environment variables.");
  }

  // The strict UPI deep-link format
  // pa = Payee Address (UPI ID)
  // pn = Payee Name
  // am = Amount
  // tr = Transaction Reference (Your Order ID)
  // cu = Currency (INR)
  const upiString = `upi://pay?pa=${upiId}&pn=KavitaRajputStudio&am=${amount}&tr=${orderId}&cu=INR`;

  try {
    // Convert the string into a Base64 data URL that an <img> tag can display
    const qrCodeDataUrl = await QRCode.toDataURL(upiString, {
      width: 300,
      margin: 2,
      color: {
        dark: '#09090b',  // Zinc-950 for the code
        light: '#ffffff'  // White background
      }
    });
    
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate payment QR code.");
  }
}