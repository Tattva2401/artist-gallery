"use server";

import prisma from "@/lib/db";

export async function fetchArtworks(page: number, limit: number = 6) {
  // Calculate how many records to skip based on the current page
  const skip = (page - 1) * limit;
  
  const artworks = await prisma.artwork.findMany({
    skip,
    take: limit,
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return artworks;
}