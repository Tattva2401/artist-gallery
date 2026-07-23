"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Create a browser-side Supabase client using those exact environment variables
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Attempt to log in with Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    } else {
      // If successful, the middleware will now let us through!
      router.push('/admin');
      router.refresh(); // Force the middleware to re-run and see our new secure cookie
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 p-8 md:p-12 rounded-sm shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-serif text-white tracking-tight mb-2">Studio Access</h1>
          <p className="text-sm text-stone-400 font-light uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-stone-700 py-2 bg-transparent text-white focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-700" 
              placeholder="kavita@studio.com" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-500">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-stone-700 py-2 bg-transparent text-white focus:outline-none focus:border-stone-400 transition-colors placeholder:text-stone-700" 
              placeholder="••••••••" 
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-950/50 p-3 rounded-sm border border-red-900/50 text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-stone-950 py-4 mt-4 uppercase tracking-widest text-sm font-semibold hover:bg-stone-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Enter Workspace'}
          </button>
        </form>
      </div>
    </div>
  );
}