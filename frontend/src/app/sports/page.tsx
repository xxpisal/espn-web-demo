'use client';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { TeacherSportItem } from '@/types';
import { teacherSportsApi } from '@/lib/api';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80';

export default function AllSportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all sports from API
  const { data: sports = [], isLoading } = useQuery<TeacherSportItem[]>({
    queryKey: ['all-teacher-sports'],
    queryFn: async () => {
      try {
        const res = await teacherSportsApi.getAllSports();
        return Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        return [];
      }
    },
  });


  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    sports.forEach((s) => {
      if (s.category?.name) set.add(s.category.name);
    });
    return Array.from(set).sort();
  }, [sports]);

  // Filter sports based on category and search query
  const filteredSports = useMemo(() => {
    return sports.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        item.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [sports, selectedCategory, searchQuery]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-espn-gray-border pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-espn-red text-white text-[11px] font-black uppercase px-2 py-0.5 rounded-sm">
                Official API
              </span>
              <span className="text-xs text-espn-text-muted">sport-api.eunglyzhia.com</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              All Sports & Matches
            </h1>
            <p className="text-sm text-espn-text-muted mt-1">
              Browse, search, and click on any sport to view full details, high-res photos, and discussions.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-espn-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sports, teams, drills..."
              className="w-full bg-espn-dark border border-espn-gray-border rounded pl-10 pr-4 py-2 text-sm text-white placeholder-espn-text-muted focus:outline-none focus:border-espn-red"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-espn-red text-white'
                : 'bg-espn-dark text-espn-text border border-espn-gray-border hover:text-white'
            }`}
          >
            All Categories ({sports.length})
          </button>
          {categories.map((cat) => {
            const count = sports.filter((s) => s.category?.name === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-espn-red text-white'
                    : 'bg-espn-dark text-espn-text border border-espn-gray-border hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-espn-red mb-4"></div>
          <p className="text-espn-text-muted">Loading sports database...</p>
        </div>
      ) : filteredSports.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-white text-lg font-bold">No sports found</p>
          <p className="text-espn-text-muted text-sm mt-1">Try choosing another category or clearing your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSports.map((item) => {
            const img = item.imageUrls?.[0] || FALLBACK_IMAGE;
            const category = item.category?.name || 'Sport';

            return (
              <Link
                key={item.uuid}
                href={`/sport-detail/${item.uuid}`}
                className="group bg-espn-dark border border-espn-gray-border rounded-md overflow-hidden flex flex-col hover:border-espn-red transition-all duration-300 hover:shadow-lg hover:shadow-black/60"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-espn-gray">
                  <Image
                    src={img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-espn-red text-white text-[10px] font-black px-2 py-0.5 uppercase rounded-sm">
                      {category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-espn-red transition-colors line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-espn-text-muted mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-espn-gray-border flex items-center justify-between text-xs">
                    <span className="text-espn-red font-bold flex items-center gap-1 group-hover:underline">
                      Click to view <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-espn-text-muted text-[10px]">
                      {item.imageUrls?.length || 1} photo{(item.imageUrls?.length || 1) > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
