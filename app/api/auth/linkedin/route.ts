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

  // Standard scopes for Sign In with LinkedIn and Share on LinkedIn (requires 'Share on LinkedIn' and 'Sign In with LinkedIn using OpenID Connect' products enabled in LinkedIn Developer Portal)
  const scope = 'w_member_social openid profile email';
  const state = Math.random().toString(36).substring(7);

  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=${encodeURIComponent(scope)}`;

  return NextResponse.redirect(linkedInAuthUrl);
}
