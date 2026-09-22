'use client';
import Link from 'next/link';
import { EspnLogo } from '@/components/common/EspnLogo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-espn-dark border border-espn-gray-border p-8 rounded-md text-center space-y-4">
        <EspnLogo className="h-10 w-auto mx-auto" />
        <h2 className="text-2xl font-black text-white">Something went wrong</h2>
        <p className="text-xs text-espn-text-muted">
          {error?.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <div className="pt-4 flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-espn-red text-white px-5 py-2 rounded font-bold text-sm hover:bg-espn-red-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-espn-gray text-white px-5 py-2 rounded font-bold text-sm hover:bg-espn-gray-light transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
