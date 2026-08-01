import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const AYRSHARE_API_KEY = process.env.AYRSHARE_API_KEY;

// Mock trending topics. In production, you would fetch real LinkedIn feeds via an API.
const TRENDING_TOPICS = [
  { topic: "AI Agents", context: "Startups are struggling to deploy AI agents in production without hallucination loops." },
  { topic: "MVP Development Speed", context: "Founders are debating if they should use no-code tools or hire an agency to build their first MVP." },
  { topic: "SEO in 2026", context: "Traditional SEO is dying, everyone is moving towards Generative Engine Optimization (GEO)." }
];

async function generateExpertComment(topic: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY missing');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are Aman Joshi, the founder of AJPR World, an elite B2B technology agency in India.
You are engaging with a trending LinkedIn discussion about: "${topic.topic}".
The context of the discussion is: "${topic.context}"
Write a highly engaging, insightful, and slightly provocative LinkedIn comment (under 80 words).
Demonstrate your deep technical expertise. Position AJPR World as the ultimate solution for "Custom AI MVPs in 4 weeks" and "GEO".
End with a subtle call to action to visit AJPR World's profile or book a call.
Return ONLY the comment text.`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
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
    console.log('[LinkedIn Engine] Starting autonomous engagement cycle...');
    const results = [];

    // Pick a random trending topic
    const topic = TRENDING_TOPICS[Math.floor(Math.random() * TRENDING_TOPICS.length)];
    
    console.log(`[LinkedIn Engine] Generating expert comment for topic: ${topic.topic}`);
    const expertComment = await generateExpertComment(topic);
    
    console.log(`[LinkedIn Engine] Engaging via Ayrshare API...`);

    if (AYRSHARE_API_KEY) {
      // In a real scenario, Ayrshare's auto-comment or auto-post endpoint is called.
      // Here we simulate an autonomous post positioning Aman as a thought leader on the trending topic.
      const response = await fetch('https://app.ayrshare.com/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AYRSHARE_API_KEY}`
        },
        body: JSON.stringify({
          post: `Trending thought: ${topic.context}\n\nMy take:\n${expertComment}\n\n#AI #MVP #Startups #AJPRWorld #Founders`,
          platforms: ['linkedin'],
          profileKeys: ['LinkedInProfileKey'] // Required if using specific profiles
        })
      });
      
      const ayrshareData = await response.json();
      results.push({ topic: topic.topic, status: 'Posted', ayrshare: ayrshareData });
    } else {
      results.push({ topic: topic.topic, status: 'Simulated (No API Key)', comment: expertComment });
    }

    return NextResponse.json({ success: true, results }, { status: 200 });
  } catch (error: any) {
    console.error('[LinkedIn Engine Error]', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
