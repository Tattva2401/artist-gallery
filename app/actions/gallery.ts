"use server";

import prisma from "@/lib/db";

export async function fetchArtworks(page: number, limit: number = 6) {
  try {
    // Calculate how many records to skip based on the current page
    const skip = (page - 1) * limit;
    
    const artworks = await prisma.artwork.findMany({
      skip,
      take: limit,
      include: { variants: true },
      orderBy: { createdAt: "desc" },
    });

    return artworks;
  } catch (error) {
    console.error("Failed to fetch artworks from database:", error);
    return [];
  }
}