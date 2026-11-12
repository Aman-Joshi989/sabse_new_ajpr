import { requireAdmin } from '@/lib/admin/guard';
import { getPortfolioItems } from '@/lib/db/queries';
import { getAllClientReviewsAdmin } from '@/lib/db/reviews';
import AdminReviewsClient from './AdminReviewsClient';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
  await requireAdmin();

  const [reviews, portfolio] = await Promise.all([
    getAllClientReviewsAdmin(),
    getPortfolioItems().catch(() => []),
  ]);

  const portfolioClients = Array.isArray(portfolio)
    ? portfolio.map((p: any) => ({
        id: Number(p.id),
        title: String(p.title || ''),
        category: p.category ? String(p.category) : undefined,
      }))
    : [];

  return (
    <AdminReviewsClient
      initialReviews={reviews}
      portfolioClients={portfolioClients}
    />
  );
}

