import { NextResponse } from 'next/server';
import { sql } from '@/lib/db/queries';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { sendColdEmail } from '@/lib/email/nodemailer';

// Securing the cron route
export async function GET(request: Request) {
  // Check for Cron Secret if invoked by Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // We'll allow local testing without the header if we're not in production
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    console.log("🤖 Initializing Autonomous AI Closer...");

    // 1. Fetch up to 5 uncontacted cold leads from the CRM
    const leadsResult = await sql`
      SELECT id, name, email, utm_campaign 
      FROM sales_leads 
      WHERE status = 'new' AND utm_source = 'cold-outreach'
      ORDER BY created_at ASC 
      LIMIT 5
    `;

    const leads = Array.isArray(leadsResult) ? leadsResult : [];

    if (leads.length === 0) {
      console.log("No new cold leads to contact.");
      return NextResponse.json({ message: 'No new leads found', sent: 0 });
    }

    let emailsSent = 0;

    // 2. Loop through leads and deploy AI logic
    for (const lead of leads) {
      console.log(`Processing lead: ${lead.name} (${lead.email})`);

      // AI Personalization Prompt
      const prompt = `
        You are Aman, the founder of AJPR World, an elite software and AI engineering agency.
        You are sending a cold email to the CEO/Owner of a company named "${lead.name}".
        We found them by searching for: "${lead.utm_campaign}".
        
        Write a short, punchy, hyper-personalized cold email. 
        - Hook them by mentioning their business name and their industry.
        - Point out a common bottleneck in their industry that custom software or AI automation can fix.
        - Pitch AJPR World as the solution.
        - End with a low-friction call to action (e.g., "Mind if I send over a quick video audit of your tech stack?").
        
        Return EXACTLY a JSON object with these keys (no markdown formatting or backticks outside of the JSON string):
        {
          "subject": "A catchy, personalized subject line",
          "html_body": "The email body in HTML format (using <p> and <br> tags). End it with: <br><br>Best,<br>Aman Joshi<br>AJPR World"
        }
      `;

      try {
        const { text } = await generateText({
          model: google('gemini-2.5-flash', {
            // Need to map the env var if it's missing in Vercel
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
          }),
          prompt,
        });

        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiEmail = JSON.parse(cleanedText);

        // 3. Send the email using Nodemailer
        const success = await sendColdEmail(lead.email, aiEmail.subject, aiEmail.html_body);

        if (success) {
          // 4. Update the CRM board!
          await sql`
            UPDATE sales_leads 
            SET status = 'contacted', updated_at = NOW() 
            WHERE id = ${lead.id}
          `;
          emailsSent++;
        }
      } catch (err) {
        console.error(`❌ AI Generation or Mailing failed for ${lead.name}:`, err);
      }
      
      // Delay to avoid Google SMTP rate limits
      await new Promise(r => setTimeout(r, 2000));
    }

    return NextResponse.json({ 
      message: 'Autonomous Outreach Complete', 
      processed: leads.length,
      sent: emailsSent
    });

  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
