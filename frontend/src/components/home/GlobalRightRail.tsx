'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { newsApi, sportsApi } from '@/lib/api';
import { Trophy, Podcast, Shield, ArrowRight } from 'lucide-react';

const STANDINGS_SPORTS = [
  { id: 'football', label: 'Football' },
  { id: 'f1', label: 'F1' },
  { id: 'nba', label: 'NBA' },
  { id: 'tennis', label: 'Tennis' },
];

const MOCK_STANDINGS: Record<string, Array<{ rank: number; team: string; abbr: string; wins: number; losses: number; pts?: number }>> = {
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
    { rank: 1, team: 'Boston Celtics', abbr: 'BOS', wins: 32, losses: 9 },
    { rank: 2, team: 'Cleveland Cavaliers', abbr: 'CLE', wins: 33, losses: 8 },
    { rank: 3, team: 'OKC Thunder', abbr: 'OKC', wins: 30, losses: 11 },
    { rank: 4, team: 'LA Lakers', abbr: 'LAL', wins: 24, losses: 18 },
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
  const [activeSport, setActiveSport] = useState('football');

  const { data: headlinesData } = useQuery({
    queryKey: ['global-right-headlines'],
    queryFn: () => newsApi.getTopHeadlines(10).then((r) => r.data),
    retry: false,
  });

  const { data: standingsData } = useQuery({
    queryKey: ['global-standings', activeSport],
    queryFn: () => sportsApi.getStandings('football', activeSport).then((r) => r.data),
    retry: false,
  });

  const headlines = Array.isArray(headlinesData) && headlinesData.length > 0
    ? headlinesData.map((h: any, idx: number) => ({
        id: h.id || String(idx + 1),
        title: h.headline || h.title,
        sport: h.sport || 'Sports',
      }))
    : DEFAULT_TOP_HEADLINES;

  const currentStandings = standingsData?.standings || MOCK_STANDINGS[activeSport] || MOCK_STANDINGS.football;

  return (
    <aside className="w-[320px] shrink-0 space-y-5 text-xs font-sans">
      {/* Top Headlines Module */}
      <div className="bg-espn-card border border-espn-border rounded-sm shadow-xs overflow-hidden">
        <div className="p-3 bg-espn-card border-b border-espn-border flex items-center justify-between">
          <h3 className="text-white font-black text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-4 bg-espn-red rounded-xs inline-block" />
            Top Headlines
          </h3>
          <span className="text-[10px] text-espn-text-muted font-bold uppercase">Live</span>
        </div>

        <ol className="divide-y divide-espn-border">
          {headlines.slice(0, 10).map((story: any, idx: number) => (
            <li key={story.id || idx}>
              <Link
                href="/football"
                className="flex items-start gap-3 p-3 hover:bg-[#222222] transition-colors group"
              >
                <span className="text-base font-black text-espn-red shrink-0 w-4 text-center mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block mb-0.5">
                    {story.sport}
                  </span>
                  <p className="text-[13px] font-bold text-gray-100 group-hover:text-espn-red transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* 30 for 30 Podcasts / Editorial Spotlight */}
      <div className="bg-espn-card border border-espn-border rounded-sm overflow-hidden shadow-xs">
        <div className="p-3 border-b border-espn-border flex items-center gap-2">
          <Podcast className="w-4 h-4 text-espn-red" />
          <h3 className="text-white font-black text-xs uppercase tracking-wider">
            30 for 30 Podcasts
          </h3>
        </div>
        <div className="relative h-36 w-full bg-[#1e1e1e]">
          <Image
            src="https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0716%2Fr1690018_1296x729_16%2D9.jpg&w=640&h=360&scale=crop&cquality=80"
            alt="30 for 30"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-white bg-espn-red px-2 py-0.5 rounded-xs">
            Audio Feature
          </span>
        </div>
        <div className="p-3.5 space-y-1.5">
          <h4 className="text-sm font-bold text-white hover:text-espn-red transition-colors leading-snug">
            The Betrayal of Shohei Ohtani
          </h4>
          <p className="text-[11.5px] text-espn-text-muted leading-relaxed">
            How Shohei Ohtani’s relationship with his interpreter unraveled amid an international sports betting probe.
          </p>
          <a
            href="https://www.espn.com/podcasts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-espn-red hover:underline pt-1"
          >
            Listen now <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ESPN Fantasy Signup Box */}
      <div className="bg-gradient-to-b from-[#1c2438] to-[#121620] border border-[#2d3a54] rounded-sm p-4 text-white shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
            ESPN Fantasy 2026
          </span>
        </div>
        <h4 className="text-sm font-black leading-snug mb-1">
          Sign up to play the #1 Fantasy game!
        </h4>
        <p className="text-[11px] text-gray-300 mb-3.5 leading-relaxed">
          Create customized leagues, draft live with friends, and enjoy real-time stat tracking.
        </p>
        <div className="space-y-1.5">
          <Link
            href="/fantasy"
            className="block w-full text-center py-2 bg-espn-red hover:bg-red-700 text-white font-black text-xs rounded transition-colors"
          >
            Create A League
          </Link>
          <Link
            href="/fantasy"
            className="block w-full text-center py-2 bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white font-bold text-xs rounded border border-white/20 transition-colors"
          >
            Join Public League
          </Link>
        </div>
      </div>

      {/* Standings Widget */}
      <div className="bg-espn-card border border-espn-border rounded-sm shadow-xs overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-espn-border">
          <h3 className="text-white font-black text-xs uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-espn-red" />
            Standings
          </h3>
          <Link href={`/${activeSport}`} className="text-espn-red text-[11px] font-bold hover:underline">
            View All
          </Link>
        </div>

        {/* Sport tabs */}
        <div className="flex border-b border-espn-border bg-[#161616]">
          {STANDINGS_SPORTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSport(s.id)}
              className={`flex-1 py-1.5 text-[11px] font-bold transition-colors ${
                activeSport === s.id
                  ? 'text-white border-b-2 border-espn-red bg-[#222222]'
                  : 'text-espn-text-muted hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-1 px-3 py-1.5 text-[9.5px] text-gray-400 uppercase font-bold bg-[#141414]">
          <span>Team / Athlete</span>
          <span className="w-8 text-center">W</span>
          <span className="w-8 text-center">L</span>
          <span className="w-10 text-center">PTS</span>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-espn-border">
          {currentStandings.slice(0, 5).map((entry: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-1 px-3 py-2 text-[11.5px] items-center hover:bg-[#202020] transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] text-gray-500 w-3 text-center">{entry.rank || i + 1}</span>
                <span className="font-bold text-gray-100 truncate">{entry.team}</span>
              </div>
              <span className="w-8 text-center font-medium text-gray-200">{entry.wins}</span>
              <span className="w-8 text-center font-medium text-gray-400">{entry.losses}</span>
              <span className="w-10 text-center font-bold text-white">
                {entry.pts ?? (entry.wins * 2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
