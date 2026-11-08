/**
 * AJPR WORLD LINKEDIN PAGE GROWTH PROGRAM — CORE ENGINE
 * 
 * Strategic Objectives:
 * 1. Establish AJPR World (urn:li:organization:107565213) as the premier B2B Growth Engineering authority.
 * 2. Execute the "Founder-to-Company Dual Distribution Loop" (Aman Joshi personal profile + AJPR World company page).
 * 3. Drive high-intent traffic to the $1,500 48-Hour Diagnostic Audit without algorithm link penalties (First-Comment trick).
 * 4. Leverage high-dwell visual formats (PDF Carousels & Contrarian Teardowns).
 */

import { Pool } from 'pg';
import {
  GrowthCarouselSlide,
  GrowthProgramPost,
  AJPR_GROWTH_POSTS,
} from './linkedin-growth-posts';

export type { GrowthCarouselSlide, GrowthProgramPost };
export { AJPR_GROWTH_POSTS };

function getPoolInstance(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
  });
}

/**
 * Checks the database for the active LinkedIn token status.
 */
export async function checkLinkedInTokenHealth(): Promise<{
  connected: boolean;
  expired: boolean;
  expiresAt: string | null;
  daysRemaining: number;
  hasToken: boolean;
}> {
  const pool = getPoolInstance();
  if (!pool) {
    return { connected: false, expired: true, expiresAt: null, daysRemaining: 0, hasToken: false };
  }

  try {
    const res = await pool.query(
      "SELECT access_token, expires_at FROM social_tokens WHERE platform = 'linkedin' ORDER BY created_at DESC LIMIT 1"
    );
    if (res.rows.length === 0 || !res.rows[0].access_token) {
      return { connected: false, expired: true, expiresAt: null, daysRemaining: 0, hasToken: false };
    }

    const row = res.rows[0];
    const expiresAt = row.expires_at ? new Date(row.expires_at) : null;
    const now = new Date();

    if (!expiresAt) {
      return { connected: true, expired: false, expiresAt: null, daysRemaining: 60, hasToken: true };
    }

    const diffMs = expiresAt.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const expired = diffMs <= 0;

    return {
      connected: !expired,
      expired,
      expiresAt: expiresAt.toISOString(),
      daysRemaining,
      hasToken: true
    };
  } catch (e) {
    console.error('[Growth Engine] Error checking token health:', e);
    return { connected: false, expired: true, expiresAt: null, daysRemaining: 0, hasToken: false };
  } finally {
    await pool.end();
  }
}

/**
 * Low-level LinkedIn UGC Post sender without dependencies on next/cache.
 */
export async function sendDirectLinkedInPost(params: {
  text: string;
  articleUrl?: string;
  articleTitle?: string;
  articleDescription?: string;
  companyId?: string;
  target?: 'company' | 'person' | 'both';
}): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  const pool = getPoolInstance();
  if (!pool) {
    return { success: false, error: 'Database connection missing.' };
  }

  let accessToken: string | null = null;
  try {
    const res = await pool.query(
      "SELECT access_token FROM social_tokens WHERE platform = 'linkedin' ORDER BY created_at DESC LIMIT 1"
    );
    if (res.rows.length > 0 && res.rows[0].access_token) {
      accessToken = res.rows[0].access_token;
    }
  } catch (err: any) {
    return { success: false, error: `Failed to fetch token: ${err.message}` };
  } finally {
    await pool.end();
  }

  if (!accessToken) {
    return { success: false, error: 'No active LinkedIn access token found in database. Run with --auth-url first.' };
  }

  const companyId = params.companyId || process.env.LINKEDIN_COMPANY_ID || '107565213';
  const target = params.target || 'company';
  const results = {
    person: { attempted: false, success: false, error: null as any, data: null as any },
    company: { attempted: false, success: false, error: null as any, data: null as any },
  };

  const executePost = async (authorUrn: string) => {
    const payload: any = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: params.text,
          },
          shareMediaCategory: params.articleUrl ? 'ARTICLE' : 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    if (params.articleUrl) {
      payload.specificContent['com.linkedin.ugc.ShareContent'].media = [
        {
          status: 'READY',
          description: { text: params.articleDescription || '' },
          originalUrl: params.articleUrl,
          title: { text: params.articleTitle || '' },
        },
      ];
    }

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API returned ${response.status}: ${await response.text()}`);
    }
    return await response.json();
  };

  // 1. Post to personal profile if requested
  if (target === 'person' || target === 'both') {
    results.person.attempted = true;
    try {
      const userReq = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      const userData = await userReq.json();
      if (!userData.sub) throw new Error('Could not fetch user ID (sub) from LinkedIn userinfo');
      const data = await executePost(`urn:li:person:${userData.sub}`);
      results.person.success = true;
      results.person.data = data;
    } catch (e: any) {
      results.person.error = e.message;
      console.error('Personal LinkedIn post failed:', e.message);
    }
  }

  // 2. Post to Company Page
  if (target === 'company' || target === 'both') {
    results.company.attempted = true;
    try {
      const data = await executePost(`urn:li:organization:${companyId}`);
      results.company.success = true;
      results.company.data = data;
    } catch (e: any) {
      results.company.error = e.message;
      console.error('Company LinkedIn post failed:', e.message);
    }
  }

  const isSuccess =
    (target === 'both' && (results.person.success || results.company.success)) ||
    (target === 'person' && results.person.success) ||
    (target === 'company' && results.company.success);

  return {
    success: isSuccess,
    data: results,
    error: isSuccess ? undefined : (results.company.error || results.person.error || 'Publish failed'),
  };
}

/**
 * Publishes a curated Growth Program post directly to the AJPR World LinkedIn Page and/or Founder profile.
 */
export async function executeGrowthPublish(params: {
  postIndex?: number;
  postId?: string;
  target?: 'company' | 'person' | 'both';
  customText?: string;
}): Promise<{
  success: boolean;
  publishedTo: string;
  postTheme: string;
  firstComment: string;
  data?: any;
  error?: string;
}> {
  const companyId = process.env.LINKEDIN_COMPANY_ID || '107565213';
  const target = params.target || 'company';

  // Find post
  let selectedPost = AJPR_GROWTH_POSTS[0];
  if (params.postId) {
    const found = AJPR_GROWTH_POSTS.find(p => p.id === params.postId);
    if (found) selectedPost = found;
  } else if (params.postIndex !== undefined && AJPR_GROWTH_POSTS[params.postIndex]) {
    selectedPost = AJPR_GROWTH_POSTS[params.postIndex];
  }

  const postText = params.customText || `${selectedPost.body}\n\n${selectedPost.hashtags.join(' ')}`;

  const result = await sendDirectLinkedInPost({
    text: postText,
    companyId: companyId,
    target: target,
  });

  return {
    success: result.success,
    publishedTo: target,
    postTheme: selectedPost.theme,
    firstComment: selectedPost.firstComment,
    data: result.data,
    error: result.error,
  };
}
