import { TeamsPage } from '@/components/sport/TeamsPage'

interface PageProps {
  params: { sport: string }
}

export default function TeamsRoute({ params }: PageProps) {
  return <TeamsPage sport={params.sport} />
}
