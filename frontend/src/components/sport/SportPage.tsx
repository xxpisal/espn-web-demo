'use client';
import { useQuery } from '@tanstack/react-query';
import { newsApi, scoresApi, teacherSportsApi } from '@/lib/api';
import { NewsArticle, GameScore, SportType, TeacherSportItem, TeacherEventItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const SPORT_DISPLAY_NAMES: Record<string, string> = {
  football: 'Football',
  boxing: 'Boxing',
  tennis: 'Tennis',
  cycling: 'Cycling',
  swimming: 'Swimming',
  running: 'Running',
  racing: 'Racing',
  volleyball: 'Volleyball',
  chess: 'Chess',
  nfl: 'NFL',
  nba: 'NBA',
  mlb: 'MLB',
  nhl: 'NHL',
  soccer: 'Soccer',
  ncaaf: 'College Football',
  ncaab: 'College Basketball',
  f1: 'Formula 1',
  golf: 'Golf',
  mma: 'MMA',
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
  const sportKey = sport.toLowerCase();
  const sportName = SPORT_DISPLAY_NAMES[sportKey] || sport.toUpperCase();

  // Fetch teacher sports
  const { data: teacherSports = [] } = useQuery<TeacherSportItem[]>({
    queryKey: ['teacher-sports', sportKey],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getAllSports();
        const all: TeacherSportItem[] = Array.isArray(res.data) ? res.data : [];
        return all.filter((s) => s.category?.name?.toLowerCase() === sportKey);
      } catch (e) {
        return [];
      }
    },
  });

  // Fetch teacher events for this category
  const { data: teacherEvents = [] } = useQuery<TeacherEventItem[]>({
    queryKey: ['teacher-events', sportKey],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getEvents();
        const all: TeacherEventItem[] = Array.isArray(res.data) ? res.data : [];
        return all.filter(
          (e) =>
            e.category?.name?.toLowerCase() === sportKey ||
            (e as any).categoryName?.toLowerCase() === sportKey,
        );
      } catch (e) {
        return [];
      }
    },
  });


  // Fallback news
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
  const displayScores = (Array.isArray(scores) ? scores : []).slice(0, 6);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-espn-gray-border pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-espn-red text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm">
              Category
            </span>
            <span className="text-xs text-espn-text-muted">sport-api.eunglyzhia.com</span>
          </div>
          <h1 className="text-white font-black text-3xl md:text-4xl">{sportName}</h1>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <Link href="/sports" className="text-espn-red hover:underline font-bold">← All Sports</Link>
            <Link href={`/${sport}/scores`} className="text-espn-text hover:text-white">Scores</Link>
            <Link href={`/${sport}/teams`} className="text-espn-text hover:text-white">Teams</Link>
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
                <h2 className="text-white font-black text-xl uppercase border-l-4 border-espn-red pl-2">
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
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="bg-espn-red text-white text-[10px] font-black px-2 py-0.5 uppercase mb-2 inline-block">
                      Featured
                    </span>
                    <h2 className="text-white text-xl md:text-2xl font-black line-clamp-2 group-hover:text-espn-red transition-colors">
                      {teacherSports[0].name}
                    </h2>
                    <p className="text-gray-300 text-xs mt-1.5 line-clamp-2 font-light">
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
                        <h3 className="text-sm font-bold text-white group-hover:text-espn-red transition-colors line-clamp-2">
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
              <h2 className="text-white font-black text-xl uppercase border-l-4 border-espn-red pl-2 mb-4">
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
                        <h4 className="text-sm font-bold text-white group-hover:text-espn-red transition-colors line-clamp-1">
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
              <h2 className="text-white font-black text-lg uppercase border-l-4 border-espn-red pl-2 mb-4">
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
                      <h4 className="text-sm font-bold text-white group-hover:text-espn-red transition-colors line-clamp-2">
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
            <h3 className="text-white font-black text-sm uppercase border-l-4 border-espn-red pl-2 mb-3">
              Explore More Categories
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['Football', 'Boxing', 'Tennis', 'Cycling', 'Swimming', 'Running', 'Racing', 'Volleyball', 'Chess'].map(
                (cat) => (
                  <Link
                    key={cat}
                    href={`/${cat.toLowerCase()}`}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      sportKey === cat.toLowerCase()
                        ? 'bg-espn-red text-white'
                        : 'bg-espn-gray text-espn-text hover:text-white hover:bg-espn-gray-light'
                    }`}
                  >
                    {cat}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Scores Sidebar */}
          <div className="bg-espn-dark border border-espn-gray-border rounded-md p-4">
            <h2 className="text-white font-black text-sm uppercase border-l-4 border-espn-red pl-2 mb-3">
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
                      <span className="text-xs font-bold text-white">{game.awayTeam.score}</span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-xs text-espn-text">{game.homeTeam.abbreviation}</span>
                      <span className="text-xs font-bold text-white">{game.homeTeam.score}</span>
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
