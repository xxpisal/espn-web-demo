'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User, ChevronDown, Sun, Moon, Star, Calendar, LogOut } from 'lucide-react';
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
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'linear-gradient(180deg, #141414 0%, #111111 100%)',
        borderBottom: '1px solid #252525',
        boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
      }}
    >
      {/* Red accent line at very top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-espn-red to-transparent opacity-60" />

      {/* Main Navigation Bar */}
      <nav className="px-3 sm:px-5 py-0 max-w-full">
        <div className="flex items-center justify-between h-12 sm:h-[52px]">
          {/* Left: ESPN Logo */}
          <div className="flex items-center">
            <Link href="/" className="mr-3 sm:mr-7 shrink-0 flex items-center py-1 group">
              <EspnLogo className="h-8 sm:h-9 md:h-11 w-auto transition-opacity group-hover:opacity-85" />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center overflow-x-auto scrollbar-hide">
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-[15px] text-[13px] font-semibold text-gray-300 hover:text-white whitespace-nowrap transition-colors duration-150 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-espn-red scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}

              {/* More Sports Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreSportsDropdown(!moreSportsDropdown)}
                  className="relative px-3 py-[15px] text-[13px] font-semibold text-gray-300 hover:text-white transition-colors duration-150 flex items-center gap-1.5 group"
                >
                  <span>More Sports</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreSportsDropdown ? 'rotate-180 text-espn-red' : ''}`} />
                </button>

                {moreSportsDropdown && (
                  <div
                    onMouseLeave={() => setMoreSportsDropdown(false)}
                    className="absolute left-0 top-full w-56 rounded-b-lg shadow-2xl py-1.5 z-50 animate-fade-in"
                    style={{
                      background: '#161616',
                      border: '1px solid #2a2a2a',
                      borderTop: '2px solid #CC0000',
                    }}
                  >
                    {MORE_SPORTS.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={() => setMoreSportsDropdown(false)}
                        className="block px-4 py-2 text-[12.5px] font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
              className="hidden md:inline-flex items-center text-[11.5px] font-bold bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full mr-1 border border-white/10 transition-all duration-200"
            >
              All Sports (62)
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-400" />
              )}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 ml-0.5">
                <span className="hidden xl:inline text-xs text-gray-400 font-medium">
                  Hi, <span className="text-white font-semibold">{user?.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-espn-red rounded-full hover:bg-espn-red/10 transition-all duration-200"
                  title="Log Out"
                  aria-label="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 ml-0.5">
                <Link
                  href="/auth/login"
                  className="hidden sm:inline-flex text-[12px] font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/8 transition-all duration-200"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-[12px] font-bold text-white px-3.5 py-1.5 rounded-full transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)' }}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200 ml-0.5"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-espn-red" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {searchOpen && (
          <div className="pb-3 pt-1 animate-slide-up">
            <form onSubmit={handleSearch}>
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sports, players, clubs, matches..."
                  className="w-full rounded-lg px-4 py-2.5 pl-10 pr-16 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  style={{
                    background: '#1e1e1e',
                    border: '1px solid #333',
                    boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.3)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#CC0000'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#333'; }}
                  autoFocus
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button type="submit" className="p-1.5 text-gray-400 hover:text-white transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t py-3 space-y-3 max-h-[80vh] overflow-y-auto overscroll-contain animate-slide-up"
            style={{ borderColor: '#252525' }}
          >
            {/* Theme & User Switcher */}
            <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: '#252525' }}>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200"
                style={{ background: '#222', borderColor: '#333', color: '#ddd' }}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
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

            {/* Quick Links */}
            <div>
              <div className="px-3 py-1 text-[10px] font-black uppercase text-espn-red tracking-widest">
                Quick Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-1.5 px-3 pt-1">
                {QUICK_MOBILE_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-gray-200 hover:text-white transition-colors"
                    style={{ background: '#1e1e1e', border: '1px solid #2a2a2a' }}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5 text-espn-red shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary Sports */}
            <div>
              <div className="px-3 py-1 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                Primary Sports
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* More Sports */}
            <div className="border-t pt-2" style={{ borderColor: '#252525' }}>
              <div className="px-3 py-1 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                More Sports & Directories
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {MORE_SPORTS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Auth Links */}
            <div className="px-3 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: '#252525' }}>
              {isAuthenticated ? (
                <>
                  <span className="text-gray-400 font-medium">
                    Signed in as <strong className="text-white">{user?.username}</strong>
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 text-espn-red font-bold hover:underline py-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-lg font-bold border text-gray-200 hover:text-white transition-colors"
                    style={{ background: '#222', borderColor: '#333' }}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-lg font-bold text-white transition-colors"
                    style={{ background: 'linear-gradient(135deg, #CC0000 0%, #990000 100%)' }}
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
