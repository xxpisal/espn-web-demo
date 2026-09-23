'use client';
import { useQuery } from '@tanstack/react-query';
import { newsApi, scoresApi } from '@/lib/api';
import { NewsArticle, GameScore, SportType } from '@/types';
import { useSportsByCategory, useEventsByCategory } from '@/lib/hooks';
import { SPORT_DISPLAY_NAMES, FALLBACK_IMAGES } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, MapPin } from 'lucide-react';

const CATEGORY_CHIPS = [
  'Football', 'Boxing', 'Tennis', 'Cycling', 'Swimming',
  'Running', 'Racing', 'Volleyball', 'Chess',
] as const;

interface Props {
  sport: string;
}

export function SportPage({ sport }: Props) {
  const sportKey = sport.toLowerCase();
  const sportName = SPORT_DISPLAY_NAMES[sportKey] || sport.toUpperCase();

  const { data: teacherSports = [] } = useSportsByCategory(sportKey);
  const { data: teacherEvents = [] } = useEventsByCategory(sportKey);

  // Fallback news if no teacher sports are registered for this category
  const { data: news } = useQuery({
    queryKey: ['sport-news', sport],
    queryFn: () => newsApi.getBySport(sport as SportType, 12).then((r) => r.data),
    enabled: teacherSports.length === 0,
    retry: false,
  });

  const { data: scores } = useQuery({
    queryKey: ['sport-scores', sport],
    queryFn: () => scoresApi.getBySport(sport).then((r) => r.data),
    retry: false,
  });

  const displayNews = (Array.isArray(news) ? news : []).slice(0, 12);
  const displayScores: GameScore[] = (Array.isArray(scores) ? scores : []).slice(0, 6);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-espn-gray-border pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="keep-white bg-espn-red text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm">
              Category
            </span>
            <span className="text-xs text-espn-text-muted font-medium">ESPN Coverage</span>
          </div>
          <h1 className="text-espn-text font-black text-3xl md:text-4xl">{sportName}</h1>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <Link href="/sports" className="text-espn-red hover:underline font-bold">← All Sports</Link>
            <Link href={`/${sport}/scores`} className="text-espn-text hover:text-espn-red font-medium">Scores</Link>
            <Link href={`/${sport}/teams`} className="text-espn-text hover:text-espn-red font-medium">Teams</Link>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Real Sports from Teacher API */}
          {teacherSports.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-espn-text font-black text-xl uppercase border-l-4 border-espn-red pl-2">
                  {sportName} Articles & Stories ({teacherSports.length})
                </h2>
                <span className="text-xs text-espn-text-muted">Click any to view</span>
              </div>

              {/* Featured Card */}
              {teacherSports[0] && (
                <Link
                  href={`/sport-detail/${teacherSports[0].uuid}`}
                  className="block relative h-[320px] rounded-md overflow-hidden group cursor-pointer mb-6 border border-espn-gray-border hover:border-espn-red transition-all"
                >
                  <Image
                    src={teacherSports[0].imageUrls?.[0] || FALLBACK_IMAGES[0]}
                    alt={teacherSports[0].name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="hero-overlay keep-white absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="keep-white bg-espn-red text-white text-[10px] font-black px-2 py-0.5 uppercase mb-2 inline-block">
                      Featured
                    </span>
                    <h2 className="text-white text-xl md:text-2xl font-black line-clamp-2 group-hover:text-espn-red transition-colors">
                      {teacherSports[0].name}
                    </h2>
                    <p className="text-gray-200 text-xs mt-1.5 line-clamp-2 font-normal">
                      {teacherSports[0].description}
                    </p>
                    <span className="text-espn-red text-xs font-bold mt-2 inline-flex items-center gap-1">
                      Click to view full details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Rest of Sports in a 2-column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teacherSports.slice(1).map((item) => (
                  <Link
                    key={item.uuid}
                    href={`/sport-detail/${item.uuid}`}
                    className="group bg-espn-dark border border-espn-gray-border rounded-md overflow-hidden flex flex-col hover:border-espn-red transition-all"
                  >
                    <div className="relative h-44 w-full bg-espn-gray overflow-hidden">
                      <Image
                        src={item.imageUrls?.[0] || FALLBACK_IMAGES[1]}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-espn-text group-hover:text-espn-red transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-xs text-espn-text-muted mt-1.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-espn-gray-border flex items-center justify-between text-[11px]">
                        <span className="text-espn-red font-bold flex items-center gap-1 group-hover:underline">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                        {item.createdAt && (
                          <span className="text-espn-text-muted text-[10px]" suppressHydrationWarning>
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Events for this category */}
          {teacherEvents.length > 0 && (
            <section className="mt-8">
              <h2 className="text-espn-text font-black text-xl uppercase border-l-4 border-espn-red pl-2 mb-4">
                {sportName} Facilities & Matches ({teacherEvents.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teacherEvents.map((evt) => (
                  <Link
                    key={evt.uuid}
                    href={`/sport-detail/${evt.uuid}`}
                    className="group bg-espn-dark border border-espn-gray-border rounded-md overflow-hidden flex flex-col hover:border-espn-red transition-all"
                  >
                    <div className="relative h-36 w-full bg-espn-gray overflow-hidden">
                      <Image
                        src={evt.imageUrls?.[0] || FALLBACK_IMAGES[2]}
                        alt={evt.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      {evt.locationName && (
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-espn-red" />
                          <span className="truncate max-w-[160px]">{evt.locationName}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-espn-text group-hover:text-espn-red transition-colors line-clamp-1">
                          {evt.name}
                        </h4>
                        <p className="text-xs text-espn-text-muted mt-1 line-clamp-2">
                          {evt.description}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-espn-red font-bold">
                        <span>Click to view venue & comments</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Fallback articles if none in teacher sports */}
          {teacherSports.length === 0 && teacherEvents.length === 0 && (
            <div>
              <h2 className="text-espn-text font-black text-lg uppercase border-l-4 border-espn-red pl-2 mb-4">
                {sportName} News
              </h2>
              <div className="space-y-3">
                {displayNews.map((article: NewsArticle, i: number) => (
                  <div
                    key={article.id}
                    className="flex gap-3 py-3 border-b border-espn-gray-border group cursor-pointer"
                  >
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
                      <h4 className="text-sm font-bold text-espn-text group-hover:text-espn-red transition-colors line-clamp-2">
                        {article.headline}
                      </h4>
                      <p className="text-espn-text-muted text-xs mt-1" suppressHydrationWarning>
                        {formatDistanceToNow(new Date(article.published), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-espn-dark border border-espn-gray-border rounded-md p-4">
            <h3 className="text-espn-text font-black text-sm uppercase border-l-4 border-espn-red pl-2 mb-3">
              Explore More Categories
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_CHIPS.map((cat) => {
                const isCurrent = sportKey === cat.toLowerCase();
                return (
                  <Link
                    key={cat}
                    href={`/${cat.toLowerCase()}`}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'bg-espn-red text-white'
                        : 'bg-espn-sub text-espn-text hover:text-white hover:bg-espn-red'
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Scores Sidebar */}
          <div className="bg-espn-dark border border-espn-gray-border rounded-md p-4">
            <h2 className="text-espn-text font-black text-sm uppercase border-l-4 border-espn-red pl-2 mb-3">
              Live Scores & Results
            </h2>
            <div className="space-y-2">
              {displayScores.length > 0 ? (
                displayScores.map((game: GameScore) => (
                  <div
                    key={game.gameId}
                    className="bg-espn-darker border border-espn-gray-border rounded-sm p-2.5"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-espn-text-muted">
                        {game.status === 'in' ? (
                          <span className="text-green-400">LIVE</span>
                        ) : game.status === 'post' ? (
                          'FINAL'
                        ) : (
                          'UPCOMING'
                        )}
                      </span>
                      {game.status === 'in' && (
                        <span className="text-[10px] text-green-400">
                          {game.period} {game.clock}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-espn-text">{game.awayTeam.abbreviation}</span>
                      <span className="text-xs font-bold text-espn-text">{game.awayTeam.score}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-xs text-espn-text">{game.homeTeam.abbreviation}</span>
                      <span className="text-xs font-bold text-espn-text">{game.homeTeam.score}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-espn-text-muted text-xs">No active matches scheduled.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
