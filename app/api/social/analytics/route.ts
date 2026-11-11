import { NextResponse } from 'next/server';
import { getNativePlatformStatuses, getRecentSocialBroadcasts } from '@/lib/social/publisher';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const [statusData, recentPosts] = await Promise.all([
      getNativePlatformStatuses(),
      getRecentSocialBroadcasts(10),
    ]);

    return NextResponse.json({
      success: true,
      connected: statusData.connected,
      platforms: statusData.platforms,
      recentPosts,
    });
  } catch (err: any) {
    console.error('Error in /api/social/analytics:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch native social analytics' },
      { status: 500 }
    );
  }
}

