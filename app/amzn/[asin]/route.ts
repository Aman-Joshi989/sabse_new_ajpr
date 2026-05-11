import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ asin: string }> }
) {
  const resolvedParams = await params;
  
  try {
    const asin = resolvedParams.asin;
    
    // Replace this with the user's actual Amazon Affiliate Tracking ID
    const trackingId = 'ajprworld-21'; 

    // Construct the actual Amazon Affiliate link
    const amazonUrl = `https://www.amazon.in/dp/${asin}?tag=${trackingId}`;

    // Issue a 302 Temporary Redirect to protect SEO
    return NextResponse.redirect(amazonUrl, { status: 302 });

  } catch (error) {
    console.error('Amazon redirect error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
