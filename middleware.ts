import { NextResponse, NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // 1. Process session update first (refresh if needed)
    const response = await updateSession(request);
    const nextResponse = response || NextResponse.next();

    // 2. Check Authentication for Dashboard Routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const sessionCookie = request.cookies.get('session')?.value;

        if (!sessionCookie) {
            // Redirect to login if no session
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Verify session content and role
        try {
            const payload = await decrypt(sessionCookie);
            const role = payload.user.role;

            // Strict Role-Based Access Control
            if (request.nextUrl.pathname.startsWith('/dashboard/client') && role !== 'client') {
                return NextResponse.redirect(new URL('/dashboard/developer', request.url));
            }

            if (request.nextUrl.pathname.startsWith('/dashboard/developer') && role !== 'developer') {
                return NextResponse.redirect(new URL('/dashboard/client', request.url));
            }

            if (request.nextUrl.pathname.startsWith('/dashboard/admin') && role !== 'admin') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (e) {
            // Invalid token -> Login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 3. Prevent Logged-in Users from accessing /login
    if (request.nextUrl.pathname === '/login') {
        const sessionCookie = request.cookies.get('session')?.value;
        if (sessionCookie) {
            try {
                const payload = await decrypt(sessionCookie);
                if (payload?.user?.role) {
                    if (payload.user.role === 'client') {
                        return NextResponse.redirect(new URL('/dashboard/client', request.url));
                    } else if (payload.user.role === 'developer') {
                        return NextResponse.redirect(new URL('/dashboard/developer', request.url));
                    }
                }
            } catch (error) {
                // If token invalid, let them proceed to login
            }
        }
    }

    return nextResponse;
}

export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};
