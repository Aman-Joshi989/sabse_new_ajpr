import { NextRequest, NextResponse } from 'next/server';
import { createGlossaryTerm, getGlossaryTerms } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function callGPT(messages: { role: string; content: string }[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.7 }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content as string;
}

const GLOSSARY_TERMS = [
  'Large Language Model (LLM)', 'Retrieval-Augmented Generation (RAG)',
  'Server-Side Rendering (SSR)', 'Incremental Static Regeneration (ISR)',
  'Generative Engine Optimization (GEO)', 'Answer Engine Optimization (AEO)',
  'Minimum Viable Product (MVP)', 'API-First Architecture', 'Microservices',
  'Vector Database', 'Semantic Search', 'Zero-Shot Prompting',
  'Few-Shot Prompting', 'Fine-Tuning', 'Edge Computing',
  'Headless CMS', 'Continuous Integration and Continuous Deployment (CI/CD)',
  'B2B SaaS', 'React Server Components (RSC)', 'Webhooks',
  'Graph Database', 'Natural Language Processing (NLP)', 'Tokenization',
  'Embeddings', 'Prompt Engineering',
  
  // Newly Added Terms for Tech, SaaS, and Digital Services
  'Intellectual Property (IP)', 'Startup Incubation',
  'Private Limited Company',
  'Search Engine Optimization (SEO)', 'Software as a Service (SaaS)',
  'Product Market Fit', 'User Experience (UX)', 'User Interface (UI)',
  
  // Maximum Traffic Glossary Expansion
  'Growth Hacking', 'Customer Acquisition Cost (CAC)', 'Customer Lifetime Value (LTV)',
  'Monthly Recurring Revenue (MRR)', 'Annual Recurring Revenue (ARR)', 'Churn Rate',
  'Conversion Rate Optimization (CRO)', 'Exit Intent', 'Lead Magnet',
  'Click-Through Rate (CTR)', 'Bounce Rate', 'Search Engine Results Page (SERP)',
  'Domain Authority (DA)', 'Backlink Profile', 'Anchor Text', 'Long-Tail Keywords',
  'Canonical Tag', 'Core Web Vitals', 'LCP (Largest Contentful Paint)',
  'FID (First Input Delay)', 'CLS (Cumulative Layout Shift)', 'Alt Text',
  'Knowledge Graph', 'Rich Snippets', 'Structured Data', 'JSON-LD',
  'A/B Testing', 'Multivariate Testing', 'Sales Funnel', 'Top of Funnel (ToFu)',
  'Middle of Funnel (MoFu)', 'Bottom of Funnel (BoFu)', 'Inbound Marketing',
  'Outbound Marketing', 'Cold Emailing', 'Omnichannel Marketing', 'Marketing Automation',
  'Customer Relationship Management (CRM)', 'Net Promoter Score (NPS)', 'Value Proposition',
  'Go-To-Market Strategy (GTM)', 'Venture Capital (VC)', 'Angel Investor', 'Seed Round',
  'Series A', 'Cap Table', 'Term Sheet', 'Burn Rate', 'Runway', 'Bootstrapping',
  'Agile Development', 'Scrum', 'Kanban', 'DevOps', 'Site Reliability Engineering (SRE)',
  'Load Balancing', 'Content Delivery Network (CDN)', 'Serverless Architecture',
  'Containerization', 'Docker', 'Kubernetes', 'GraphQL', 'REST API', 'WebSockets',
  'OAuth', 'JWT (JSON Web Token)', 'Single Sign-On (SSO)', 'Role-Based Access Control (RBAC)'
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
  const providedKey = (req.nextUrl.searchParams.get('key') || authHeader?.replace('Bearer ', '') || '').trim();

  if (cronSecret && providedKey !== cronSecret && providedKey !== process.env.AJPR_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const existingTerms = await getGlossaryTerms() || [];
    const existingSlugs = existingTerms.map((t: any) => t.slug);

    const availableTerms = GLOSSARY_TERMS.filter(term => !existingSlugs.includes(slugify(term)));
    
    if (availableTerms.length === 0) {
      return NextResponse.json({ message: 'All preset glossary terms generated.' });
    }

    const termToGenerate = availableTerms[Math.floor(Math.random() * availableTerms.length)];
    const slug = slugify(termToGenerate);

    const definitionContent = await callGPT([
      { role: 'system', content: 'You are a technical writer for AJPR World, an India-based AI and SaaS development agency. Define technical terms clearly, accurately, and without fluff. Target audience: Startup founders and tech leaders.' },
      { role: 'user', content: `Provide a short, 1-2 sentence quick definition for the term "${termToGenerate}". This must be very direct. No conversational filler.` }
    ]);

    const detailedExplanation = await callGPT([
      { role: 'system', content: 'You are a technical writer for AJPR World, an India-based AI and SaaS development agency. Write detailed technical explanations.' },
      { role: 'user', content: `Write a detailed explanation (approx 300 words) for "${termToGenerate}". Format in Markdown. Include: \n1. A "How it works" section with bullet points.\n2. A "Why Startups Need This" section.\n3. Mention how it ties into modern software development or AI.\nDo NOT repeat the title.` }
    ]);

    const newTerm = await createGlossaryTerm({
      slug,
      term: termToGenerate,
      definition: definitionContent.trim(),
      detailed_explanation: detailedExplanation.trim(),
      related_terms: [], 
    });

    return NextResponse.json({ success: true, term: newTerm });
  } catch (err: any) {
    console.error('Glossary Generation Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
