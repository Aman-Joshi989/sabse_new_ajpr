import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const apiKey = process.env.AYRSHARE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ 
      error: 'Missing AYRSHARE_API_KEY in environment variables.' 
    }, { status: 500 });
  }

  try {
    const { post, platforms, mediaUrls } = await req.json();

    if (!post || !platforms || platforms.length === 0) {
      return NextResponse.json({ error: 'Missing post content or platforms array.' }, { status: 400 });
    }

    const payload: any = {
      post,
      platforms,
    };

    if (mediaUrls && mediaUrls.length > 0) {
      payload.mediaUrls = mediaUrls;
    }

    const ayrshareRes = await fetch('https://app.ayrshare.com/api/post', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await ayrshareRes.json();
    
    if (data.status === 'error' || !ayrshareRes.ok) {
      console.error("Ayrshare Post Error:", data);
      return NextResponse.json({ error: data.message || 'Failed to post to Ayrshare' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (err: any) {
    console.error("Ayrshare Post Exception:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
