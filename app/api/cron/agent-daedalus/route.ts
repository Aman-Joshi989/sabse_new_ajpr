import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { insertAgentLog, getPublishedServices } from '@/lib/db/queries';

// Vercel cron configuration
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }
    }

    const agentId = 'daedalus';
    
    try {
        await insertAgentLog(agentId, 'Daedalus initializing UX/UI analysis cycle...');
    } catch (e) {
        console.error("Failed to insert wake log", e);
    }

    try {
        await insertAgentLog(agentId, 'Scanning active services for conversion rate optimization opportunities...');
        
        const services = await getPublishedServices();
        if (!services || services.length === 0) {
            await insertAgentLog(agentId, 'No active services found to audit. Sleeping.');
            return NextResponse.json({ success: true, message: 'No services found' });
        }

        const targetService = services[Math.floor(Math.random() * services.length)];
        
        await insertAgentLog(agentId, `Analyzing UX architecture for service: ${targetService.title}`);

        const prompt = `
            You are Daedalus, an elite UI/UX AI Architect.
            Analyze the following service and propose a 3-step A/B testing strategy or UI/UX wireframe improvement to increase its conversion rate.
            
            Service Title: ${targetService.title}
            Description: ${targetService.description}
            Features: ${targetService.features}
            
            Format your response strictly as a professional, concise JSON object with the following keys:
            - hypothesis: A short theory on why a UI change will increase conversions.
            - recommendedLayout: A brief description of the new UI component or wireframe structure.
            - targetMetric: The primary metric to track (e.g., "Checkout initiation rate").
        `;

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: prompt,
            temperature: 0.7,
        });

        // Try to parse the JSON
        let parsedAnalysis;
        try {
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            parsedAnalysis = JSON.parse(cleanJson);
        } catch (e) {
            parsedAnalysis = { hypothesis: "Failed to parse analysis.", recommendedLayout: text, targetMetric: "Unknown" };
        }

        const logMessage = `UX Audit Complete: [${targetService.title}] | Hypothesis: ${parsedAnalysis.hypothesis} | Layout: ${parsedAnalysis.recommendedLayout}`;
        
        await insertAgentLog(agentId, logMessage);

        return NextResponse.json({ success: true, analysis: parsedAnalysis });

    } catch (error: any) {
        console.error('Daedalus Error:', error);
        await insertAgentLog(agentId, `Fatal error during UX audit: ${error.message}`, 'error');
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
