import { NextResponse } from 'next/server';
import { getLeadsForHermes, updateLeadStatus, insertAgentLog } from '@/lib/db/queries';
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

    console.log('[Hermes] Autonomous cycle running...');
    await insertAgentLog('Hermes', 'Woke up and checked for leads requiring closing.');

    // 1. Fetch leads that are 'contacted' or 'in_progress'
    const leadsResult = await getLeadsForHermes();
    const leads = Array.isArray(leadsResult) ? leadsResult : [];

    if (leads.length === 0) {
      console.log("[Hermes] No leads currently need follow-ups.");
      await insertAgentLog('Hermes', 'Scan complete. No leads currently need follow-ups.');
      return NextResponse.json({ success: true, agent: 'Hermes', action: 'No leads found', processedCount: 0 });
    }

    let emailsSent = 0;

    // 2. Load Hermes' Persona
    let persona = "You are Hermes, an elite closer.";
    try {
      persona = fs.readFileSync(path.join(process.cwd(), 'hermes-agent/SOUL.md'), 'utf-8');
    } catch (e) {
      console.warn("Could not read Hermes SOUL.md. Using fallback persona.");
    }

    // 3. Process Leads
    for (const lead of leads) {
      console.log(`[Hermes] Processing lead: ${lead.name} (${lead.email})`);

      const prompt = `
        ${persona}
        
        You are following up with a lead named "${lead.name}" at "${lead.company || 'their company'}".
        Their current status is "${lead.status}".
        
        Write a hyper-personalized, assertive follow-up email. 
        - Your goal is to get them on a 15-minute discovery call this week.
        - Emphasize urgency and the cost of inaction.
        - Do not be overly polite; be authoritative and valuable.
        
        Return EXACTLY a JSON object with these keys (no markdown formatting or backticks outside of the JSON string):
        {
          "subject": "A catchy, urgent subject line",
          "html_body": "The email body in HTML format (using <p> and <br> tags). End it with your signature."
        }
      `;

      try {
        const { text } = await generateText({
          model: google('gemini-2.5-flash'), // Using flash for fast generation
          prompt,
        });

        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiEmail = JSON.parse(cleanedText);

        const success = await sendColdEmail(lead.email, aiEmail.subject, aiEmail.html_body);

        if (success) {
          await updateLeadStatus(lead.id, 'in_progress');
          await insertAgentLog('Hermes', `Successfully sent follow-up email to ${lead.name} and updated status to in_progress.`);
          emailsSent++;
        } else {
          await insertAgentLog('Hermes', `Failed to send email to ${lead.name}.`, 'error');
        }
      } catch (err) {
        console.error(`[Hermes] AI Generation failed for ${lead.name}:`, err);
        await insertAgentLog('Hermes', `AI Generation failed for ${lead.name}.`, 'error');
      }

      await new Promise(r => setTimeout(r, 2000)); // Rate limiting
    }

    await insertAgentLog('Hermes', `Cycle complete. Followed up with ${emailsSent} leads.`);

    return NextResponse.json({ 
      success: true, 
      agent: 'Hermes',
      action: 'Followed up with active leads',
      processedCount: emailsSent 
    });
  } catch (error: any) {
    console.error('[Hermes Cron Error]', error);
    await insertAgentLog('Hermes', `Fatal Error: ${error.message}`, 'error');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
