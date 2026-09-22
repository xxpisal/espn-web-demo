'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sportsApi, newsApi } from '@/lib/api';
import Link from 'next/link';

const SPORTS_STANDINGS = [
  { id: 'football', label: 'Football', league: 'epl' },
  { id: 'f1', label: 'F1', league: 'f1' },
  { id: 'nba', label: 'NBA', league: 'nba' },
  { id: 'tennis', label: 'Tennis', league: 'atp' },
];

const MOCK_STANDINGS: Record<string, Array<{ rank: number; team: string; abbr: string; wins: number; losses: number }>> = {
  football: [
    { rank: 1, team: 'Liverpool', abbr: 'LIV', wins: 20, losses: 3 },
    { rank: 2, team: 'Arsenal', abbr: 'ARS', wins: 18, losses: 4 },
    { rank: 3, team: 'Manchester City', abbr: 'MCI', wins: 17, losses: 5 },
    { rank: 4, team: 'Chelsea', abbr: 'CHE', wins: 15, losses: 6 },
    { rank: 5, team: 'Real Madrid', abbr: 'RMA', wins: 19, losses: 2 },
  ],
  f1: [
    { rank: 1, team: 'Max Verstappen', abbr: 'RBR', wins: 9, losses: 0 },
    { rank: 2, team: 'Lando Norris', abbr: 'MCL', wins: 5, losses: 0 },
    { rank: 3, team: 'Charles Leclerc', abbr: 'FER', wins: 4, losses: 0 },
    { rank: 4, team: 'Lewis Hamilton', abbr: 'MER', wins: 2, losses: 0 },
  ],
  nba: [
    { rank: 1, team: 'Boston Celtics', abbr: 'BOS', wins: 28, losses: 8 },
    { rank: 2, team: 'Cleveland Cavaliers', abbr: 'CLE', wins: 29, losses: 7 },
    { rank: 3, team: 'OKC Thunder', abbr: 'OKC', wins: 27, losses: 9 },
    { rank: 4, team: 'LA Lakers', abbr: 'LAL', wins: 22, losses: 15 },
  ],
  tennis: [
    { rank: 1, team: 'Jannik Sinner', abbr: 'ITA', wins: 52, losses: 6 },
    { rank: 2, team: 'Carlos Alcaraz', abbr: 'ESP', wins: 48, losses: 9 },
    { rank: 3, team: 'Alexander Zverev', abbr: 'GER', wins: 45, losses: 14 },
    { rank: 4, team: 'Novak Djokovic', abbr: 'SRB', wins: 39, losses: 8 },
  ],
};


export function SportsSidebar() {
  const [activeSport, setActiveSport] = useState('football');

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

  const displayStandings = standings?.standings || MOCK_STANDINGS[activeSport] || MOCK_STANDINGS.football;


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
