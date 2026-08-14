import { NextResponse } from 'next/server';
import { getProjectsWithClientForHera, insertAgentLog } from '@/lib/db/queries';
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

    console.log('[Hera] Autonomous cycle running...');
    await insertAgentLog('Hera', 'Woke up and checked for active client projects.');

    const projectsResult = await getProjectsWithClientForHera();
    const projects = Array.isArray(projectsResult) ? projectsResult : [];

    if (projects.length === 0) {
      console.log("[Hera] No active projects need updates.");
      return NextResponse.json({ success: true, agent: 'Hera', action: 'No projects found', processedCount: 0 });
    }

    let reportsSent = 0;

    let persona = "You are Hera, the Client Success Manager.";
    try {
      persona = fs.readFileSync(path.join(process.cwd(), 'agents/personas/HERA_SOUL.md'), 'utf-8');
    } catch (e) {
      console.warn("Could not read HERA_SOUL.md. Using fallback persona.");
    }

    for (const project of projects) {
      if (!project.client_email) continue;
      
      console.log(`[Hera] Sending update for project: ${project.title}`);

      const prompt = `
        ${persona}
        
        You are writing a weekly status update email to your client "${project.client_name || 'Valued Client'}".
        Project: "${project.title}"
        Status: "${project.status}"
        Progress: ${project.progress_percent}% complete
        Hours Logged: ${project.hours_used} out of ${project.total_hours}
        
        Write a professional, warm, and reassuring weekly progress report.
        - Highlight the progress made (${project.progress_percent}%).
        - If they are nearing their hours limit, gently remind them about scope and potential overages.
        - Set a positive tone for next week's deliverables.
        
        Return EXACTLY a JSON object with these keys (no markdown formatting or backticks outside of the JSON string):
        {
          "subject": "Weekly Update: ${project.title}",
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
          await insertAgentLog('Hera', `Successfully sent weekly progress report to ${project.client_name || 'Client'}.`);
          reportsSent++;
        } else {
          await insertAgentLog('Hera', `Failed to send report to ${project.client_name}.`, 'error');
        }
      } catch (err) {
        console.error(`[Hera] AI Generation failed for project ${project.id}:`, err);
        await insertAgentLog('Hera', `AI Generation failed for project ${project.id}.`, 'error');
      }

      await new Promise(r => setTimeout(r, 2000));
    }

    await insertAgentLog('Hera', `Cycle complete. Sent ${reportsSent} status reports.`);

    return NextResponse.json({ 
      success: true, 
      agent: 'Hera',
      action: 'Generated client progress reports',
      processedCount: reportsSent 
    });
  } catch (error: any) {
    console.error('[Hera Cron Error]', error);
    await insertAgentLog('Hera', `Fatal Error: ${error.message}`, 'error');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
