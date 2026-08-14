import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { insertAgentLog, getPublishedServices, createService } from '@/lib/db/queries';

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

    const agentId = 'midas';
    try {
        await insertAgentLog(agentId, 'Midas initializing Market Analysis & Service Architecture...');
    } catch (e) {
        console.error("Failed to insert wake log", e);
    }

    try {
        await insertAgentLog(agentId, 'Analyzing current service portfolio and identifying high-ticket market gaps...');
        
        const services = await getPublishedServices();
        const serviceTitles = services ? services.map((s: any) => s.title).join(', ') : 'Tech Consulting, Web Development';

        const strategyPrompt = `
            You are Midas, an elite AI Business Strategist.
            Your goal is to figure out high-ticket tech services AJPR World can sell to enterprise clients or startups.
            Our current services: ${serviceTitles}.
            
            Identify 1 highly lucrative, modern tech service (e.g., AI integration, specialized SaaS dev, data engineering) that we are NOT currently offering but should.
            
            Return ONLY a raw JSON object (no markdown formatting, no \`\`\`json block) with:
            - title: The name of the service (under 60 chars)
            - slug: url-friendly-slug
            - category: The category (e.g., "AI", "Cloud", "Data")
            - description: A compelling, 2-3 sentence executive summary of the service.
            - features: A JSON array of 4 strings, each being a key feature or deliverable.
            - price: A numeric string for a high-ticket starting price (e.g., "500000").
            - price_type: "starting_at"
            - delivery_time: A string like "4-6 Weeks"
        `;

        await insertAgentLog(agentId, `Structuring new service offering...`);

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: strategyPrompt,
            temperature: 0.8,
        });

        // Try to parse the JSON
        let serviceData;
        try {
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            serviceData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse Midas JSON output", text);
            throw new Error("Failed to parse JSON output from LLM.");
        }

        await insertAgentLog(agentId, `Drafting new service: "${serviceData.title}" (Category: ${serviceData.category})`);

        await createService({
            sku: `MDS-${Math.floor(Math.random() * 10000)}`,
            title: serviceData.title,
            slug: serviceData.slug,
            category: serviceData.category,
            description: serviceData.description,
            features: JSON.stringify(serviceData.features),
            price: serviceData.price,
            price_type: serviceData.price_type,
            delivery_time: serviceData.delivery_time,
            icon_name: "Target", // Default icon
            gradient: "from-blue-600 to-indigo-800", // Default gradient
            published: false // Save as draft for user approval
        });
        
        const logMessage = `New Service Drafted: [${serviceData.title}]. Saved as DRAFT for review.`;
        
        await insertAgentLog(agentId, logMessage);

        return NextResponse.json({ success: true, service: serviceData.title });

    } catch (error: any) {
        console.error('Midas Error:', error);
        await insertAgentLog(agentId, `Fatal error during market analysis: ${error.message}`, 'error');
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
