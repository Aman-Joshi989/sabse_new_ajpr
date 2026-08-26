import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ error: 'Vercel Blob token not configured' }, { status: 500 });
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch file from Blob storage' }, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'application/pdf';
    
    // We stream the response back directly to the client
    return new NextResponse(res.body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline', 
      },
    });
  } catch (error: any) {
    console.error('Error downloading private blob:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
