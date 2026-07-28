"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/account");
      } else {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  // Prevent UI flash while checking session
  if (checkingSession) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-[#C5A059]/20 shadow-sm p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#121110] mb-2">Welcome Back</h1>
          <p className="text-xs uppercase tracking-widest text-[#121110]/60">Access your collection</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-900/80 p-3 text-xs text-center rounded-sm">
              {error}
            </div>
          )}
          
          <div>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" 
              className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545] transition-colors" 
            />
          </div>
          <div>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className="w-full p-3 text-sm border-b border-[#C5A059]/20 bg-transparent focus:outline-none focus:border-[#0B2545] transition-colors" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0B2545] text-white px-6 py-4 text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-[#C5A059] transition-colors duration-300 shadow-sm mt-4 disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Log In"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#C5A059]/15 pt-6">
          <p className="text-[10px] uppercase tracking-widest text-[#121110]/60">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#C5A059] font-bold hover:text-[#0B2545] transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}