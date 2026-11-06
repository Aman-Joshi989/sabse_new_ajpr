import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin/guard';

export async function GET(req: NextRequest) {
  const adminCheck = await requireAdminApi(req, { permission: 'resumes:download' });
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const rawUrl = req.nextUrl.searchParams.get('url');
  if (!rawUrl) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  // Reject URL-encoding tricks, percent signs, and directory traversal
  if (rawUrl.includes('%') || rawUrl.includes('..')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const parsedUrl = new URL(rawUrl);

    // Strict Vercel Blob domain check (prevent SSRF and token leakage)
    const isBlobHost = parsedUrl.hostname.endsWith('.blob.vercel-storage.com') || 
                       parsedUrl.hostname === 'blob.vercel-storage.com';
    if (!isBlobHost || !parsedUrl.pathname.startsWith('/resumes/')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }

    const res = await fetch(parsedUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Not found' }, { status: res.status === 404 ? 404 : 502 });
    }

    const contentType = res.headers.get('content-type') || 'application/pdf';
    const rawFilename = parsedUrl.pathname.split('/').pop() || 'resume.pdf';
    const safeFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    return new NextResponse(res.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
