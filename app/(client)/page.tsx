import { fetchArtworks } from "@/app/actions/gallery";
import GalleryGrid from "@/components/GalleryGrid";

export default async function HomePage() {
  // Fetch only the first 6 artworks for an instant initial page load
  const initialArtworks = await fetchArtworks(1, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-antique font-semibold mb-4">
          Contemporary Originals & Archival Prints
        </p>
        
        {/* RESPONSIVE H1: text-4xl on mobile to prevent wrapping, text-6xl on desktop */}
        <h1 className="font-['Papyrus',_fantasy,_serif] font-bold text-4xl md:text-6xl text-obsidian tracking-wide mb-4 md:mb-6 leading-tight">
          Tattva Art Studio
        </h1>
        
        <p className="text-obsidian/70 font-light text-lg md:text-xl leading-relaxed">
          Original contemporary artworks and limited-edition prints by Kavita Rajput. Handcrafted with rich textures, evocative palettes, and timeless vision.
        </p>
      </section>

      {/* Dynamic Infinite Scroll Gallery */}
      <GalleryGrid initialArtworks={initialArtworks} />
    </div>
  );
}