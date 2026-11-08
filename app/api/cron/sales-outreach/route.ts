import { NextRequest, NextResponse } from 'next/server';
import { SendMailClient } from 'zeptomail';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getUncontactedLeads, markLeadAsContacted } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// Configuration
const ZEPTO_URL = "https://api.zeptomail.in/v1.1/email";
const ZEPTO_TOKEN = process.env.ZEPTOMAIL_TOKEN || "Zoho-enczapikey PHtE6r1bQ+293mEs8RRR5fDpRMGsMt9//uNjKVRP449HDqcCG01X+d16kzbi+kh5VaNCEqLJyY1rt+iftunUdGvtZ24YXmqyqK3sx/VYSPOZsbq6x00asFwTdULYVYDtcNFr1iTRvNmX";
const zeptoClient = new SendMailClient({ url: ZEPTO_URL, token: ZEPTO_TOKEN });

async function generateColdEmail(lead: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY missing');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are Aman Joshi, the Lead Technical Founder at AJPR World.
Write a concise, high-converting cold email (under 75 words) to ${lead.name} from ${lead.company}.
Their industry is ${lead.industry || 'Roofing Contractors in the US/CA'} and their current focus is ${lead.focus || 'getting more exclusive roof replacement leads'}.
Do not sell generic "marketing". Sell an outcome: more qualified estimates, dominating local SEO/Google Maps, or a higher-converting website.
Example style: "Noticed you're expanding your roofing services. We just helped a similar local contractor double their exclusive leads with a fast, high-converting site redesign. Open to a 5-min chat to see if we can do the same for your territory?"
Return ONLY the raw HTML body of the email. Do NOT include markdown tags like \`\`\`html.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim().replace(/```html/g, '').replace(/```/g, '');
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.AJPR_API_KEY;
  const cronSecret = process.env.CRON_SECRET;
  
  const queryKey = req.nextUrl.searchParams.get('key');
  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
  const providedKey = (queryKey || authHeader?.replace('Bearer ', '') || '').trim();

  const isAuthorized = (apiKey && providedKey === apiKey) || (cronSecret && providedKey === cronSecret);
  
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    console.log('[Sales Outreach] Starting daily outreach cron...');
    const results = [];

    // Fetch real uncontacted leads from Supabase
    const leads = await getUncontactedLeads();
    
    if (!leads || leads.length === 0) {
      console.log('[Sales Outreach] No new leads to contact today.');
      return NextResponse.json({ success: true, message: 'No leads in queue' }, { status: 200 });
    }

    // Process one lead per run to avoid spamming / rate limits
    const lead = leads[0];
    
    console.log(`[Sales Outreach] Generating pitch for ${lead.company}...`);
    const emailBody = await generateColdEmail(lead);

    console.log(`[Sales Outreach] Sending via ZeptoMail to ${lead.email}...`);
    
    await zeptoClient.sendMail({
      "from": {
          // TODO: Use a secondary domain (e.g., aman@tryajpr.com) to protect main domain SEO as per US Outreach Strategy
          "address": "hello@ajprworld.com",
          "name": "Aman Joshi | AJPR World"
      },
      "to": [
          {
              "email_address": {
                  "address": lead.email,
                  "name": lead.name
              }
          }
      ],
      "subject": `Quick thought on AI for ${lead.company}`,
      "htmlbody": emailBody,
    });

    // Mark as contacted so we never email them again
    await markLeadAsContacted(lead.id);

    results.push({ lead: lead.company, email: lead.email, status: 'Sent' });

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error: any) {
    console.error('[Sales Outreach Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
