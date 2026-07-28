"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveAddress, getUserAddresses } from "@/app/actions/address";

type Tab = "orders" | "addresses" | "settings";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  
  // Address State
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        // Fetch addresses from Prisma via Server Action
        const userAddresses = await getUserAddresses(session.user.id);
        setAddresses(userAddresses);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [router, supabase.auth]);

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await saveAddress(formData, user.id);
    
    // Refresh the local state immediately
    const updatedAddresses = await getUserAddresses(user.id);
    setAddresses(updatedAddresses);
    setIsAddingAddress(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 border-b border-[#C5A059]/20 pb-6">
        <h1 className="font-serif text-4xl text-[#121110] mb-2">My Collection Room</h1>
        <p className="text-sm font-light text-[#121110]/60 uppercase tracking-widest">
          {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <button onClick={() => setActiveTab("orders")} className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeTab === "orders" ? "text-[#C5A059]" : "text-[#121110]/60 hover:text-[#0B2545]"}`}>
            Order History
          </button>
          <button onClick={() => setActiveTab("addresses")} className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeTab === "addresses" ? "text-[#C5A059]" : "text-[#121110]/60 hover:text-[#0B2545]"}`}>
            Saved Addresses
          </button>
          <button onClick={() => setActiveTab("settings")} className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeTab === "settings" ? "text-[#C5A059]" : "text-[#121110]/60 hover:text-[#0B2545]"}`}>
            Account Settings
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 min-h-[400px] bg-white border border-[#C5A059]/15 shadow-sm p-8 lg:p-12">
          
          {/* TAB: Orders */}
          {activeTab === "orders" && (
            <div className="flex flex-col items-center justify-center text-center h-full pt-10">
              <span className="text-5xl mb-6 text-[#C5A059]/30">⚱️</span>
              <h3 className="font-serif text-2xl text-[#121110] mb-3">No Recent Orders</h3>
              <p className="text-sm font-light text-[#121110]/60 mb-8 max-w-sm">
                You haven't acquired any pieces from the studio yet.
              </p>
              <Link href="/" className="bg-[#0B2545] text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm">
                Explore Gallery
              </Link>
            </div>
          )}

          {/* TAB: Addresses */}
          {activeTab === "addresses" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-[#121110]">Shipping Addresses</h3>
                {!isAddingAddress && (
                  <button onClick={() => setIsAddingAddress(true)} className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#C5A059] hover:text-[#0B2545] transition-colors">
                    + Add New
                  </button>
                )}
              </div>

              {isAddingAddress ? (
                <form onSubmit={handleAddressSubmit} className="space-y-4 border border-[#C5A059]/30 p-6 rounded-sm bg-[#FBF9F5]/30">
                  <input required name="fullName" placeholder="Full Name" className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545]" />
                  <input required name="street" placeholder="Street Address" className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545]" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="city" placeholder="City" className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545]" />
                    <input required name="state" placeholder="State" className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545]" />
                  </div>
                  <input required name="postalCode" placeholder="Postal / PIN Code" className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545]" />
                  
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="bg-[#0B2545] text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] transition-colors">
                      Save Address
                    </button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-[#121110]/50 hover:text-[#121110]">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border border-[#C5A059]/20 p-5 rounded-sm bg-[#FBF9F5]/50">
                      <p className="font-bold text-sm text-[#121110] mb-1">{addr.fullName}</p>
                      <p className="text-xs text-[#121110]/70 leading-relaxed">
                        {addr.street}<br/>
                        {addr.city}, {addr.state} {addr.postalCode}<br/>
                        {addr.country}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-[#C5A059]/40 bg-[#FBF9F5] p-8 text-center rounded-sm">
                  <p className="text-sm font-light text-[#121110]/60">No addresses saved.</p>
                </div>
              )}
            </div>
          )}

         {/* TAB: Settings */}
          {activeTab === "settings" && (
            <div>
              <h3 className="font-serif text-2xl text-[#121110] mb-6">Account Details</h3>
              <div className="space-y-8 max-w-md">
                
                {/* Email Display */}
                <div className="space-y-2 border-b border-[#C5A059]/20 pb-8">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#121110]/50">Email Address</label>
                  <input type="text" disabled value={user?.email || ""} className="w-full bg-[#121110]/5 border-none p-3 text-sm text-[#121110]/70 cursor-not-allowed rounded-sm" />
                </div>

                {/* Danger Zone */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-red-900/80 mb-4">Danger Zone</h4>
                  <div className="border border-red-900/20 bg-red-50/50 p-6 rounded-sm">
                    <p className="text-xs text-[#121110]/70 mb-4 leading-relaxed">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button 
                      onClick={async () => {
                        if(window.confirm("Are you absolutely sure you want to permanently delete your account and all associated data?")) {
                          await supabase.auth.signOut();
                          router.push("/");
                          router.refresh();
                        }
                      }}
                      className="bg-white border border-red-900/30 text-red-900 px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-sm hover:bg-red-900 hover:text-white transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}