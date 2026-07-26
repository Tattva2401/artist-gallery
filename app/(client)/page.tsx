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
          Original Fine Art & Contemporary Paintings
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-obsidian tracking-tight mb-6">
          Tattva Art Studio
        </h1>
        <p className="text-obsidian/70 font-light text-lg md:text-xl leading-relaxed">
          Explore curated original pieces and premium museum-quality prints.
        </p>
      </section>

      {/* Dynamic Infinite Scroll Gallery */}
      <GalleryGrid initialArtworks={initialArtworks} />
    </div>
  );
}