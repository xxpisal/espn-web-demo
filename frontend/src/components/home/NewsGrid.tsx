'use client';
import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/lib/api';
import { NewsArticle } from '@/types';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

const SPORT_BADGE_COLORS: Record<string, string> = {
  nfl: 'bg-[#013369] text-white',
  nba: 'bg-[#006BB6] text-white',
  mlb: 'bg-[#002D72] text-white',
  nhl: 'bg-[#000000] text-white border border-gray-600',
  soccer: 'bg-[#2C7F3F] text-white',
  default: 'bg-espn-red text-white',
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80',
];

const MOCK_NEWS: NewsArticle[] = Array.from({ length: 12 }, (_, i) => ({
  id: `mock_${i}`,
  headline: [
    'NFL Power Rankings: Week 15 Edition',
    'NBA Trade Rumors: Stars on the Move Before Deadline',
    'College Football Playoff Bracket Analysis',
    'Soccer: Champions League Group Stage Results',
    'NHL: Battle for the Stanley Cup Heats Up',
    'Golf: Tour Championship Preview and Picks',
    'MMA: UFC 300 Full Card Breakdown',
    'Tennis: Grand Slam Season Recap',
    'MLB Free Agency: Top Targets This Offseason',
    'Fantasy Football: Must-Start Picks for Week 15',
    'F1: Championship Battle Goes Down to Final Race',
    'NCAAB: Top 25 Rankings and Analysis',
  ][i],
  description: 'Get the full breakdown and analysis from our experts.',
  sport: (['nfl', 'nba', 'ncaaf', 'soccer', 'nhl', 'golf', 'mma', 'tennis', 'mlb', 'nfl', 'f1', 'ncaab'] as const)[i],
  published: new Date(Date.now() - i * 1800000).toISOString(),
  images: [{ url: FALLBACK_IMAGES[i % FALLBACK_IMAGES.length] }],
}));

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const image = article.images?.[0]?.url || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const badgeClass = SPORT_BADGE_COLORS[article.sport || 'default'] || SPORT_BADGE_COLORS.default;
  const timeAgo = article.published ? formatDistanceToNow(new Date(article.published), { addSuffix: true }) : '';

  return (
    <div className="flex gap-3 py-3 border-b border-espn-gray-border group cursor-pointer">
      <div className="relative w-[100px] h-[70px] shrink-0 overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={article.headline}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="100px"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${badgeClass}`}>
          {article.sport}
        </span>
        <h4 className="text-sm font-bold text-white mt-1 line-clamp-2 group-hover:text-espn-red transition-colors leading-tight">
          {article.headline}
        </h4>
        <p className="text-espn-text-muted text-xs mt-1">{timeAgo}</p>
      </div>
    </div>
  );
}

export function NewsGrid() {
  const { data: articles } = useQuery({
    queryKey: ['top-news-grid'],
    queryFn: () => newsApi.getTopHeadlines(20).then(r => r.data),
    retry: false,
  });

  const displayArticles = Array.isArray(articles) && articles.length > 0 ? articles : MOCK_NEWS;

  return (
    <section>
      <div className="flex items-center justify-between mb-0 mt-6">
        <h2 className="text-white font-black text-lg uppercase border-l-4 border-espn-red pl-2">Top Headlines</h2>
        <button className="text-espn-red text-xs font-bold hover:underline">See All</button>
      </div>
      <div>
        {displayArticles.slice(0, 10).map((article, i) => (
          <NewsCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </section>
  );
}
