import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      {/* Removed 'sticky top-0 z-50 backdrop-blur-md' to allow natural scrolling */}
      <header className="bg-[#FBF9F5] border-b border-[#C5A059]/30">
        {/* Top Section: Centered Royal Brand Showcase */}
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Spacer */}
        <div className="hidden md:flex items-center gap-4 w-1/3 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
          <span>Est. Studio Collection</span>
        </div>

        {/* Centered Prominent Logo & Brand Name */}
        <Link href="/" className="flex flex-col items-center group text-center w-full md:w-1/3">
          <div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-2 border-[#C5A059] shadow-md transition-transform duration-500 group-hover:scale-105 bg-white mb-2">
            <Image 
              src="/logo.jpeg" 
              alt="Tattva Art Studio Logo" 
              fill 
              priority
              sizes="(max-width: 768px) 96px, 112px"
              className="object-cover"
            />
          </div>
          <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#121110] font-bold group-hover:text-[#C5A059] transition-colors duration-300">
            TATTVA
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold mt-0.5">
            ART STUDIO
          </span>
        </Link>

        {/* Right Action Button */}
        <div className="flex items-center justify-end w-full md:w-1/3 mt-3 md:mt-0">
          <Link 
            href="/commissions"
            className="bg-[#0B2545] text-white px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm"
          >
            Request Art
          </Link>
        </div>
      </div>

      {/* Bottom Ribbon: Clean Navigation Links */}
      <div className="border-t border-[#C5A059]/15 bg-white/40 py-3">
        <nav className="flex items-center justify-center gap-10 text-xs uppercase tracking-[0.2em] font-bold text-[#121110]/80">
          <Link href="/" className="hover:text-[#C5A059] transition-colors duration-300">
            Gallery
          </Link>
          <Link href="/about" className="hover:text-[#C5A059] transition-colors duration-300">
            About Artist
          </Link>
          <Link href="/commissions" className="hover:text-[#C5A059] transition-colors duration-300">
            Commissions
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
}