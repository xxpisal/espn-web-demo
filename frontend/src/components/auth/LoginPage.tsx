'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { EspnLogo } from '@/components/common/EspnLogo';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <EspnLogo className="h-14 w-auto mx-auto mb-4" />
          <h1 className="text-white font-black text-2xl">Log In</h1>
          <p className="text-espn-text-muted text-sm mt-2">Access your ESPN account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-espn-dark border border-espn-gray-border rounded-sm p-6 space-y-4">
          <div>
            <label className="text-espn-text text-sm font-bold block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-espn-gray border border-espn-gray-border rounded px-3 py-2 text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-espn-text text-sm font-bold block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-espn-gray border border-espn-gray-border rounded px-3 py-2 text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-espn-red text-white font-black py-3 rounded hover:bg-espn-red-dark transition-colors disabled:opacity-60"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="text-center text-espn-text-muted text-sm mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-espn-red hover:underline font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
