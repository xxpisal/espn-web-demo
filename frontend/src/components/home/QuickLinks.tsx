import Link from 'next/link';

const QUICK_LINKS = [
  { label: 'Scores', href: '/nfl/scores', icon: '🏆' },
  { label: 'Fantasy', href: '/fantasy', icon: '⚡' },
  { label: 'NFL Draft', href: '/nfl', icon: '🏈' },
  { label: 'Watch ESPN', href: '#', icon: '📺' },
  { label: 'MLB Playoffs', href: '/mlb', icon: '⚾' },
  { label: 'NBA Preview', href: '/nba', icon: '🏀' },
];

export function QuickLinks() {
  return (
    <div className="flex items-center gap-0 border-b border-espn-gray-border overflow-x-auto scrollbar-hide mt-2">
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
