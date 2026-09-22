'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/lib/api';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchApi.search(query).then(r => r.data),
    enabled: !!query,
    retry: false,
  });

  if (!query) {
    return (
      <div className="text-center py-16">
        <p className="text-espn-text-muted text-lg">Enter a search term to find teams, players, and news</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-white font-bold text-lg mb-4">
        {isLoading ? 'Searching...' : `Results for "${query}"`}
      </h2>
      {data?.results?.map((result: any, i: number) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-espn-gray-border hover:bg-espn-gray transition-colors cursor-pointer px-2">
          <div className="w-10 h-10 bg-espn-gray rounded-full flex items-center justify-center shrink-0">
            <span className="text-lg">{result.type === 'team' ? '🏆' : result.type === 'player' ? '👤' : '📰'}</span>
          </div>
          <div>
            <p className="text-white font-bold">{result.name || result.title}</p>
            <p className="text-espn-text-muted text-sm">{result.type} · {result.sport}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SearchPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="text-white font-black text-3xl mb-6">Search</h1>
      <Suspense fallback={<p className="text-espn-text-muted">Loading...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
