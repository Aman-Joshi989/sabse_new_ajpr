import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { insertAgentLog, getPublishedServices, createBlog } from '@/lib/db/queries';

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

    const agentId = 'thoth';
    try {
        await insertAgentLog(agentId, 'Thoth initializing Deep SEO Research & Content Synthesis...');
    } catch (e) {
        console.error("Failed to insert wake log", e);
    }

    try {
        await insertAgentLog(agentId, 'Analyzing existing services to identify keyword gaps and high-volume SERP opportunities...');
        
        const services = await getPublishedServices();
        const serviceTitles = services ? services.map((s: any) => s.title).join(', ') : 'Tech Consulting, Web Development, SEO';

        const researchPrompt = `
            You are Thoth, the elite AI Content Strategist.
            Your goal is to rank AJPR World on top of Google.
            Our current services: ${serviceTitles}.
            
            Identify 1 highly lucrative, low-competition, long-tail keyword related to one of these services.
            Then, write a comprehensive, highly authoritative, SEO-optimized blog post targeting this exact keyword.
            
            Return ONLY a raw JSON object (no markdown formatting, no \`\`\`json block) with:
            - title: Catchy, click-optimized title (under 60 chars)
            - slug: url-friendly-slug
            - keyword: the primary keyword
            - content: The full HTML content of the article (use <h2>, <h3>, <ul>, <strong> for deep structure).
            - excerpt: 160 char meta description.
        `;

        await insertAgentLog(agentId, `Synthesizing authoritative content for keyword gap targeting...`);

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: researchPrompt,
            temperature: 0.7,
        });

        // Try to parse the JSON
        let postData;
        try {
            const cleanJson = text.replace(/```json/g, '').replace(/```html/g, '').replace(/```/g, '').trim();
            postData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse Thoth JSON output", text);
            throw new Error("Failed to parse JSON output from LLM.");
        }

        await insertAgentLog(agentId, `Drafting article: "${postData.title}" (Target Keyword: ${postData.keyword})`);

        await createBlog({
            title: postData.title,
            slug: postData.slug,
            excerpt: postData.excerpt,
            content: postData.content,
            published: false, // Save as draft for review
            featured_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
        });
        
        const logMessage = `SEO Content drafted successfully: [${postData.title}]. Saved as DRAFT for review.`;
        
        await insertAgentLog(agentId, logMessage);

        return NextResponse.json({ success: true, post: postData.title });

    } catch (error: any) {
        console.error('Thoth Error:', error);
        await insertAgentLog(agentId, `Fatal error during content synthesis: ${error.message}`, 'error');
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
