import { NextResponse } from 'next/server';
import { sql } from '@/lib/db/queries';
import { dispatchReviewEmails, generateReferenceId } from '@/lib/email/contact-mailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureClientReviewsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS client_reviews (
      id SERIAL PRIMARY KEY,
      reference_id VARCHAR(64) UNIQUE,
      client_name VARCHAR(255) NOT NULL,
      client_email VARCHAR(255) NOT NULL,
      company_name VARCHAR(255),
      role_title VARCHAR(255),
      project_type VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT NOT NULL,
      external_platform VARCHAR(100),
      status VARCHAR(50) NOT NULL DEFAULT 'pending_verification',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

/**
 * GET /api/reviews
 * Returns publicly approved client reviews (emails are never exposed).
 */
export async function GET() {
  try {
    await ensureClientReviewsTable();
    const rows = await sql`
      SELECT
        id,
        reference_id,
        client_name,
        company_name,
        role_title,
        project_type,
        rating,
        review_text,
        external_platform,
        created_at
      FROM client_reviews
      WHERE status = 'approved'
      ORDER BY created_at DESC
      LIMIT 50;
    `;

    return NextResponse.json({
      success: true,
      reviews: Array.isArray(rows) ? rows : [],
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

    await ensureClientReviewsTable();
    await sql`
      INSERT INTO client_reviews (
        reference_id,
        client_name,
        client_email,
        company_name,
        role_title,
        project_type,
        rating,
        review_text,
        external_platform,
        status
      ) VALUES (
        ${referenceId},
        ${clientName},
        ${email},
        ${companyName || null},
        ${roleTitle || null},
        ${projectType},
        ${ratingNum},
        ${reviewText},
        ${externalPlatform || null},
        'pending_verification'
      );
    `;

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
