'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/lib/api';
import { Suspense } from 'react';

interface SearchResultItem {
  id?: string;
  name?: string;
  title?: string;
  type?: 'team' | 'player' | 'article' | string;
  sport?: string;
}

interface SearchResponse {
  results?: SearchResultItem[];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ['search', query],
    queryFn: () => searchApi.search(query).then((r) => r.data as SearchResponse),
    enabled: !!query,
    retry: false,
  });

  if (!query) {
    return (
      <div className="text-center py-16 bg-espn-dark border border-espn-gray-border rounded-xl">
        <p className="text-espn-text-muted text-base font-medium">
          Enter a search term above to find teams, athletes, fixtures, and news
        </p>
      </div>
    );
  }

  const results = data?.results ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-espn-text font-bold text-lg">
        {isLoading ? 'Searching...' : `Results for "${query}" (${results.length})`}
      </h2>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-espn-dark border border-espn-gray-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 bg-espn-dark border border-espn-gray-border rounded-xl">
          <p className="text-espn-text-muted text-sm">No results found for &quot;{query}&quot;.</p>
        </div>
      ) : (
        <div className="divide-y divide-espn-gray-border bg-espn-dark border border-espn-gray-border rounded-xl overflow-hidden shadow-card">
          {results.map((result, i) => {
            const icon = result.type === 'team' ? '🏆' : result.type === 'player' ? '👤' : '📰';
            return (
              <div
                key={result.id || i}
                className="flex items-center gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-espn-gray rounded-full flex items-center justify-center shrink-0 text-lg">
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-espn-text font-bold truncate">{result.name || result.title}</p>
                  <p className="text-espn-text-muted text-xs capitalize mt-0.5">
                    {result.type} {result.sport ? `· ${result.sport}` : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SearchPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="text-espn-text font-black text-3xl mb-6">Search</h1>
      <Suspense fallback={<p className="text-espn-text-muted">Loading...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
