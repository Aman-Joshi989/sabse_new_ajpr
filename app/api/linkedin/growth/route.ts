import { NextRequest, NextResponse } from 'next/server';
import { 
  AJPR_GROWTH_POSTS, 
  checkLinkedInTokenHealth, 
  executeGrowthPublish 
} from '@/lib/linkedin-growth-engine';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const health = await checkLinkedInTokenHealth();
  
  return NextResponse.json({
    status: 'ok',
    companyTarget: 'urn:li:organization:107565213 (AJPR World)',
    tokenHealth: health,
    queueCount: AJPR_GROWTH_POSTS.length,
    posts: AJPR_GROWTH_POSTS.map((p, idx) => ({
      index: idx,
      id: p.id,
      day: p.dayOfWeek,
      time: p.suggestedTime,
      pillar: p.pillarTitle,
      theme: p.theme,
      carouselSlidesCount: p.carousel.slides.length,
      cta: p.callToAction,
    }))
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { postIndex, postId, target, customText } = body;

    const result = await executeGrowthPublish({
      postIndex: postIndex !== undefined ? Number(postIndex) : 0,
      postId,
      target: target || 'company',
      customText,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully published to LinkedIn!',
        result,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to publish to LinkedIn.',
        result,
      }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Internal server error',
    }, { status: 500 });
  }
}

