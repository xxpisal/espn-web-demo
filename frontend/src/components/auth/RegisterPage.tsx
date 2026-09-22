'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, username, password);
      toast.success('Account created! Welcome to ESPN Clone.');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-espn-red text-white font-black text-4xl px-4 py-2 inline-block tracking-tighter mb-4">
            ESPN
          </div>
          <h1 className="text-white font-black text-2xl">Create Account</h1>
          <p className="text-espn-text-muted text-sm mt-2">Join millions of sports fans</p>
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
            <label className="text-espn-text text-sm font-bold block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              className="w-full bg-espn-gray border border-espn-gray-border rounded px-3 py-2 text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red"
              placeholder="coolsportsfan"
            />
          </div>
          <div>
            <label className="text-espn-text text-sm font-bold block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full bg-espn-gray border border-espn-gray-border rounded px-3 py-2 text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red"
              placeholder="At least 8 characters"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-espn-red text-white font-black py-3 rounded hover:bg-espn-red-dark transition-colors disabled:opacity-60"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-espn-text-muted text-sm mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-espn-red hover:underline font-bold">Log In</Link>
        </p>
      </div>
    </div>
  );
}
