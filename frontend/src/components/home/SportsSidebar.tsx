'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sportsApi, newsApi } from '@/lib/api';
import Link from 'next/link';

const SPORTS_STANDINGS = [
  { id: 'nfl', label: 'NFL', league: 'nfl' },
  { id: 'nba', label: 'NBA', league: 'nba' },
  { id: 'mlb', label: 'MLB', league: 'mlb' },
  { id: 'nhl', label: 'NHL', league: 'nhl' },
];

const MOCK_STANDINGS = [
  { rank: 1, team: 'Kansas City Chiefs', abbr: 'KC', wins: 10, losses: 2 },
  { rank: 2, team: 'Miami Dolphins', abbr: 'MIA', wins: 9, losses: 3 },
  { rank: 3, team: 'Baltimore Ravens', abbr: 'BAL', wins: 8, losses: 4 },
  { rank: 4, team: 'Dallas Cowboys', abbr: 'DAL', wins: 7, losses: 5 },
  { rank: 5, team: 'Philadelphia Eagles', abbr: 'PHI', wins: 7, losses: 5 },
];

export function SportsSidebar() {
  const [activeSport, setActiveSport] = useState('nfl');

  const { data: standings } = useQuery({
    queryKey: ['standings', activeSport],
    queryFn: () => sportsApi.getStandings('football', activeSport).then(r => r.data),
    retry: false,
  });

  const { data: sidebarNews } = useQuery({
    queryKey: ['sidebar-news'],
    queryFn: () => newsApi.getTopHeadlines(5).then(r => r.data),
    retry: false,
  });

  const displayStandings = standings?.standings || MOCK_STANDINGS;

  return (
    <div className="space-y-6">
      {/* Standings Widget */}
      <div className="bg-espn-dark border border-espn-gray-border rounded-sm">
        <div className="flex items-center justify-between p-3 border-b border-espn-gray-border">
          <h3 className="text-white font-black text-sm uppercase">Standings</h3>
          <Link href={`/${activeSport}`} className="text-espn-red text-xs hover:underline">Full Standings</Link>
        </div>
        {/* Sport Tabs */}
        <div className="flex border-b border-espn-gray-border">
          {SPORTS_STANDINGS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSport(s.id)}
              className={`flex-1 py-1.5 text-xs font-bold transition-colors ${
                activeSport === s.id
                  ? 'text-white border-b-2 border-espn-red bg-espn-gray'
                  : 'text-espn-text-muted hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-1 px-3 py-1.5 text-[9px] text-espn-text-muted uppercase font-bold">
          <span>Team</span>
          <span className="w-6 text-center">W</span>
          <span className="w-6 text-center">L</span>
          <span className="w-8 text-center">PCT</span>
        </div>
        {/* Rows */}
        {displayStandings.slice(0, 5).map((entry: any, i: number) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-1 px-3 py-1.5 border-t border-espn-gray-border hover:bg-espn-gray transition-colors">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-espn-text-muted w-3">{i + 1}</span>
              <span className="text-xs text-espn-text truncate">{entry.abbr || entry.team?.slice(0, 10)}</span>
            </div>
            <span className="text-xs text-white w-6 text-center">{entry.wins}</span>
            <span className="text-xs text-white w-6 text-center">{entry.losses}</span>
            <span className="text-xs text-espn-text-muted w-8 text-center">{entry.pct ? entry.pct.toFixed(3) : ((entry.wins / (entry.wins + entry.losses)) || 0).toFixed(3)}</span>
          </div>
        ))}
      </div>

      {/* Top News Widget */}
      <div className="bg-espn-dark border border-espn-gray-border rounded-sm">
        <div className="p-3 border-b border-espn-gray-border">
          <h3 className="text-white font-black text-sm uppercase">Top Stories</h3>
        </div>
        <div className="divide-y divide-espn-gray-border">
          {(Array.isArray(sidebarNews) ? sidebarNews.slice(0, 5) : []).map((article: any, i: number) => (
            <div key={i} className="p-3 hover:bg-espn-gray transition-colors cursor-pointer">
              <span className="text-espn-red text-[9px] font-bold uppercase">{article.sport}</span>
              <p className="text-xs text-espn-text mt-0.5 line-clamp-2 hover:text-white transition-colors">
                {article.headline}
              </p>
            </div>
          ))}
          {(!sidebarNews || !Array.isArray(sidebarNews) || sidebarNews.length === 0) && [
            'Chiefs secure playoff spot with last-second field goal',
            'LeBron passes scoring milestone in Lakers win',
            'Yankees bolster roster with late-season trade',
            'NHL: Oilers dominate Western Conference standings',
            'Soccer: USMNT qualifies for World Cup',
          ].map((headline, i) => (
            <div key={i} className="p-3 hover:bg-espn-gray transition-colors cursor-pointer">
              <p className="text-xs text-espn-text hover:text-white transition-colors">{headline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
