import { NextResponse } from 'next/server';
import { createLocalPost } from '@/lib/gbp';

export async function POST(request: Request) {
  try {
    // Basic authentication to prevent unauthorized posts.
    // In production, ensure you pass an Authorization header or use a secure secret.
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.GBP_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, summary, url } = body;

    if (!title || !summary || !url) {
      return NextResponse.json({ error: 'Missing required fields: title, summary, url' }, { status: 400 });
    }

    // Call our GBP utility to post to Google
    const result = await createLocalPost(title, summary, url);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('API Route Error [GBP Publish]:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
