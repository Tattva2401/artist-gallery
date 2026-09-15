import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/auth";

export default async function CommissionsAdminPage() {
  // Fetch all commissions, newest first
  const commissions = await prisma.commission.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Server Action to update the status of a specific request
  async function updateStatus(formData: FormData) {
    "use server";
    await verifyAdmin();
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    await prisma.commission.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/commissions");
  }

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-[#FBF9F5] mb-2">Commissions Inbox</h1>
        <p className="text-xs uppercase tracking-widest text-[#FBF9F5]/50">
          Manage custom artwork requests
        </p>
      </div>

      <div className="grid gap-6">
        {commissions.length === 0 ? (
          <p className="text-stone-500">No commission requests yet.</p>
        ) : (
          commissions.map((req) => (
            <div key={req.id} className="bg-[#121110] border border-[#C5A059]/30 p-6 rounded-sm flex flex-col md:flex-row gap-6 justify-between items-start">
              
              {/* Details Section */}
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl text-[#FBF9F5] font-serif">{req.name}</h3>
                  <a href={`mailto:${req.email}`} className="text-xs text-[#C5A059] hover:underline">
                    {req.email}
                  </a>
                </div>
                
                <div className="bg-stone-900/50 p-4 rounded-sm border border-stone-800 space-y-3">
                  {req.requestedSize && (
                    <p className="text-sm text-[#C5A059] font-medium border-b border-stone-800 pb-2">
                      Requested Size: {req.requestedSize}
                    </p>
                  )}
                  <p className="text-sm text-stone-300 whitespace-pre-wrap">{req.details}</p>
                </div>
                
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">
                  Received: {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Status Management Section */}
              <div className="bg-stone-900 p-4 rounded-sm border border-stone-800 w-full md:w-64 shrink-0">
                <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-3">Current Status</p>
                
                <form action={updateStatus} className="flex flex-col gap-3">
                  <input type="hidden" name="id" value={req.id} />
                  <select 
                    name="status" 
                    defaultValue={req.status}
                    className="bg-[#121110] border border-stone-700 text-[#FBF9F5] p-2 text-sm rounded-sm focus:outline-none focus:border-[#C5A059]"
                  >
                    {/* Options perfectly match your schema defaults */}
                    <option value="PENDING">Pending</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="DECLINED">Declined</option>
                  </select>
                  <button 
                    type="submit"
                    className="w-full bg-[#C5A059] text-[#121110] py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#FBF9F5] transition-colors"
                  >
                    Update Status
                  </button>
                </form>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}