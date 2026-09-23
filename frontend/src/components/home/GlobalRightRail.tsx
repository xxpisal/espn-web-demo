'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Podcast, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { useTopHeadlines, useStandings } from '@/lib/hooks';
import { SPORT_BADGE_COLORS } from '@/lib/constants';

interface StandingRow {
  rank: number;
  team: string;
  abbr: string;
  wins: number;
  losses: number;
  pts?: number;
}

const STANDINGS_SPORTS = [
  { id: 'football', label: 'Football' },
  { id: 'f1', label: 'F1' },
  { id: 'nba', label: 'NBA' },
  { id: 'tennis', label: 'Tennis' },
] as const;

const MOCK_STANDINGS: Record<string, StandingRow[]> = {
  football: [
    { rank: 1, team: 'Liverpool', abbr: 'LIV', wins: 20, losses: 3, pts: 63 },
    { rank: 2, team: 'Arsenal', abbr: 'ARS', wins: 18, losses: 4, pts: 58 },
    { rank: 3, team: 'Manchester City', abbr: 'MCI', wins: 17, losses: 5, pts: 55 },
    { rank: 4, team: 'Chelsea', abbr: 'CHE', wins: 15, losses: 6, pts: 49 },
    { rank: 5, team: 'Real Madrid', abbr: 'RMA', wins: 19, losses: 2, pts: 60 },
  ],
  f1: [
    { rank: 1, team: 'Max Verstappen', abbr: 'RBR', wins: 9, losses: 0, pts: 395 },
    { rank: 2, team: 'Lando Norris', abbr: 'MCL', wins: 5, losses: 0, pts: 331 },
    { rank: 3, team: 'Charles Leclerc', abbr: 'FER', wins: 4, losses: 0, pts: 307 },
    { rank: 4, team: 'Lewis Hamilton', abbr: 'MER', wins: 2, losses: 0, pts: 190 },
  ],
  nba: [
    { rank: 1, team: 'Boston Celtics', abbr: 'BOS', wins: 32, losses: 9, pts: 73 },
    { rank: 2, team: 'Cleveland Cavaliers', abbr: 'CLE', wins: 33, losses: 8, pts: 74 },
    { rank: 3, team: 'OKC Thunder', abbr: 'OKC', wins: 30, losses: 11, pts: 71 },
    { rank: 4, team: 'LA Lakers', abbr: 'LAL', wins: 24, losses: 18, pts: 66 },
  ],
  tennis: [
    { rank: 1, team: 'Jannik Sinner', abbr: 'ITA', wins: 55, losses: 6, pts: 11830 },
    { rank: 2, team: 'Carlos Alcaraz', abbr: 'ESP', wins: 51, losses: 9, pts: 7010 },
    { rank: 3, team: 'Alexander Zverev', abbr: 'GER', wins: 47, losses: 14, pts: 7995 },
    { rank: 4, team: 'Novak Djokovic', abbr: 'SRB', wins: 40, losses: 9, pts: 6210 },
  ],
};

const DEFAULT_TOP_HEADLINES = [
  { id: '1', title: 'Asian Games 2026: Complete medal tally & highlights', sport: 'Olympics' },
  { id: '2', title: "Carrick: Man United players 'determined' despite mounting pressure", sport: 'Football' },
  { id: '3', title: 'Stafford slings 4 TDs in Rams dominant MNF win over Giants', sport: 'NFL' },
  { id: '4', title: 'Mac Allister on Liverpool future: Full focus on title push', sport: 'Football' },
  { id: '5', title: 'Verstappen expects tight battle at Singapore night race', sport: 'F1' },
  { id: '6', title: 'Infantino open to FIFA governance reviews following European backlash', sport: 'Football' },
  { id: '7', title: 'Mbappé: Real Madrid ready for crucial Champions League test', sport: 'Football' },
  { id: '8', title: 'Nicolas Batum, 18-year NBA veteran, announces retirement', sport: 'NBA' },
  { id: '9', title: 'Novak Djokovic confirms participation in upcoming Masters 1000', sport: 'Tennis' },
  { id: '10', title: 'Champions League Matchday 2: What you need to know', sport: 'Football' },
];

export function GlobalRightRail() {
  const [activeSport, setActiveSport] = useState<string>('football');

  const { data: headlinesData } = useTopHeadlines(10);
  const { data: standingsData } = useStandings(activeSport);

  const headlines = useMemo(() => {
    if (Array.isArray(headlinesData) && headlinesData.length > 0) {
      return headlinesData.map((h: any, idx: number) => ({
        id: String(h.id ?? idx + 1),
        title: h.headline ?? h.title ?? '',
        sport: h.sport ?? 'Sports',
      }));
    }
    return DEFAULT_TOP_HEADLINES;
  }, [headlinesData]);

  const currentStandings: StandingRow[] = useMemo(() => {
    return (
      (standingsData as any)?.standings ??
      MOCK_STANDINGS[activeSport] ??
      MOCK_STANDINGS.football
    );
  }, [standingsData, activeSport]);

  return (
    <aside className="w-[300px] shrink-0 space-y-4 text-xs font-sans">
      {/* Top Headlines */}
      <div className="rounded-xl overflow-hidden shadow-card bg-espn-dark border border-espn-gray-border">
        <div className="px-4 py-3 flex items-center justify-between bg-espn-gray border-b border-espn-gray-border">
          <h3 className="text-espn-text font-black text-sm uppercase tracking-wider flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-espn-red" />
            Top Headlines
          </h3>
          <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold uppercase">
            <span className="live-dot" />
            Live
          </span>
        </div>

        <ol className="divide-y divide-espn-gray-border">
          {headlines.slice(0, 10).map((story, idx) => {
            const badgeColor = SPORT_BADGE_COLORS[story.sport] ?? '#555';
            return (
              <li key={story.id || idx}>
                <Link
                  href="/football"
                  className="flex items-start gap-3 px-4 py-3 group transition-colors hover:bg-black/5 dark:hover:bg-white/3"
                >
                  <span
                    className={`text-base font-black shrink-0 w-5 text-center mt-0.5 tabular-nums ${
                      idx < 3 ? 'text-espn-red' : 'text-espn-text-muted'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span
                      className="keep-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded text-white inline-block mb-1"
                      style={{ backgroundColor: badgeColor }}
                    >
                      {story.sport}
                    </span>
                    <p className="text-[12.5px] font-semibold text-espn-text group-hover:text-espn-red transition-colors leading-snug line-clamp-2">
                      {story.title}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 30 for 30 Podcasts */}
      <div className="rounded-xl overflow-hidden shadow-card bg-espn-dark border border-espn-gray-border">
        <div className="px-4 py-3 flex items-center gap-2.5 bg-espn-gray border-b border-espn-gray-border">
          <div className="p-1.5 rounded-lg bg-espn-red/15">
            <Podcast className="w-3.5 h-3.5 text-espn-red" />
          </div>
          <h3 className="text-espn-text font-black text-xs uppercase tracking-wider">30 for 30 Podcasts</h3>
        </div>
        <div className="relative h-40 w-full bg-espn-darker overflow-hidden">
          <Image
            src="https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0716%2Fr1690018_1296x729_16%2D9.jpg&w=640&h=360&scale=crop&cquality=80"
            alt="30 for 30"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <span className="absolute bottom-3 left-4 espn-badge keep-white">Audio Feature</span>
        </div>
        <div className="p-4 space-y-2">
          <h4 className="text-[13px] font-bold text-espn-text hover:text-espn-red transition-colors leading-snug cursor-pointer">
            The Betrayal of Shohei Ohtani
          </h4>
          <p className="text-[11.5px] text-espn-text-muted leading-relaxed">
            How Shohei Ohtani&apos;s relationship with his interpreter unraveled amid an international sports betting probe.
          </p>
          <a
            href="https://www.espn.com/podcasts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-espn-red hover:underline pt-1"
          >
            Listen now <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Fantasy Sign-up */}
      <div className="rounded-xl p-4 text-white shadow-card relative overflow-hidden bg-gradient-to-br from-[#1a2540] to-[#0d1520] border border-[#2d3a54] dark-card keep-white">
        <div className="flex items-center gap-2 mb-2.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
            ESPN Fantasy 2026
          </span>
        </div>
        <h4 className="text-[15px] font-black leading-snug mb-2">
          Play the #1 Fantasy game — for free!
        </h4>
        <p className="text-[11.5px] text-blue-200/70 mb-4 leading-relaxed">
          Create customized leagues, draft live with friends, and enjoy real-time stat tracking.
        </p>
        <div className="space-y-2">
          <Link
            href="/fantasy"
            className="block w-full text-center py-2.5 rounded-lg font-black text-xs text-white transition-all duration-200 hover:opacity-90 bg-red-gradient"
          >
            Create A League
          </Link>
          <Link
            href="/fantasy"
            className="block w-full text-center py-2.5 rounded-lg font-bold text-xs text-gray-200 hover:text-white transition-all duration-200 bg-white/10 border border-white/20"
          >
            Join Public League
          </Link>
        </div>
      </div>

      {/* Standings Widget */}
      <div className="rounded-xl overflow-hidden shadow-card bg-espn-dark border border-espn-gray-border">
        <div className="flex items-center justify-between px-4 py-3 bg-espn-gray border-b border-espn-gray-border">
          <h3 className="text-espn-text font-black text-xs uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-espn-red" />
            Standings
          </h3>
          <Link href={`/${activeSport}`} className="text-espn-red text-[11px] font-bold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Sport Tabs */}
        <div className="flex bg-espn-darker border-b border-espn-gray-border">
          {STANDINGS_SPORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSport(s.id)}
              className={`flex-1 py-2 text-[11px] font-bold transition-all duration-200 ${
                activeSport === s.id
                  ? 'text-espn-text border-b-2 border-espn-red'
                  : 'text-espn-text-muted hover:text-espn-text'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-1 px-4 py-2 text-[9px] text-espn-text-muted uppercase font-bold tracking-widest bg-espn-darker">
          <span>Team / Athlete</span>
          <span className="w-7 text-center">W</span>
          <span className="w-7 text-center">L</span>
          <span className="w-10 text-center">PTS</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-espn-gray-border">
          {currentStandings.slice(0, 5).map((entry, i) => (
            <div
              key={entry.team || i}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-1 px-4 py-2.5 items-center transition-colors hover:bg-black/5 dark:hover:bg-white/3 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`text-[10px] font-black w-4 text-center shrink-0 tabular-nums ${
                    i === 0 ? 'text-amber-400' : 'text-espn-text-muted'
                  }`}
                >
                  {entry.rank || i + 1}
                </span>
                <span className="font-semibold text-[12.5px] text-espn-text truncate">{entry.team}</span>
              </div>
              <span className="w-7 text-center text-[12px] font-bold text-green-400 tabular-nums">{entry.wins}</span>
              <span className="w-7 text-center text-[12px] font-medium text-espn-text-muted tabular-nums">{entry.losses}</span>
              <span className="w-10 text-center text-[12px] font-black text-espn-text tabular-nums">
                {entry.pts ?? entry.wins * 2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
