"use client";

import { useState } from 'react';
import Link from 'next/link';
import { submitCommissionRequest } from './actions';

export default function CommissionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Package up the form data and send it to our secure server action
      const formData = new FormData(e.currentTarget);
      await submitCommissionRequest(formData);
      
      // If no errors were thrown, show the success screen!
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to submit request:", error);
      alert("Something went wrong connecting to the studio. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------
  // SUCCESS STATE UI
  // -------------------------
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900 py-24 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-serif mb-4 text-stone-800">Request Received</h1>
        <p className="text-stone-500 max-w-md mx-auto mb-8 font-light leading-relaxed">
          Thank you for your interest. Kavita will review your concept and reach out via email to discuss the vision, sizing, and timeline.
        </p>
        <Link href="/" className="uppercase tracking-widest text-sm font-semibold text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
          Return to Gallery
        </Link>
      </main>
    );
  }

  // -------------------------
  // DEFAULT FORM UI
  // -------------------------
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 uppercase tracking-widest transition-colors mb-12 inline-block">
          ← Back to Gallery
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4 tracking-tight">
            Commission an Original
          </h1>
          <p className="text-stone-600 font-light leading-relaxed">
            Work directly with Kavita Rajput to bring your unique vision to life. Please provide as much detail as possible about your desired piece, including preferred dimensions and stylistic inspirations.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 shadow-sm border border-stone-100 rounded-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-stone-500">Full Name</label>
              <input required type="text" id="name" name="name" className="w-full border-b border-stone-300 py-2 bg-transparent focus:outline-none focus:border-stone-800 transition-colors placeholder:font-light" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-stone-500">Email Address</label>
              <input required type="email" id="email" name="email" className="w-full border-b border-stone-300 py-2 bg-transparent focus:outline-none focus:border-stone-800 transition-colors placeholder:font-light" placeholder="jane@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="size" className="text-xs font-bold uppercase tracking-widest text-stone-500">Desired Dimensions</label>
            <input required type="text" id="size" name="size" className="w-full border-b border-stone-300 py-2 bg-transparent focus:outline-none focus:border-stone-800 transition-colors placeholder:font-light" placeholder="e.g., 24x36 inches, Large Canvas" />
          </div>

          <div className="space-y-2">
            <label htmlFor="concept" className="text-xs font-bold uppercase tracking-widest text-stone-500">Artwork Concept & Details</label>
            <textarea required id="concept" name="concept" rows={5} className="w-full border border-stone-300 p-4 bg-transparent focus:outline-none focus:border-stone-800 transition-colors font-light placeholder:font-light resize-none" placeholder="Describe the color palette, mood, and any specific elements you want included..."></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-stone-900 text-stone-50 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </main>
  );
}