"use client";

import { useTransition, useRef } from "react";
import { addVariant, deleteVariant } from "@/app/admin/artworks/[id]/variant-actions";

type Variant = {
  id: string;
  size: string;
  price: number;
};

export default function VariantEditor({ artworkId, variants }: { artworkId: string; variants: Variant[] }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleDelete = (variantId: string) => {
    if (window.confirm("Are you sure you want to delete this size?")) {
      startTransition(async () => {
        await deleteVariant(variantId, artworkId);
      });
    }
  };

  const handleAdd = (formData: FormData) => {
    startTransition(async () => {
      const res = await addVariant(artworkId, formData);
      if (!res?.error) {
        formRef.current?.reset(); // Clear inputs only after successful addition
      }
    });
  };

  return (
    <div className="mt-10 pt-8 border-t border-[#C5A059]/20">
      <h3 className="font-serif text-2xl text-[#FBF9F5] mb-6">Manage Print Sizes</h3>

      {/* Existing Sizes List */}
      <div className="space-y-3 mb-6">
        {variants.length === 0 && <p className="text-[#FBF9F5]/50 text-sm">No print sizes available yet.</p>}
        
        {variants.map((v) => (
          <div key={v.id} className="flex justify-between items-center bg-[#121110] border border-[#C5A059]/20 p-4 rounded-sm">
            <span className="text-[#FBF9F5] tracking-wide">
              {v.size} <span className="text-[#C5A059] ml-2">${v.price}</span>
            </span>
            
            <button 
              type="button"
              onClick={() => handleDelete(v.id)}
              disabled={isPending}
              className="text-xs uppercase tracking-widest font-bold text-red-900/80 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add New Size Form */}
      <form ref={formRef} action={handleAdd} className="flex flex-col sm:flex-row gap-4 items-start">
        <input 
          type="text" 
          name="size" 
          placeholder="Size (e.g., 24x36)" 
          required 
          className="bg-[#121110] border border-[#C5A059]/30 text-[#FBF9F5] p-3 rounded-sm w-full focus:outline-none focus:border-[#C5A059]"
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Price ($)" 
          required 
          min="0"
          step="0.01"
          className="bg-[#121110] border border-[#C5A059]/30 text-[#FBF9F5] p-3 rounded-sm w-full sm:w-32 focus:outline-none focus:border-[#C5A059]"
        />
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-[#C5A059] text-[#121110] px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-[#FBF9F5] transition-colors duration-300 w-full sm:w-auto whitespace-nowrap disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Size"}
        </button>
      </form>
    </div>
  );
}