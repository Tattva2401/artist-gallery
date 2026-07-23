"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { publishArtwork } from "./actions";
import Link from "next/link";

export default function NewArtworkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Connect to the Supabase File Cabinet using your environment variables
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image file.");
    
    setIsUploading(true);

    try {
      // 1. Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 2. Upload the image to the 'artworks' bucket
      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get the public URL to save in the database
      const { data: { publicUrl } } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      // 4. Send everything to the secure server action we built in Step 2!
      await publishArtwork({
        title,
        description,
        imageUrl: publicUrl,
        basePrice: parseFloat(price),
      });

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload artwork. Check console for details.");
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Link href="/admin/artworks" className="text-xs text-stone-500 uppercase tracking-widest hover:text-white transition-colors mb-4 inline-block">
          ← Back to Inventory
        </Link>
        <h1 className="text-3xl font-serif text-white mb-2">Upload New Artwork</h1>
        <p className="text-stone-400 font-light text-sm">Add a new piece to the public gallery.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 p-8 rounded-sm space-y-6 shadow-xl">
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Artwork Image</label>
          <div className="border-2 border-dashed border-stone-700 rounded-sm p-8 text-center hover:border-stone-500 transition-colors bg-stone-950/50">
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-sm text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-white file:text-stone-950 hover:file:bg-stone-200 cursor-pointer w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Title</label>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-b border-stone-700 py-2 bg-transparent text-white focus:outline-none focus:border-white transition-colors" placeholder="Ethereal Bloom" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Description</label>
          <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-stone-700 p-3 bg-transparent text-white focus:outline-none focus:border-white transition-colors text-sm resize-none" placeholder="Describe the medium, inspiration, and mood..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Base Price (Original)</label>
          <input required type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border-b border-stone-700 py-2 bg-transparent text-white focus:outline-none focus:border-white transition-colors" placeholder="1200.00" />
        </div>

        <button 
          type="submit" 
          disabled={isUploading}
          className="w-full bg-white text-stone-950 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-stone-200 transition-colors mt-4 disabled:opacity-50"
        >
          {isUploading ? 'Uploading & Publishing...' : 'Publish to Gallery'}
        </button>
      </form>
    </div>
  );
}