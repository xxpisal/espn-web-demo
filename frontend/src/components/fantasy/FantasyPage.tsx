'use client';
import { useQuery } from '@tanstack/react-query';
import { fantasyApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { FantasyLeague } from '@/types';
import Link from 'next/link';

const FANTASY_SPORTS = ['Football', 'Basketball', 'Baseball', 'Hockey'] as const;

export function FantasyPage() {
  const { isAuthenticated } = useAuthStore();

  const { data: leagues, isLoading } = useQuery<FantasyLeague[]>({
    queryKey: ['fantasy-leagues'],
    queryFn: () => fantasyApi.getMyLeagues().then((r) => r.data as FantasyLeague[]),
    enabled: isAuthenticated,
    retry: false,
  });

  const leagueList = Array.isArray(leagues) ? leagues : [];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="text-espn-text font-black text-3xl mb-2">Fantasy Sports</h1>
      <p className="text-espn-text-muted mb-8">Manage your fantasy teams and leagues</p>

      {/* Sport Tabs */}
      <div className="flex gap-0 border-b border-espn-gray-border mb-6 overflow-x-auto scrollbar-hide">
        {FANTASY_SPORTS.map((sport, i) => (
          <button
            key={sport}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              i === 0
                ? 'text-espn-text border-espn-red'
                : 'text-espn-text-muted border-transparent hover:text-espn-red'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {!isAuthenticated ? (
        <div className="text-center py-16 bg-espn-dark border border-espn-gray-border rounded-2xl shadow-card p-8 max-w-xl mx-auto">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-espn-text text-2xl font-black mb-2">Play Fantasy Sports</h2>
          <p className="text-espn-text-muted mb-6">
            Join millions of sports fans competing in fantasy leagues across football, basketball, and more.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="bg-espn-red text-white px-6 py-2.5 font-bold hover:bg-espn-red-dark transition-colors rounded-xl shadow-glow-sm keep-white"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="border border-espn-red text-espn-red px-6 py-2.5 font-bold hover:bg-espn-red hover:text-white transition-colors rounded-xl"
            >
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-espn-text font-black text-xl">My Leagues</h2>
            <button className="bg-espn-red text-white px-4 py-2 text-sm font-bold hover:bg-espn-red-dark transition-colors rounded-xl keep-white">
              + Create League
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 bg-espn-dark border border-espn-gray-border rounded-xl animate-pulse" />
              ))}
            </div>
          ) : leagueList.length === 0 ? (
            <div className="text-center py-12 bg-espn-dark border border-espn-gray-border rounded-xl">
              <p className="text-espn-text-muted text-base">You haven&apos;t joined any leagues yet.</p>
              <p className="text-espn-text-muted text-xs mt-1">Create or join a league to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leagueList.map((league) => (
                <div
                  key={league.id}
                  className="bg-espn-dark border border-espn-gray-border rounded-xl p-5 hover:border-espn-border-bright transition-colors shadow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-espn-text font-bold text-base">{league.name}</h3>
                        <p className="text-espn-text-muted text-xs mt-0.5">
                          {league.sport.toUpperCase()} · {league.members} teams
                        </p>
                      </div>
                      {league.myRank && (
                        <span className="bg-espn-red text-white text-xs font-black px-2 py-0.5 rounded keep-white">
                          #{league.myRank}
                        </span>
                      )}
                    </div>
                    {league.myScore != null && (
                      <p className="text-espn-text-muted text-xs mt-3">
                        Score: <span className="text-espn-text font-bold">{league.myScore}</span>
                      </p>
                    )}
                  </div>
                  <button className="mt-4 w-full border border-espn-gray-border text-espn-text hover:text-white hover:bg-espn-red hover:border-espn-red text-xs font-bold py-2 transition-colors rounded-lg">
                    Manage Team
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fantasy Sports Banner */}
      <div className="mt-12 bg-red-gradient rounded-2xl p-6 sm:p-8 text-center text-white shadow-card keep-white">
        <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">NFL Fantasy Football</h2>
        <p className="text-white/80 text-sm mb-5 max-w-md mx-auto">
          Draft your team, compete with friends, and win big this season!
        </p>
        <button className="bg-white text-espn-red font-black px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-md">
          Play Now — It&apos;s Free!
        </button>
      </div>
    </div>
  );
}
