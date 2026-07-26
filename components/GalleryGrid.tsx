"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { fetchArtworks } from "@/app/actions/gallery";

// Temporary typing to avoid strict TypeScript errors during rapid prototyping
export default function GalleryGrid({ initialArtworks }: { initialArtworks: any[] }) {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArtworks.length === 6);
  
  // This ref triggers 'inView' to true when it scrolls into the viewport
  const { ref, inView } = useInView();

  const loadMoreArtworks = useCallback(async () => {
    const nextPage = page + 1;
    const newArtworks = await fetchArtworks(nextPage, 6);
    
    if (newArtworks.length > 0) {
      setArtworks((prev) => [...prev, ...newArtworks]);
      setPage(nextPage);
    }
    
    // If we received fewer items than the limit, we've hit the end of the database
    if (newArtworks.length < 6) {
      setHasMore(false);
    }
  }, [page]);

  // Trigger the fetch when the loading spinner comes into view
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreArtworks();
    }
  }, [inView, hasMore, loadMoreArtworks]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {artworks.map((art) => {
          const minPrice = art.variants?.length > 0 
            ? Math.min(...art.variants.map((v: any) => v.price))
            : 0;

          return (
            <div 
              key={art.id} 
              className="group flex flex-col bg-white border border-[#C5A059]/15 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
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
      </section>

      {/* Infinite Scroll Trigger & Loading State */}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin"></div>
        </div>
      )}

      {/* End of Gallery Message */}
      {!hasMore && artworks.length > 0 && (
        <div className="text-center py-16 text-[#121110]/40 font-light text-sm uppercase tracking-widest">
          End of Collection
        </div>
      )}
    </>
  );
}