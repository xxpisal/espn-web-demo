import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Navbar } from '@/components/layout/Navbar'
import { ScoresTicker } from '@/components/scores/ScoresTicker'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'ESPN - Serving Sports Fans. Anytime. Anywhere.',
  description: 'Visit ESPN for live scores, highlights and sports news. Stream exclusive games on ESPN and play fantasy sports.',
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
    <html lang="en">
      <body className="bg-espn-darker min-h-screen">
        <Providers>
          <Navbar />
          <ScoresTicker />
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
