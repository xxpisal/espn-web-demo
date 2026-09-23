'use client';
import Link from 'next/link';
import { EspnLogo } from '@/components/common/EspnLogo';
import { RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div
        className="max-w-md w-full rounded-2xl p-10 text-center space-y-5 animate-fade-in"
        style={{
          background: 'var(--espn-card)',
          border: '1px solid var(--espn-border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <EspnLogo className="h-10 w-auto mx-auto opacity-80" />

        <div>
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-black text-espn-text">Something went wrong</h2>
          <p className="text-sm text-espn-text-muted mt-2 leading-relaxed">
            {error?.message || 'An unexpected error occurred while loading this page.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 keep-white"
            style={{ background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)' }}
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-espn-text hover:bg-espn-sub transition-all duration-200 border border-espn-gray-border"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
