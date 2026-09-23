'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Star, ChevronDown, ExternalLink, Globe, Smartphone } from 'lucide-react';

interface QuickLinkItem {
  name: string;
  href: string;
  icon?: string;
  external?: boolean;
}

const QUICK_LINKS: QuickLinkItem[] = [
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
  { name: '🏈 ESPN Fantasy: Sign up', href: '/fantasy' },
  {
    name: 'Toe Poke',
    href: '/football',
    icon: 'https://a.espncdn.com/combiner/i?img=%2Fredesign%2Fassets%2Fimg%2Ficons%2FESPN%2Dicon%2Dsoccer.png&w=40&h=40&scale=crop',
  },
  { name: 'All Sports Directory (62)', href: '/sports' },
];

const ESPN_SITES = [
  { name: 'ESPN Deportes', href: 'https://espndeportes.espn.com' },
  { name: 'Andscape', href: 'https://andscape.com/' },
  { name: 'espnW', href: 'https://www.espn.com/espnw/' },
  { name: 'ESPNFC', href: 'https://www.espn.com/football/' },
  { name: 'X Games', href: 'https://xgames.espn.com' },
  { name: 'SEC Network', href: 'https://www.secsports.com' },
] as const;

const EDITIONS = [
  'Africa', 'Argentina', 'Australia', 'Brazil', 'Chile', 'Colombia',
  'Deportes', 'India', 'Mexico', 'Philippines', 'United Kingdom',
  'United States', 'Venezuela',
] as const;

const ESPN_APPS = [
  { name: 'ESPN App', desc: 'Scores & Live Streaming', href: 'https://www.espn.com/espn/apps/download?app=espn' },
  { name: 'ESPN Fantasy', desc: 'Football, Basketball & Baseball', href: '/fantasy' },
  { name: 'Tournament Challenge', desc: 'Brackets & Game Pickers', href: 'https://www.espn.com/espn/apps/download?app=tc' },
] as const;

const SOCIAL_LINKS = [
  { name: 'WhatsApp', href: 'https://whatsapp.com', color: '#25D366' },
  { name: 'Facebook', href: 'https://facebook.com/espn', color: '#1877F2' },
  { name: 'Instagram', href: 'https://instagram.com/espn', color: '#E4405F' },
  { name: 'YouTube', href: 'https://youtube.com/espn', color: '#FF0000' },
  { name: 'X / Twitter', href: 'https://twitter.com/espn', color: '#888888' },
] as const;

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-espn-gray-border">
      {icon}
      <h3 className="text-[10px] font-black uppercase tracking-widest text-espn-text-muted">{title}</h3>
    </div>
  );
}

export function GlobalLeftRail() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [editionDropdown, setEditionDropdown] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState('Global Edition (EN)');

  return (
    <aside className="w-[210px] shrink-0 space-y-3 text-xs font-sans">
      {/* Quick Links */}
      <div className="rounded-xl p-3.5 shadow-card bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="Quick Links" />
        <ul className="space-y-0.5">
          {QUICK_LINKS.map((link) => (
            <li key={link.name}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 py-1.5 text-espn-text hover:text-espn-red transition-colors group rounded-lg px-1.5 -mx-1.5 hover:bg-black/5 dark:hover:bg-white/4"
                >
                  {link.icon && (
                    <img src={link.icon} alt="" className="w-4 h-4 object-contain rounded-full shrink-0 opacity-80 group-hover:opacity-100" />
                  )}
                  <span className="truncate text-[12px] font-medium">{link.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-40 shrink-0 ml-auto" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center gap-2.5 py-1.5 text-espn-text hover:text-espn-red transition-colors group rounded-lg px-1.5 -mx-1.5 hover:bg-black/5 dark:hover:bg-white/4"
                >
                  {link.icon && (
                    <img src={link.icon} alt="" className="w-4 h-4 object-contain rounded-full shrink-0 opacity-80 group-hover:opacity-100" />
                  )}
                  <span className="truncate text-[12px] font-medium">{link.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Favourites */}
      <div className="rounded-xl p-3.5 shadow-card bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="Favourites" icon={<Star className="w-3 h-3 text-amber-400 fill-amber-400" />} />
        <p className="text-[11px] text-espn-text-muted mb-3 leading-relaxed">
          Save your favourite teams, leagues and athletes for personalized updates.
        </p>
        <Link
          href="/sports"
          className="block w-full text-center py-2 rounded-lg text-[11px] font-bold text-espn-text hover:text-white hover:bg-espn-red transition-all duration-200 bg-espn-sub border border-espn-gray-border"
        >
          Manage Favourites
        </Link>
      </div>

      {/* Customise ESPN */}
      <div className="rounded-xl p-3.5 shadow-card bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="Customise ESPN" />
        {isAuthenticated ? (
          <div className="space-y-2.5">
            <p className="text-[12px] text-espn-text-muted">
              Signed in as <span className="font-bold text-espn-text">{user?.username}</span>
            </p>
            <button
              onClick={logout}
              className="w-full text-center py-2 rounded-lg text-[11px] font-bold text-white transition-all duration-200 hover:opacity-90 bg-espn-red"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              href="/auth/register"
              className="block w-full text-center py-2 rounded-lg text-[11px] font-bold text-white transition-all duration-200 hover:opacity-90 bg-red-gradient"
            >
              Create Account
            </Link>
            <Link
              href="/auth/login"
              className="block w-full text-center py-2 rounded-lg text-[11px] font-bold text-espn-text hover:text-white hover:bg-espn-red transition-all duration-200 bg-espn-sub border border-espn-gray-border"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* ESPN Sites */}
      <div className="rounded-xl p-3.5 shadow-card bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="ESPN Sites" icon={<Globe className="w-3 h-3 text-espn-text-muted" />} />
        <ul className="space-y-0.5">
          {ESPN_SITES.map((site) => (
            <li key={site.name}>
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-1 text-espn-text hover:text-espn-red text-[11.5px] transition-colors group rounded-lg px-1.5 -mx-1.5 hover:bg-black/5 dark:hover:bg-white/4"
              >
                <span>{site.name}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-30 group-hover:opacity-60" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Editions Dropdown */}
      <div className="rounded-xl p-3.5 shadow-card relative bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="Editions" />
        <button
          onClick={() => setEditionDropdown(!editionDropdown)}
          className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[11px] text-espn-text hover:text-espn-red transition-colors bg-espn-sub border border-espn-gray-border"
        >
          <span className="truncate">{selectedEdition}</span>
          <ChevronDown className={`w-3 h-3 ml-1 shrink-0 transition-transform duration-200 ${editionDropdown ? 'rotate-180' : ''}`} />
        </button>
        {editionDropdown && (
          <div className="absolute left-3 right-3 top-full mt-1 rounded-lg shadow-2xl py-1 z-50 max-h-48 overflow-y-auto animate-fade-in bg-espn-dark border border-espn-gray-border">
            {EDITIONS.map((ed) => (
              <button
                key={ed}
                onClick={() => { setSelectedEdition(ed); setEditionDropdown(false); }}
                className="w-full text-left px-3 py-1.5 text-[11px] text-espn-text hover:bg-espn-sub hover:text-espn-red transition-colors"
              >
                {ed}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ESPN Apps */}
      <div className="rounded-xl p-3.5 shadow-card bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="ESPN Apps" icon={<Smartphone className="w-3 h-3 text-espn-text-muted" />} />
        <ul className="space-y-2.5">
          {ESPN_APPS.map((app) => (
            <li key={app.name}>
              <a
                href={app.href}
                className="block group rounded-lg px-1.5 py-1 -mx-1.5 hover:bg-black/5 dark:hover:bg-white/4 transition-colors"
                target={app.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <div className="font-bold text-[12px] text-espn-text group-hover:text-espn-red transition-colors">
                  {app.name}
                </div>
                <div className="text-[10.5px] text-espn-text-muted mt-0.5">{app.desc}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Follow ESPN */}
      <div className="rounded-xl p-3.5 shadow-card bg-espn-dark border border-espn-gray-border">
        <SectionHeader title="Follow ESPN" />
        <ul className="space-y-1">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-1 text-espn-text hover:text-espn-red text-[11.5px] transition-colors group rounded-lg px-1.5 -mx-1.5 hover:bg-black/5 dark:hover:bg-white/4"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
