import prisma from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch real-time counts from your database
  const artworksCount = await prisma.artwork.count();
  const commissionsCount = await prisma.commission.count({
    where: { status: 'PENDING' }
  });

  return (
    <div className="max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-serif text-white mb-3">Welcome back, Kavita.</h1>
        <p className="text-stone-400 font-light">Here is what is happening in the studio today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Live Artworks</h3>
          <p className="text-4xl text-white font-serif">{artworksCount}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Pending Commissions</h3>
          <p className="text-4xl text-white font-serif">{commissionsCount}</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Total Orders</h3>
          <p className="text-4xl text-white font-serif">0</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg text-white mb-4 font-serif">Quick Actions</h3>
        <div className="flex gap-4">
          <Link 
            href="/admin/artworks/new" 
            className="bg-white text-stone-950 px-6 py-3 text-sm font-semibold uppercase tracking-widest rounded-sm hover:bg-stone-200 transition-colors"
          >
            + Upload New Artwork
          </Link>
          <Link 
            href="/admin/commissions" 
            className="border border-stone-700 text-white px-6 py-3 text-sm font-semibold rounded-sm hover:bg-stone-800 transition-colors"
          >
            Review Commissions
          </Link>
        </div>
      </div>
    </div>
  );
}