import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
};

const getSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (process.env.NODE_ENV === 'production') {
        if (!secret || secret.length < 32) {
            throw new Error('FATAL: JWT_SECRET must be configured and at least 32 characters in production.');
        }
        return new TextEncoder().encode(secret);
    }
    // Development / test fallback with loud warning
    if (!secret) {
        console.warn('WARNING: JWT_SECRET is not defined. Using temporary dev secret.');
        return new TextEncoder().encode('temporary-dev-only-secret-do-not-use-in-production-32chars');
    }
    return new TextEncoder().encode(secret);
};

export async function encrypt(payload: any) {
    const key = getSecretKey();
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Session lasts 24 hours
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const key = getSecretKey();
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch {
        return null;
    }
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;

    // Refresh session expiration if needed (simplified for now)
    const parsed = await decrypt(session);
    if (!parsed) return;
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // +1 day

    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        ...SESSION_COOKIE_OPTIONS,
        expires: parsed.expires,
    });
    return res;
}
