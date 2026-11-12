import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminApi, assertSameOrigin } from '@/lib/admin/guard';
import { getPortfolioItems } from '@/lib/db/queries';
import {
  getAllClientReviewsAdmin,
  updateClientReviewStatus,
  type ReviewStatus,
} from '@/lib/db/reviews';
import { sendClientReviewInviteEmail } from '@/lib/email/contact-mailer';

const VALID_STATUSES: ReadonlySet<ReviewStatus> = new Set([
  'pending_verification',
  'approved',
  'rejected',
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /api/admin/reviews
 * Lists all client review submissions and shipped portfolio engagements for admin moderation.
 */
export async function GET(req: NextRequest) {
  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const [reviews, portfolio] = await Promise.all([
    getAllClientReviewsAdmin(),
    getPortfolioItems().catch(() => []),
  ]);

  return NextResponse.json({
    success: true,
    reviews,
    portfolio: Array.isArray(portfolio)
      ? portfolio.map((p: any) => ({ id: p.id, title: p.title, category: p.category }))
      : [],
  });
}

/**
 * PATCH /api/admin/reviews
 * Approves or rejects a submitted review and revalidates public /reviews cache.
 */
export async function PATCH(req: NextRequest) {
  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json().catch(() => null);
    const reviewId = Number(body?.id);
    const nextStatus = String(body?.status || '') as ReviewStatus;

    if (!Number.isInteger(reviewId) || reviewId <= 0 || !VALID_STATUSES.has(nextStatus)) {
      return NextResponse.json({ error: 'Valid review id and status are required.' }, { status: 400 });
    }

    const updated = await updateClientReviewStatus(reviewId, nextStatus);
    if (!updated) {
      return NextResponse.json({ error: 'Review record not found.' }, { status: 404 });
    }

    revalidatePath('/reviews');
    return NextResponse.json({ success: true, id: reviewId, status: nextStatus });
  } catch (error: any) {
    console.error('[Admin Reviews PATCH] Error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to update review status.' }, { status: 500 });
  }
}

/**
 * POST /api/admin/reviews
 * Sends a direct client review invitation email for an explicit recipient address.
 */
export async function POST(req: NextRequest) {
  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json().catch(() => null);
    const to = String(body?.to || '').trim().toLowerCase();
    const clientName = String(body?.clientName || '').trim();
    const companyName = String(body?.companyName || '').trim() || undefined;
    const projectType = String(body?.projectType || '').trim() || undefined;

    if (!EMAIL_REGEX.test(to) || clientName.length < 2) {
      return NextResponse.json(
        { error: 'Valid client email and name are required.' },
        { status: 400 }
      );
    }

    const result = await sendClientReviewInviteEmail({
      to,
      clientName,
      companyName,
      projectType,
    });

    return NextResponse.json({
      success: true,
      delivered: result.delivered,
      provider: result.provider,
      referenceId: result.referenceId,
    });
  } catch (error: any) {
    console.error('[Admin Reviews POST] Invite error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to send invitation email.' }, { status: 500 });
  }
}

