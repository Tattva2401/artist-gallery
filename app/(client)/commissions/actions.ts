"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitCommissionRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const details = formData.get("concept") as string; 
  const requestedSize = formData.get("size") as string; 

  if (!name || !email || !details) {
    throw new Error("Missing required fields");
  }

  // Pointing exactly to your existing 'Commission' model!
  await prisma.commission.create({
    data: {
      name,
      email,
      details,
      requestedSize: requestedSize || "Standard",
      status: "PENDING",
    },
  });

  revalidatePath("/commissions");
}