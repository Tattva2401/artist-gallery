"use server";

import { prisma } from "@/lib/db"; // Adjust this import based on your Prisma setup
import { revalidatePath } from "next/cache";

export async function addVariant(artworkId: string, formData: FormData) {
  const size = formData.get("size") as string;
  const price = parseFloat(formData.get("price") as string);

  if (!size || isNaN(price)) return { error: "Invalid data" };

  await prisma.printVariant.create({
    data: {
      artworkId,
      size,
      price,
    },
  });

  // Refreshes the page data instantly
  revalidatePath(`/admin/artworks/${artworkId}`);
}

export async function deleteVariant(variantId: string, artworkId: string) {
  await prisma.printVariant.delete({
    where: { id: variantId },
  });

  revalidatePath(`/admin/artworks/${artworkId}`);
}