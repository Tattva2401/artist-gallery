"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { processCheckout } from "@/app/(client)/checkout/actions"; // Ready for when we wire up the backend!

export default function ArtworkClient({ artwork }: { artwork: any }) {
  // Default to the first available variant (e.g., "Original")
  const [selectedVariant, setSelectedVariant] = useState(artwork.variants[0]);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedNoCopy, setAgreedNoCopy] = useState(false);

  const isCheckoutReady = agreedTerms && agreedNoCopy && selectedVariant;

  return (
    <div className="flex flex-col">
      {/* Back Navigation */}
      <Link 
        href="/" 
        className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold hover:text-[#0B2545] transition-colors duration-300 mb-10 w-max"
      >
        ← Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Artwork Showcase */}
        <div className="relative aspect-[4/5] w-full bg-white border border-[#C5A059]/20 shadow-lg rounded-sm p-3">
          <div className="relative w-full h-full bg-[#121110]/5 overflow-hidden">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: Details & Checkout */}
        <div className="flex flex-col pt-4">
          <h1 className="font-serif text-4xl md:text-5xl text-[#121110] mb-4">
            {artwork.title}
          </h1>
          <p className="text-[#121110]/70 font-light leading-relaxed mb-10 pb-10 border-b border-[#C5A059]/20">
            {artwork.description}
          </p>

          {/* Size Selector */}
          <div className="mb-10">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-4">
              Select Canvas Size
            </h3>
            <div className="flex flex-wrap gap-4">
              {artwork.variants.map((variant: any) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 border ${
                    selectedVariant?.id === variant.id
                      ? "bg-[#0B2545] text-white border-[#0B2545] shadow-md"
                      : "bg-white text-[#121110] border-[#C5A059]/30 hover:border-[#C5A059]"
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Display */}
          <div className="mb-10 flex items-baseline gap-2">
            <span className="text-4xl font-light text-[#121110]">
              {selectedVariant ? `₹${selectedVariant.price.toLocaleString('en-IN')}` : "—"}
            </span>
            <span className="text-xs uppercase tracking-widest text-[#121110]/50 font-semibold">
              INR
            </span>
          </div>

          {/* Legal Agreements Box */}
          <div className="bg-white border border-[#C5A059]/30 p-6 rounded-sm shadow-sm mb-10">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#121110] font-bold mb-5">
              Required Agreements
            </h4>
            
            <label className="flex items-start gap-4 mb-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border border-[#C5A059]/50 rounded-xs checked:bg-[#C5A059] checked:border-[#C5A059] transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-light text-[#121110]/80 group-hover:text-[#121110] transition-colors">
                I agree to the purchase terms and acknowledge this is a print-on-demand item.
              </span>
            </label>

            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={agreedNoCopy}
                  onChange={(e) => setAgreedNoCopy(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border border-[#C5A059]/50 rounded-xs checked:bg-[#C5A059] checked:border-[#C5A059] transition-colors cursor-pointer"
                />
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-light text-[#121110]/80 group-hover:text-[#121110] transition-colors">
                I legally agree to not duplicate, reproduce, or resell this artwork in any form.
              </span>
            </label>
          </div>

          {/* Checkout Button */}
          <button
            disabled={!isCheckoutReady}
            className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-sm ${
              isCheckoutReady
                ? "bg-[#0B2545] text-white hover:bg-[#C5A059] cursor-pointer"
                : "bg-[#121110]/10 text-[#121110]/40 cursor-not-allowed"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}