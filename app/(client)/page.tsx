import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  // Fetch live artworks from the database
  const artworks = await prisma.artwork.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-antique font-semibold mb-4">
          Original Fine Art & Contemporary Paintings
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-obsidian tracking-tight mb-6">
          Tattva Art Studio
        </h1>
        <p className="text-obsidian/70 font-light text-lg md:text-xl mb-10 leading-relaxed">
          Explore curated original pieces and premium museum-quality prints.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/commissions"
            className="bg-[#0B2545] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm"
          >
            Request Custom Commission
          </Link>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {artworks.map((art) => {
          // Calculate lowest variant price or default to 0
          const minPrice = art.variants.length > 0 
            ? Math.min(...art.variants.map(v => v.price))
            : 0;

          return (
            <div 
              key={art.id} 
              className="group flex flex-col bg-white border border-[#C5A059]/15 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <Link href={`/artwork/${art.id}`} className="block relative aspect-[4/5] bg-[#121110]/5 overflow-hidden">
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </Link>
              
              {/* Artwork Details */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#121110] mb-2 group-hover:text-[#C5A059] transition-colors duration-300">
                    {art.title}
                  </h3>
                  <p className="text-sm text-[#121110]/60 line-clamp-2 font-light mb-6 leading-relaxed">
                    {art.description}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-[#C5A059]/20 pt-5 mt-auto">
                  <span className="text-sm font-semibold text-[#121110]">
                    {minPrice > 0 ? `From ₹${minPrice.toLocaleString('en-IN')}` : 'Original Available'}
                  </span>
                  <Link
                    href={`/artwork/${art.id}`}
                    className="text-[10px] uppercase tracking-[0.15em] text-[#C5A059] font-bold hover:text-[#0B2545] transition-colors duration-300"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        
        {artworks.length === 0 && (
          <div className="col-span-full text-center py-20 text-[#121110]/50 font-light">
            The gallery is currently being curated. Check back soon.
          </div>
        )}
      </section>
    </div>
  );
}