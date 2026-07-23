import prisma from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const artworks = await prisma.artwork.findMany({
    include: {
      variants: {
        orderBy: { price: 'asc' } 
      },
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 pb-20">
      {/* Hero Section */}
      <header className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-zinc-900">
          Kavita Rajput Studio
        </h1>
        <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light mb-8">
          Original contemporary artworks and premium museum-quality prints.
        </p>
        
        {/* The Commission Button properly nested inside the header */}
        <Link 
          href="/commissions" 
          className="text-sm font-semibold uppercase tracking-widest text-zinc-900 border border-zinc-900 px-6 py-2.5 hover:bg-zinc-900 hover:text-zinc-50 transition-colors rounded-sm inline-block"
        >
          Request Commission
        </Link>
      </header>

      {/* Gallery Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {artworks.map((art) => {
            const startingPrice = art.variants[0]?.price;

            return (
              <Link 
                href={`/artwork/${art.id}`} 
                key={art.id}
                className="group flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-200 mb-6 rounded-sm shadow-sm transition-transform duration-500 group-hover:shadow-md">
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <h2 className="text-xl font-medium tracking-wide text-zinc-800 group-hover:text-black transition-colors">
                    {art.title}
                  </h2>
                  <p className="text-sm text-zinc-500 line-clamp-1">
                    {art.description}
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-wider text-zinc-900">
                      {startingPrice ? `From $${startingPrice.toFixed(2)}` : 'Original Only'}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-black transition-colors">
                      View details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}