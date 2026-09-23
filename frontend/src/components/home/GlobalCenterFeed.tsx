'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ArrowRight, Clock, Video, Zap, TrendingUp } from 'lucide-react';
import { useAllSports, useTopHeadlines } from '@/lib/hooks';
import { SPORT_COLORS, FALLBACK_IMAGE } from '@/lib/constants';
import { TeacherSportItem } from '@/types';

const CATEGORIES = [
  'All', 'Football', 'F1', 'NBA', 'Boxing', 'Tennis',
  'Cycling', 'Swimming', 'Running', 'Chess',
] as const;

const MOBILE_QUICK_LINKS = [
  { name: 'Premier League', href: '/football', icon: '⚽' },
  { name: 'Formula 1', href: '/f1', icon: '🏎️' },
  { name: 'Champions League', href: '/football', icon: '🏆' },
  { name: 'Scores & Fixtures', href: '/football/scores', icon: '📅' },
  { name: 'Fantasy Sports', href: '/fantasy', icon: '⚡' },
  { name: 'All 62 Sports', href: '/sports', icon: '🏅' },
] as const;

interface HeadlineItem {
  id: string;
  headline: string;
  sport?: string;
}

const DEFAULT_FEATURED: TeacherSportItem = {
  id: 0,
  uuid: 'featured-1',
  name: "Carrick has an impossible job at Man United after transfer failures",
  description: "Manchester United's players aren't good enough and the club isn't doing enough to rectify that, so where does that leave manager Michael Carrick?",
  category: { name: 'Football' },
  imageUrls: ['https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0921%2Fr1719923_1296x518_5%2D2.jpg&w=1320&h=528&scale=crop&cquality=80'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const DEFAULT_VIDEO: TeacherSportItem = {
  id: 1,
  uuid: 'video-1',
  name: "Stafford slings four TDs in Rams' dominant Monday Night Football win",
  description: "Watch key plays from Matthew Stafford's masterful four-touchdown performance against the Giants.",
  category: { name: 'NFL' },
  imageUrls: ['https://espnmedia-cdn.akamaized.net/espn/media/common/2026/0921/7185e4e467874477ae69c51f573054081406/7185e4e467874477ae69c51f573054081406.jpg'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const DEFAULT_HEADLINES: HeadlineItem[] = [
  { id: '1', headline: 'Asian Games 2026: Complete medal tally & updates', sport: 'Olympics' },
  { id: '2', headline: 'Mac Allister on Liverpool future: Full focus on title push', sport: 'Football' },
  { id: '3', headline: 'Giants QB Dart limps off field with knee injury', sport: 'NFL' },
  { id: '4', headline: 'Verstappen expects tight battle at Singapore GP', sport: 'F1' },
];

export function GlobalCenterFeed() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const { data: sports = [], isLoading } = useAllSports();
  const { data: headlinesData } = useTopHeadlines(5);

  const featured = sports[0] ?? DEFAULT_FEATURED;
  const videoHighlight = sports[1] ?? DEFAULT_VIDEO;

  const filteredStories = useMemo(() => {
    if (activeTab === 'All') return sports.slice(2);
    return sports.filter((s) => s.category?.name?.toLowerCase() === activeTab.toLowerCase());
  }, [sports, activeTab]);

  const mobileHeadlines: HeadlineItem[] = useMemo(() => {
    if (Array.isArray(headlinesData) && headlinesData.length > 0) {
      return headlinesData.slice(0, 4).map((h: any, idx: number) => ({
        id: String(h.id ?? idx + 1),
        headline: h.headline ?? h.title ?? '',
        sport: h.sport ?? 'Sports',
      }));
    }
    return DEFAULT_HEADLINES;
  }, [headlinesData]);

  const featuredCategoryColor =
    SPORT_COLORS[featured.category?.name?.toLowerCase() ?? 'default'] ?? SPORT_COLORS.default;

  return (
    <div className="flex-1 min-w-0 space-y-5 sm:space-y-6">
      {/* Mobile Quick Links Strip */}
      <div className="xl:hidden flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {MOBILE_QUICK_LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-espn-text hover:text-espn-red shrink-0 transition-all duration-200 hover:scale-105 bg-espn-dark border border-espn-gray-border hover:border-espn-red"
          >
            <span>{item.icon}</span>
            <span className="whitespace-nowrap">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-espn-gray-border scrollbar-hide">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 text-[11px] font-bold uppercase rounded-full transition-all duration-200 shrink-0 tracking-wide ${
                isActive
                  ? 'text-white bg-red-gradient shadow-glow-red'
                  : 'text-espn-text-muted hover:text-espn-text hover:bg-espn-sub border border-espn-gray-border'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Hero Card */}
      <article className="rounded-xl overflow-hidden group card-glow border border-espn-gray-border">
        <Link href={`/sport-detail/${featured.uuid}`} className="block">
          <div className="relative h-64 xs:h-72 sm:h-96 md:h-[430px] w-full overflow-hidden bg-espn-darker">
            <Image
              src={featured.imageUrls?.[0] || FALLBACK_IMAGE}
              alt={featured.name}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 700px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            {/* Top sport indicator */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ backgroundColor: featuredCategoryColor }}
            />

            {/* Content overlay */}
            <div className="hero-overlay keep-white absolute bottom-0 left-0 right-0 p-4 xs:p-5 sm:p-7 text-white">
              <div className="espn-badge mb-3 keep-white">
                {featured.category?.name || 'Top Story'}
              </div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-[2rem] font-black leading-tight text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-3 drop-shadow-lg">
                {featured.name}
              </h1>
              {featured.description && (
                <p className="hidden xs:block text-sm text-gray-200 mt-2 sm:mt-3 font-normal line-clamp-2 leading-relaxed">
                  {featured.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-[11px] text-gray-300 mt-3 pt-3 border-t border-white/15">
                <span className="font-semibold text-gray-100">
                  {featured.category?.name ? `${featured.category.name} Desk` : 'ESPN Staff'}
                </span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Clock className="w-3 h-3" /> Latest
                </span>
                <span className="ml-auto flex items-center gap-1 text-espn-red font-bold text-xs">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>

      {/* Mobile Headlines */}
      <div className="lg:hidden rounded-xl p-4 shadow-card bg-espn-dark border border-espn-gray-border">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-espn-gray-border">
          <h3 className="text-xs font-black uppercase tracking-wider text-espn-text flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-espn-red" />
            Top Headlines
          </h3>
          <span className="text-[10px] text-green-400 font-bold uppercase flex items-center gap-1">
            <span className="live-dot" />
            Live Updates
          </span>
        </div>
        <div className="divide-y divide-espn-gray-border">
          {mobileHeadlines.map((h, idx) => (
            <Link
              key={h.id || idx}
              href="/football"
              className="flex items-center gap-3 py-2.5 group transition-colors"
            >
              <span className="text-sm font-black text-espn-red w-5 text-center shrink-0 tabular-nums">
                {idx + 1}
              </span>
              <p className="text-[12.5px] font-semibold text-espn-text group-hover:text-espn-red transition-colors line-clamp-1">
                {h.headline}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Video Highlight Card */}
      <article className="rounded-xl overflow-hidden shadow-card bg-espn-dark border border-espn-gray-border">
        <div className="px-4 py-3 flex items-center justify-between bg-espn-gray border-b border-espn-gray-border">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-espn-red/15">
              <Video className="w-3.5 h-3.5 text-espn-red" />
            </div>
            <span className="text-[12px] font-black uppercase text-espn-text tracking-wider">Must-Watch Highlights</span>
          </div>
          <span className="text-[10px] text-espn-text-muted font-bold uppercase tracking-wider">ESPN Video</span>
        </div>
        <Link
          href={`/sport-detail/${videoHighlight.uuid}`}
          className="flex flex-col sm:flex-row group"
        >
          <div className="relative h-44 sm:h-40 sm:w-64 shrink-0 bg-espn-darker overflow-hidden">
            <Image
              src={videoHighlight.imageUrls?.[0] || FALLBACK_IMAGE}
              alt={videoHighlight.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-400"
              sizes="(max-width: 640px) 100vw, 256px"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 bg-red-gradient">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
              </div>
            </div>
            <span className="keep-white absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              1:35
            </span>
          </div>
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-espn-red mb-1.5 block tracking-wider">
                {videoHighlight.category?.name || 'Highlights'}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-espn-text group-hover:text-espn-red transition-colors leading-snug line-clamp-2">
                {videoHighlight.name}
              </h2>
              <p className="text-xs text-espn-text-muted mt-2 line-clamp-2 leading-relaxed">
                {videoHighlight.description}
              </p>
            </div>
            <div className="text-[11px] text-espn-text-muted mt-3 flex items-center gap-1.5 font-medium">
              Watch clip <ArrowRight className="w-3 h-3 text-espn-red" />
            </div>
          </div>
        </Link>
      </article>

      {/* Live Match Strip */}
      <div className="rounded-xl p-4 sm:p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-card bg-espn-dark border border-espn-gray-border">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="live-dot" />
            <span className="text-[10px] font-black uppercase text-green-400 tracking-wider">Live Match</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm text-espn-text">Arsenal</span>
            <span className="text-base font-black px-2 py-0.5 rounded-lg text-espn-text bg-espn-gray border border-espn-gray-border">
              2 – 1
            </span>
            <span className="font-bold text-sm text-espn-text">PSG</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-green-400 font-semibold flex items-center gap-1.5">
            72&apos; • Champions League
          </span>
          <Link
            href="/football/scores"
            className="text-xs font-bold text-espn-red hover:underline flex items-center gap-1"
          >
            Gamecast <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Latest Stories */}
      <section className="space-y-0">
        <div className="flex items-center justify-between pb-3 mb-1 border-b-2 border-espn-gray-border">
          <h2 className="text-sm font-black uppercase tracking-wider text-espn-text flex items-center gap-2.5">
            <span className="w-1 h-5 rounded-full bg-espn-red inline-block" />
            <TrendingUp className="w-4 h-4 text-espn-red" />
            Latest Stories & Analysis
          </h2>
          <Link href="/sports" className="text-xs text-espn-red font-bold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 py-3">
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-16 rounded" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-3 w-3/4 rounded" />
                </div>
                <div className="skeleton w-24 h-16 rounded-lg shrink-0" />
              </div>
            ))}
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="py-10 text-center text-espn-text-muted text-sm">No articles found in this category.</div>
        ) : (
          <div className="divide-y divide-espn-gray-border">
            {filteredStories.slice(0, 12).map((item, index) => {
              const cat = item.category?.name || 'Sport';
              const color = SPORT_COLORS[cat.toLowerCase()] || SPORT_COLORS.default;
              const img = item.imageUrls?.[0] || FALLBACK_IMAGE;

              return (
                <article key={item.uuid} className="group">
                  <Link
                    href={`/sport-detail/${item.uuid}`}
                    className="flex gap-3.5 sm:gap-4 items-start py-4 hover:bg-black/5 dark:hover:bg-white/2 transition-colors rounded-lg px-1 -mx-1"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="keep-white text-[9.5px] font-black uppercase px-2 py-0.5 rounded text-white"
                          style={{ backgroundColor: color }}
                        >
                          {cat}
                        </span>
                        {index < 3 && (
                          <span className="text-[9.5px] font-bold text-amber-400 uppercase tracking-wide hidden xs:inline">
                            ⭐ Editor&apos;s Pick
                          </span>
                        )}
                      </div>
                      <h3 className="text-[13px] sm:text-sm md:text-[15px] font-bold text-espn-text group-hover:text-espn-red transition-colors leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-[11.5px] text-espn-text-muted mt-1.5 line-clamp-2 font-normal leading-relaxed hidden xs:block">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[10.5px] text-espn-text-muted mt-2 font-medium">
                        <span className="text-espn-red font-semibold">ESPN Staff</span>
                        <span>•</span>
                        <span>Full story</span>
                      </div>
                    </div>

                    <div className="relative w-24 sm:w-32 md:w-36 aspect-[4/3] shrink-0 rounded-lg overflow-hidden bg-espn-darker">
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-400"
                        sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
                        unoptimized
                      />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
