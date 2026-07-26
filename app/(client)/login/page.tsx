"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Tab = "orders" | "addresses" | "settings";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login"); // Kick unauthorized users back to login
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    getUser();
  }, [router, supabase.auth]);

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
          <button 
            onClick={() => setActiveTab("orders")}
            className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeTab === "orders" ? "text-[#C5A059]" : "text-[#121110]/60 hover:text-[#0B2545]"}`}
          >
            Order History
          </button>
          <button 
            onClick={() => setActiveTab("addresses")}
            className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeTab === "addresses" ? "text-[#C5A059]" : "text-[#121110]/60 hover:text-[#0B2545]"}`}
          >
            Saved Addresses
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`text-left text-xs uppercase tracking-[0.2em] font-bold transition-colors ${activeTab === "settings" ? "text-[#C5A059]" : "text-[#121110]/60 hover:text-[#0B2545]"}`}
          >
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
                You haven't acquired any original pieces or fine art prints from the studio yet.
              </p>
              <Link 
                href="/"
                className="bg-[#0B2545] text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm"
              >
                Explore Gallery
              </Link>
            </div>
          )}

          {/* TAB: Addresses */}
          {activeTab === "addresses" && (
            <div>
              <h3 className="font-serif text-2xl text-[#121110] mb-6">Shipping Addresses</h3>
              <div className="border border-dashed border-[#C5A059]/40 bg-[#FBF9F5] p-8 text-center rounded-sm">
                <p className="text-sm font-light text-[#121110]/60 mb-4">No addresses saved.</p>
                <button className="text-xs uppercase tracking-[0.15em] font-bold text-[#C5A059] hover:text-[#0B2545] transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {/* TAB: Settings */}
          {activeTab === "settings" && (
            <div>
              <h3 className="font-serif text-2xl text-[#121110] mb-6">Account Details</h3>
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#121110]/50">Email Address</label>
                  <input 
                    type="text" 
                    disabled 
                    value={user?.email || ""} 
                    className="w-full bg-[#121110]/5 border-none p-3 text-sm text-[#121110]/70 cursor-not-allowed rounded-sm"
                  />
                  <p className="text-[10px] text-[#121110]/40">Email cannot be changed directly.</p>
                </div>
                <button className="text-xs uppercase tracking-[0.15em] font-bold text-red-900/70 hover:text-red-900 transition-colors pt-4">
                  Reset Password
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}