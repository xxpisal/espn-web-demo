import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { EspnLogo } from '@/components/common/EspnLogo';

export default function NotFound() {
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
          <div className="text-7xl font-black text-espn-red mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
            404
          </div>
          <h2 className="text-xl font-black text-espn-text">Page Not Found</h2>
          <p className="text-sm text-espn-text-muted mt-2 leading-relaxed">
            The page or sport you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 keep-white"
            style={{ background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)' }}
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/sports"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-espn-text hover:bg-espn-sub transition-all duration-200 border border-espn-gray-border"
          >
            <ArrowLeft className="w-4 h-4" /> Browse Sports
          </Link>
        </div>
      </div>
    </div>
  );
}
