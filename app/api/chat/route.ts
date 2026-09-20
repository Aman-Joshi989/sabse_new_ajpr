import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import { insertLead, insertAgentLog } from '@/lib/db/queries';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

function getLanguageModel() {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (geminiKey && geminiKey.startsWith('AIzaSy')) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    return google('gemini-1.5-flash');
  }
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return openai('gpt-4o-mini');
}

export async function POST(req: Request) {
  try {
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
      if (Array.isArray(messages) && messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        const contentString = typeof lastMessage.content === 'string' ? lastMessage.content : 
                              (lastMessage.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || '');

        if (lastMessage.role === 'user' && contentString.includes('[SYSTEM: LEAD ACQUIRED]')) {
          const content = contentString;
          
          const nameMatch = content.match(/Name:\s*(.*)/);
          const emailMatch = content.match(/Email:\s*(.*)/);
          const phoneMatch = content.match(/Phone:\s*(.*)/);
          const msgMatch = content.match(/Message:\s*([\s\S]*)/);
          
          const email = emailMatch ? emailMatch[1].trim() : '';
          
          if (email) {
            await insertLead({
              name: nameMatch ? nameMatch[1].trim() : 'Hermes Chat Lead',
              email: email,
              company: phoneMatch ? `Phone: ${phoneMatch[1].trim()}` : 'Unknown',
              project_details: msgMatch ? msgMatch[1].trim() : 'No initial message',
              status: 'new'
            });
            await insertAgentLog('hermes', `Captured new pre-chat lead: ${email}`);
          }
        } else if (lastMessage.role === 'user') {
          // Fallback regex for mid-conversation email drops
          const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
          const emailsFound = contentString.match(emailRegex);
          
          if (emailsFound && emailsFound.length > 0) {
            const email = emailsFound[0];
            await insertLead({
              name: 'Hermes Chat Lead',
              email: email,
              company: 'Unknown',
              project_details: messages.map((m: any) => m.role + ": " + (typeof m.content === 'string' ? m.content : m.parts?.[0]?.text || '')).join('\n'),
              status: 'new'
            });
            await insertAgentLog('hermes', `Captured new lead via mid-chat: ${email}`);
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse lead from chat", e);
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: getLanguageModel(),
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: error?.message || 'Chat service encountered an error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
