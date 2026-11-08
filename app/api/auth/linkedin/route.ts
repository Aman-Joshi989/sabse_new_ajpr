import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.NODE_ENV === 'production' 
    ? 'https://ajprworld.com/api/auth/linkedin/callback'
    : 'http://localhost:3000/api/auth/linkedin/callback';
  
  if (!clientId) {
    return NextResponse.json({ error: 'Missing LINKEDIN_CLIENT_ID' }, { status: 500 });
  }

  const url = new URL(req.url);
  const requestedScope = url.searchParams.get('scope');

  // Authorized scope for Pages Data Portability API on Client ID 86fx9twqsa15jt:
  // r_dma_admin_pages_content grants full page analytics, posts, comments, engagement & leads!
  let scope = 'r_dma_admin_pages_content';
  if (requestedScope === 'member') {
    scope = 'w_member_social openid profile email';
  } else if (requestedScope === 'org') {
    scope = 'w_organization_social r_organization_social w_member_social openid profile email';
  } else if (requestedScope) {
    scope = requestedScope;
  }
  const state = Math.random().toString(36).substring(7);

  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;

  return NextResponse.redirect(linkedInAuthUrl);
}
