"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center p-6 pb-32">
      <div className="w-full max-w-md bg-white border border-zinc-200 p-8 md:p-12 rounded-sm shadow-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-zinc-900 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-sm text-zinc-500 font-light">Access your gallery account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-zinc-300 py-2 bg-transparent text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400" 
              placeholder="you@example.com" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-zinc-300 py-2 bg-transparent text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400" 
              placeholder="••••••••" 
            />
          </div>

          {error && (
            <div className="text-red-700 text-sm bg-red-50 p-3 rounded-sm border border-red-200 text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-zinc-900 text-zinc-50 py-4 mt-4 uppercase tracking-widest text-sm font-semibold hover:bg-zinc-800 transition-colors disabled:opacity-50 rounded-sm"
          >
            {isLoading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            Don't have an account?{' '}
            <Link href="/signup" className="text-zinc-900 font-semibold hover:underline">
              Sign up here.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}