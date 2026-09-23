import { TeamsPage } from '@/components/sport/TeamsPage'

interface PageProps {
  params: Promise<{ sport: string }>;
}

export default async function TeamsRoute({ params }: PageProps) {
  const { sport } = await params;
  return <TeamsPage sport={sport} />;
}
