import Link from 'next/link';

const QUICK_LINKS = [
  { label: 'Transfers', href: '/football', icon: '⚽' },
  { label: 'Fixtures & Scores', href: '/football/scores', icon: '📅' },
  { label: 'League Standings', href: '/football', icon: '⬆⬇' },
  { label: 'F1 Grand Prix Hub', href: '/f1', icon: '🏎️' },
  { label: 'Asian Games Medals', href: '/sports', icon: '🥇' },
  { label: 'All Sports (62)', href: '/sports', icon: '🏆' },
  { label: 'Fantasy Sports', href: '/fantasy', icon: '⚡' },
];

export function QuickLinks() {
  return (
    <div className="flex items-center gap-0 border-b border-espn-gray-border overflow-x-auto scrollbar-hide mt-2 bg-espn-dark/60 rounded-t-sm">
      {QUICK_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-espn-text hover:text-white hover:bg-espn-gray whitespace-nowrap border-r border-espn-gray-border transition-colors"
        >
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
