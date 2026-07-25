import { NextResponse } from 'next/server';
import { saveSocialToken, ensureDbInitialized } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  if (error) {
    return NextResponse.json({ error, description: errorDescription }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided.' }, { status: 400 });
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.NODE_ENV === 'production' 
    ? 'https://ajprworld.com/api/auth/linkedin/callback'
    : 'http://localhost:3000/api/auth/linkedin/callback';

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('LinkedIn Token Error:', tokenData);
      return NextResponse.json({ error: 'Failed to exchange token', details: tokenData }, { status: 500 });
    }

    // Save token to DB
    await ensureDbInitialized();
    await saveSocialToken('linkedin', tokenData.access_token, tokenData.expires_in);

    // Redirect back to dashboard
    return NextResponse.redirect(new URL('/dashboard/admin/social-media', req.url));
  } catch (err: any) {
    console.error('LinkedIn Callback Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
