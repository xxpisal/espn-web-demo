'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User, ChevronDown, Sun, Moon, Star, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { EspnLogo } from '@/components/common/EspnLogo';

const PRIMARY_NAV = [
  { label: 'Football', href: '/football' },
  { label: 'NBA', href: '/nba' },
  { label: 'MLB', href: '/mlb' },
  { label: 'NFL', href: '/nfl' },
  { label: 'MMA', href: '/mma' },
  { label: 'F1', href: '/f1' },
  { label: 'Olympic Sports', href: '/sports' },
  { label: 'Fantasy', href: '/fantasy' },
];

const MORE_SPORTS = [
  { label: 'All Sports Directory (62)', href: '/sports' },
  { label: 'Golf', href: '/sports' },
  { label: 'Tennis', href: '/tennis' },
  { label: 'Cricket', href: '/sports' },
  { label: 'Rugby', href: '/sports' },
  { label: 'Boxing', href: '/boxing' },
  { label: 'Cycling', href: '/cycling' },
  { label: 'Swimming', href: '/swimming' },
  { label: 'Running', href: '/running' },
  { label: 'Racing', href: '/racing' },
  { label: 'Volleyball', href: '/volleyball' },
  { label: 'Chess', href: '/chess' },
  { label: 'WNBA', href: '/nba' },
  { label: 'NHL', href: '/sports' },
];

const QUICK_MOBILE_LINKS = [
  { label: 'Scores', href: '/football/scores', icon: Calendar },
  { label: 'Favourites', href: '/sports', icon: Star },
  { label: 'Premier League', href: '/football' },
  { label: 'Champions League', href: '/football' },
  { label: 'Formula 1', href: '/f1' },
  { label: 'Fantasy Hub', href: '/fantasy' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [moreSportsDropdown, setMoreSportsDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
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
    <header className="bg-[#111111] border-b border-[#2d2d2d] sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <nav className="px-2.5 sm:px-4 py-0 max-w-full">
        <div className="flex items-center justify-between h-12 sm:h-13">
          {/* Left: ESPN Logo */}
          <div className="flex items-center">
            <Link href="/" className="mr-3 sm:mr-6 shrink-0 flex items-center py-1">
              <EspnLogo className="h-8 sm:h-9 md:h-11 w-auto hover:opacity-90 transition-opacity" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center overflow-x-auto scrollbar-hide">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-3.5 text-sm font-bold text-gray-200 hover:text-white hover:bg-[#222222] transition-colors whitespace-nowrap border-b-2 border-transparent hover:border-espn-red"
                >
                  {item.label}
                </Link>
              ))}

              {/* More Sports Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreSportsDropdown(!moreSportsDropdown)}
                  className="px-3 py-3.5 text-sm font-bold text-gray-200 hover:text-white hover:bg-[#222222] transition-colors flex items-center gap-1 border-b-2 border-transparent"
                >
                  <span>More Sports</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {moreSportsDropdown && (
                  <div
                    onMouseLeave={() => setMoreSportsDropdown(false)}
                    className="absolute left-0 top-full w-52 bg-[#1a1a1a] border border-[#333333] rounded-b shadow-2xl py-2 z-50"
                  >
                    {MORE_SPORTS.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={() => setMoreSportsDropdown(false)}
                        className="block px-4 py-1.5 text-xs text-gray-200 hover:text-white hover:bg-[#252525] transition-colors font-medium"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <Link
              href="/sports"
              className="hidden md:inline-flex items-center text-xs font-bold bg-[#252525] hover:bg-[#333333] text-gray-200 hover:text-white px-3 py-1.5 rounded mr-1 border border-[#383838] transition-colors"
            >
              All Sports (62)
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-gray-300 hover:text-white hover:bg-[#252525] rounded-full transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-400" />
              )}
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 sm:p-2 text-gray-300 hover:text-white hover:bg-[#252525] rounded-full transition-colors"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile / Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <span className="hidden xl:inline text-xs text-gray-300 font-medium">Hi, {user?.username}</span>
                <button
                  onClick={logout}
                  className="p-1.5 sm:p-2 text-gray-300 hover:text-white hover:bg-[#252525] rounded-full transition-colors"
                  title="Log Out"
                  aria-label="Log Out"
                >
                  <User className="w-4 h-4 text-espn-red" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="p-1.5 sm:p-2 text-gray-300 hover:text-white hover:bg-[#252525] rounded-full transition-colors"
                title="Log In"
                aria-label="Log In"
              >
                <User className="w-4 h-4" />
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-espn-red" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-3 pt-1">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search global football, F1, players, clubs, matches..."
                className="w-full bg-[#1e1e1e] border border-[#333333] rounded px-4 py-2 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-espn-red pr-16"
                autoFocus
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="submit"
                  className="p-1 text-gray-400 hover:text-white"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-gray-400 hover:text-white"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#2d2d2d] py-3 space-y-3 bg-[#111111] max-h-[80vh] overflow-y-auto overscroll-contain">
            {/* Theme & User Switcher */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#2d2d2d]">
              <span className="text-xs font-bold text-gray-300">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded bg-[#222222] border border-[#333333] text-white"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-400" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Links for Mobile */}
            <div>
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-espn-red tracking-wider">
                Quick Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-1.5 px-3 pt-1">
                {QUICK_MOBILE_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-1.5 px-2.5 py-2 bg-[#1b1b1b] border border-[#2b2b2b] rounded text-xs font-bold text-gray-200 hover:text-white"
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5 text-espn-red" />}
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Sports */}
            <div>
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-gray-400">
                Primary Sports
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-gray-200 hover:text-white hover:bg-[#222222] transition-colors rounded"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* More Sports Directory */}
            <div className="border-t border-[#2d2d2d] pt-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-gray-400">
                More Sports & Directories
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {MORE_SPORTS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-[#222222] transition-colors rounded"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Auth Links */}
            <div className="px-3 pt-3 border-t border-[#2d2d2d] flex items-center justify-between text-xs">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-300 font-medium">Signed in as <strong className="text-white">{user?.username}</strong></span>
                  <button onClick={logout} className="text-espn-red font-bold hover:underline py-1">
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2 bg-[#222222] text-gray-200 hover:text-white rounded font-bold border border-[#333333]"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2 bg-espn-red text-white hover:bg-red-700 rounded font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
