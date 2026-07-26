import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#121110] text-[#FBF9F5] pt-16 pb-8 border-t-[6px] border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Brand Information */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-serif text-2xl tracking-[0.2em] text-[#C5A059] font-bold mb-1">TATTVA</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#FBF9F5]/70 mb-6">Art Studio</span>
          <p className="text-sm font-light text-[#FBF9F5]/60 leading-relaxed max-w-xs">
            Original contemporary artworks and premium museum-quality prints.
          </p>
        </div>

        {/* Contact & Inquiries */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-6">Inquiries</h4>
          <a href="mailto:studio@tattvaart.com" className="text-sm font-light text-[#FBF9F5]/80 hover:text-[#C5A059] mb-3 transition-colors duration-300">
            studio@tattvaart.com
          </a>
          <Link href="/commissions" className="text-sm font-light text-[#FBF9F5]/80 hover:text-[#C5A059] mb-3 transition-colors duration-300">
            Request a Commission
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold mb-6">Follow</h4>
          <a href="#" className="text-sm font-light text-[#FBF9F5]/80 hover:text-[#C5A059] mb-3 transition-colors duration-300">
            Instagram
          </a>
          <a href="#" className="text-sm font-light text-[#FBF9F5]/80 hover:text-[#C5A059] mb-3 transition-colors duration-300">
            Pinterest
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-[#FBF9F5]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#FBF9F5]/40">
          © {new Date().getFullYear()} Tattva Art Studio. All Rights Reserved.
        </p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#FBF9F5]/40">
          Artworks by Kavita Rajput
        </p>
      </div>
    </footer>
  );
}