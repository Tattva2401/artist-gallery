"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function publishArtwork(data: { 
  title: string; 
  description: string; 
  imageUrl: string; 
  dimensions: string;
  category: string;
  variants: { size: string; price: number; stock: number }[];
}) {
  // 1. Tell Prisma to create a new row in the Artwork table
  await prisma.artwork.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      dimensions: data.dimensions,
      category: data.category,
      isAvailable: true,
      // 2. Map all the custom sizes/variants directly to this artwork
      variants: {
        create: data.variants
      }
    }
  });

  // 3. Clear the cache and redirect
  revalidatePath("/");
  revalidatePath("/admin/artworks");
  redirect("/admin/artworks");
}