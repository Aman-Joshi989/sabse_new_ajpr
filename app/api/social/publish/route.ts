import { NextResponse } from 'next/server';
import { broadcastSocialPost } from '@/lib/social/publisher';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      content,
      firstComment,
      platforms,
      target = 'company',
      articleUrl,
      articleTitle,
      articleDescription,
      author,
    } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Post content is required.' },
        { status: 400 }
      );
    }

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: 'At least one destination platform must be selected.' },
        { status: 400 }
      );
    }

    const result = await broadcastSocialPost({
      content: content.trim(),
      firstComment: firstComment ? firstComment.trim() : undefined,
      platforms,
      target,
      articleUrl,
      articleTitle,
      articleDescription,
      author,
    });

    return NextResponse.json({
      success: result.success,
      publishedCount: result.publishedCount,
      totalPlatforms: result.totalPlatforms,
      receipts: result.receipts,
      dbPostId: result.dbPostId,
    });
  } catch (err: any) {
    console.error('Error in /api/social/publish:', err);
    return NextResponse.json(
      { error: err.message || 'Social broadcast failed' },
      { status: 500 }
    );
  }
}
