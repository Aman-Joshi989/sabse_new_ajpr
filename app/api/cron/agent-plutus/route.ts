import { NextResponse } from 'next/server';
import { getProjectsWithClientForPlutus, insertAgentLog } from '@/lib/db/queries';
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

    console.log('[Plutus] Autonomous cycle running...');
    await insertAgentLog('Plutus', 'Woke up and checked for unpaid projects.');

    const projectsResult = await getProjectsWithClientForPlutus();
    const projects = Array.isArray(projectsResult) ? projectsResult : [];

    if (projects.length === 0) {
      console.log("[Plutus] No projects currently need invoicing.");
      await insertAgentLog('Plutus', 'Scan complete. No projects currently require invoicing.');
      return NextResponse.json({ success: true, agent: 'Plutus', action: 'No unpaid projects found', processedCount: 0 });
    }

    let invoicesSent = 0;

    let persona = "You are Plutus, the Finance Manager.";
    try {
      persona = fs.readFileSync(path.join(process.cwd(), 'agents/personas/PLUTUS_SOUL.md'), 'utf-8');
    } catch (e) {
      console.warn("Could not read PLUTUS_SOUL.md. Using fallback persona.");
    }

    for (const project of projects) {
      if (!project.client_email) continue;
      
      console.log(`[Plutus] Sending invoice for project: ${project.title}`);

      const amountDue = project.status === 'Not Started' ? (project.total_value * 0.5) : project.pending_value;

      const prompt = `
        ${persona}
        
        You are writing a payment request email to "${project.client_name || 'Client'}".
        Project: "${project.title}"
        Amount Due: $${amountDue}
        Status: "${project.status}"
        
        Write a professional, firm, but polite invoice/payment request email.
        - Clearly state the amount due ($${amountDue}).
        - If the project is "Not Started", explain that this is the 50% deposit required to begin engineering work.
        - If the project is "Completed", explain that this is the final payment prior to hand-off.
        - Instruct them to reply to this email for the secure payment link.
        
        Return EXACTLY a JSON object with these keys (no markdown formatting or backticks outside of the JSON string):
        {
          "subject": "Invoice / Payment Required for ${project.title}",
          "html_body": "The email body in HTML format (using <p> and <br> tags). End it with your signature."
        }
      `;

      try {
        const { text } = await generateText({
          model: google('gemini-2.5-flash'), 
          prompt,
        });

        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiEmail = JSON.parse(cleanedText);

        const success = await sendColdEmail(project.client_email, aiEmail.subject, aiEmail.html_body);

        if (success) {
          await insertAgentLog('Plutus', `Successfully sent invoice of $${amountDue} to ${project.client_name || 'Client'}.`);
          invoicesSent++;
        } else {
          await insertAgentLog('Plutus', `Failed to send invoice to ${project.client_name}.`, 'error');
        }
      } catch (err) {
        console.error(`[Plutus] AI Generation failed for project ${project.id}:`, err);
        await insertAgentLog('Plutus', `AI Generation failed for project ${project.id}.`, 'error');
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    await insertAgentLog('Plutus', `Cycle complete. Sent ${invoicesSent} invoices.`);

    return NextResponse.json({ 
      success: true, 
      agent: 'Plutus',
      action: 'Audited profitability and generated invoices',
      processedCount: invoicesSent 
    });
  } catch (error: any) {
    console.error('[Plutus Cron Error]', error);
    await insertAgentLog('Plutus', `Fatal Error: ${error.message}`, 'error');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
