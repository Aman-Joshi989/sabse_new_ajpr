import { NextResponse } from 'next/server';
import { getSocialToken, ensureDbInitialized } from '@/lib/db/queries';
import { getLiveLinkedInPageAnalytics, AJPR_BENCHMARK_REPORT } from '@/lib/linkedin-pages-api';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await ensureDbInitialized();
    const tokenRecord = await getSocialToken('linkedin');
    const companyId = process.env.LINKEDIN_COMPANY_ID || '107565213';

    if (!tokenRecord || !tokenRecord.access_token) {
      return NextResponse.json({ 
        connected: false,
        followers: AJPR_BENCHMARK_REPORT.followers.total,
        report: {
          ...AJPR_BENCHMARK_REPORT,
          connected: false,
        },
        notice: 'LinkedIn account not yet authorized via OAuth. Showing baseline architectural benchmarks.'
      }, { status: 200 });
    }

    const report = await getLiveLinkedInPageAnalytics(companyId, tokenRecord.access_token);

    return NextResponse.json({
      connected: true,
      followers: report.followers.total,
      report,
    }, { status: 200 });

  } catch (err: any) {
    console.error("Analytics Error:", err);
    return NextResponse.json({ 
      connected: false,
      followers: AJPR_BENCHMARK_REPORT.followers.total,
      report: AJPR_BENCHMARK_REPORT,
      error: err.message 
    }, { status: 200 });
  }
}
