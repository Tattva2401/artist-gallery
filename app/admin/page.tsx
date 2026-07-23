import prisma from "@/lib/db";

export default async function AdminDashboard() {
  // Fetch some quick stats directly from the database
  const totalArtworks = await prisma.artwork.count();
  const pendingCommissions = await prisma.commissionRequest.count({
    where: { status: 'PENDING' }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-serif text-white mb-2">Welcome back, Kavita.</h1>
        <p className="text-stone-400 font-light">Here is what is happening in the studio today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-stone-800/50 border border-stone-800 p-6 rounded-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Live Artworks</h3>
          <p className="text-4xl font-light text-white">{totalArtworks}</p>
        </div>
        <div className="bg-stone-800/50 border border-stone-800 p-6 rounded-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Pending Commissions</h3>
          <p className="text-4xl font-light text-white">{pendingCommissions}</p>
        </div>
        <div className="bg-stone-800/50 border border-stone-800 p-6 rounded-sm">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Total Orders</h3>
          <p className="text-4xl font-light text-white">0</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-stone-950 text-sm font-semibold uppercase tracking-widest hover:bg-stone-200 transition-colors rounded-sm">
            + Upload New Artwork
          </button>
          <button className="px-6 py-3 bg-stone-800 text-white border border-stone-700 text-sm font-semibold hover:bg-stone-700 transition-colors rounded-sm">
            Review Commissions
          </button>
        </div>
      </div>
    </div>
  );
}