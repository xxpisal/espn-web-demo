import Link from 'next/link';
import { EspnLogo } from '@/components/common/EspnLogo';

const FOOTER_LINKS = {
  ESPN: [
    { label: 'About ESPN', href: '#' },
    { label: 'Press Room', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Advertise With Us', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
  Sports: [
    { label: 'NFL', href: '/nfl' },
    { label: 'NBA', href: '/nba' },
    { label: 'MLB', href: '/mlb' },
    { label: 'Soccer', href: '/football' },
    { label: 'Formula 1', href: '/f1' },
    { label: 'All Sports', href: '/sports' },
  ],
  'Fantasy & Games': [
    { label: 'Fantasy Football', href: '/fantasy' },
    { label: 'Fantasy Basketball', href: '/fantasy' },
    { label: 'Fantasy Baseball', href: '/fantasy' },
    { label: 'Tournament Challenge', href: '/fantasy' },
  ],
  'Follow ESPN': [
    { label: 'Twitter / X', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'TikTok', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer
      className="mt-16"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #1a1a1a',
      }}
    >
      {/* Red accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-espn-red to-transparent opacity-40" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                className="text-[10px] font-black uppercase tracking-widest mb-4 text-espn-red"
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[12.5px] font-medium text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: '#1a1a1a' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <EspnLogo className="h-7 w-auto opacity-70" />

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Do Not Sell My Info'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[11px] text-gray-400 hover:text-gray-200 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <p className="text-[11px] text-gray-400 text-center sm:text-right">
            © {new Date().getFullYear()} ESPN Clone
            <span className="hidden sm:inline"> · Built with Next.js & NestJS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
