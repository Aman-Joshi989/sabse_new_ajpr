import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { Client } from 'pg';
import { insertAgentLog } from '@/lib/db/queries';

export const maxDuration = 60; // Allow 60 seconds for AI generation

// Topics to cycle through for auto-generation
const TOPICS = [
    "AI for Real Estate: Automating Property Management",
    "How Custom AI MVPs are transforming Healthcare Startups",
    "Cost to build an AI chatbot for e-commerce in 2026",
    "Why your business needs a Custom LLM and not just ChatGPT",
    "Programmatic SEO: The secret to organic growth for AI agencies"
];

export async function GET(req: Request) {
    // Basic security for Vercel Cron
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Return 401 in production, but allow testing locally if no header is provided.
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    try {
        // 1. Pick a random topic
        const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        console.log(`Starting Auto-Blogging for topic: ${topic}`);
        await insertAgentLog('athena', `Drafting high-SEO post for topic: "${topic}"`);

        let title = topic;
        let content = '';
        let metaDescription = `Discover everything you need to know about ${topic}. Build custom AI solutions with AJPR World.`;
        let keywords = `${topic.split(':')[0]}, Custom AI MVP, AI Agency, AI Solutions`;

        // 2. Generate Content using AI
        try {
            const { text } = await generateText({
                model: openai(process.env.OPENAI_MODEL || 'gpt-4o-mini'),
                prompt: `Write a highly technical, SEO-optimized, 1000-word blog post about: "${topic}". 
                The CURRENT YEAR IS 2026. Make sure all timelines, strategies, and facts are framed in the context of 2026. NEVER use the year 2024.
                Use markdown formatting (## for headers). Make it engaging and authoritative. 
                Include a concluding section that calls to action to hire 'AJPR World', a premier agency that builds Custom AI MVPs.
                Return ONLY the markdown body content. No extra chat.`
            });
            content = text;
            console.log("AI generated content successfully.");
        } catch (aiError: any) {
            console.warn("AI Generation Failed (likely due to missing/invalid API key). Falling back to mock content.", aiError.message);
            // Fallback content if API key is invalid
            content = `## Introduction to ${topic}
This is an automatically generated placeholder post because the OpenAI API key is missing or invalid.
Once a valid \`OPENAI_API_KEY\` is added to \`.env.local\`, the AI will write a 1,500 word highly technical article here.

## Why this matters
Automated ranking requires high quality content. By programmatically generating SEO-optimized pages, we capture long-tail keywords.

## Conclusion
Contact **AJPR World** to build your Custom AI MVP today!`;
        }

        // 3. Save to Supabase
        const client = new Client({ connectionString: process.env.DATABASE_URL });
        await client.connect();

        const insertQuery = `
            INSERT INTO blog_posts (slug, title, excerpt, content, meta_description, keywords, category, author, cover_image, published)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
            ON CONFLICT (slug) DO UPDATE 
            SET content = EXCLUDED.content, 
                excerpt = EXCLUDED.excerpt,
                meta_description = EXCLUDED.meta_description,
                published_at = CURRENT_TIMESTAMP
            RETURNING id;
        `;

        const category = "AI Development";
        const author = "AJPR World Team";
        const coverImage = "https://ajprworld.com/default-blog-cover.jpg";

        const res = await client.query(insertQuery, [
            slug, title, metaDescription, content, metaDescription, keywords, category, author, coverImage
        ]);
        await client.end();

        await insertAgentLog('athena', `Successfully published SEO post: "${title}"`);

        return NextResponse.json({
            success: true,
            message: `Successfully generated and published: ${title}`,
            id: res.rows[0].id,
            slug
        });

    } catch (error: any) {
        console.error('Cron job error:', error);
        await insertAgentLog('athena', `Fatal error during post generation: ${error.message}`, 'error');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
