import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-stone-950 border-r border-stone-800 p-6 flex flex-col">
        <div className="mb-12">
          <h2 className="text-xl font-serif text-white tracking-tight">Studio Admin</h2>
          <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Workspace</p>
        </div>
        
        <nav className="flex flex-col space-y-2 flex-grow">
          <Link href="/admin" className="px-4 py-3 text-sm rounded-sm bg-stone-800 text-white font-medium">
            Dashboard
          </Link>
          <Link href="/admin/artworks" className="px-4 py-3 text-sm rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors">
            Manage Artworks
          </Link>
          <Link href="/admin/commissions" className="px-4 py-3 text-sm rounded-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors flex justify-between items-center">
            Commissions
            <span className="bg-stone-700 text-xs px-2 py-0.5 rounded-full">New</span>
          </Link>
        </nav>

        <div className="pt-8 border-t border-stone-800 mt-auto">
          <Link href="/" className="text-sm text-stone-500 hover:text-white transition-colors flex items-center gap-2">
            <span>←</span> Back to Live Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}