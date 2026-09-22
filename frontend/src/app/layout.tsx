import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { ScoresTicker } from '@/components/scores/ScoresTicker'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'ESPN: Serving sports fans. Anytime. Anywhere. - Global Edition',
  description: 'Visit ESPN Global for live scores, football transfers, highlights and sports news across Premier League, F1, Cricket, Tennis, NBA and international sports.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('espn_theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-espn-darker min-h-screen text-espn-text">
        <Providers>
          <ScoresTicker />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#2d2d2d',
                color: '#d0d0d0',
                border: '1px solid #444',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
