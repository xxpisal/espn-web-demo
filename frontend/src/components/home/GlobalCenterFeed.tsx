'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Play, ArrowRight, Clock, Video, Zap } from 'lucide-react';
import { teacherSportsApi, newsApi } from '@/lib/api';
import { TeacherSportItem } from '@/types';

const SPORT_COLORS: Record<string, string> = {
  football: '#da020e',
  f1: '#e10600',
  nba: '#1d428a',
  tennis: '#008751',
  boxing: '#990000',
  cycling: '#d97706',
  swimming: '#2563eb',
  running: '#ea580c',
  racing: '#7c3aed',
  volleyball: '#db2777',
  chess: '#27272a',
  default: '#cc0000',
};

const CATEGORIES = [
  'All',
  'Football',
  'F1',
  'NBA',
  'Boxing',
  'Tennis',
  'Cycling',
  'Swimming',
  'Running',
  'Chess',
];

const MOBILE_QUICK_LINKS = [
  { name: 'Premier League', href: '/football', icon: '⚽' },
  { name: 'Formula 1', href: '/f1', icon: '🏎️' },
  { name: 'Champions League', href: '/football', icon: '🏆' },
  { name: 'Scores & Fixtures', href: '/football/scores', icon: '📅' },
  { name: 'Fantasy Sports', href: '/fantasy', icon: '⚡' },
  { name: 'All 62 Sports', href: '/sports', icon: '🏅' },
];

export function GlobalCenterFeed() {
  const [activeTab, setActiveTab] = useState('All');

  const { data: sports = [], isLoading } = useQuery<TeacherSportItem[]>({
    queryKey: ['global-center-feed'],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getAllSports();
        return Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        return [];
      }
    },
  });

  const { data: headlinesData } = useQuery({
    queryKey: ['mobile-top-headlines'],
    queryFn: () => newsApi.getTopHeadlines(5).then((r) => r.data),
    retry: false,
  });

  const featured = sports[0] || {
    uuid: 'featured-1',
    name: "Carrick has an impossible job at Man United after transfer failures",
    description: "Manchester United's players aren't good enough and the club isn't doing enough to rectify that, so where does that leave manager Michael Carrick?",
    category: { name: 'Football' },
    imageUrls: ['https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0921%2Fr1719923_1296x518_5%2D2.jpg&w=1320&h=528&scale=crop&cquality=80'],
  };

  const videoHighlight = sports[1] || {
    uuid: 'video-1',
    name: "Stafford slings four TDs in Rams' dominant Monday Night Football win",
    description: "Watch key plays from Matthew Stafford's masterful four-touchdown performance against the Giants.",
    category: { name: 'NFL' },
    imageUrls: ['https://espnmedia-cdn.akamaized.net/espn/media/common/2026/0921/7185e4e467874477ae69c51f573054081406/7185e4e467874477ae69c51f573054081406.jpg'],
  };

  const filteredStories = activeTab === 'All'
    ? sports.slice(2)
    : sports.filter((s) => s.category?.name?.toLowerCase() === activeTab.toLowerCase());

  const mobileHeadlines = Array.isArray(headlinesData) && headlinesData.length > 0
    ? headlinesData.slice(0, 4)
    : [
        { id: '1', headline: 'Asian Games 2026: Complete medal tally & updates', sport: 'Olympics' },
        { id: '2', headline: 'Mac Allister on Liverpool future: Full focus on title push', sport: 'Football' },
        { id: '3', headline: 'Giants QB Dart limps off field with knee injury', sport: 'NFL' },
        { id: '4', headline: 'Verstappen expects tight battle at Singapore GP', sport: 'F1' },
      ];

  return (
    <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
      {/* Mobile-Only Quick Links Strip (visible on tablet/mobile when LeftRail is hidden) */}
      <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {MOBILE_QUICK_LINKS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#2d2d2d] hover:border-espn-red rounded-full text-xs font-bold text-gray-200 hover:text-white shrink-0 transition-colors"
          >
            <span>{item.icon}</span>
            <span className="whitespace-nowrap">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-espn-border scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-3 sm:px-3.5 py-1 text-xs font-black uppercase rounded-xs transition-colors shrink-0 ${
              activeTab.toLowerCase() === cat.toLowerCase()
                ? 'bg-espn-red text-white'
                : 'bg-espn-card text-gray-300 border border-espn-border hover:bg-[#252525] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Hero Card (global.espn.com style) */}
      <article className="bg-espn-card border border-espn-border rounded-sm overflow-hidden shadow-xs group">
        <Link href={`/sport-detail/${featured.uuid}`} className="block">
          <div className="relative h-64 xs:h-72 sm:h-96 md:h-[420px] w-full bg-[#181818] overflow-hidden">
            <Image
              src={featured.imageUrls?.[0] || 'https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0921%2Fr1719923_1296x518_5%2D2.jpg&w=1320&h=528&scale=crop&cquality=80'}
              alt={featured.name}
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 700px"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Top Indicator Strip */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: SPORT_COLORS[featured.category?.name?.toLowerCase() || 'default'] || '#da020e' }}
            />

            {/* Bottom Overlay Title & Subhead */}
            <div className="absolute bottom-0 left-0 right-0 p-3.5 xs:p-4 sm:p-6 text-white">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-espn-red text-white px-2 py-0.5 rounded-xs inline-block mb-1.5 sm:mb-2.5">
                {featured.category?.name || 'Top Story'}
              </span>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black leading-tight group-hover:text-espn-red transition-colors line-clamp-3">
                {featured.name}
              </h1>
              {featured.description && (
                <p className="hidden xs:block text-xs sm:text-sm text-gray-200 mt-1.5 sm:mt-2 font-normal line-clamp-2 leading-relaxed">
                  {featured.description}
                </p>
              )}
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-gray-300 mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-white/20">
                <span className="font-semibold text-white">Mark Ogden</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 1d ago
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>

      {/* Mobile/Tablet Top Headlines Bar (Visible only on < lg screens so mobile users get breaking news) */}
      <div className="lg:hidden bg-espn-card border border-espn-border rounded-sm p-3.5 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-espn-border">
          <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-espn-red" />
            Top Headlines
          </h3>
          <span className="text-[10px] text-espn-red font-bold uppercase">Live Updates</span>
        </div>
        <div className="divide-y divide-espn-border">
          {mobileHeadlines.map((h: any, idx: number) => (
            <Link
              key={h.id || idx}
              href="/football"
              className="flex items-center gap-2.5 py-2 group"
            >
              <span className="text-xs font-black text-espn-red w-4 text-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs font-bold text-gray-200 group-hover:text-espn-red transition-colors truncate">
                {h.headline || h.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Video Highlight Card */}
      <article className="bg-espn-card border border-espn-border rounded-sm overflow-hidden shadow-xs">
        <div className="p-3 bg-[#181818] border-b border-espn-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-espn-red" />
            <span className="text-xs font-black uppercase text-white tracking-wider">
              Must-Watch Highlights
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase">ESPN Video</span>
        </div>
        <Link
          href={`/sport-detail/${videoHighlight.uuid}`}
          className="flex flex-col sm:flex-row group hover:bg-[#202020] transition-colors"
        >
          <div className="relative h-44 sm:h-36 sm:w-60 shrink-0 bg-[#1e1e1e] overflow-hidden">
            <Image
              src={videoHighlight.imageUrls?.[0] || 'https://espnmedia-cdn.akamaized.net/espn/media/common/2026/0921/7185e4e467874477ae69c51f573054081406/7185e4e467874477ae69c51f573054081406.jpg'}
              alt={videoHighlight.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, 240px"
              unoptimized
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-espn-red/90 group-hover:bg-espn-red text-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              1:35
            </span>
          </div>
          <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-espn-red mb-1 block">
                {videoHighlight.category?.name || 'Highlights'}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-espn-red transition-colors leading-snug line-clamp-2">
                {videoHighlight.name}
              </h2>
              <p className="text-xs text-espn-text-muted mt-1 sm:mt-1.5 line-clamp-2 leading-relaxed">
                {videoHighlight.description}
              </p>
            </div>
            <div className="text-[10px] text-gray-400 mt-2 flex items-center gap-1.5 font-medium">
              <span>Watch clip</span>
              <ArrowRight className="w-3 h-3 text-espn-red" />
            </div>
          </div>
        </Link>
      </article>

      {/* Gameblock / Live Match Strip */}
      <div className="bg-espn-card border border-espn-border rounded-sm p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shadow-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-[9.5px] font-black uppercase text-espn-red bg-espn-red/10 px-2 py-0.5 rounded">
            Featured
          </span>
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-xs sm:text-sm text-white">Arsenal</span>
            <span className="text-[11px] font-black text-gray-500">vs</span>
            <span className="font-bold text-xs sm:text-sm text-white">PSG</span>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-green-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live 72&apos; • 2 - 1
          </span>
          <Link
            href="/football/scores"
            className="text-xs font-bold text-espn-red hover:underline flex items-center gap-1"
          >
            Gamecast <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main News Stream (responsive horizontal card layout) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-espn-border">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-espn-red inline-block" />
            Latest Stories & Analysis
          </h2>
          <Link href="/sports" className="text-xs text-espn-red font-bold hover:underline">
            View All Sports
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-espn-text-muted">Loading latest stories...</div>
        ) : filteredStories.length === 0 ? (
          <div className="py-8 text-center text-espn-text-muted">No articles found in this category.</div>
        ) : (
          <div className="divide-y divide-espn-border">
            {filteredStories.slice(0, 12).map((item) => {
              const cat = item.category?.name || 'Sport';
              const color = SPORT_COLORS[cat.toLowerCase()] || SPORT_COLORS.default;
              const img = item.imageUrls?.[0] || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=80';

              return (
                <article key={item.uuid} className="py-3 sm:py-3.5 group">
                  <Link
                    href={`/sport-detail/${item.uuid}`}
                    className="flex gap-3 sm:gap-4 items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[9px] sm:text-[9.5px] font-black uppercase px-1.5 py-0.5 rounded-xs text-white"
                          style={{ backgroundColor: color }}
                        >
                          {cat}
                        </span>
                        <span className="text-[10px] text-espn-text-muted hidden xs:inline">
                          Featured Report
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-espn-red transition-colors leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-espn-text-muted mt-1 line-clamp-2 font-normal leading-relaxed hidden xs:block">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-[10px] sm:text-[10.5px] text-gray-400 mt-1.5 sm:mt-2 font-medium">
                        <span className="text-espn-red font-bold">ESPN Staff</span>
                        <span>•</span>
                        <span>Full story</span>
                      </div>
                    </div>

                    {/* Right Thumbnail - responsive size */}
                    <div className="relative w-24 sm:w-32 md:w-36 h-18 sm:h-22 md:h-24 shrink-0 rounded-xs overflow-hidden bg-[#202020]">
                      <Image
                        src={img}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
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
