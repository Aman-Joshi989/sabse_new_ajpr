import { NextResponse } from 'next/server';
import { publishToFacebook } from '@/lib/facebook';

export async function POST(request: Request) {
  try {
    // Basic authentication to prevent unauthorized posting.
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.FACEBOOK_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { message, url } = body;

    if (!message) {
      return NextResponse.json({ error: 'Missing required field: message' }, { status: 400 });
    }

    // Call our Graph API utility
    const result = await publishToFacebook(message, url);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('API Route Error [Facebook Publish]:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
