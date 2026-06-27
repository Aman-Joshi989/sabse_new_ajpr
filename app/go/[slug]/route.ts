import { getAffiliateLink, recordAffiliateClick } from '@/lib/db/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  
  try {
    // 1. Find the affiliate link in the database
    const link = await getAffiliateLink(resolvedParams.slug);

    if (!link) {
      // Fallback: If not found, redirect to homepage or a 404 page
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Asynchronously record the click for analytics
    // We don't await this so it doesn't block the fast redirect
    recordAffiliateClick(resolvedParams.slug).catch(console.error);

    // 3. Issue a 301 Permanent Redirect to the actual affiliate hoplink.
    // 301 is used so Google passes link equity and avoids temporary redirect warnings.
    return NextResponse.redirect(link.target_url, { status: 301 });

  } catch (error) {
    console.error('Affiliate redirect error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
