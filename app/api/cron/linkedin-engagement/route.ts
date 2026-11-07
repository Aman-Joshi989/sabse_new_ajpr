import { NextRequest, NextResponse } from 'next/server';
import { executeGrowthPublish, AJPR_GROWTH_POSTS } from '@/lib/linkedin-growth-engine';
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
    console.log('[LinkedIn Growth Engine] Starting autonomous publish cycle...');
    const postIndexParam = req.nextUrl.searchParams.get('index');
    const targetParam = (req.nextUrl.searchParams.get('target') || 'both') as 'company' | 'person' | 'both';
    
    // Choose curated post based on current day or index param
    let chosenIndex = 0;
    if (postIndexParam !== null) {
      const parsed = parseInt(postIndexParam, 10);
      if (!isNaN(parsed) && AJPR_GROWTH_POSTS[parsed]) {
        chosenIndex = parsed;
      }
    } else {
      chosenIndex = Math.floor(Math.random() * AJPR_GROWTH_POSTS.length);
    }

    const postToPublish = AJPR_GROWTH_POSTS[chosenIndex];
    console.log(`[LinkedIn Growth Engine] Publishing theme: ${postToPublish.theme} (Target: ${targetParam})`);
    
    try {
      await insertAgentLog('hermes', `Publishing LinkedIn Growth post: "${postToPublish.theme}"`);
    } catch (e) {
      console.warn('Notice logging to agent table:', e);
    }

    const postResult = await executeGrowthPublish({
      postIndex: chosenIndex,
      target: targetParam,
    });

    if (postResult.success) {
      try {
        await insertAgentLog('hermes', `Successfully published to LinkedIn: "${postToPublish.theme}"`);
      } catch (e) {}

      return NextResponse.json({ 
        success: true, 
        theme: postToPublish.theme, 
        published: true, 
        target: postResult.publishedTo,
        data: postResult.data,
        firstComment: postToPublish.firstComment,
        carouselTitle: postToPublish.carousel.title,
      }, { status: 200 });
    } else {
      console.warn('LinkedIn publish returned notice:', postResult.error);
      try {
        await insertAgentLog('hermes', `LinkedIn publish notice: ${postResult.error}`, 'warn');
      } catch (e) {}

      return NextResponse.json({ 
        success: false, 
        theme: postToPublish.theme, 
        error: postResult.error,
        previewText: postToPublish.body.slice(0, 300) + '...',
        firstComment: postToPublish.firstComment,
        carouselTitle: postToPublish.carousel.title,
      }, { status: 200 });
    }
  } catch (error: any) {
    console.error('[LinkedIn Growth Engine Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
