"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveAddress(formData: FormData, userId: string) {
  await prisma.address.create({
    data: {
      userId,
      fullName: formData.get("fullName") as string,
      street: formData.get("street") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: "India", // Defaulting for the presentation build
    },
  });

  revalidatePath("/account");
}

export async function getUserAddresses(userId: string) {
  return await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}