'use client';
import { useQuery } from '@tanstack/react-query';
import { fantasyApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export function FantasyPage() {
  const { isAuthenticated } = useAuthStore();

  const { data: leagues } = useQuery({
    queryKey: ['fantasy-leagues'],
    queryFn: () => fantasyApi.getMyLeagues().then(r => r.data),
    enabled: isAuthenticated,
    retry: false,
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="text-white font-black text-3xl mb-2">Fantasy Sports</h1>
      <p className="text-espn-text-muted mb-8">Manage your fantasy teams and leagues</p>

      {/* Sport Tabs */}
      <div className="flex gap-0 border-b border-espn-gray-border mb-6">
        {['Football', 'Basketball', 'Baseball', 'Hockey'].map((sport, i) => (
          <button
            key={sport}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
              i === 0
                ? 'text-white border-espn-red'
                : 'text-espn-text-muted border-transparent hover:text-white'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {!isAuthenticated ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-white text-2xl font-black mb-2">Play Fantasy Sports</h2>
          <p className="text-espn-text-muted mb-6">Join millions of sports fans competing in fantasy leagues</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/login" className="bg-espn-red text-white px-6 py-3 font-bold hover:bg-espn-red-dark transition-colors rounded">
              Log In
            </Link>
            <Link href="/auth/register" className="border border-espn-red text-espn-red px-6 py-3 font-bold hover:bg-espn-red hover:text-white transition-colors rounded">
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-black text-xl">My Leagues</h2>
            <button className="bg-espn-red text-white px-4 py-2 text-sm font-bold hover:bg-espn-red-dark transition-colors rounded">
              + Create League
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Array.isArray(leagues) ? leagues : []).map((league: any) => (
              <div key={league.id} className="bg-espn-dark border border-espn-gray-border rounded-sm p-4 hover:border-espn-red transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold">{league.name}</h3>
                    <p className="text-espn-text-muted text-sm">{league.sport.toUpperCase()} · {league.members} teams</p>
                  </div>
                  {league.myRank && (
                    <span className="bg-espn-red text-white text-sm font-bold px-2 py-1 rounded">#{league.myRank}</span>
                  )}
                </div>
                {league.myScore && (
                  <p className="text-espn-text-muted text-sm mt-2">Score: <span className="text-white font-bold">{league.myScore}</span></p>
                )}
                <button className="mt-3 w-full border border-espn-gray-border text-espn-text text-sm py-2 hover:bg-espn-gray transition-colors rounded">
                  Manage Team
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fantasy Sports Banner */}
      <div className="mt-12 bg-gradient-to-r from-espn-red to-[#990000] rounded p-6 text-center">
        <h2 className="text-white font-black text-2xl mb-2">NFL Fantasy Football</h2>
        <p className="text-white/80 mb-4">Draft your team, compete with friends, and win big this season!</p>
        <button className="bg-white text-espn-red font-black px-6 py-2 rounded hover:bg-gray-100 transition-colors">
          Play Now — It&apos;s Free!
        </button>
      </div>
    </div>
  );
}
