import prisma from "@/lib/db";
import Link from "next/link";

export default async function AdminCommissionsPage() {
  // Fetch all commissions, newest first
  const commissions = await prisma.commission.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Commission Requests</h1>
          <p className="text-stone-400 font-light text-sm">Review and manage incoming client projects.</p>
        </div>
      </header>

      <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-stone-400">
          <thead className="bg-stone-950 text-stone-500 uppercase tracking-widest text-xs font-semibold border-b border-stone-800">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800">
            {commissions.map((req) => (
              <tr key={req.id} className="hover:bg-stone-800/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-white font-medium text-base">{req.name}</p>
                  <a href={`mailto:${req.email}`} className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
                    {req.email}
                  </a>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <p className="text-white font-medium mb-1">Size: {req.requestedSize || 'Not specified'}</p>
                  <p className="text-xs line-clamp-2">{req.details}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    req.status === 'PENDING' ? 'bg-yellow-900/50 text-yellow-500' :
                    req.status === 'ACCEPTED' ? 'bg-green-900/50 text-green-500' :
                    'bg-red-900/50 text-red-500'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {new Date(req.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  {/* These buttons will be wired up to Server Actions in the next step */}
                  <button className="text-green-400 hover:text-green-300 transition-colors uppercase tracking-widest text-xs font-semibold">
                    Accept
                  </button>
                  <button className="text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest text-xs font-semibold">
                    Decline
                  </button>
                </td>
              </tr>
            ))}
            
            {commissions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                  No commission requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}