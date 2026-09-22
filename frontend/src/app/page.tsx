import { HeroSection } from '@/components/home/HeroSection'
import { NewsGrid } from '@/components/home/NewsGrid'
import { SportsSidebar } from '@/components/home/SportsSidebar'
import { FeaturedVideo } from '@/components/home/FeaturedVideo'
import { QuickLinks } from '@/components/home/QuickLinks'

export default function HomePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <QuickLinks />
      <HeroSection />
      <div className="flex gap-6 mt-6">
        <div className="flex-1 min-w-0">
          <NewsGrid />
          <FeaturedVideo />
        </div>
        <aside className="w-[320px] shrink-0 hidden lg:block">
          <SportsSidebar />
        </aside>
      </div>
    </div>
  )
}
