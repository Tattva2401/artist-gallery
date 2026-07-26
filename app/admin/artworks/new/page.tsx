import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function ManageArtworks() {
  // Fetch all artworks
  const artworks = await prisma.artwork.findMany({
    include: { variants: true },
    orderBy: { createdAt: 'desc' }
  });

  // Server Action to delete an artwork
  async function deleteArtwork(id: string) {
    "use server";
    await prisma.artwork.delete({
      where: { id }
    });
    // Immediately refresh the admin and public gallery
    revalidatePath("/");
    revalidatePath("/admin/artworks");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Inventory</h1>
          <p className="text-stone-400 font-light text-sm">Manage live artworks and print variants.</p>
        </div>
        <Link href="/admin/artworks/new" className="bg-white text-stone-950 px-5 py-2.5 text-sm font-semibold uppercase tracking-widest rounded-sm hover:bg-stone-200 transition-colors">
          + Add Artwork
        </Link>
      </header>

      <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-stone-400">
          <thead className="bg-stone-950 text-stone-500 uppercase tracking-widest text-xs font-semibold border-b border-stone-800">
            <tr>
              <th className="px-6 py-4">Artwork</th>
              <th className="px-6 py-4">Variants</th>
              <th className="px-6 py-4">Date Added</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {artworks.map((art: any) => (
              <tr key={art.id} className="hover:bg-stone-800/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="relative w-12 h-16 bg-stone-800 rounded-sm overflow-hidden shrink-0">
                    <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-base">{art.title}</p>
                    <p className="text-xs line-clamp-1 mt-1 max-w-xs">{art.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-stone-800 text-stone-300 px-2.5 py-1 rounded-full text-xs font-medium">
                    {art.variants.length} Sizes
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(art.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <Link href={`/admin/artworks/${art.id}`} className="text-stone-300 hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold">
                      Edit
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteArtwork(art.id);
                    }}>
                      <button type="submit" className="text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest text-xs font-semibold cursor-pointer">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            
            {artworks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-stone-500">
                  No artworks found. Upload your first piece.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}