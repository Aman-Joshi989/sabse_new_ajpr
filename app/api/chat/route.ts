import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('models/gemini-1.5-pro'),
    system: `You are the AJPR World AI Consultant. 
AJPR World is a premier agency that builds Custom AI MVPs and integrates AI into existing products.
Your primary goal is to answer visitor questions, be extremely helpful, and qualify them as leads.

Be concise, professional, and friendly. 
If they ask for pricing or complex requirements, let them know that Custom AI MVPs start at $5k - $15k depending on scope, and ask for their email address so our technical founder can reach out to them directly.
If they provide an email, thank them and tell them someone will be in touch within 24 hours.`,
    messages,
  });

  return result.toTextStreamResponse();
}
