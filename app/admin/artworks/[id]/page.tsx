import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditArtworkPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Await the params Promise to safely extract the ID
  const resolvedParams = await params;
  const artworkId = resolvedParams.id;

  // 2. Fetch the specific artwork based on the extracted URL ID
  const artwork = await prisma.artwork.findUnique({
    where: { id: artworkId },
  });

  // If someone tries to edit an artwork that doesn't exist, kick them back to the inventory
  if (!artwork) {
    redirect("/admin/artworks");
  }

  // 3. Secure Server Action to handle the update
  async function updateArtwork(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const dimensions = formData.get("dimensions") as string;
    const isAvailable = formData.get("isAvailable") === "on"; 

    // Update the record in the database using the awaited ID (Price removed!)
    await prisma.artwork.update({
      where: { id: artworkId },
      data: {
        title,
        description,
        category,
        dimensions,
        isAvailable,
      },
    });

    // Refresh the cache for the admin panel, the specific artwork page, and the homepage
    revalidatePath("/admin/artworks");
    revalidatePath(`/artwork/${artworkId}`);
    revalidatePath("/");
    
    // Redirect back to the inventory table
    redirect("/admin/artworks");
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
        <h1 className="font-serif text-3xl text-[#FBF9F5] mb-2">Edit Artwork</h1>
        <p className="text-xs uppercase tracking-widest text-[#FBF9F5]/50">Update details for {artwork.title}</p>
      </div>

      <form action={updateArtwork} className="bg-[#121110] border border-stone-800 p-8 rounded-sm space-y-6">
        
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Artwork Title</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={artwork.title} 
            required 
            className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Description</label>
          <textarea 
            name="description" 
            defaultValue={artwork.description || ""} 
            rows={4} 
            className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default Dimensions */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Dimensions</label>
            <input 
              type="text" 
              name="dimensions" 
              defaultValue={artwork.dimensions || ""} 
              placeholder="e.g., 24x36 inches"
              className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Category</label>
            <input 
              type="text" 
              name="category" 
              defaultValue={artwork.category || ""} 
              className="w-full bg-stone-900 border border-stone-800 p-3 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#C5A059] rounded-sm transition-colors"
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="space-y-2 flex flex-col justify-center pt-4 border-t border-stone-800">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-2">Status</label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="isAvailable" 
              defaultChecked={artwork.isAvailable} 
              className="w-4 h-4 accent-[#C5A059] bg-stone-900 border-stone-800 rounded-sm"
            />
            <span className="text-sm text-[#FBF9F5]">Artwork is available for purchase</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-stone-800">
          <button 
            type="submit" 
            className="bg-[#FBF9F5] text-[#121110] px-8 py-3 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] hover:text-white transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}