import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db/queries';
import { verifyResumeViewToken } from '@/lib/resume/token';
import { requireAdminApi } from '@/lib/admin/guard';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const rawUrl = searchParams.get('url');
    const token = searchParams.get('token');
    const isDownload = searchParams.get('download') === '1' || searchParams.get('download') === 'true';

    let targetUrl: string | null = null;
    let isAuthorized = false;

    // 1. Unguessable UUID Application ID
    if (id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      const rows = await sql`
        SELECT resume_url FROM job_applications WHERE id = ${id} LIMIT 1
      `;
      if (rows && rows.length > 0 && rows[0].resume_url) {
        targetUrl = rows[0].resume_url;
        isAuthorized = true;
      }
    }

    // 2. Signed HMAC Token in URL
    if (!isAuthorized && rawUrl && token) {
      if (verifyResumeViewToken(rawUrl, token)) {
        targetUrl = rawUrl;
        isAuthorized = true;
      }
    }

    // 3. Registered candidate resume in database
    if (!isAuthorized && rawUrl) {
      const rows = await sql`
        SELECT id FROM job_applications WHERE resume_url = ${rawUrl} LIMIT 1
      `;
      if (rows && rows.length > 0) {
        targetUrl = rawUrl;
        isAuthorized = true;
      }
    }

    // 4. Authenticated Admin Session Check
    if (!isAuthorized) {
      const adminCheck = await requireAdminApi(req, { permission: 'resumes:download' }).catch(() => ({ authorized: false }));
      if (adminCheck && 'authorized' in adminCheck && adminCheck.authorized) {
        targetUrl = rawUrl;
        isAuthorized = true;
      }
    }

    if (!isAuthorized || !targetUrl) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Strict Vercel Blob domain check (prevent SSRF and token leakage)
    const parsedUrl = new URL(targetUrl);
    const isBlobHost =
      parsedUrl.hostname.endsWith('.blob.vercel-storage.com') || 
      parsedUrl.hostname === 'blob.vercel-storage.com';

    if (!isBlobHost || !parsedUrl.pathname.startsWith('/resumes/')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return NextResponse.json({ error: 'Internal error: storage token missing' }, { status: 500 });
    }

    const res = await fetch(parsedUrl.toString(), {
      headers: {
        Authorization: `Bearer ${blobToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Not found' }, { status: res.status === 404 ? 404 : 502 });
    }

    const contentType = res.headers.get('content-type') || 'application/pdf';
    const rawFilename = parsedUrl.pathname.split('/').pop() || 'resume.pdf';
    const safeFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const dispositionType = isDownload ? 'attachment' : 'inline';
    
    return new NextResponse(res.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `${dispositionType}; filename="${safeFilename}"`,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (err: any) {
    console.error('Error downloading resume:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
