import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createClientProfile } from '@/lib/db/queries';
import { encrypt, SESSION_COOKIE_OPTIONS } from '@/lib/auth';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = request.cookies.get('oauth_state')?.value;

    // Strict CSRF state validation
    if (!code || !state || !storedState || state !== storedState) {
        return NextResponse.redirect(new URL('/login?error=Invalid_OAuth_State', request.url));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
        return NextResponse.redirect(new URL('/login?error=Configuration_Error', request.url));
    }

    try {
        // Exchange authorization code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();
        
        if (!tokenResponse.ok || !tokenData.id_token) {
            return NextResponse.redirect(new URL('/login?error=Authentication_Failed', request.url));
        }

        // Cryptographically verify Google ID Token with Google JWKS
        const { payload: idTokenPayload } = await jwtVerify(tokenData.id_token, GOOGLE_JWKS, {
            issuer: ['https://accounts.google.com', 'accounts.google.com'],
            audience: clientId,
        });

        if (!idTokenPayload.email || !idTokenPayload.email_verified) {
            return NextResponse.redirect(new URL('/login?error=Unverified_Email', request.url));
        }

        const email = (idTokenPayload.email as string).toLowerCase().trim();
        const name = (idTokenPayload.name as string) || email.split('@')[0];

        // Check if user exists in DB
        let user = await getUserByEmail(email);
        
        if (!user) {
            // New OAuth accounts default strictly to 'client' role
            const dummyPassword = crypto.randomUUID() + crypto.randomUUID();
            const hashedPassword = await bcrypt.hash(dummyPassword, 10);

            await createClientProfile({
                name,
                email,
                password: hashedPassword,
                role: 'client'
            });
            user = await getUserByEmail(email);
        }

        if (!user) {
            return NextResponse.redirect(new URL('/login?error=Account_Creation_Failed', request.url));
        }

        // Create JWT session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await encrypt({ 
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role, 
                name: user.name 
            }, 
            expires 
        });

        // Determine redirect based on existing role
        let redirectPath = '/dashboard';
        if (user.role === 'admin') redirectPath = '/dashboard/admin';
        if (user.role === 'client') redirectPath = '/dashboard/client';
        if (user.role === 'developer') redirectPath = '/dashboard/developer';

        const response = NextResponse.redirect(new URL(redirectPath, request.url));
        response.cookies.set("session", session, { expires, ...SESSION_COOKIE_OPTIONS });
        
        // Clean up oauth_state cookie
        response.cookies.delete('oauth_state');

        return response;
    } catch {
        return NextResponse.redirect(new URL('/login?error=Authentication_Failed', request.url));
    }
}
