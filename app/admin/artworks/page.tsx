import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";

// Secure inline Server Action to handle the deletion
async function deleteArtwork(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  
  if (id) {
    // Delete the record from the database
    await prisma.artwork.delete({ where: { id } });
    
    // Tell Next.js to refresh both the admin panel and the live gallery
    revalidatePath("/admin/artworks");
    revalidatePath("/");
  }
}

export default async function ManageArtworksPage() {
  // Fetch all artworks directly from Prisma
  const artworks = await prisma.artwork.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 md:p-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl text-[#FBF9F5] mb-2">Inventory</h1>
          <p className="text-xs uppercase tracking-widest text-[#FBF9F5]/50">Manage live artworks and print variants.</p>
        </div>
        
        <Link 
          href="/admin/artworks/new"
          className="bg-[#FBF9F5] text-[#121110] px-6 py-3 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] hover:text-white transition-colors shadow-sm"
        >
          + ADD ARTWORK
        </Link>
      </div>

      {/* Artworks Table */}
      <div className="bg-[#121110] border border-stone-800 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-800 text-[10px] uppercase tracking-widest text-stone-400 bg-stone-900/30">
              <th className="p-6 font-medium">Artwork</th>
              <th className="p-6 font-medium">Status</th>
              <th className="p-6 font-medium">Dimensions</th>
              <th className="p-6 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {artworks.map((art) => (
              <tr key={art.id} className="hover:bg-stone-800/20 transition-colors">
                
                {/* Image & Details (with object-contain to support horizontal layouts) */}
                <td className="p-6 flex items-center gap-6">
                  <div className="relative w-16 h-20 bg-stone-900 rounded-sm overflow-hidden border border-stone-800 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={art.imageUrl || "/placeholder.png"}
                      alt={art.title || "Artwork"}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-serif text-[#FBF9F5] text-lg mb-1">{art.title}</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500">
                      {art.category || "Uncategorized"}
                    </p>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="p-6">
                  <span className={`text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm font-bold ${
                    art.isAvailable 
                      ? 'bg-green-900/20 text-green-400 border border-green-900/30' 
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}>
                    {art.isAvailable ? 'Available' : 'Sold Out'}
                  </span>
                </td>

                {/* Dimensions */}
                <td className="p-6 text-[#FBF9F5] text-sm font-medium">
                  {art.dimensions || "N/A"}
                </td>

                {/* Actions: Edit & Delete */}
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link 
                      href={`/admin/artworks/${art.id}`}
                      className="bg-stone-800 text-stone-300 border border-stone-700 px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-stone-700 hover:text-white transition-colors"
                    >
                      Edit
                    </Link>

                    <form action={deleteArtwork}>
                      <input type="hidden" name="id" value={art.id} />
                      <button 
                        type="submit" 
                        className="bg-red-900/20 text-red-400 border border-red-900/30 px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-red-900 hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>

              </tr>
            ))}
            
            {/* Empty State */}
            {artworks.length === 0 && (
              <tr>
                <td colSpan={4} className="p-16 text-center">
                  <p className="text-stone-500 text-sm font-light">No artworks found. Upload your first piece.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}