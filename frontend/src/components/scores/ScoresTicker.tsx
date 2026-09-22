'use client';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { scoresApi } from '@/lib/api';
import { GameScore } from '@/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const LEAGUES = [
  { id: 'all', label: 'All Leagues' },
  { id: 'football', label: 'Football' },
  { id: 'nfl', label: 'NFL' },
  { id: 'nba', label: 'NBA' },
  { id: 'mlb', label: 'MLB' },
  { id: 'f1', label: 'Formula 1' },
];

const MOCK_SCORES: GameScore[] = [
  {
    gameId: '1',
    sport: 'football',
    homeTeam: { id: 'ARS', name: 'Arsenal', abbreviation: 'ARS', score: 2 },
    awayTeam: { id: 'PSG', name: 'Paris Saint-Germain', abbreviation: 'PSG', score: 1 },
    status: 'in',
    period: '72\'',
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
    period: '54\'',
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
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [leagueDropdown, setLeagueDropdown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data } = useQuery({
    queryKey: ['live-scores'],
    queryFn: () => scoresApi.getLive().then((r) => r.data),
    refetchInterval: 30000,
    retry: false,
  });

  const allScores: GameScore[] = data
    ? Object.values(data as Record<string, GameScore[]>).flat()
    : MOCK_SCORES;

  const filteredScores = selectedLeague === 'all'
    ? allScores
    : allScores.filter((g) => g.sport?.toLowerCase() === selectedLeague.toLowerCase());

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <div className="bg-[#0b0b0b] border-b border-[#222222] h-10 sm:h-11" />;
  }

  return (
    <section className="bg-[#0b0b0b] border-b border-[#222222] text-xs select-none relative z-40">
      <div className="flex items-center h-10 sm:h-11 max-w-full">
        {/* League Selector Dropdown */}
        <div className="relative shrink-0 border-r border-[#222222] h-full flex items-center">
          <button
            onClick={() => setLeagueDropdown(!leagueDropdown)}
            className="flex items-center gap-1 px-2.5 sm:px-3.5 h-full text-[10px] sm:text-[11px] font-black uppercase text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="max-w-[70px] sm:max-w-none truncate">
              {LEAGUES.find((l) => l.id === selectedLeague)?.label || 'Leagues'}
            </span>
            <ChevronDown className="w-3 h-3 text-espn-red shrink-0" />
          </button>

          {leagueDropdown && (
            <div className="absolute left-0 top-full mt-0 w-44 bg-[#141414] border border-[#333333] shadow-2xl py-1 z-50">
              {LEAGUES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelectedLeague(l.id);
                    setLeagueDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold transition-colors ${
                    selectedLeague === l.id
                      ? 'text-espn-red bg-[#222222]'
                      : 'text-gray-300 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Previous Button (hidden on very small touch screens or compact) */}
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex items-center justify-center h-full w-7 sm:w-8 text-gray-400 hover:text-white hover:bg-white/5 shrink-0 transition-colors border-r border-[#222222]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Scores Container (supports touch swipe and momentum scrolling) */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center overflow-x-auto scrollbar-hide h-full divide-x divide-[#222222] overscroll-x-contain touch-pan-x"
        >
          {filteredScores.length === 0 ? (
            <div className="px-3 text-[10px] sm:text-[11px] text-gray-500 italic">No games scheduled</div>
          ) : (
            filteredScores.map((game, idx) => {
              const isLive = game.status === 'in';
              const isFinal = game.status === 'post';

              return (
                <Link
                  key={`${game.gameId}-${idx}`}
                  href={`/${game.sport}/scores`}
                  className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 h-full shrink-0 hover:bg-[#161616] transition-colors min-w-[125px] sm:min-w-[145px] group"
                >
                  {/* Teams & Scores */}
                  <div className="flex flex-col gap-0.5 min-w-[60px] sm:min-w-[70px]">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                      <span className="font-bold text-gray-300 group-hover:text-white truncate">
                        {game.awayTeam.abbreviation || game.awayTeam.name?.slice(0, 3)}
                      </span>
                      <span className="font-black text-white ml-1.5 sm:ml-2">
                        {game.awayTeam.score ?? '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
                      <span className="font-bold text-gray-300 group-hover:text-white truncate">
                        {game.homeTeam.abbreviation || game.homeTeam.name?.slice(0, 3)}
                      </span>
                      <span className="font-black text-white ml-1.5 sm:ml-2">
                        {game.homeTeam.score ?? '-'}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex flex-col items-end shrink-0 pl-1">
                    {isLive ? (
                      <>
                        <span className="text-[8.5px] sm:text-[9px] font-black text-green-400 uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping inline-block" />
                          {game.period || 'Live'}
                        </span>
                        <span className="text-[8.5px] sm:text-[9px] text-green-300">{game.clock}</span>
                      </>
                    ) : isFinal ? (
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-gray-500 uppercase">
                        FINAL
                      </span>
                    ) : (
                      <span className="text-[8.5px] sm:text-[9px] text-gray-400 font-medium whitespace-nowrap">
                        {new Date(game.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => scroll('right')}
          className="hidden sm:flex items-center justify-center h-full w-7 sm:w-8 text-gray-400 hover:text-white hover:bg-white/5 shrink-0 transition-colors border-l border-[#222222]"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scores All Link */}
        <Link
          href="/football/scores"
          className="hidden md:flex items-center px-3 sm:px-4 h-full border-l border-[#222222] text-[10px] sm:text-[11px] font-black uppercase text-espn-red hover:bg-white/5 transition-colors shrink-0"
        >
          All Scores
        </Link>
      </div>
    </section>
  );
}
