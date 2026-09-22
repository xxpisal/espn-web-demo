'use client';
import { useQuery } from '@tanstack/react-query';
import { scoresApi } from '@/lib/api';
import { GameScore } from '@/types';
import Link from 'next/link';

interface Props {
  sport: string;
}

const SPORT_NAMES: Record<string, string> = {
  nfl: 'NFL', nba: 'NBA', mlb: 'MLB', nhl: 'NHL',
  soccer: 'Soccer', ncaaf: 'College Football',
};

export function ScoresPage({ sport }: Props) {
  const { data: scores, isLoading } = useQuery({
    queryKey: ['scores', sport],
    queryFn: () => scoresApi.getBySport(sport).then(r => r.data),
    refetchInterval: 30000,
    retry: false,
  });

  const gameList = Array.isArray(scores) ? scores : [];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/${sport}`} className="text-espn-text-muted hover:text-white">{SPORT_NAMES[sport] || sport.toUpperCase()}</Link>
        <span className="text-espn-text-muted">/</span>
        <h1 className="text-white font-black text-2xl">Scores</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-espn-text-muted">Loading scores...</div>
      ) : gameList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-espn-text-muted text-lg">No games scheduled today</p>
          <p className="text-espn-text-muted text-sm mt-2">Check back later for live scores</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameList.map((game: GameScore) => (
            <div key={game.gameId} className="bg-espn-dark border border-espn-gray-border rounded-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-bold ${
                  game.status === 'in' ? 'text-green-400' : 'text-espn-text-muted'
                }`}>
                  {game.status === 'in' ? `LIVE - ${game.period} ${game.clock}` :
                   game.status === 'post' ? 'FINAL' :
                   new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-espn-gray rounded-full" />
                    <span className="text-white font-bold">{game.awayTeam.abbreviation}</span>
                    {game.awayTeam.record && <span className="text-espn-text-muted text-xs">({game.awayTeam.record})</span>}
                  </div>
                  <span className="text-white text-xl font-black">{game.awayTeam.score}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-espn-gray rounded-full" />
                    <span className="text-white font-bold">{game.homeTeam.abbreviation}</span>
                    {game.homeTeam.record && <span className="text-espn-text-muted text-xs">({game.homeTeam.record})</span>}
                  </div>
                  <span className="text-white text-xl font-black">{game.homeTeam.score}</span>
                </div>
              </div>
              {game.venue && (
                <p className="text-espn-text-muted text-xs mt-3">{game.venue}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
