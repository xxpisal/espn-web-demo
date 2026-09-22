'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TeacherSportItem } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { teacherSportsApi } from '@/lib/api';

const SPORT_BADGE_COLORS: Record<string, string> = {
  boxing: 'bg-red-700 text-white',
  football: 'bg-[#013369] text-white',
  tennis: 'bg-emerald-700 text-white',
  cycling: 'bg-amber-600 text-white',
  swimming: 'bg-blue-600 text-white',
  running: 'bg-orange-600 text-white',
  racing: 'bg-purple-700 text-white',
  volleyball: 'bg-pink-700 text-white',
  chess: 'bg-neutral-800 text-white',
  default: 'bg-espn-red text-white',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=80';

export function NewsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Fetch real sports from teacher API
  const { data: sports = [], isLoading } = useQuery<TeacherSportItem[]>({
    queryKey: ['teacher-news-grid'],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getAllSports();
        return Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        return [];
      }
    },
  });


  const categories = ['all', 'Football', 'Boxing', 'Tennis', 'Cycling', 'Swimming', 'Running', 'Racing', 'Volleyball', 'Chess'];

  const filteredSports = activeCategory === 'all'
    ? sports
    : sports.filter((s) => s.category?.name?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="mt-8">
      {/* Header and Category Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-espn-gray-border pb-3 mb-4 gap-3">
        <h2 className="text-white font-black text-xl uppercase border-l-4 border-espn-red pl-2">
          Latest Sports & Headlines
        </h2>
        <Link href="/sports" className="text-espn-red text-xs font-bold hover:underline flex items-center gap-1">
          View All {sports.length} Sports <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded text-xs font-bold capitalize transition-colors shrink-0 ${
              activeCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-espn-red text-white'
                : 'bg-espn-dark text-espn-text border border-espn-gray-border hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      {isLoading ? (
        <div className="py-12 text-center text-espn-text-muted">Loading sports headlines...</div>
      ) : filteredSports.length === 0 ? (
        <div className="py-12 text-center text-espn-text-muted">No items found for this category.</div>
      ) : (
        <div className="divide-y divide-espn-gray-border">
          {filteredSports.slice(0, 15).map((item) => {
            const cat = item.category?.name || 'Sport';
            const badgeClass = SPORT_BADGE_COLORS[cat.toLowerCase()] || SPORT_BADGE_COLORS.default;
            const img = item.imageUrls?.[0] || FALLBACK_IMAGE;

            return (
              <Link
                key={item.uuid}
                href={`/sport-detail/${item.uuid}`}
                className="flex gap-4 py-3.5 group cursor-pointer hover:bg-espn-gray/30 px-2 rounded-sm transition-colors"
              >
                <div className="relative w-[110px] h-[75px] shrink-0 overflow-hidden rounded bg-espn-gray">
                  <Image
                    src={img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="110px"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase ${badgeClass}`}>
                        {cat}
                      </span>
                      {item.createdAt && (
                        <span className="text-[10px] text-espn-text-muted" suppressHydrationWarning>
                          {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                        </span>
                      )}

                    </div>
                    <h4 className="text-sm font-bold text-white mt-1 line-clamp-2 group-hover:text-espn-red transition-colors leading-snug">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-espn-text-muted text-xs line-clamp-1 mt-1 font-light">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
