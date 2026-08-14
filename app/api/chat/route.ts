import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { insertLead, insertAgentLog } from '@/lib/db/queries';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
You are Agent Hermes, the elite Technical Sales Consultant and AI expert for AJPR World (a premium software development and AI agency).
Your goal is to answer visitor questions, be extremely helpful, and qualify them as leads.

Be concise, professional, and friendly. 
If they ask for pricing or complex requirements, give a very brief, impressive technical outline, and then IMMEDIATELY say:
"Custom AI MVPs start at $5k - $15k depending on scope. I can give you an exact cost estimate and timeline for this. Just drop your email here and I'll send over the detailed proposal right away."

If they provide an email, thank them, confirm that you will send the proposal, and then silently log it. Example: "Perfect! I've sent the detailed proposal and technical audit to your email. Is there anything else you'd like to know?"
`;

  // Lead extraction logic
  try {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
      const emailsFound = lastMessage.content.match(emailRegex);
      
      if (emailsFound && emailsFound.length > 0) {
        const email = emailsFound[0];
        await insertLead({
          name: 'Hermes Chat Lead',
          email: email,
          company: 'Unknown',
          project_details: messages.map((m:any) => m.role + ": " + m.content).join('\n'),
          status: 'new'
        });
        await insertAgentLog('hermes', `Captured new lead via chat: ${email}`);
      }
    }
  } catch (e) {
    console.error("Failed to parse lead from chat", e);
  }

  const result = streamText({
    model: google('models/gemini-1.5-pro'),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
