import { NextResponse } from 'next/server';
import { getSocialToken, ensureDbInitialized } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await ensureDbInitialized();
    const tokenRecord = await getSocialToken('linkedin');
    
    if (!tokenRecord || !tokenRecord.access_token) {
      return NextResponse.json({ 
        connected: false, 
        error: 'Not connected' 
      }, { status: 200 });
    }

    const companyId = process.env.LINKEDIN_COMPANY_ID;
    if (!companyId) {
      return NextResponse.json({ 
        connected: true, 
        error: 'Missing LINKEDIN_COMPANY_ID in environment variables.',
        followers: null
      }, { status: 200 }); // Return 200 so UI can handle gracefully
    }

    // Fetch Follower count using LinkedIn v2 API (networkSizes)
    // The exact endpoint might vary depending on API version permissions. 
    // Usually: GET https://api.linkedin.com/v2/networkSizes/urn:li:organization:{id}?edgeType=CompanyFollowedByMember
    const linkedInRes = await fetch(`https://api.linkedin.com/v2/networkSizes/urn:li:organization:${companyId}?edgeType=CompanyFollowedByMember`, {
      headers: {
        'Authorization': `Bearer ${tokenRecord.access_token}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    const data = await linkedInRes.json();

    if (!linkedInRes.ok) {
      console.error("LinkedIn API Error:", data);
      return NextResponse.json({ 
        connected: true, 
        error: data.message || 'API request failed',
        followers: null 
      }, { status: 200 });
    }

    return NextResponse.json({
      connected: true,
      followers: data.firstDegreeSize || 0
    });

  } catch (err: any) {
    console.error("Analytics Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
