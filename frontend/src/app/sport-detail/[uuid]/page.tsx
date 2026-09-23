import { SportDetailPage } from '@/components/sport/SportDetailPage';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

export default async function SportDetailRoute({ params }: PageProps) {
  const { uuid } = await params;
  return <SportDetailPage uuid={uuid} />;
}
