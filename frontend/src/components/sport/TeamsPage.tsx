'use client';
import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '@/lib/api';
import { Team } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  sport: string;
}

const SPORT_LEAGUES: Record<string, { sport: string; league: string }> = {
  nfl: { sport: 'football', league: 'nfl' },
  nba: { sport: 'basketball', league: 'nba' },
  mlb: { sport: 'baseball', league: 'mlb' },
  nhl: { sport: 'hockey', league: 'nhl' },
};

export function TeamsPage({ sport }: Props) {
  const sportLeague = SPORT_LEAGUES[sport] || { sport, league: sport };

  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams', sport],
    queryFn: () => teamsApi.getBySport(sportLeague.sport, sportLeague.league).then(r => r.data),
    retry: false,
  });

  const teamList = Array.isArray(teams) ? teams : [];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/${sport}`} className="text-espn-text-muted hover:text-white">{sport.toUpperCase()}</Link>
        <span className="text-espn-text-muted">/</span>
        <h1 className="text-white font-black text-2xl">Teams</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="bg-espn-dark border border-espn-gray-border rounded-sm p-4 animate-pulse">
              <div className="w-12 h-12 bg-espn-gray rounded-full mx-auto mb-2" />
              <div className="h-3 bg-espn-gray rounded mx-auto w-16" />
            </div>
          ))}
        </div>
      ) : teamList.length === 0 ? (
        <p className="text-espn-text-muted text-center py-12">Teams data not available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {teamList.map((team: Team) => (
            <div
              key={team.id}
              className="bg-espn-dark border border-espn-gray-border rounded-sm p-4 flex flex-col items-center gap-2 hover:bg-espn-gray transition-colors cursor-pointer group"
              style={{ borderTopColor: team.color ? `#${team.color}` : undefined, borderTopWidth: team.color ? '3px' : undefined }}
            >
              {team.logo ? (
                <div className="relative w-12 h-12">
                  <Image src={team.logo} alt={team.name} fill className="object-contain" unoptimized />
                </div>
              ) : (
                <div className="w-12 h-12 bg-espn-gray rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{team.abbreviation}</span>
                </div>
              )}
              <div className="text-center">
                <p className="text-white text-xs font-bold group-hover:text-espn-red transition-colors">{team.location}</p>
                <p className="text-espn-text-muted text-xs">{team.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
