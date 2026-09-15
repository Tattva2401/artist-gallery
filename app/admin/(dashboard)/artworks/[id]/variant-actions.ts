"use server";

import prisma from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/auth";

export async function addVariant(artworkId: string, formData: FormData) {
  await verifyAdmin();

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

  // Refreshes the page data instantly across admin and public gallery
  revalidatePath(`/admin/artworks/${artworkId}`);
  revalidatePath(`/artwork/${artworkId}`);
  revalidatePath("/");
}

export async function deleteVariant(variantId: string, artworkId: string) {
  await verifyAdmin();

  await prisma.printVariant.delete({
    where: { id: variantId },
  });

  revalidatePath(`/admin/artworks/${artworkId}`);
  revalidatePath(`/artwork/${artworkId}`);
  revalidatePath("/");
}