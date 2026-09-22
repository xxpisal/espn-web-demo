'use client';
import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/lib/api';
import { NewsArticle } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

const SPORT_COLORS: Record<string, string> = {
  nfl: 'bg-[#013369]',
  nba: 'bg-[#006BB6]',
  mlb: 'bg-[#002D72]',
  nhl: 'bg-[#000000]',
  soccer: 'bg-[#2C7F3F]',
  default: 'bg-espn-red',
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
];

function ArticleCard({ article, index }: { article: NewsArticle; index: number }) {
  const image = article.images?.[0]?.url || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const sportColor = SPORT_COLORS[article.sport || 'default'] || SPORT_COLORS.default;
  const timeAgo = article.published ? formatDistanceToNow(new Date(article.published), { addSuffix: true }) : '';

  if (index === 0) {
    return (
      <div className="relative col-span-2 md:col-span-1 row-span-2 group cursor-pointer overflow-hidden rounded-sm">
        <div className="relative h-[400px] w-full">
          <Image
            src={image}
            alt={article.headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className={`${sportColor} text-white text-[10px] font-bold px-2 py-0.5 uppercase mb-2 inline-block`}>
            {article.sport?.toUpperCase()}
          </span>
          <h2 className="text-white text-2xl font-black leading-tight line-clamp-3">
            {article.headline}
          </h2>
          <p className="text-espn-text-muted text-sm mt-1">{timeAgo}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer overflow-hidden rounded-sm flex flex-col">
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={image}
          alt={article.headline}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className={`absolute top-2 left-2 ${sportColor} text-white text-[10px] font-bold px-2 py-0.5 uppercase`}>
          {article.sport?.toUpperCase()}
        </span>
      </div>
      <div className="bg-espn-dark p-3 flex-1">
        <h3 className="text-white text-sm font-bold leading-tight line-clamp-2 group-hover:text-espn-red transition-colors">
          {article.headline}
        </h3>
        <p className="text-espn-text-muted text-xs mt-1">{timeAgo}</p>
      </div>
    </div>
  );
}

const MOCK_ARTICLES: NewsArticle[] = [
  { id: '1', headline: 'Chiefs Pull Off Stunning Last-Minute Victory Over Bills in Thriller', description: '...', sport: 'nfl', published: new Date(Date.now() - 7200000).toISOString(), images: [{ url: FALLBACK_IMAGES[0] }] },
  { id: '2', headline: 'LeBron Scores 40 Points as Lakers Defeat Warriors in Overtime', description: '...', sport: 'nba', published: new Date(Date.now() - 3600000).toISOString(), images: [{ url: FALLBACK_IMAGES[1] }] },
  { id: '3', headline: 'Yankees Ace Dominates in Playoff Clinching Performance', description: '...', sport: 'mlb', published: new Date(Date.now() - 1800000).toISOString(), images: [{ url: FALLBACK_IMAGES[2] }] },
  { id: '4', headline: 'World Cup Final Preview: Argentina vs France Rematch Looms', description: '...', sport: 'soccer', published: new Date(Date.now() - 900000).toISOString(), images: [{ url: FALLBACK_IMAGES[3] }] },
  { id: '5', headline: 'Ovechkin Closes in on All-Time Goals Record with Hat Trick', description: '...', sport: 'nhl', published: new Date(Date.now() - 5400000).toISOString(), images: [{ url: FALLBACK_IMAGES[4] }] },
];

export function HeroSection() {
  const { data: articles } = useQuery({
    queryKey: ['top-news-hero'],
    queryFn: () => newsApi.getTopHeadlines(10).then(r => r.data),
    retry: false,
  });

  const displayArticles = (Array.isArray(articles) && articles.length > 0 ? articles : MOCK_ARTICLES).slice(0, 5);

  return (
    <section className="mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto md:h-[400px]">
        {displayArticles.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </section>
  );
}
