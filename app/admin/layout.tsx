import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-950 flex text-stone-300 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-950 border-r border-stone-900 flex flex-col justify-between shrink-0 h-screen sticky top-0">
        <div>
          <div className="p-8">
            <h2 className="text-xl font-serif text-white tracking-tight">Studio Admin</h2>
            <p className="text-xs uppercase tracking-widest text-stone-600 mt-1">Workspace</p>
          </div>
          
          <nav className="mt-4 flex flex-col space-y-1 px-4">
            <Link href="/admin" className="px-4 py-3 text-sm rounded-sm hover:bg-stone-900 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/artworks" className="px-4 py-3 text-sm rounded-sm hover:bg-stone-900 hover:text-white transition-colors">
              Manage Artworks
            </Link>
            <Link href="/admin/commissions" className="px-4 py-3 text-sm rounded-sm hover:bg-stone-900 hover:text-white transition-colors flex justify-between items-center">
              Commissions
              <span className="bg-stone-800 text-stone-400 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full">New</span>
            </Link>
          </nav>
        </div>

        <div className="p-8 border-t border-stone-900">
          <Link href="/" className="text-sm text-stone-500 hover:text-white transition-colors flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-stone-900 flex items-center justify-center text-xs">←</span>
            Back to Live Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}