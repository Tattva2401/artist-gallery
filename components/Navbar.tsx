"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-zinc-50 border-b border-zinc-200 sticky top-0 z-50 text-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Brand Name */}
          <Link href="/" className="text-2xl font-serif tracking-tight text-zinc-900">
            Kavita Rajput
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">Gallery</Link>
            <Link href="/about" className="text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">About</Link>
            <Link href="/commissions" className="text-sm font-medium uppercase tracking-widest hover:text-zinc-500 transition-colors">Commissions</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-zinc-500 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="text-sm font-semibold uppercase tracking-widest bg-zinc-900 text-zinc-50 px-5 py-2.5 rounded-sm hover:bg-zinc-800 transition-colors">
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-zinc-50 border-t border-zinc-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium uppercase tracking-widest text-zinc-900 hover:text-zinc-500">Gallery</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium uppercase tracking-widest text-zinc-900 hover:text-zinc-500">About</Link>
            <Link href="/commissions" onClick={() => setIsOpen(false)} className="block text-sm font-medium uppercase tracking-widest text-zinc-900 hover:text-zinc-500">Commissions</Link>
            <hr className="border-zinc-200" />
            <Link href="/login" onClick={() => setIsOpen(false)} className="block text-sm font-semibold uppercase tracking-widest text-zinc-900 hover:text-zinc-500">Log In</Link>
            <Link href="/signup" onClick={() => setIsOpen(false)} className="block text-sm font-semibold uppercase tracking-widest text-zinc-50 bg-zinc-900 text-center py-3 rounded-sm">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}