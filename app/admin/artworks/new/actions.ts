"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function publishArtwork(data: { 
  title: string; 
  description: string; 
  imageUrl: string; 
  basePrice: number;
}) {
  // 1. Tell Prisma to create a new row in the Artwork table
  await prisma.artwork.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      // We automatically create a default "Original" size for pricing
      variants: {
        create: [
          { size: "Original", price: data.basePrice, stock: 1 }
        ]
      }
    }
  });

  // 2. Clear the website's cache so the new painting shows up instantly
  revalidatePath("/");
  revalidatePath("/admin/artworks");
  
  // 3. Send Kavita back to the inventory table when done
  redirect("/admin/artworks");
}