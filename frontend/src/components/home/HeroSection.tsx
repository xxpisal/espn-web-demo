'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { TeacherSportItem } from '@/types';
import { teacherSportsApi } from '@/lib/api';

const SPORT_COLORS: Record<string, string> = {
  boxing: 'bg-red-700',
  football: 'bg-[#013369]',
  tennis: 'bg-emerald-700',
  cycling: 'bg-amber-600',
  swimming: 'bg-blue-600',
  running: 'bg-orange-600',
  racing: 'bg-purple-700',
  volleyball: 'bg-pink-700',
  chess: 'bg-neutral-800',
  default: 'bg-espn-red',
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
];

export function HeroSection() {
  const { data: sports = [] } = useQuery<TeacherSportItem[]>({
    queryKey: ['teacher-hero-sports'],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getAllSports();
        return Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        return [];
      }
    },
  });


  const displayItems = sports.slice(0, 5);

  if (displayItems.length === 0) {
    return (
      <div className="h-64 bg-espn-dark rounded-md animate-pulse flex items-center justify-center text-espn-text-muted">
        Loading featured stories...
      </div>
    );
  }

  const featured = displayItems[0];
  const others = displayItems.slice(1, 5);

  const featuredCategory = featured.category?.name || 'Sport';
  const featuredColor = SPORT_COLORS[featuredCategory.toLowerCase()] || SPORT_COLORS.default;
  const featuredImg = featured.imageUrls?.[0] || FALLBACK_IMAGES[0];

  return (
    <section className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 h-auto md:h-[420px]">
        {/* Main Large Hero Card - Clickable */}
        <Link
          href={`/sport-detail/${featured.uuid}`}
          className="relative col-span-1 md:col-span-2 row-span-2 group overflow-hidden rounded-md border border-espn-gray-border hover:border-espn-red transition-all block h-[320px] md:h-full"
        >
          <Image
            src={featuredImg}
            alt={featured.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className={`${featuredColor} text-white text-[10px] font-black px-2.5 py-0.5 uppercase mb-2 inline-block rounded-sm`}>
              {featuredCategory}
            </span>
            <h2 className="text-white text-xl md:text-2xl font-black leading-tight line-clamp-3 group-hover:text-espn-red transition-colors">
              {featured.name}
            </h2>
            <p className="text-gray-300 text-xs mt-1.5 line-clamp-2 font-light">
              {featured.description}
            </p>
            <div className="flex items-center gap-1.5 text-espn-red text-xs font-bold mt-2.5">
              <span>Click to view story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* 4 Secondary Cards - All Clickable */}
        {others.map((item, idx) => {
          const cat = item.category?.name || 'Sport';
          const badgeColor = SPORT_COLORS[cat.toLowerCase()] || SPORT_COLORS.default;
          const img = item.imageUrls?.[0] || FALLBACK_IMAGES[(idx + 1) % FALLBACK_IMAGES.length];

          return (
            <Link
              key={item.uuid}
              href={`/sport-detail/${item.uuid}`}
              className="group overflow-hidden rounded-md border border-espn-gray-border hover:border-espn-red transition-all flex flex-col bg-espn-dark"
            >
              <div className="relative h-[120px] md:h-[130px] w-full overflow-hidden bg-espn-gray">
                <Image
                  src={img}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className={`absolute top-2 left-2 ${badgeColor} text-white text-[9px] font-black px-2 py-0.5 uppercase rounded-sm`}>
                  {cat}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="text-white text-xs font-bold leading-snug line-clamp-2 group-hover:text-espn-red transition-colors">
                  {item.name}
                </h3>
                <span className="text-espn-red text-[10px] font-bold mt-2 flex items-center gap-1">
                  View details <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
