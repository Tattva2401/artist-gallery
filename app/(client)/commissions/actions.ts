"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitCommission(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const details = (formData.get("details") || formData.get("concept")) as string;
  const requestedSize = (formData.get("requestedSize") || formData.get("size")) as string;

  try {
    await prisma.commission.create({
      data: {
        name,
        email,
        details: (details || "") as string,
        requestedSize: requestedSize || null, // Handles if they leave it blank
        status: "PENDING", 
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to submit your request. Please try again." };
  }

  // Refresh the admin panel so the new request appears instantly
  revalidatePath("/admin/commissions");
  
  return { success: true };
}