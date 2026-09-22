import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EspnLogo } from '@/components/common/EspnLogo';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-espn-dark border border-espn-gray-border p-8 rounded-md text-center space-y-4">
        <EspnLogo className="h-12 w-auto mx-auto" />
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-xl font-bold text-gray-200">Page Not Found</h2>
        <p className="text-sm text-espn-text-muted">
          The page or sport you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-espn-red text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-espn-red-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Home
          </Link>
          <Link
            href="/sports"
            className="inline-flex items-center justify-center bg-espn-gray border border-espn-gray-border text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-espn-gray-light transition-colors"
          >
            Browse All Sports
          </Link>
        </div>
      </div>
    </div>
  );
}
