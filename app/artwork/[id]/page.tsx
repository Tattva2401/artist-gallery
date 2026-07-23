import prisma from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CheckoutClient from './CheckoutClient';
import Link from 'next/link';

export default async function ArtworkDetail({ params }: { params: Promise<{ id: string }> }) {
  // Await the params Promise to securely extract the ID
  const { id } = await params;
  
  // Fetch the specific artwork based on the awaited URL ID
  const artwork = await prisma.artwork.findUnique({
    where: { id: id },
    include: {
      variants: { orderBy: { price: 'asc' } },
    },
  });

  // If the user types a bad URL, show a clean 404 page
  if (!artwork) notFound();

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 py-12 px-6">
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 uppercase tracking-widest transition-colors">
          ← Back to Gallery
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: The Artwork Container */}
        <div className="relative aspect-[4/5] w-full shadow-2xl rounded-sm overflow-hidden bg-stone-200">
           <Image 
             src={artwork.imageUrl} 
             alt={artwork.title} 
             fill 
             className="object-cover" 
             priority 
             sizes="(max-width: 1024px) 100vw, 50vw"
           />
        </div>

        {/* Right Side: Details & Interactivity */}
        <div className="flex flex-col space-y-6 lg:mt-8">
           <div>
             <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
               {artwork.title}
             </h1>
             <p className="text-lg text-stone-600 leading-relaxed font-light">
               {artwork.description}
             </p>
           </div>
           
           {/* Mount the interactive Client Component */}
           <CheckoutClient variants={artwork.variants} />
        </div>
      </div>
    </main>
  );
}