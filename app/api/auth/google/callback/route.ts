import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, createClientProfile } from '@/lib/db/queries';
import { encrypt } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = request.cookies.get('oauth_state')?.value;

    if (!code || state !== storedState) {
        return NextResponse.redirect(new URL('/login?error=Invalid_OAuth_State', request.url));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    try {
        // Exchange code for token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: clientId!,
                client_secret: clientSecret!,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();
        
        if (!tokenResponse.ok) {
            console.error("Token exchange failed", tokenData);
            return NextResponse.redirect(new URL('/login?error=Authentication_Failed', request.url));
        }

        // Get user info
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });

        const googleUser = await userResponse.json();
        
        if (!googleUser.email) {
            return NextResponse.redirect(new URL('/login?error=No_Email_Provided', request.url));
        }

        // Check if user exists in DB
        let user = await getUserByEmail(googleUser.email);
        
        if (!user) {
            // Create a secure dummy password since they authenticate via Google
            const dummyPassword = crypto.randomUUID() + crypto.randomUUID();
            const hashedPassword = await bcrypt.hash(dummyPassword, 10);

            // Create user
            await createClientProfile({
                name: googleUser.name || googleUser.email.split('@')[0],
                email: googleUser.email,
                password: hashedPassword,
                role: 'client'
            });
            // Fetch newly created user to get the ID
            user = await getUserByEmail(googleUser.email);
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

        // Determine Redirect based on role
        let redirectPath = '/dashboard';
        if (user.role === 'admin') redirectPath = '/dashboard/admin';
        if (user.role === 'client') redirectPath = '/dashboard/client';
        if (user.role === 'developer') redirectPath = '/dashboard/developer';

        // Redirect to dashboard
        const response = NextResponse.redirect(new URL(redirectPath, request.url));
        response.cookies.set("session", session, { expires, httpOnly: true, path: '/' });
        
        // Clean up oauth_state
        response.cookies.delete('oauth_state');

        return response;
        
    } catch (error) {
        console.error("Google Callback Error", error);
        return NextResponse.redirect(new URL('/login?error=Internal_Server_Error', request.url));
    }
}
