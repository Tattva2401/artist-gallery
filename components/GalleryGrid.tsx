"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { fetchArtworks } from "@/app/actions/gallery";

export default function GalleryGrid({ initialArtworks }: { initialArtworks: any[] }) {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArtworks.length === 6);
  
  // State for the Lightbox modal
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  
  const { ref, inView } = useInView();

  const loadMoreArtworks = useCallback(async () => {
    const nextPage = page + 1;
    const newArtworks = await fetchArtworks(nextPage, 6);
    
    if (newArtworks.length > 0) {
      setArtworks((prev) => [...prev, ...newArtworks]);
      setPage(nextPage);
    }
    
    if (newArtworks.length < 6) {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreArtworks();
    }
  }, [inView, hasMore, loadMoreArtworks]);

  // Lock scrolling when Lightbox is open
  useEffect(() => {
    if (lightboxUrl) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [lightboxUrl]);

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
              {/* Image Container with Hover Overlay */}
              <div 
                className="relative aspect-[4/5] bg-[#121110]/5 overflow-hidden cursor-pointer group/image"
                onClick={() => setLightboxUrl(art.imageUrl)}
              >
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover/image:scale-105"
                />
                
                {/* Magnifying Glass Overlay */}
                <div className="absolute inset-0 bg-[#121110]/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <svg className="w-10 h-10 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <Link href={`/artwork/${art.id}`}>
                    <h3 className="font-serif text-2xl text-[#121110] mb-2 hover:text-[#C5A059] transition-colors duration-300">
                      {art.title}
                    </h3>
                  </Link>
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

      {hasMore && (
        <div ref={ref} className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin"></div>
        </div>
      )}

      {!hasMore && artworks.length > 0 && (
        <div className="text-center py-16 text-[#121110]/40 font-light text-sm uppercase tracking-widest">
          End of Collection
        </div>
      )}

      {/* Full Screen Lightbox Modal */}
      {lightboxUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#121110]/95 backdrop-blur-sm p-4 md:p-12"
          onClick={() => setLightboxUrl(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setLightboxUrl(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full h-full max-w-6xl max-h-screen">
            <Image
              src={lightboxUrl}
              alt="Expanded Artwork"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}