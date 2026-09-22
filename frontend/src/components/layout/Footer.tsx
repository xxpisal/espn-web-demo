import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-espn-darker border-t border-espn-gray-border mt-12 py-8">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">ESPN</h4>
            <ul className="space-y-2">
              {['About ESPN', 'Press Room', 'Careers', 'Advertise With Us'].map(link => (
                <li key={link}><Link href="#" className="text-espn-text-muted text-xs hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Sports</h4>
            <ul className="space-y-2">
              {([['NFL', '/nfl'], ['NBA', '/nba'], ['MLB', '/mlb'], ['NHL', '/nhl'], ['Soccer', '/soccer']] as const).map(([label, href]) => (
                <li key={label}><Link href={href} className="text-espn-text-muted text-xs hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Fantasy & Games</h4>
            <ul className="space-y-2">
              {['Fantasy Football', 'Fantasy Basketball', 'Fantasy Baseball', 'Fantasy Hockey'].map(link => (
                <li key={link}><Link href="/fantasy" className="text-espn-text-muted text-xs hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Follow ESPN</h4>
            <ul className="space-y-2">
              {['Twitter', 'Facebook', 'Instagram', 'YouTube', 'TikTok'].map(link => (
                <li key={link}><Link href="#" className="text-espn-text-muted text-xs hover:text-white transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-espn-gray-border pt-4 text-center">
          <div className="bg-espn-red text-white font-black text-xl px-3 py-1 inline-block mb-3 tracking-tighter">
            ESPN
          </div>
          <p className="text-espn-text-muted text-xs">
            © {new Date().getFullYear()} ESPN Clone. All rights reserved. Built with Next.js, NestJS & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
