import { NextResponse, NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // 0. Canonical WWW to non-WWW & HTTP to HTTPS Redirect (301 Moved Permanently)
    const host = request.headers.get('host') || '';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
    const proto = request.headers.get('x-forwarded-proto') || 'https';

    if (!isLocal && (host.startsWith('www.') || proto === 'http')) {
        const nonWwwHost = host.replace(/^www\./, '');
        const newUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${nonWwwHost}`);
        return NextResponse.redirect(newUrl, 301);
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    // 1. Process session update first (refresh if needed)
    const response = await updateSession(request);
    
    let nextResponse;
    if (response) {
        nextResponse = NextResponse.next({
            request: {
                headers: requestHeaders,
            }
        });
        const setCookie = response.headers.get('set-cookie');
        if (setCookie) {
            nextResponse.headers.set('set-cookie', setCookie);
        }
    } else {
        nextResponse = NextResponse.next({
            request: {
                headers: requestHeaders,
            }
        });
    }

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

            if (request.nextUrl.pathname === '/dashboard') {
                if (role === 'admin') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
                if (role === 'client') return NextResponse.redirect(new URL('/dashboard/client', request.url));
                if (role === 'developer') return NextResponse.redirect(new URL('/dashboard/developer', request.url));
                return NextResponse.redirect(new URL('/login', request.url));
            }

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
                    } else if (payload.user.role === 'admin') {
                        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
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
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
