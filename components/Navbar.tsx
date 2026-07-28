"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Check active session on mount
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  // Extract the first letter of the email for the avatar
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <header className="bg-[#FBF9F5] border-b border-[#C5A059]/30">
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

        {/* Right Section: Dynamic Authentication & Profile Dropdown */}
        <div className="flex items-center justify-end w-full md:w-1/3 mt-3 md:mt-0 gap-5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-[#0B2545] text-[#FBF9F5] flex items-center justify-center font-serif text-xl hover:bg-[#C5A059] transition-colors duration-300 shadow-sm border border-[#0B2545]/20 focus:outline-none"
              >
                {userInitial}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-[#C5A059]/30 shadow-lg rounded-sm py-2 z-50 flex flex-col transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-[#C5A059]/15 bg-[#FBF9F5]/30">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#121110]/50">Signed in as</p>
                    <p className="text-xs text-[#121110] truncate mt-1">{user.email}</p>
                  </div>
                  
                  <Link 
                    href="/account"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-3 text-xs uppercase tracking-widest font-bold text-[#121110] hover:bg-[#FBF9F5] hover:text-[#C5A059] transition-colors text-left"
                  >
                    Collection Room
                  </Link>
                  
                  <button 
                    onClick={handleSignOut}
                    className="px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-900/80 hover:bg-red-50 hover:text-red-900 transition-colors text-left border-t border-[#C5A059]/15"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link 
                href="/login"
                className="text-xs uppercase tracking-widest font-bold text-[#121110] hover:text-[#C5A059] transition-colors duration-300"
              >
                Log In
              </Link>
              <Link 
                href="/signup"
                className="bg-[#0B2545] text-white px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Bottom Ribbon: Clean Navigation Links */}
      <div className="border-t border-[#C5A059]/15 bg-white/40 py-3">
        <nav className="flex items-center justify-center gap-10 text-xs uppercase tracking-[0.2em] font-bold text-[#121110]/80">
          <Link href="/" className="hover:text-[#C5A059] transition-colors duration-300">Gallery</Link>
          <Link href="/about" className="hover:text-[#C5A059] transition-colors duration-300">About Artist</Link>
          <Link href="/commissions" className="hover:text-[#C5A059] transition-colors duration-300">Commissions</Link>
        </nav>
      </div>
    </header>
  );
}