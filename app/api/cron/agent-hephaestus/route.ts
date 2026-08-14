import { NextResponse } from 'next/server';
import { getLeadsForHephaestus, updateLeadStatus, insertAgentLog } from '@/lib/db/queries';
import { generateText } from 'ai';
import { createGoogle } from '@ai-sdk/google';
import { sendColdEmail } from '@/lib/email/nodemailer';
import fs from 'fs';
import path from 'path';

const google = createGoogle({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
});

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const secret = new URL(req.url).searchParams.get('secret');

    if (
      authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
      secret !== process.env.CRON_SECRET &&
      process.env.NODE_ENV === 'production'
    ) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('[Hephaestus] Autonomous cycle running...');
    await insertAgentLog('Hephaestus', 'Woke up and checked for leads needing technical scoping.');

    const leadsResult = await getLeadsForHephaestus();
    const leads = Array.isArray(leadsResult) ? leadsResult : [];

    if (leads.length === 0) {
      console.log("[Hephaestus] No leads currently need scoping.");
      await insertAgentLog('Hephaestus', 'Scan complete. No leads currently need technical scoping.');
      return NextResponse.json({ success: true, agent: 'Hephaestus', action: 'No leads found', processedCount: 0 });
    }

    let scopesSent = 0;

    let persona = "You are Hephaestus, an elite technical architect.";
    try {
      persona = fs.readFileSync(path.join(process.cwd(), 'agents/personas/HEPHAESTUS_SOUL.md'), 'utf-8');
    } catch (e) {
      console.warn("Could not read Hephaestus SOUL.md. Using fallback persona.");
    }

    for (const lead of leads) {
      console.log(`[Hephaestus] Scoping project for: ${lead.name} (${lead.email})`);

      const prompt = `
        ${persona}
        
        You are writing to a potential client named "${lead.name}" at "${lead.company || 'their company'}".
        Industry: "${lead.industry || 'Unknown'}"
        Focus Area: "${lead.focus || 'Custom Software Development'}"
        
        Write a high-level technical scope and architecture proposal email.
        - Recommend a modern tech stack (e.g., Next.js, PostgreSQL, AI integrations if applicable).
        - Provide a rough 3-phase timeline (e.g., Discovery, MVP Build, Launch).
        - Keep it professional, highly technical but accessible, and establish authority.
        
        Return EXACTLY a JSON object with these keys (no markdown formatting or backticks outside of the JSON string):
        {
          "subject": "A compelling subject line about their technical architecture",
          "html_body": "The email body in HTML format (using <p>, <ul>, and <br> tags). End it with your signature."
        }
      `;

      try {
        const { text } = await generateText({
          model: google('gemini-2.5-flash'), 
          prompt,
        });

        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiEmail = JSON.parse(cleanedText);

        const success = await sendColdEmail(lead.email, aiEmail.subject, aiEmail.html_body);

        if (success) {
          await updateLeadStatus(lead.id, 'scoping_sent');
          await insertAgentLog('Hephaestus', `Successfully designed and emailed technical scope to ${lead.name}.`);
          scopesSent++;
        } else {
          await insertAgentLog('Hephaestus', `Failed to send scoping email to ${lead.name}.`, 'error');
        }
      } catch (err) {
        console.error(`[Hephaestus] AI Generation failed for ${lead.name}:`, err);
        await insertAgentLog('Hephaestus', `AI Scoping failed for ${lead.name}.`, 'error');
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    await insertAgentLog('Hephaestus', `Cycle complete. Scoped ${scopesSent} projects.`);

    return NextResponse.json({ 
      success: true, 
      agent: 'Hephaestus',
      action: 'Generated technical scopes',
      processedCount: scopesSent 
    });
  } catch (error: any) {
    console.error('[Hephaestus Cron Error]', error);
    await insertAgentLog('Hephaestus', `Fatal Error: ${error.message}`, 'error');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
