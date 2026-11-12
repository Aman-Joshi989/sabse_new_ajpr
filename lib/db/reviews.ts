import { sql } from '@/lib/db/queries';

export type ReviewStatus = 'pending_verification' | 'approved' | 'rejected';

export interface PublicClientReview {
  id: number;
  reference_id: string | null;
  client_name: string;
  company_name: string | null;
  role_title: string | null;
  project_type: string;
  rating: number;
  review_text: string;
  external_platform: string | null;
  created_at: string;
}

export interface AdminClientReview extends PublicClientReview {
  client_email: string;
  status: ReviewStatus;
}

/**
 * Ensures the PostgreSQL `client_reviews` table exists before reads or mutations.
 */
export async function ensureClientReviewsTable(): Promise<void> {
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
 * Loads publicly approved client reviews (never includes private client email addresses).
 */
export async function getPublicApprovedReviews(limit: number = 30): Promise<PublicClientReview[]> {
  try {
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
      LIMIT ${limit};
    `;
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

/**
 * Loads all client reviews including email and verification status for admin moderation.
 */
export async function getAllClientReviewsAdmin(): Promise<AdminClientReview[]> {
  try {
    await ensureClientReviewsTable();
    const rows = await sql`
      SELECT
        id,
        reference_id,
        client_name,
        client_email,
        company_name,
        role_title,
        project_type,
        rating,
        review_text,
        external_platform,
        status,
        created_at
      FROM client_reviews
      ORDER BY
        CASE WHEN status = 'pending_verification' THEN 0 WHEN status = 'approved' THEN 1 ELSE 2 END,
        created_at DESC
      LIMIT 100;
    `;
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

/**
 * Persists a new client review submission in pending_verification status.
 */
export async function insertClientReview(input: {
  referenceId: string;
  clientName: string;
  email: string;
  companyName?: string;
  roleTitle?: string;
  projectType: string;
  rating: number;
  reviewText: string;
  externalPlatform?: string;
}): Promise<void> {
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
      ${input.referenceId},
      ${input.clientName},
      ${input.email},
      ${input.companyName || null},
      ${input.roleTitle || null},
      ${input.projectType},
      ${input.rating},
      ${input.reviewText},
      ${input.externalPlatform || null},
      'pending_verification'
    );
  `;
}

/**
 * Updates moderation status of a client review by numeric ID.
 */
export async function updateClientReviewStatus(id: number, status: ReviewStatus): Promise<boolean> {
  await ensureClientReviewsTable();
  const updated = await sql`
    UPDATE client_reviews
    SET status = ${status}
    WHERE id = ${id}
    RETURNING id;
  `;
  return Array.isArray(updated) && updated.length > 0;
}

