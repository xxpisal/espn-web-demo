export function FeaturedVideo() {
  return (
    <section className="mt-8">
      <h2 className="text-white font-black text-lg uppercase border-l-4 border-espn-red pl-2 mb-3">Highlights & Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-espn-dark rounded-sm overflow-hidden group cursor-pointer">
            <div className="relative h-[160px] bg-espn-gray flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-espn-gray to-espn-dark" />
              <div className="relative z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/40 group-hover:bg-espn-red/60 transition-colors">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
            <div className="p-3">
              <span className="text-espn-red text-[9px] font-bold uppercase">Video</span>
              <h4 className="text-white text-sm font-bold mt-0.5">
                {['Best Plays of Week 15', 'NBA Top 10 Dunks', 'Soccer Goals Compilation', 'NHL Highlights'][i - 1]}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
