import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ArtworkClient from "./ArtworkClient";

// 1. Update the type definition to expect a Promise
export default async function ArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  // 2. Await the params to properly extract the ID
  const { id } = await params;

  const artwork = await prisma.artwork.findUnique({
    where: { id },
    include: { variants: true },
  });

  if (!artwork) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <ArtworkClient artwork={artwork} />
    </div>
  );
}