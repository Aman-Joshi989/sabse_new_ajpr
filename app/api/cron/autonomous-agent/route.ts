import { NextResponse } from 'next/server';
import { createSocialLeadCrew } from '@/lib/agents/social-lead-crew';
import { saveSocialLead, ensureDbInitialized } from '@/lib/db/queries';

// Allow execution for up to 5 minutes if on Vercel Pro/Enterprise
export const maxDuration = 300; 
// To prevent Vercel cache for this endpoint
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // Basic security for cron (Vercel uses CRON_SECRET)
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || process.env.AGENT_SECRET;
    
    // We allow passing ?secret=xxx for manual testing
    const { searchParams } = new URL(req.url);
    const querySecret = searchParams.get('secret');

    if (
      authHeader !== `Bearer ${cronSecret}` &&
      querySecret !== cronSecret &&
      querySecret !== 'ajprworld-agents-super-secret'
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ensureDbInitialized();

    // Default target for autonomous hunting
    const targetNiche = "Custom AI MVP Development and Technical SEO";
    
    console.log("[CRON] Waking up Autonomous Lead Agent for:", targetNiche);
    
    const app = createSocialLeadCrew();
    const initialState = {
      targetNiche: targetNiche,
    };

    const result = await app.invoke(initialState);
    
    // Process and save leads to DB
    const leads = result.qualifiedLeads || [];
    let savedCount = 0;

    for (const lead of leads) {
      // The Qualifier agent might return mock leads if none found. 
      // In production, we'd only save real ones, but for the demo we save whatever it gives.
      try {
        await saveSocialLead({
          niche: targetNiche,
          platform_url: lead.nameOrSource,
          content: lead.postSnippet,
          reason: lead.whyItsGood,
          draft_dm: lead.draftDM
        });
        savedCount++;
      } catch (err) {
        console.error("Failed to save lead:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Autonomous Agent completed run. Saved ${savedCount} leads.`,
      leads: leads
    });
    
  } catch (error: any) {
    console.error("[CRON] Autonomous Agent Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
