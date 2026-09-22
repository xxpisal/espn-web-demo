'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const SPORTS_NAV = [
  { label: 'NFL', href: '/nfl' },
  { label: 'NBA', href: '/nba' },
  { label: 'MLB', href: '/mlb' },
  { label: 'NHL', href: '/nhl' },
  { label: 'Soccer', href: '/soccer' },
  { label: 'NCAAF', href: '/ncaaf' },
  { label: 'NCAAB', href: '/ncaab' },
  { label: 'F1', href: '/f1' },
  { label: 'Golf', href: '/golf' },
  { label: 'Tennis', href: '/tennis' },
  { label: 'MMA', href: '/mma' },
  { label: 'Fantasy', href: '/fantasy' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-espn-darker border-b border-espn-gray-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black py-1 px-4 text-xs text-espn-text-muted flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-espn-red font-bold text-lg tracking-wider">ESPN</Link>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-espn-text">Hi, {user?.username}</span>
              <button onClick={logout} className="hover:text-white transition-colors">Log Out</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="hover:text-white transition-colors">Log In</Link>
              <Link href="/auth/register" className="bg-espn-red text-white px-3 py-1 rounded text-xs font-bold hover:bg-espn-red-dark transition-colors">Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Nav */}
      <nav className="px-4 py-0">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="mr-6 shrink-0">
            <div className="bg-espn-red text-white font-black text-2xl px-3 py-2 tracking-tighter">
              ESPN
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center overflow-x-auto scrollbar-hide">
            {SPORTS_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-4 text-sm font-bold text-espn-text hover:text-white hover:bg-espn-gray transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-espn-red"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-espn-text hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile */}
            {isAuthenticated && (
              <button className="p-2 text-espn-text hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-espn-text hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for teams, players, news..."
                className="w-full bg-espn-gray border border-espn-gray-border rounded px-4 py-2 text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-espn-text-muted hover:text-white">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-espn-gray-border py-2">
            {SPORTS_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2 text-sm font-bold text-espn-text hover:text-white hover:bg-espn-gray transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
