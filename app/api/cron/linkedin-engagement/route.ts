import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { publishToLinkedIn } from '@/lib/linkedin';
import { CURATED_LINKEDIN_POSTS } from '@/lib/linkedin-posts';
import { insertAgentLog } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const apiKey = process.env.AJPR_API_KEY;
  const cronSecret = process.env.CRON_SECRET;
  
  const queryKey = req.nextUrl.searchParams.get('key');
  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
  const providedKey = (queryKey || authHeader?.replace('Bearer ', '') || '').trim();

  const isAuthorized = (apiKey && providedKey === apiKey) || (cronSecret && providedKey === cronSecret) || process.env.NODE_ENV !== 'production';
  
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    console.log('[LinkedIn Engine] Starting autonomous high-reach publish cycle...');
    const companyId = process.env.LINKEDIN_COMPANY_ID || '12345678';
    const postIndexParam = req.nextUrl.searchParams.get('index');
    
    // Choose curated post based on current day or index param
    let postToPublish = CURATED_LINKEDIN_POSTS[0];
    if (postIndexParam !== null) {
      const idx = parseInt(postIndexParam, 10);
      if (!isNaN(idx) && CURATED_LINKEDIN_POSTS[idx]) {
        postToPublish = CURATED_LINKEDIN_POSTS[idx];
      }
    } else {
      // Pick random from curated queue
      postToPublish = CURATED_LINKEDIN_POSTS[Math.floor(Math.random() * CURATED_LINKEDIN_POSTS.length)];
    }

    const fullPostText = `${postToPublish.text}\n\n${postToPublish.hashtags.join(' ')}`;

    console.log(`[LinkedIn Engine] Publishing theme: ${postToPublish.theme}`);
    await insertAgentLog('hermes', `Publishing LinkedIn post: "${postToPublish.theme}"`);

    const postResult = await publishToLinkedIn({
      text: fullPostText,
      companyId: companyId,
      target: 'both', // Publishes to company page and personal profile
    });

    if (postResult.success) {
      await insertAgentLog('hermes', `Successfully published to LinkedIn: "${postToPublish.theme}"`);
      return NextResponse.json({ 
        success: true, 
        theme: postToPublish.theme, 
        published: true, 
        data: postResult.data,
        firstComment: postToPublish.firstComment 
      }, { status: 200 });
    } else {
      console.warn('LinkedIn publish returned warning/error:', postResult.error);
      await insertAgentLog('hermes', `LinkedIn publish notice: ${postResult.error}`, 'warn');
      return NextResponse.json({ 
        success: false, 
        theme: postToPublish.theme, 
        error: postResult.error,
        previewText: fullPostText,
        firstComment: postToPublish.firstComment
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error('[LinkedIn Engine Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
