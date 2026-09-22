'use client';
import { useQuery } from '@tanstack/react-query';
import { newsApi, scoresApi } from '@/lib/api';
import { NewsArticle, GameScore, SportType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const SPORT_DISPLAY_NAMES: Record<string, string> = {
  nfl: 'NFL', nba: 'NBA', mlb: 'MLB', nhl: 'NHL',
  soccer: 'Soccer', ncaaf: 'College Football', ncaab: 'College Basketball',
  f1: 'Formula 1', golf: 'Golf', tennis: 'Tennis', mma: 'MMA',
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
];

interface Props {
  sport: string;
}

export function SportPage({ sport }: Props) {
  const sportName = SPORT_DISPLAY_NAMES[sport] || sport.toUpperCase();

  const { data: news } = useQuery({
    queryKey: ['sport-news', sport],
    queryFn: () => newsApi.getBySport(sport as SportType, 12).then(r => r.data),
    retry: false,
  });

  const { data: scores } = useQuery({
    queryKey: ['sport-scores', sport],
    queryFn: () => scoresApi.getBySport(sport).then(r => r.data),
    retry: false,
  });

  const displayNews = (Array.isArray(news) ? news : []).slice(0, 12);
  const displayScores = (Array.isArray(scores) ? scores : []).slice(0, 6);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-3xl">{sportName}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Link href={`/${sport}/scores`} className="text-espn-red text-sm hover:underline font-bold">Scores</Link>
            <Link href={`/${sport}/teams`} className="text-espn-text text-sm hover:text-white">Teams</Link>
            <Link href="#" className="text-espn-text text-sm hover:text-white">Schedule</Link>
            <Link href="#" className="text-espn-text text-sm hover:text-white">Standings</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* News Grid */}
          <h2 className="text-white font-black text-lg uppercase border-l-4 border-espn-red pl-2 mb-4">{sportName} News</h2>
          {displayNews.length > 0 ? (
            <div className="space-y-3">
              {/* Featured Article */}
              {displayNews[0] && (
                <div className="relative h-[300px] rounded-sm overflow-hidden group cursor-pointer mb-4">
                  <Image
                    src={displayNews[0].images?.[0]?.url || FALLBACK_IMAGES[0]}
                    alt={displayNews[0].headline}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white text-xl font-black line-clamp-2">{displayNews[0].headline}</h2>
                    <p className="text-espn-text-muted text-sm mt-1">
                      {formatDistanceToNow(new Date(displayNews[0].published), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )}
              {/* Rest of articles */}
              {displayNews.slice(1).map((article: NewsArticle, i: number) => (
                <div key={article.id} className="flex gap-3 py-3 border-b border-espn-gray-border group cursor-pointer">
                  <div className="relative w-[100px] h-[70px] shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={article.images?.[0]?.url || FALLBACK_IMAGES[i % 3]}
                      alt={article.headline}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-espn-red transition-colors line-clamp-2">
                      {article.headline}
                    </h4>
                    <p className="text-espn-text-muted text-xs mt-1">
                      {formatDistanceToNow(new Date(article.published), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-espn-text-muted">No news available.</p>
          )}
        </div>

        {/* Scores Sidebar */}
        <div>
          <h2 className="text-white font-black text-lg uppercase border-l-4 border-espn-red pl-2 mb-4">Scores</h2>
          <div className="space-y-2">
            {displayScores.length > 0 ? displayScores.map((game: GameScore) => (
              <div key={game.gameId} className="bg-espn-dark border border-espn-gray-border rounded-sm p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-espn-text-muted">
                    {game.status === 'in' ? <span className="text-green-400">LIVE</span> : game.status === 'post' ? 'FINAL' : 'UPCOMING'}
                  </span>
                  {game.status === 'in' && (
                    <span className="text-[10px] text-green-400">{game.period} {game.clock}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-espn-text">{game.awayTeam.abbreviation}</span>
                  <span className="text-sm font-bold text-white">{game.awayTeam.score}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-espn-text">{game.homeTeam.abbreviation}</span>
                  <span className="text-sm font-bold text-white">{game.homeTeam.score}</span>
                </div>
              </div>
            )) : (
              <p className="text-espn-text-muted text-sm">No games scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
