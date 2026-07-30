import { NextResponse } from 'next/server';
import { publishToLinkedIn } from '@/lib/linkedin';

// This endpoint allows authorized users or cron jobs to trigger a LinkedIn post
export async function POST(req: Request) {
  try {
    // Basic authorization check
    const authHeader = req.headers.get('Authorization');
    const expectedToken = process.env.CRON_SECRET || process.env.CRON_TOKEN;

    // Optional: Only require auth if CRON_SECRET is configured
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { text, articleUrl, articleTitle, articleDescription, companyId, target } = body;

    if (!text || !companyId) {
      return NextResponse.json({ error: 'Missing required fields: text and companyId are required' }, { status: 400 });
    }

    const result = await publishToLinkedIn({
      text,
      articleUrl,
      articleTitle,
      articleDescription,
      companyId,
      target,
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Published to LinkedIn', data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('LinkedIn Publish Route Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
