import { ScoresPage } from '@/components/sport/ScoresPage'

interface PageProps {
  params: { sport: string }
}

export default function ScoresRoute({ params }: PageProps) {
  return <ScoresPage sport={params.sport} />
}
