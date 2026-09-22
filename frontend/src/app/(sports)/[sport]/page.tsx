import { SportPage } from '@/components/sport/SportPage'

interface PageProps {
  params: { sport: string }
}

export default function SportRoute({ params }: PageProps) {
  return <SportPage sport={params.sport} />
}

export async function generateStaticParams() {
  return [
    { sport: 'football' },
    { sport: 'boxing' },
    { sport: 'tennis' },
    { sport: 'cycling' },
    { sport: 'swimming' },
    { sport: 'running' },
    { sport: 'racing' },
    { sport: 'volleyball' },
    { sport: 'chess' },
    { sport: 'nfl' },
    { sport: 'nba' },
    { sport: 'mlb' },
    { sport: 'nhl' },
    { sport: 'soccer' },
    { sport: 'ncaaf' },
    { sport: 'ncaab' },
    { sport: 'f1' },
    { sport: 'golf' },
    { sport: 'mma' },
  ]
}

