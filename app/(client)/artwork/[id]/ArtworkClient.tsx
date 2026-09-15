"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { processCheckout } from "@/app/(client)/checkout/actions";

export default function ArtworkClient({ artwork }: { artwork: any }) {
  const [selectedVariant, setSelectedVariant] = useState(artwork?.variants?.[0] || null);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedNoCopy, setAgreedNoCopy] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  // Checkout Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<{ orderId: string; qrCode: string; amount: number } | null>(null);

  const handleOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedVariant) return;

    setIsProcessing(true);
    setCheckoutError(null);

    try {
      const res = await processCheckout({
        artworkId: artwork.id,
        size: selectedVariant.size,
        price: selectedVariant.price,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        agreedToTerms,
        agreedToNonCopy,
        agreedToNoRemake: true,
      });

      if (!res.success) {
        setCheckoutError(res.error || "Unable to initiate payment.");
      } else {
        setOrderResult({
          orderId: res.orderId!,
          qrCode: res.qrCode!,
          amount: res.amount!,
        });
      }
    } catch (err: any) {
      console.error("Checkout submission failed:", err);
      setCheckoutError("Failed to connect to checkout service. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const closeCheckoutModal = () => {
    setShowCheckoutModal(false);
    setOrderResult(null);
    setCheckoutError(null);
  };

  const isCheckoutReady = agreedTerms && agreedNoCopy && selectedVariant;

  // Lock scrolling when Lightbox or Checkout is open
  useEffect(() => {
    if (showLightbox || showCheckoutModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showLightbox, showCheckoutModal]);

  return (
    <>
      <div className="flex flex-col">
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold hover:text-[#0B2545] transition-colors duration-300 mb-10 w-max"
        >
          ← Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Artwork Showcase (Uncropped + Lightbox Trigger) */}
          <div className="relative aspect-[4/5] w-full bg-white border border-[#C5A059]/20 shadow-lg rounded-sm p-3 group cursor-pointer" onClick={() => setShowLightbox(true)}>
            <div className="relative w-full h-full bg-[#121110]/5 overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2" // object-contain ensures ZERO cropping
              />
              
              {/* Magnifying Glass Overlay */}
              <div className="absolute inset-0 bg-[#121110]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/80 rounded-full p-4 shadow-lg backdrop-blur-sm">
                  <svg className="w-6 h-6 text-[#121110]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>
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
              {artwork?.variants && artwork.variants.length > 0 ? (
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
              ) : (
                <p className="text-xs text-[#121110]/60 font-light italic">
                  Original artwork piece. Please contact the studio for custom sizing or inquiries.
                </p>
              )}
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
              onClick={() => setShowCheckoutModal(true)}
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

      {/* Detail Page Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#121110]/95 backdrop-blur-sm p-4 md:p-12"
          onClick={() => setShowLightbox(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setShowLightbox(false)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full h-full max-w-6xl max-h-screen">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Zero-Fee Domestic UPI Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121110]/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#FBF9F5] border border-[#C5A059]/40 rounded-sm shadow-2xl p-6 md:p-8 my-8 text-[#121110]">
            <button 
              onClick={closeCheckoutModal}
              className="absolute top-4 right-4 text-[#121110]/60 hover:text-[#121110] transition-colors p-2"
              aria-label="Close modal"
            >
              ✕
            </button>

            {orderResult ? (
              /* Success & UPI QR Screen */
              <div className="text-center space-y-6 pt-2">
                <span className="text-3xl">🏛️</span>
                <h3 className="font-serif text-2xl text-[#121110]">Acquisition Initiated</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  Order #{orderResult.orderId.slice(0, 8).toUpperCase()}
                </p>
                <div className="p-4 bg-white border border-[#C5A059]/30 rounded-sm inline-block shadow-sm">
                  {/* Dynamic QR Code from UPI deep-link */}
                  <img 
                    src={orderResult.qrCode} 
                    alt="Scan UPI QR Code" 
                    className="w-56 h-56 mx-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-light text-[#121110]">
                    ₹{orderResult.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-[#121110]/70 font-light">
                    Scan with Google Pay, PhonePe, Paytm, or any UPI app.
                  </p>
                </div>
                <div className="p-4 bg-[#121110]/5 border border-[#C5A059]/20 rounded-sm text-left text-xs font-light text-[#121110]/80 space-y-1">
                  <p>• Artwork: <strong className="font-semibold">{artwork.title}</strong> ({selectedVariant?.size})</p>
                  <p>• Delivery: <strong className="font-semibold">{shippingAddress}</strong></p>
                  <p>• A confirmation receipt has been dispatched to <strong className="font-semibold">{customerEmail}</strong>.</p>
                </div>
                <button
                  onClick={closeCheckoutModal}
                  className="w-full bg-[#0B2545] text-white py-3.5 text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300"
                >
                  Return to Studio
                </button>
              </div>
            ) : (
              /* Acquisition Form */
              <div>
                <div className="mb-6 border-b border-[#C5A059]/20 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">Direct Acquisition</span>
                  <h3 className="font-serif text-2xl text-[#121110] mt-1">{artwork.title}</h3>
                  <p className="text-xs text-[#121110]/60 font-light mt-1">
                    Canvas Size: {selectedVariant?.size} • ₹{selectedVariant?.price.toLocaleString('en-IN')} INR
                  </p>
                </div>

                {checkoutError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-sm">
                    {checkoutError}
                  </div>
                )}

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#121110]/70 block mb-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Collector Full Name"
                      className="w-full bg-white border border-[#C5A059]/30 p-2.5 text-sm text-[#121110] focus:outline-none focus:border-[#0B2545] rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-[#121110]/70 block mb-1">Email</label>
                      <input 
                        required
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-white border border-[#C5A059]/30 p-2.5 text-sm text-[#121110] focus:outline-none focus:border-[#0B2545] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-[#121110]/70 block mb-1">Phone (for courier)</label>
                      <input 
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-[#C5A059]/30 p-2.5 text-sm text-[#121110] focus:outline-none focus:border-[#0B2545] rounded-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#121110]/70 block mb-1">Complete Shipping Address</label>
                    <textarea 
                      required
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Street, Landmark, City, State, PIN Code"
                      className="w-full bg-white border border-[#C5A059]/30 p-2.5 text-sm text-[#121110] focus:outline-none focus:border-[#0B2545] rounded-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-[#0B2545] text-white py-4 text-xs uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? "Preparing UPI Invoice..." : `Pay ₹${selectedVariant?.price.toLocaleString('en-IN')} via UPI`}
                    </button>
                    <p className="text-[10px] text-center text-[#121110]/50 font-light mt-2 uppercase tracking-widest">
                      Zero Processing Fees • Instant Direct Studio Transfer
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}