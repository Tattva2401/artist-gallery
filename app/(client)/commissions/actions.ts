"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitCommissionRequest(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const details = formData.get("details") as string;
  const requestedSize = formData.get("requestedSize") as string;

  if (!name || !email || !details) {
    throw new Error("Missing required fields");
  }

  // Save the commission request to your database
  await prisma.commissionRequest.create({
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