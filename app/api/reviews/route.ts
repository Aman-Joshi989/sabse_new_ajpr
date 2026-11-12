import { NextResponse } from 'next/server';
import { dispatchReviewEmails, generateReferenceId } from '@/lib/email/contact-mailer';
import {
  ensureClientReviewsTable,
  getPublicApprovedReviews,
  insertClientReview,
} from '@/lib/db/reviews';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /api/reviews
 * Returns publicly approved client reviews (emails are never exposed).
 */
export async function GET() {
  try {
    await ensureClientReviewsTable();
    const reviews = await getPublicApprovedReviews(50);

    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error: any) {
    console.error('[Reviews API GET] Error:', error?.message || error);
    return NextResponse.json({ success: true, reviews: [] });
  }
}

/**
 * POST /api/reviews
 * Captures verified client review submissions into PostgreSQL with verification moderation
 * and dispatches confirmation + admin verification notifications.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
    }

    const clientName = String(body.clientName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const companyName = String(body.companyName || '').trim();
    const roleTitle = String(body.roleTitle || '').trim();
    const projectType = String(body.projectType || 'Custom Software / Next.js Engineering').trim();
    const reviewText = String(body.reviewText || '').trim();
    const externalPlatform = String(body.externalPlatform || '').trim();
    const ratingNum = Number(body.rating);

    if (clientName.length < 2 || clientName.length > 120) {
      return NextResponse.json({ error: 'Please provide your full name (2–120 characters).' }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid work email for verification.' }, { status: 400 });
    }
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5.' }, { status: 400 });
    }
    if (reviewText.length < 20 || reviewText.length > 2000) {
      return NextResponse.json({ error: 'Please share 20–2,000 characters describing your experience.' }, { status: 400 });
    }

    const referenceId = generateReferenceId('AJPR-REV');

    await insertClientReview({
      referenceId,
      clientName,
      email,
      companyName,
      roleTitle,
      projectType,
      rating: ratingNum,
      reviewText,
      externalPlatform,
    });

    let emailResult = { customerSent: false, adminSent: false };
    try {
      const dispatchRes = await dispatchReviewEmails({
        referenceId,
        clientName,
        email,
        companyName,
        roleTitle,
        projectType,
        rating: ratingNum,
        reviewText,
        externalPlatform,
      });
      emailResult = {
        customerSent: dispatchRes.customerSent,
        adminSent: dispatchRes.adminSent,
      };
    } catch (mailErr: any) {
      console.error('[Reviews API POST] Email notification error:', mailErr?.message || mailErr);
    }

    return NextResponse.json({
      success: true,
      referenceId,
      status: 'pending_verification',
      customerSent: emailResult.customerSent,
      adminSent: emailResult.adminSent,
    });
  } catch (error: any) {
    console.error('[Reviews API POST] Fatal error:', error?.message || error);
    return NextResponse.json({ error: 'Could not save review right now. Please try again.' }, { status: 500 });
  }
}
