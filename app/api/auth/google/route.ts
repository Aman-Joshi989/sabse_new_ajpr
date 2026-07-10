import { NextResponse } from 'next/server';

export async function GET() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    
    // Fallback if missing keys in dev mode to prevent crashes, though the flow will fail
    if (!clientId) {
        return NextResponse.json(
            { error: "GOOGLE_CLIENT_ID is not configured in environment variables." }, 
            { status: 500 }
        );
    }

    // Always use localhost:3000 for local dev if NEXT_PUBLIC_BASE_URL is not set
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const state = crypto.randomUUID();

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}&access_type=offline&prompt=consent`;

    const response = NextResponse.redirect(authUrl);
    
    // Store state in a cookie to prevent CSRF attacks
    response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 10 // 10 minutes
    });

    return response;
}
