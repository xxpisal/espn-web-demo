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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body className="bg-espn-darker min-h-screen text-espn-text antialiased">
        <Providers>
          <ScoresTicker />
          <Navbar />
          <main className="min-h-screen animate-fade-in">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1e1e1e',
                color: '#e0e0e0',
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              },
              success: {
                iconTheme: { primary: '#CC0000', secondary: '#ffffff' },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
