import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { insertAgentLog, getPublishedServices, insertOutreachEmail } from '@/lib/db/queries';
import { sendEmail } from '@/lib/zeptomail';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }
    }

    const agentId = 'artemis';
    try {
        await insertAgentLog(agentId, 'Artemis initializing automated backlink outreach protocol...');
    } catch (e) {
        console.error("Failed to insert wake log", e);
    }

    try {
        await insertAgentLog(agentId, 'Scanning web for high-authority tech/startup directories and blogs...');
        
        const services = await getPublishedServices();
        const serviceTitles = services ? services.map((s: any) => s.title).join(', ') : 'Tech Consulting, Web Development';

        const prompt = `
            You are Artemis, an elite SEO Off-Page specialist.
            We are a tech agency providing: ${serviceTitles}.
            
            Identify a fictional but realistic high-authority tech blog or startup directory (like TechCrunch, IndieHackers, SmashingMagazine).
            Draft a personalized, highly persuasive, non-spammy outreach email requesting to write a guest post for them.
            
            Return ONLY a raw JSON object (no markdown, no \`\`\`json) with:
            - target_url: The URL of the target blog (e.g., "techcrunch.com").
            - target_email: The guessed contact email (e.g., "editor@techcrunch.com").
            - subject: A catchy, relevant email subject line.
            - body: The full body of the email in HTML format.
        `;

        await insertAgentLog(agentId, `Drafting personalized backlink request...`);

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: prompt,
            temperature: 0.8,
        });

        // Parse JSON
        let outreachData;
        try {
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            outreachData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse Artemis JSON output", text);
            throw new Error("Failed to parse JSON output from LLM.");
        }

        // Send email automatically
        try {
            if (typeof sendEmail === 'function') {
                await sendEmail({
                    to: outreachData.target_email,
                    subject: outreachData.subject,
                    text: outreachData.body.replace(/<[^>]*>/g, ''), // strip html for text
                    html: outreachData.body
                });
            } else {
                console.log("Mock sending email:", outreachData);
            }
        } catch (emailErr) {
            console.error("Failed to send email via zeptomail:", emailErr);
        }

        // Log the outreach attempt to database
        await insertOutreachEmail(
            outreachData.target_url,
            outreachData.target_email,
            outreachData.subject,
            outreachData.body,
            'sent'
        );
        
        const logMessage = `Outreach sent to ${outreachData.target_url} (${outreachData.target_email})`;
        
        await insertAgentLog(agentId, logMessage);

        return NextResponse.json({ success: true, target: outreachData.target_url });

    } catch (error: any) {
        console.error('Artemis Error:', error);
        await insertAgentLog(agentId, `Fatal error during outreach: ${error.message}`, 'error');
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
