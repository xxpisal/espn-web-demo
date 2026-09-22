'use client';
import { useQuery } from '@tanstack/react-query';
import { scoresApi } from '@/lib/api';
import { GameScore } from '@/types';
import Link from 'next/link';

const SPORT_LABELS: Record<string, string> = {
  nfl: 'NFL', nba: 'NBA', mlb: 'MLB', nhl: 'NHL', soccer: 'Soccer',
};

function ScoreItem({ game }: { game: GameScore }) {
  const isLive = game.status === 'in';
  const isFinal = game.status === 'post';

  return (
    <Link
      href={`/${game.sport}/scores`}
      className="inline-flex items-center gap-2 px-4 border-r border-espn-gray-border hover:bg-espn-gray transition-colors cursor-pointer shrink-0 h-full"
    >
      <span className="text-[10px] font-bold text-espn-red uppercase">
        {SPORT_LABELS[game.sport] || game.sport.toUpperCase()}
      </span>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs text-espn-text w-8">{game.awayTeam.abbreviation}</span>
          <span className="text-xs font-bold text-white w-6 text-right">{game.awayTeam.score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-espn-text w-8">{game.homeTeam.abbreviation}</span>
          <span className="text-xs font-bold text-white w-6 text-right">{game.homeTeam.score}</span>
        </div>
      </div>
      <div className="flex flex-col">
        {isLive ? (
          <>
            <span className="text-[9px] font-bold text-green-400">{game.period}</span>
            <span className="text-[9px] text-green-400">{game.clock}</span>
          </>
        ) : isFinal ? (
          <span className="text-[9px] text-espn-text-muted">FINAL</span>
        ) : (
          <span className="text-[9px] text-espn-text-muted">
            {new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </Link>
  );
}

// Mock scores for when API is unavailable
const MOCK_SCORES: GameScore[] = [
  {
    gameId: '1', sport: 'nfl',
    homeTeam: { id: 'KC', name: 'Kansas City Chiefs', abbreviation: 'KC', score: 24 },
    awayTeam: { id: 'BUF', name: 'Buffalo Bills', abbreviation: 'BUF', score: 17 },
    status: 'in', period: 'Q4', clock: '3:12', startTime: new Date().toISOString(),
  },
  {
    gameId: '2', sport: 'nba',
    homeTeam: { id: 'LAL', name: 'Los Angeles Lakers', abbreviation: 'LAL', score: 108 },
    awayTeam: { id: 'GSW', name: 'Golden State Warriors', abbreviation: 'GSW', score: 103 },
    status: 'post', startTime: new Date().toISOString(),
  },
  {
    gameId: '3', sport: 'mlb',
    homeTeam: { id: 'NYY', name: 'New York Yankees', abbreviation: 'NYY', score: 5 },
    awayTeam: { id: 'BOS', name: 'Boston Red Sox', abbreviation: 'BOS', score: 3 },
    status: 'in', period: '7th', clock: '2 out', startTime: new Date().toISOString(),
  },
  {
    gameId: '4', sport: 'nhl',
    homeTeam: { id: 'TOR', name: 'Toronto Maple Leafs', abbreviation: 'TOR', score: 2 },
    awayTeam: { id: 'MTL', name: 'Montreal Canadiens', abbreviation: 'MTL', score: 1 },
    status: 'in', period: 'P3', clock: '8:44', startTime: new Date().toISOString(),
  },
  {
    gameId: '5', sport: 'nfl',
    homeTeam: { id: 'DAL', name: 'Dallas Cowboys', abbreviation: 'DAL', score: 0 },
    awayTeam: { id: 'PHI', name: 'Philadelphia Eagles', abbreviation: 'PHI', score: 0 },
    status: 'pre', startTime: new Date(Date.now() + 3600000 * 3).toISOString(),
  },
];

export function ScoresTicker() {
  const { data } = useQuery({
    queryKey: ['live-scores'],
    queryFn: () => scoresApi.getLive().then(r => r.data),
    refetchInterval: 30000,
    retry: false,
  });

  // Flatten all scores from all sports
  const scores: GameScore[] = data
    ? Object.values(data as Record<string, GameScore[]>).flat()
    : MOCK_SCORES;

  if (scores.length === 0) return null;

  const doubled = [...scores, ...scores]; // duplicate for seamless loop

  return (
    <div className="bg-black border-b border-espn-gray-border h-[44px] overflow-hidden relative">
      <div className="score-ticker h-full">
        <div className="score-ticker-inner h-full">
          {doubled.map((game, i) => (
            <ScoreItem key={`${game.gameId}-${i}`} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
