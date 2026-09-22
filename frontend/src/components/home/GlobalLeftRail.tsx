'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Star, ChevronDown, ExternalLink } from 'lucide-react';

const QUICK_LINKS = [
  {
    name: 'Premier League',
    href: '/football',
    icon: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&w=40&h=40&transparent=true',
  },
  {
    name: 'Champions League',
    href: '/football',
    icon: 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2.png&w=40&h=40&transparent=true',
  },
  {
    name: 'Formula 1',
    href: '/f1',
    icon: 'https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-nascar.png&w=40&h=40&scale=crop',
  },
  {
    name: 'Latest Transfer News',
    href: '/football',
    icon: 'https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN%2Dicon%2Dsoccer.png&w=40&h=40&scale=crop',
  },
  {
    name: 'ESPN Cricinfo',
    href: 'https://www.espncricinfo.com/',
    external: true,
    icon: 'https://a4.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN%2Dicon%2Dcricinfo%2Dapp.png&w=40&h=40',
  },
  {
    name: '🏈 ESPN Fantasy: Sign up',
    href: '/fantasy',
  },
  {
    name: 'Toe Poke',
    href: '/football',
    icon: 'https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN%2Dicon%2Dsoccer.png&w=40&h=40&scale=crop',
  },
  {
    name: 'All Sports Directory (62)',
    href: '/sports',
  },
];

const ESPN_SITES = [
  { name: 'ESPN Deportes', href: 'https://espndeportes.espn.com' },
  { name: 'Andscape', href: 'https://andscape.com/' },
  { name: 'espnW', href: 'https://www.espn.com/espnw/' },
  { name: 'ESPNFC', href: 'https://www.espn.com/football/' },
  { name: 'X Games', href: 'https://xgames.espn.com' },
  { name: 'SEC Network', href: 'https://www.secsports.com' },
];

const EDITIONS = [
  'Africa',
  'Argentina',
  'Australia',
  'Brazil',
  'Chile',
  'Colombia',
  'Deportes',
  'India',
  'Mexico',
  'Philippines',
  'United Kingdom',
  'United States',
  'Venezuela',
];

const ESPN_APPS = [
  {
    name: 'ESPN App',
    desc: 'Scores & Live Streaming',
    href: 'https://www.espn.com/espn/apps/download?app=espn',
  },
  {
    name: 'ESPN Fantasy',
    desc: 'Football, Basketball & Baseball',
    href: '/fantasy',
  },
  {
    name: 'Tournament Challenge',
    desc: 'Brackets & Game Pickers',
    href: 'https://www.espn.com/espn/apps/download?app=tc',
  },
];

const SOCIAL_LINKS = [
  { name: 'WhatsApp', href: 'https://whatsapp.com' },
  { name: 'Facebook', href: 'https://facebook.com/espn' },
  { name: 'Instagram', href: 'https://instagram.com/espn' },
  { name: 'YouTube', href: 'https://youtube.com/espn' },
  { name: 'X / Twitter', href: 'https://twitter.com/espn' },
];

export function GlobalLeftRail() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [editionDropdown, setEditionDropdown] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState('Global Edition (EN)');

  return (
    <aside className="w-[210px] shrink-0 space-y-4 text-xs font-sans">
      {/* Quick Links */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs">
        <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider mb-2.5 pb-1 border-b border-espn-border">
          Quick Links
        </h3>
        <ul className="space-y-1.5">
          {QUICK_LINKS.map((link) => (
            <li key={link.name}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-1 text-espn-text hover:text-espn-red transition-colors group"
                >
                  {link.icon && (
                    <img
                      src={link.icon}
                      alt=""
                      className="w-4 h-4 object-contain rounded-full shrink-0"
                    />
                  )}
                  <span className="truncate group-hover:underline text-[12px]">
                    {link.name}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 shrink-0 ml-auto" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center gap-2 py-1 text-espn-text hover:text-espn-red transition-colors group"
                >
                  {link.icon && (
                    <img
                      src={link.icon}
                      alt=""
                      className="w-4 h-4 object-contain rounded-full shrink-0"
                    />
                  )}
                  <span className="truncate group-hover:underline text-[12px] font-medium">
                    {link.name}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Favourites */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-espn-border">
          <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span>Favourites</span>
          </h3>
        </div>
        <p className="text-[11px] text-espn-text-muted mb-2.5">
          Save your favourite teams, leagues and athletes for personalized updates.
        </p>
        <Link
          href="/sports"
          className="block w-full text-center py-1.5 bg-[#252525] hover:bg-[#333] text-gray-200 hover:text-white rounded text-[11px] font-bold border border-espn-border transition-colors"
        >
          Manage Favourites
        </Link>
      </div>

      {/* Customise ESPN (Account Section) */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs">
        <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider mb-2 pb-1 border-b border-espn-border">
          Customise ESPN
        </h3>
        {isAuthenticated ? (
          <div className="space-y-2">
            <p className="text-[12px] text-espn-text">
              Signed in as <span className="font-bold text-white">{user?.username}</span>
            </p>
            <button
              onClick={logout}
              className="w-full text-center py-1.5 bg-[#252525] hover:bg-red-700 text-white rounded text-[11px] font-bold transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Link
              href="/auth/register"
              className="block w-full text-center py-1.5 bg-espn-red hover:bg-red-700 text-white rounded text-[11px] font-bold transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/auth/login"
              className="block w-full text-center py-1.5 bg-[#252525] hover:bg-[#333] text-gray-200 hover:text-white rounded text-[11px] font-bold border border-espn-border transition-colors"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* ESPN Sites */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs">
        <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider mb-2 pb-1 border-b border-espn-border">
          ESPN Sites
        </h3>
        <ul className="space-y-1">
          {ESPN_SITES.map((site) => (
            <li key={site.name}>
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-espn-text hover:text-espn-red py-0.5 text-[11.5px] transition-colors"
              >
                <span>{site.name}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Editions Dropdown */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs relative">
        <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider mb-2 pb-1 border-b border-espn-border">
          Editions
        </h3>
        <button
          onClick={() => setEditionDropdown(!editionDropdown)}
          className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#1f1f1f] border border-espn-border rounded text-[11px] text-gray-200 hover:text-white"
        >
          <span className="truncate">{selectedEdition}</span>
          <ChevronDown className="w-3 h-3 ml-1 shrink-0" />
        </button>
        {editionDropdown && (
          <div className="absolute left-3 right-3 top-full mt-1 bg-[#1a1a1a] border border-[#383838] rounded shadow-2xl py-1 z-50 max-h-48 overflow-y-auto">
            {EDITIONS.map((ed) => (
              <button
                key={ed}
                onClick={() => {
                  setSelectedEdition(ed);
                  setEditionDropdown(false);
                }}
                className="w-full text-left px-3 py-1 text-[11px] text-gray-200 hover:bg-[#282828] hover:text-white"
              >
                {ed}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ESPN Apps */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs">
        <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider mb-2 pb-1 border-b border-espn-border">
          ESPN Apps
        </h3>
        <ul className="space-y-2">
          {ESPN_APPS.map((app) => (
            <li key={app.name}>
              <a
                href={app.href}
                className="block group"
                target={app.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <div className="font-bold text-[12px] text-gray-200 group-hover:text-espn-red transition-colors">
                  {app.name}
                </div>
                <div className="text-[10px] text-espn-text-muted">
                  {app.desc}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Follow ESPN */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 shadow-xs">
        <h3 className="text-gray-400 uppercase text-[11px] font-bold tracking-wider mb-2 pb-1 border-b border-espn-border">
          Follow ESPN
        </h3>
        <ul className="space-y-1">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-espn-text hover:text-espn-red py-0.5 text-[11.5px] block transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
