'use client';
import { useQuery } from '@tanstack/react-query';
import { scoresApi } from '@/lib/api';
import { GameScore } from '@/types';
import { SPORT_DISPLAY_NAMES, SCORES_REFETCH_INTERVAL_MS } from '@/lib/constants';
import Link from 'next/link';

interface Props {
  sport: string;
}

export function ScoresPage({ sport }: Props) {
  const sportName = SPORT_DISPLAY_NAMES[sport.toLowerCase()] || sport.toUpperCase();

  const { data: scores, isLoading } = useQuery({
    queryKey: ['scores', sport],
    queryFn: () => scoresApi.getBySport(sport).then((r) => r.data),
    refetchInterval: SCORES_REFETCH_INTERVAL_MS,
    retry: false,
  });

  const gameList: GameScore[] = Array.isArray(scores) ? scores : [];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/${sport}`} className="text-espn-text-muted hover:text-espn-red transition-colors">
          {sportName}
        </Link>
        <span className="text-espn-text-muted">/</span>
        <h1 className="text-espn-text font-black text-2xl">Scores</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-espn-text-muted">Loading scores...</div>
      ) : gameList.length === 0 ? (
        <div className="text-center py-12 bg-espn-dark border border-espn-gray-border rounded-xl">
          <p className="text-espn-text-muted text-lg font-bold">No games scheduled today</p>
          <p className="text-espn-text-muted text-sm mt-1">Check back later for live scores and fixtures</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameList.map((game: GameScore) => {
            const isLive = game.status === 'in';
            const isFinal = game.status === 'post';

            return (
              <div
                key={game.gameId}
                className="bg-espn-dark border border-espn-gray-border rounded-xl p-4 shadow-card hover:border-espn-border-bright transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span
                    suppressHydrationWarning
                    className={`text-xs font-bold ${
                      isLive ? 'text-green-400' : 'text-espn-text-muted'
                    }`}
                  >
                    {isLive
                      ? `LIVE - ${game.period ?? ''} ${game.clock ?? ''}`
                      : isFinal
                      ? 'FINAL'
                      : new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-espn-sub rounded-full flex items-center justify-center text-[10px] font-bold text-espn-text-muted">
                        {game.awayTeam.abbreviation?.slice(0, 2)}
                      </div>
                      <span className="text-espn-text font-bold">{game.awayTeam.abbreviation}</span>
                      {game.awayTeam.record && (
                        <span className="text-espn-text-muted text-xs">({game.awayTeam.record})</span>
                      )}
                    </div>
                    <span className="text-espn-text text-xl font-black">{game.awayTeam.score}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-espn-sub rounded-full flex items-center justify-center text-[10px] font-bold text-espn-text-muted">
                        {game.homeTeam.abbreviation?.slice(0, 2)}
                      </div>
                      <span className="text-espn-text font-bold">{game.homeTeam.abbreviation}</span>
                      {game.homeTeam.record && (
                        <span className="text-espn-text-muted text-xs">({game.homeTeam.record})</span>
                      )}
                    </div>
                    <span className="text-espn-text text-xl font-black">{game.homeTeam.score}</span>
                  </div>
                </div>

                {game.venue && (
                  <p className="text-espn-text-muted text-xs mt-3 pt-2 border-t border-espn-gray-border">
                    {game.venue}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
