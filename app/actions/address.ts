"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveAddress(formData: FormData, userId: string) {
  try {
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
    return { success: true };
  } catch (error) {
    console.error("Failed to save address:", error);
    return { error: "Failed to save address" };
  }
}

export async function getUserAddresses(userId: string) {
  try {
    return await prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch user addresses:", error);
    return [];
  }
}

export async function getUserOrders(email: string) {
  try {
    return await prisma.order.findMany({
      where: { customerEmail: email },
      include: {
        items: {
          include: {
            artwork: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
}