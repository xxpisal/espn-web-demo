import { ScoresPage } from '@/components/sport/ScoresPage'

interface PageProps {
  params: Promise<{ sport: string }>;
}

export default async function ScoresRoute({ params }: PageProps) {
  const { sport } = await params;
  return <ScoresPage sport={sport} />;
}
