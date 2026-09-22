import { SportDetailPage } from '@/components/sport/SportDetailPage';

interface PageProps {
  params: { uuid: string };
}

export default function SportDetailRoute({ params }: PageProps) {
  return <SportDetailPage uuid={params.uuid} />;
}
