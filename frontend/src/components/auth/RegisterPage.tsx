'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { EspnLogo } from '@/components/common/EspnLogo';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const inputClass = "w-full py-3 rounded-xl text-sm text-espn-text placeholder-espn-text-muted bg-espn-sub border border-espn-gray-border transition-all duration-200 focus:outline-none";
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#CC0000';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204,0,0,0.12)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.boxShadow = 'none';
  };

  const perks = ['Free access to scores & highlights', 'Personalized sports feed', 'Fantasy sports leagues'];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(204,0,0,0.12) 0%, transparent 60%), var(--espn-bg)',
      }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #CC0000 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #CC0000 0%, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-md relative animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <EspnLogo className="h-14 w-auto mx-auto mb-6" />
          <h1 className="text-espn-text font-black text-2xl sm:text-3xl mb-1">Join ESPN</h1>
          <p className="text-espn-text-muted text-sm">Create your free account in seconds</p>
        </div>

        {/* Perks */}
        <div className="flex flex-col gap-1.5 mb-6 px-2">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-2.5 text-[12.5px] text-espn-text-muted">
              <CheckCircle className="w-3.5 h-3.5 text-espn-red shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-6 sm:p-8 space-y-5 bg-espn-dark border border-espn-gray-border"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-espn-text mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espn-text-muted pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className={`${inputClass} pl-10 pr-4`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-[13px] font-semibold text-espn-text mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espn-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  placeholder="coolsportsfan"
                  className={`${inputClass} pl-10 pr-4`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-semibold text-espn-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espn-text-muted pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className={`${inputClass} pl-10 pr-12`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espn-text-muted hover:text-espn-text transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password.length > 0 && password.length < 8 && (
                <p className="text-[11px] text-amber-400 mt-1.5 flex items-center gap-1">
                  ⚠ Password must be at least 8 characters
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-black text-sm text-white transition-all duration-200 disabled:opacity-60 mt-2 hover:opacity-95"
              style={{
                background: isLoading ? '#881111' : 'linear-gradient(135deg, #CC0000 0%, #990000 100%)',
                boxShadow: '0 4px 20px rgba(204, 0, 0, 0.35)',
              }}
              onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.boxShadow = '0 6px 28px rgba(204,0,0,0.5)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(204,0,0,0.35)'; }}
            >
              {isLoading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          <div className="relative flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-espn-gray-border" />
            <span className="text-[11px] text-espn-text-muted font-medium">Already a member?</span>
            <div className="flex-1 h-px bg-espn-gray-border" />
          </div>

          <Link
            href="/auth/login"
            className="block w-full text-center py-3 rounded-xl text-sm font-bold text-espn-text hover:text-white hover:bg-espn-red transition-all duration-200 border border-espn-gray-border"
          >
            Sign In
          </Link>
        </div>

        <p className="text-center text-espn-text-muted text-xs mt-6 leading-relaxed">
          By creating an account, you agree to ESPN&apos;s{' '}
          <span className="text-espn-red cursor-pointer hover:underline">Terms of Service</span>{' '}
          and{' '}
          <span className="text-espn-red cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
