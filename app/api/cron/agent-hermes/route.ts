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
      console.log(`[Hermes] Processing lead: ${lead.name} (${lead.email}) [status: ${lead.status}]`);

      let stageInstruction = "";
      let nextStatus = "contacted";

      if (lead.status === 'new') {
        nextStatus = 'contacted';
        stageInstruction = `
        This is an INITIAL RESPONSE to a new lead.
        They generated a report using: "${lead.utm_source || 'AJPR World Tech Tools'}".
        Findings / Calculator data: "${lead.budget || 'Inquiry received'}"
        Breakdown / Details: "${lead.tech_stack || 'Standard tech stack'}"
        
        Acknowledge their exact numbers and calculations. Provide a direct, authoritative breakdown of how Aman Joshi and our engineering team at AJPR World automate this exact friction in 4 weeks. Invite them to a 15-minute technical discovery call to review their custom automation architecture.
        `;
      } else if (lead.status === 'contacted') {
        nextStatus = 'in_progress';
        stageInstruction = `
        This is a FOLLOW-UP email (Status: contacted).
        They haven't booked a call yet.
        Emphasize the ongoing cost of inaction regarding "${lead.budget || 'their tech bottlenecks'}".
        Offer two specific time slots this week for a 15-minute call with Aman Joshi. Keep it high-conviction and concise.
        `;
      } else {
        nextStatus = 'followup_completed';
        stageInstruction = `
        This is a FINAL STRATEGIC FOLLOW-UP (Status: in_progress).
        Inform them that our sprint capacity for next month is filling up.
        Provide a link to book a direct 15-minute slot or reply with their preferred time.
        `;
      }

      const prompt = `
        ${persona}
        
        Lead Details:
        Name: "${lead.name}"
        Company: "${lead.company || lead.company_size || 'their company'}"
        Current Pipeline Stage: "${lead.status}"
        
        Stage Directives:
        ${stageInstruction}
        
        Output format: Return EXACTLY a JSON object with keys:
        {
          "subject": "Compelling, urgent subject line tailored to their issue",
          "html_body": "HTML formatted email body (<p>, <br>, <strong>). End with: <br><br>Best regards,<br><strong>Hermes</strong><br>Lead AI Technical Consultant | AJPR World<br><small>Acting on behalf of Aman Joshi, Founder</small>"
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
          await updateLeadStatus(lead.id, nextStatus);
          await insertAgentLog('Hermes', `Sent stage [${lead.status} -> ${nextStatus}] email to ${lead.name} (${lead.email}).`);
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
