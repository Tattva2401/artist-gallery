"use client";

import { publishArtwork } from "./actions";
import Link from "next/link";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function NewArtworkPage() {
  const [uploading, setUploading] = useState(false);
  
  // Dynamic state to hold multiple sizes/variants
  const [variants, setVariants] = useState([{ size: "Original", price: "", stock: "1" }]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Helper functions for the dynamic variants builder
  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const addVariant = () => setVariants([...variants, { size: "", price: "", stock: "1" }]);
  const removeVariant = (index: number) => setVariants(variants.filter((_, i) => i !== index));

  async function handleClientSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("imageFile") as File;
    let imageUrl = "";

    // 1. Upload to Supabase
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(fileName, file);

      if (uploadError) {
        alert("Failed to upload image to Supabase: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('artworks')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 2. Format variants for Prisma
    const formattedVariants = variants.map(v => ({
      size: v.size,
      price: parseFloat(v.price) || 0,
      stock: parseInt(v.stock) || 0
    }));

    // 3. Fire the server action
    await publishArtwork({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      dimensions: formData.get("dimensions") as string,
      category: formData.get("category") as string,
      imageUrl: imageUrl,
      variants: formattedVariants
    });
  }

  return (
    <div className="p-8 md:p-12 max-w-3xl">
      <div className="mb-10">
        <Link 
          href="/admin/artworks" 
          className="text-stone-500 hover:text-stone-300 text-[10px] uppercase tracking-widest font-bold mb-6 inline-block transition-colors"
        >
          &larr; Back to Inventory
        </Link>
        <h1 className="font-serif text-3xl text-[#FBF9F5] mb-2">Upload New Artwork</h1>
        <p className="text-xs uppercase tracking-widest text-[#FBF9F5]/50">Add a new piece to your gallery.</p>
      </div>

      <form onSubmit={handleClientSubmit} className="bg-[#121110] border border-stone-800 p-8 rounded-sm space-y-6">
        
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Artwork Title</label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
          />
        </div>

        {/* Finder File Upload */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Upload Image File</label>
          <input 
            type="file" 
            name="imageFile"
            accept="image/*"
            required 
            className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:font-bold file:bg-[#C5A059] file:text-white hover:file:bg-[#b08d4b] file:cursor-pointer file:transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Description</label>
          <textarea 
            name="description" 
            rows={4} 
            className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Default Dimensions (inches)</label>
            <input 
              type="text" 
              name="dimensions" 
              placeholder="e.g., 24x36"
              required 
              className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Category</label>
            <input 
              type="text" 
              name="category" 
              placeholder="e.g., Abstract, Portrait"
              required 
              className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Sizes & Pricing Section */}
        <div className="space-y-4 pt-6 border-t border-stone-800">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">Sizes & Pricing Inventory</label>
            <button 
              type="button" 
              onClick={addVariant} 
              className="text-[#FBF9F5] text-[10px] uppercase tracking-widest font-bold hover:text-[#C5A059] transition-colors"
            >
              + Add Size Option
            </button>
          </div>

          {variants.map((variant, index) => (
            <div key={index} className="flex gap-4 items-start">
              <input
                type="text"
                placeholder="Size (e.g., Original, A4, 18x24)"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                required
                className="w-2/5 bg-stone-950 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={variant.price}
                onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                required
                className="w-2/5 bg-stone-950 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
              />
              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                required
                className="w-1/5 bg-stone-950 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
              />
              {variants.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeVariant(index)} 
                  className="mt-3 text-stone-500 hover:text-red-400 transition-colors"
                  title="Remove variant"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-stone-800">
          <button 
            type="submit" 
            disabled={uploading}
            className="bg-[#FBF9F5] text-[#121110] px-8 py-3 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] hover:text-white transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            {uploading ? "Uploading & Publishing..." : "Publish Artwork"}
          </button>
        </div>
      </form>
    </div>
  );
}