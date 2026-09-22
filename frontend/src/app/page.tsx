import { GlobalLeftRail } from '@/components/home/GlobalLeftRail';
import { GlobalCenterFeed } from '@/components/home/GlobalCenterFeed';
import { GlobalRightRail } from '@/components/home/GlobalRightRail';

export default function HomePage() {
  return (
    <div className="max-w-[1360px] mx-auto px-2 sm:px-4 py-4">
      {/* 3-Column ESPN Global Layout (layout-dbc: col-one, col-two, col-three) */}
      <div className="flex gap-4 lg:gap-5 items-start">
        {/* Left Rail (Quick Links, Favourites, Customise ESPN, Sites, Editions, Apps) */}
        <div className="hidden xl:block">
          <GlobalLeftRail />
        </div>

        {/* Center Main News Feed (Hero Story, Video Highlight, Gameblock, Stories) */}
        <GlobalCenterFeed />

        {/* Right Rail (Top Headlines 1-10, 30 for 30, Fantasy promo, Standings) */}
        <div className="hidden lg:block">
          <GlobalRightRail />
        </div>
      </div>
    </div>
  );
}
