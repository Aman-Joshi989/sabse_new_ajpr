import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const apiKey = process.env.AYRSHARE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ 
      connected: false,
      error: 'Missing AYRSHARE_API_KEY in environment variables.' 
    }, { status: 200 });
  }

  try {
    // 1. Fetch User Profile to see which platforms are connected
    const userRes = await fetch('https://app.ayrshare.com/api/user', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const userData = await userRes.json();
    const activePlatforms = userData.activePlatforms || [];

    // 2. Fetch Analytics for follower counts
    const analyticsRes = await fetch('https://app.ayrshare.com/api/analytics/social', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ platforms: ['twitter', 'instagram', 'youtube'] })
    });

    const analyticsData = await analyticsRes.json();
    
    // Map data to a friendly format for the frontend
    const results = {
      connected: true,
      platforms: {
        twitter: {
          connected: activePlatforms.includes('twitter'),
          followers: analyticsData.twitter?.followersCount || null
        },
        instagram: {
          connected: activePlatforms.includes('instagram'),
          followers: analyticsData.instagram?.followersCount || null
        },
        youtube: {
          connected: activePlatforms.includes('youtube'),
          followers: analyticsData.youtube?.subscriberCount || null
        }
      }
    };

    return NextResponse.json(results);

  } catch (err: any) {
    console.error("Ayrshare API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
