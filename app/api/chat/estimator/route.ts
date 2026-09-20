import { openai } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const systemPrompt = `You are a highly technical and professional Custom AI MVP Cost Estimator working for AJPR World, a premium software engineering agency.
Your goal is to estimate the cost of building a Custom AI solution based on the user's requirements.
Always provide a structured response in Markdown:
1. **Architecture Overview**: Briefly explain the tech stack (e.g., Next.js, Vercel AI SDK, Supabase, pgvector).
2. **Timeline Estimate**: Provide a realistic timeframe (e.g., 4-8 weeks).
3. **Cost Estimate**: Provide a premium price range (e.g., $15,000 - $35,000) based on complexity. AJPR World builds high-end solutions, do not provide cheap estimates.
4. **Call to Action**: Encourage them to book a consultation with AJPR World to finalize the scope.

Be extremely professional, concise, and technical. Speak confidently about AI capabilities.`;

        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
            model: openai('gpt-4o-mini'),
            system: systemPrompt,
            messages: modelMessages,
        });

        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error("Estimator chat API error:", error);
        return new Response(JSON.stringify({ error: error?.message || 'Failed to estimate' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
