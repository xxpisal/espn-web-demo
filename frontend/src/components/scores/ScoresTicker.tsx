'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLiveScores } from '@/lib/hooks';
import { GameScore } from '@/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown, Zap } from 'lucide-react';

const LEAGUES = [
  { id: 'all', label: 'All Leagues' },
  { id: 'football', label: 'Football' },
  { id: 'nfl', label: 'NFL' },
  { id: 'nba', label: 'NBA' },
  { id: 'mlb', label: 'MLB' },
  { id: 'f1', label: 'Formula 1' },
] as const;

const MOCK_SCORES: GameScore[] = [
  {
    gameId: '1',
    sport: 'football',
    homeTeam: { id: 'ARS', name: 'Arsenal', abbreviation: 'ARS', score: 2 },
    awayTeam: { id: 'PSG', name: 'Paris Saint-Germain', abbreviation: 'PSG', score: 1 },
    status: 'in',
    period: "72'",
    clock: '2nd Half',
    startTime: '2026-09-22T19:00:00Z',
  },
  {
    gameId: '2',
    sport: 'football',
    homeTeam: { id: 'LIV', name: 'Liverpool', abbreviation: 'LIV', score: 3 },
    awayTeam: { id: 'MCI', name: 'Manchester City', abbreviation: 'MCI', score: 1 },
    status: 'post',
    startTime: '2026-09-22T16:30:00Z',
  },
  {
    gameId: '3',
    sport: 'nfl',
    homeTeam: { id: 'LAR', name: 'LA Rams', abbreviation: 'LAR', score: 38 },
    awayTeam: { id: 'NYG', name: 'NY Giants', abbreviation: 'NYG', score: 14 },
    status: 'post',
    startTime: '2026-09-22T00:15:00Z',
  },
  {
    gameId: '4',
    sport: 'nba',
    homeTeam: { id: 'BOS', name: 'Boston Celtics', abbreviation: 'BOS', score: 114 },
    awayTeam: { id: 'MIA', name: 'Miami Heat', abbreviation: 'MIA', score: 98 },
    status: 'post',
    startTime: '2026-09-22T10:00:00Z',
  },
  {
    gameId: '5',
    sport: 'football',
    homeTeam: { id: 'BAR', name: 'Barcelona', abbreviation: 'BAR', score: 1 },
    awayTeam: { id: 'RMA', name: 'Real Madrid', abbreviation: 'RMA', score: 1 },
    status: 'in',
    period: "54'",
    clock: '2nd Half',
    startTime: '2026-09-22T20:00:00Z',
  },
  {
    gameId: '6',
    sport: 'mlb',
    homeTeam: { id: 'NYY', name: 'New York Yankees', abbreviation: 'NYY', score: 5 },
    awayTeam: { id: 'BOS', name: 'Boston Red Sox', abbreviation: 'BOS', score: 3 },
    status: 'in',
    period: '8th',
    clock: '1 out',
    startTime: '2026-09-22T13:00:00Z',
  },
  {
    gameId: '7',
    sport: 'f1',
    homeTeam: { id: 'VER', name: 'Max Verstappen', abbreviation: 'VER', score: 1 },
    awayTeam: { id: 'NOR', name: 'Lando Norris', abbreviation: 'NOR', score: 2 },
    status: 'post',
    period: 'Finished',
    startTime: '2026-09-22T14:00:00Z',
  },
];

export function ScoresTicker() {
  const [mounted, setMounted] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [leagueDropdown, setLeagueDropdown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data } = useLiveScores();

  const allScores: GameScore[] = useMemo(() => {
    if (!data) return MOCK_SCORES;
    if (Array.isArray(data)) return data;
    return Object.values(data as Record<string, GameScore[]>).flat();
  }, [data]);

  const filteredScores = useMemo(() => {
    if (selectedLeague === 'all') return allScores;
    return allScores.filter((g) => g.sport?.toLowerCase() === selectedLeague.toLowerCase());
  }, [allScores, selectedLeague]);

  const liveCount = useMemo(() => {
    return filteredScores.filter((g) => g.status === 'in').length;
  }, [filteredScores]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -220 : 220, behavior: 'smooth' });
    }
  }, []);

  if (!mounted) {
    return <div className="h-10 sm:h-[42px] bg-[#080808] border-b border-[#1a1a1a]" />;
  }

  return (
    <section className="text-xs select-none relative z-40 bg-[#080808] border-b border-[#1a1a1a]">
      <div className="flex items-center h-10 sm:h-[42px] max-w-full">
        {/* League Selector */}
        <div className="relative shrink-0 h-full flex items-center border-r border-[#1a1a1a]">
          <button
            onClick={() => setLeagueDropdown(!leagueDropdown)}
            className="flex items-center gap-1.5 px-3 sm:px-4 h-full text-[10.5px] sm:text-[11px] font-bold uppercase text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            {liveCount > 0 && (
              <span className="hidden sm:flex items-center gap-1 text-green-400 text-[9px] font-black">
                <span className="live-dot w-[5px] h-[5px]" />
                {liveCount} LIVE
              </span>
            )}
            <span className="max-w-[65px] sm:max-w-none truncate">
              {LEAGUES.find((l) => l.id === selectedLeague)?.label || 'Leagues'}
            </span>
            <ChevronDown className={`w-3 h-3 text-espn-red shrink-0 transition-transform duration-200 ${leagueDropdown ? 'rotate-180' : ''}`} />
          </button>

          {leagueDropdown && (
            <div className="absolute left-0 top-full w-44 shadow-2xl py-1 z-50 animate-fade-in bg-[#111111] border border-[#2a2a2a] border-t-2 border-t-espn-red rounded-b-lg">
              {LEAGUES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => { setSelectedLeague(l.id); setLeagueDropdown(false); }}
                  className={`w-full text-left px-3.5 py-2 text-[11.5px] font-semibold transition-colors ${
                    selectedLeague === l.id
                      ? 'text-espn-red bg-espn-red/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Left Scroll */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex items-center justify-center h-full w-7 sm:w-8 text-gray-400 hover:text-white hover:bg-white/5 shrink-0 transition-colors border-r border-[#1a1a1a]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Score Cards */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center overflow-x-auto scrollbar-hide h-full overscroll-x-contain touch-pan-x"
        >
          {filteredScores.length === 0 ? (
            <div className="px-4 text-[11px] text-gray-400 italic">No games scheduled</div>
          ) : (
            filteredScores.map((game, idx) => {
              const isLive = game.status === 'in';
              const isFinal = game.status === 'post';

              return (
                <Link
                  key={`${game.gameId}-${idx}`}
                  href={`/${game.sport}/scores`}
                  className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 h-full shrink-0 group transition-colors border-r border-[#1a1a1a] min-w-[130px] hover:bg-white/5"
                >
                  {/* Team scores */}
                  <div className="flex flex-col gap-0.5 min-w-[64px]">
                    <div className="flex items-center justify-between text-[10.5px] sm:text-[11px]">
                      <span className="font-semibold text-gray-400 group-hover:text-gray-200 transition-colors">
                        {game.awayTeam.abbreviation || game.awayTeam.name?.slice(0, 3)}
                      </span>
                      <span className={`font-black ml-2 ${isLive ? 'text-white' : 'text-gray-300'}`}>
                        {game.awayTeam.score ?? '–'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px] sm:text-[11px]">
                      <span className="font-semibold text-gray-400 group-hover:text-gray-200 transition-colors">
                        {game.homeTeam.abbreviation || game.homeTeam.name?.slice(0, 3)}
                      </span>
                      <span className={`font-black ml-2 ${isLive ? 'text-white' : 'text-gray-300'}`}>
                        {game.homeTeam.score ?? '–'}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end shrink-0">
                    {isLive ? (
                      <>
                        <span className="flex items-center gap-1 text-[9px] font-black text-green-400 uppercase">
                          <span className="live-dot w-[5px] h-[5px]" />
                          {game.period || 'Live'}
                        </span>
                        <span className="text-[9px] text-green-500/70">{game.clock}</span>
                      </>
                    ) : isFinal ? (
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">FINAL</span>
                    ) : (
                      <span className="text-[9px] text-gray-400 whitespace-nowrap">
                        {new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Right Scroll */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex items-center justify-center h-full w-7 sm:w-8 text-gray-400 hover:text-white hover:bg-white/5 shrink-0 transition-colors border-l border-[#1a1a1a]"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* All Scores Link */}
        <Link
          href="/football/scores"
          className="hidden md:flex items-center gap-1.5 px-4 h-full text-[10.5px] sm:text-[11px] font-bold uppercase text-espn-red hover:bg-espn-red/10 transition-colors shrink-0 border-l border-[#1a1a1a]"
        >
          <Zap className="w-3 h-3" />
          All Scores
        </Link>
      </div>
    </section>
  );
}
