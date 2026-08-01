import { NextRequest, NextResponse } from 'next/server';
import { createBlog, getBlogs } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';
import { createLocalPost } from '@/lib/gbp';
import { triggerSocialSyndication } from '@/lib/syndication';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function callGPT(messages: { role: string; content: string }[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.85 }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content as string;
}

async function generateDalleImage(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('No key');
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1024x1024', quality: 'standard' }),
  });
  if (!res.ok) throw new Error(`DALL-E ${res.status}`);
  const data = await res.json();
  return data.data[0].url as string;
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505238680356-66780bb8b368?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop'
];

function pickFallbackImage(seed: string): string {
  // Try to generate a more random index that doesn't just rely on string character summing
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  // Mix it up with current day so repeated topics on different days get different images (optional, but good for testing)
  const dayHash = new Date().getDate();
  return FALLBACK_IMAGES[Math.abs(hash + dayHash) % FALLBACK_IMAGES.length];
}

const TOPIC_POOLS: string[] = [
  'How to Build a Production-Ready MVP in 4 Weeks Using Next.js and Postgres',
  'The Lean MVP Playbook: Ship Fast, Validate Faster, Scale Confidently',
  'From Idea to Beta: A Technical Blueprint for AI-Powered Product Development',
  'Why Most MVPs Fail and the System Architecture That Prevents It',
  'Building Multi-Tenant SaaS Products: A Step-by-Step Engineering Guide',
  'Generative Engine Optimization (GEO): The Complete 2026 Strategy Guide',
  'How to Get Your Brand Featured in ChatGPT, Perplexity, and Gemini Answers',
  'AEO vs GEO vs SEO: Critical Differences Every Startup Founder Must Know',
  'Structuring Content for AI Retrieval: Schema, Citations, and Authority Signals',
  'The GEO Content Audit: Optimizing for AI Answer Engines at Scale',
  'Building AI Agent Workflows That Actually Run in Production',
  'How to Automate B2B Lead Generation Using AI Agents in 2026',
  'Designing Resilient AI Pipelines: Error Handling, Retry Logic, and Monitoring',
  'The No-Code AI Automation Stack Every Startup Founder Needs Right Now',
  'Technical SEO in the Age of AI: Core Web Vitals, Schema, and Crawl Budget',
  'Programmatic SEO: Using Data and Templates to Rank for Thousands of Keywords',
  'The Startup SEO Roadmap: Zero to 50K Monthly Organic Visits in 12 Months',
  // --- New Maximum Traffic Topics ---
  '10 Growth Hacking Strategies to Scale Your B2B SaaS Without Paid Ads',
  'How to Reduce Customer Acquisition Cost (CAC) Using Autonomous SEO Agents',
  'The Ultimate Guide to Increasing Customer Lifetime Value (LTV) for Tech Startups',
  'Why Next.js is the Ultimate Framework for High-Performance SEO in 2026',
  'Headless E-commerce vs Shopify: Which is Better for Scaling Your Brand?',
  'How to Optimize Your Google Business Profile (GBP) for Maximum Local Traffic',
  'The Future of Digital Marketing: Fully Autonomous Content Engines',
  'How to Recover from a Google Core Update Traffic Drop in 30 Days',
  'Creating High-Converting Landing Pages: The Psychology of Exit Intent Popups',
  'Bootstrapping Your App: How to Launch Without Venture Capital Funding',
  'Why You Need a Dedicated Technical Co-Founder (Or a Technical Agency Partner)',
  'Top 5 UI/UX Mistakes That Are Killing Your SaaS Conversion Rate',
  'How to Use Vector Databases (Pinecone, Chroma) for AI Semantic Search',
  'Understanding RAG (Retrieval-Augmented Generation) for Enterprise Applications',
  'Link Building for SaaS: A Data-Driven Outreach Approach That Actually Scales',
  'Engineering for Scale: Backend Systems That Handle 10x Traffic Overnight',
  'The Systems Architecture Every B2B SaaS Startup Needs Before Series A',
  'Database Optimization Secrets: Indexing, Caching, and Query Performance at Scale',
  'CI/CD Pipelines for Startups: How to Ship Daily Without Breaking Production',
  'API-First Architecture: Why Startups That Build APIs First Scale Faster',
  'Startup Growth Metrics That Actually Matter: Beyond Vanity Analytics',
  'How Indian Startups Are Winning Global Clients With AI-First Product Strategies',
];

function pickUniqueTopic(existingTitles: string[]): string {
  const unused = TOPIC_POOLS.filter(
    t => !existingTitles.some(e => e.toLowerCase().includes(t.split(':')[0].toLowerCase().slice(0, 25)))
  );
  const pool = unused.length > 0 ? unused : TOPIC_POOLS;
  const base = pool[Math.floor(Math.random() * pool.length)];
  return `${base} – Edition ${Math.floor(100 + Math.random() * 900)}`;
}

async function generateFullBlog(topic: string): Promise<{ title: string; content: string; excerpt: string }> {
  const content = await callGPT([
    {
      role: 'system',
      content: `You are an expert technical SEO copywriter and startup growth consultant. Write long-form, high-quality blog posts genuinely useful to startup founders and engineers.
The CURRENT YEAR IS 2026. Make sure all timelines, strategies, and facts are framed in the context of 2026. NEVER use the year 2024.
Style: direct, authoritative, practical. No fluff. No AI cliches. Use contractions. Vary sentence length.
CRITICAL: You must format this post for Generative Engine Optimization (GEO). This means you must include:
- A "Key Takeaways" or "Quick Answer" blockquote right after the intro.
- Direct, factual, and unambiguous answers to common questions.
- Strong H2 and H3 structures.
- Statistical claims and specific numbers (create realistic startup data if necessary).
- Embedded schema-ready FAQ section.`,
    },
    {
      role: 'user',
      content: `Write a complete SEO blog post for AJPR World (https://ajprworld.com), a B2B company offering AI MVP development, GEO/SEO solutions, and automation systems for startups in India.

Topic: "${topic}"

Requirements:
- H1 title using #
- At least 1500 words
- 4-5 H2 sections with COMPLETELY DIFFERENT content in each (no repeated paragraphs)
- Each section: 3-5 paragraphs with unique, specific, useful information
- Quick Answer blockquote after intro (> **Quick Answer:** ...)
- FAQ H2 section with 3 specific questions and detailed 100-150 word answers
- Natural CTA mentioning AJPR World at the end
- Use bullet points and bold naturally
- Include real-sounding stats, percentages, and timeframes

Return ONLY the markdown starting with # H1 title.`,
    },
  ]);

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : topic;
  const contentBody = content.replace(/^#\s+.+$/m, '').trim();
  const cleanText = contentBody.replace(/[#*>\n\[\]]/g, '').trim();
  const firstSentence = cleanText.split(/\.\s/)[0]?.trim() || '';
  const excerpt = (firstSentence + '.').slice(0, 160);

  return { title, content: contentBody, excerpt };
}

async function generateImageForTopic(topic: string): Promise<string> {
  // Bypassing DALL-E generation to save API costs. 
  // Using the expanded free fallback image pool instead.
  return pickFallbackImage(topic);
}

async function fetchTrendingHeadlines(): Promise<string> {
  try {
    const res = await fetch('https://news.google.com/rss/search?q=AI+startup+OR+OpenAI+OR+technology+OR+SaaS&hl=en-US&gl=US&ceid=US:en', { next: { revalidate: 3600 } });
    if (!res.ok) return '';
    const xml = await res.text();
    // Use regex to extract titles safely without needing an external XML parser
    const titles = Array.from(xml.matchAll(/<title>(.*?)<\/title>/g)).map(m => m[1]);
    // Skip the first title which is usually the main feed title
    const headlines = titles.slice(1, 15).map(t => t.replace(/ - [^-]+$/, '').trim());
    return headlines.join('\n');
  } catch (err) {
    console.error('[Cron] Failed to fetch trending news:', err);
    return '';
  }
}

async function executeDailyBlogPipeline(req: NextRequest) {
  const apiKey = process.env.AJPR_API_KEY;
  const cronSecret = process.env.CRON_SECRET;

  const queryKey = req.nextUrl.searchParams.get('key');
  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key');
  const providedKey = (queryKey || authHeader?.replace('Bearer ', '') || '').trim();

  const isAuthorized = 
    (apiKey && providedKey === apiKey) || 
    (cronSecret && providedKey === cronSecret);

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    let existingTitles: string[] = [];
    try {
      existingTitles = ((await getBlogs()) || []).map((b: any) => b.title);
    } catch (e) {
      console.warn('[Cron] Could not fetch existing titles.');
    }

    let topic = '';
    try {
      const existingList = existingTitles.length > 0
        ? existingTitles.slice(-20).map(t => `- ${t}`).join('\n')
        : 'None yet';

      const trendingHeadlines = await fetchTrendingHeadlines();
      const contextText = trendingHeadlines 
        ? `Here are the top trending tech news headlines today:\n${trendingHeadlines}\n\nUse one of these trending topics as inspiration to write something highly relevant right now.` 
        : `Focus on AI MVP development, GEO/AEO optimization, startup scaling, technical SEO, or AI automation.`;

      topic = (await callGPT([
        {
          role: 'system',
          content: 'You are a creative SEO content strategist for AJPR World, an India-based B2B startup tech company. The CURRENT YEAR IS 2026. NEVER use 2024 in your topics. Your goal is to write blog topics that ride the wave of trending tech news to maximize traffic. Output ONLY the plain headline, no quotes, no explanation.',
        },
        {
          role: 'user',
          content: `${contextText}\n\nAlready published (do NOT repeat these topics):\n${existingList}\n\nGenerate ONE brand new unique, click-worthy blog headline based on current trends for the year 2026:`,
        },
      ])).trim().replace(/^["']|["']$/g, '');
    } catch (e: any) {
      console.warn('[Cron] Topic generation fallback:', e.message);
      topic = pickUniqueTopic(existingTitles);
    }

    console.log(`[Cron] Topic: "${topic}"`);

    let blogTitle = topic;
    let blogContent = '';
    let blogExcerpt = '';

    try {
      const result = await generateFullBlog(topic);
      blogTitle = result.title;
      blogContent = result.content;
      blogExcerpt = result.excerpt;
      console.log(`[Cron] GPT wrote ${blogContent.split(/\s+/).length} words`);
    } catch (err: any) {
      console.error('[Cron] GPT blog failed, using rich fallback:', err.message);
      const shortTopic = topic.split('–')[0].split(':')[0].trim();
      blogTitle = topic;
      blogExcerpt = `A practical guide to ${shortTopic} for startups and digital agencies scaling in 2026.`;
      blogContent = `> **Quick Answer:** ${shortTopic} is a high-leverage growth lever for modern startups. Teams that implement structured technical systems and AI-optimized content see meaningful traffic and lead growth within 90 days.

---

## Why ${shortTopic} Is a Competitive Advantage Right Now

Search has fundamentally changed. Google's AI Overviews, ChatGPT's browsing, Perplexity's citations — these systems are changing which brands get found and which go invisible. The startups winning in 2026 have built systems optimized for both traditional search and AI-powered retrieval engines.

The gap between companies that understand this and those that don't is widening fast. Early movers are accumulating citation authority that will be nearly impossible to compete with in 12-18 months. The window to build this foundation is now.

* **Topical depth over keyword breadth:** 30 well-structured articles on one topic beats 300 thin posts on random keywords.
* **Entity clarity:** Define your brand's entities in schema markup so AI engines can confidently reference you.
* **Structured content:** FAQs, "Quick Answer" boxes, and clear H2/H3 hierarchies are all AI retrieval signals.

---

## The Technical Foundation Every Startup Needs First

Before investing in content at scale, get the technical fundamentals locked down. This is where most startups waste money — they publish great content on a technically broken site and wonder why nothing ranks.

**Site crawlability:** Submit your sitemap to Google Search Console. Check for crawl errors weekly. Fix redirect chains immediately — every redirect hop consumes crawl budget and passes less authority.

**Page speed:** Run Lighthouse on your 10 most important pages monthly. Fix LCP (Largest Contentful Paint) issues first — they have the strongest correlation with ranking improvements. Target sub-2.5 seconds on mobile.

**Schema markup implementation:** At minimum, implement Organization, Article, FAQPage, and BreadcrumbList schemas. Use Google's Rich Results Test after every schema update.

* Enable HTTP/2 if not already active.
* Use Cloudflare or similar CDN for static asset delivery.
* Compress all images to WebP format and lazy-load below-fold images.

---

## Building a Content System That Compounds

The startups with the best content don't just publish more — they publish smarter. Here's the architecture that works:

**Pillar pages** are 2,500-4,000 word definitive guides on your core 3-5 topics. These are the pages that attract backlinks and establish your brand as the authoritative source in your niche. They take time to write well, but they pay dividends for years.

**Cluster articles** are 1,000-1,500 word supporting pieces that explore specific sub-topics and link back to the pillar. Publish 2-3 per week. Focus each article on a single clear question your target audience is asking.

**FAQ and glossary pages** are underrated assets. They get cited heavily in AI-generated answers. Write 100-150 word answers to every relevant question in your space, formatted with clear H3 headings.

* Repurpose each article into 3-5 LinkedIn posts and one email newsletter segment.
* Update pillar pages quarterly with new data, expanded sections, and internal links to new cluster content.
* Build a content calendar 4 weeks in advance so you're never scrambling for ideas.

---

## Measuring What Actually Drives Growth

Vanity metrics are comfortable but dangerous. Here's what actually tells you if your strategy is working:

**Organic-to-lead conversion rate:** Set up a dedicated Goal in GA4 for organic traffic conversions. This is the metric that connects your content investment to revenue.

**Keyword position movement:** Track your top 50 target keywords weekly in Google Search Console. Positions 11-20 moving to 1-10 is where the traffic step-changes happen.

**AI citation frequency:** Monthly, query ChatGPT, Perplexity, and Claude with your top 10 keywords. Track how often your brand is cited and in what context. This is the new "position 0."

* Review these metrics as a team every Monday.
* Run quarterly content audits — delete, merge, or rewrite articles that haven't gained traction in 6 months.
* Double down on topics where you're already ranking in positions 5-15.

---

## Frequently Asked Questions

### How long does it take to see results from ${shortTopic}?

Most startups see meaningful organic traffic growth within 90-120 days of consistent, quality publishing. AI engine citations typically appear faster — within 30-60 days — if your content has proper schema markup and clear entity definitions. The key variable is publishing consistency: teams that publish 2+ quality articles per week see results 2-3x faster than those publishing monthly.

### How much budget should a startup allocate to this?

Early-stage startups should budget $2,000-$5,000/month for technical SEO setup, content production (2-3 articles/week), and basic link building outreach. Post-Series A, $10,000-$25,000/month is typical for aggressive growth programs. Treat this as infrastructure investment, not discretionary marketing spend. The compounding returns typically show a 3-5x ROI within 18 months.

### Should we handle content in-house or outsource?

Keep strategy, editorial direction, and final review in-house — your team understands your customers and product best. Outsource execution: content production, technical implementation, and link outreach. Agencies like AJPR World specialize in exactly this, combining technical SEO expertise with AI-optimized content systems that get you results faster than building in-house from scratch.

---

## Start Scaling With AJPR World

AJPR World builds the technical foundation, content systems, and automation pipelines that give startups a compounding growth advantage. Whether you need a custom AI-powered MVP in 4 weeks or a complete GEO content strategy, we deliver measurable results.

Visit [ajprworld.com](https://ajprworld.com) to book a free strategy call.`;
    }

    console.log('[Cron] Generating featured image...');
    const imageUrl = await generateImageForTopic(blogTitle);

    const slug = blogTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 120);
    
    console.log('[Cron] Publishing to database...');
    // Save to database
    const savedBlog = await createBlog({
      slug,
      title: blogTitle,
      excerpt: blogExcerpt || blogContent.replace(/[#*>\n\[\]]/g, '').slice(0, 155).trim(),
      content: blogContent,
      category: 'Technology & AI',
      author: 'AJPR SEO Engine',
      cover_image: imageUrl,
      published: true,
      published_at: new Date(),
    });

    revalidatePath('/blog');
    revalidatePath('/dashboard/admin/blog');
    
    // Trigger Social Syndication Webhook
    const blogUrl = `https://ajprworld.com/blog/${slug}`;
    await triggerSocialSyndication({
      title: blogTitle,
      url: blogUrl,
      excerpt: blogExcerpt || blogContent.replace(/[#*>\n\[\]]/g, '').slice(0, 155).trim()
    });

    const wordCount = (blogTitle + ' ' + blogContent).split(/\s+/).length;
    console.log(`[Cron] Published: "${blogTitle}" (${wordCount} words)`);

    // --- AYRSHARE AUTO-POST TRIGGER ---
    const apiKeyAyrshare = process.env.AYRSHARE_API_KEY;
    if (apiKeyAyrshare) {
      try {
        console.log('[Cron] Auto-posting to social media via Ayrshare...');
        const socialPost = `New article on the blog! 🚀\n\n${blogTitle}\n\nRead the full guide here: https://ajprworld.com/blog/${slug}\n\n#AI #Startup #Tech`;
        await fetch('https://app.ayrshare.com/api/post', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKeyAyrshare}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            post: socialPost,
            platforms: ['linkedin', 'facebook'],
          })
        });
        console.log('[Cron] Social post sent successfully via Ayrshare');
      } catch (e) {
        console.error('[Cron] Failed to auto-post to social media:', e);
      }
    }
    // ----------------------------------

    // --- GOOGLE BUSINESS PROFILE AUTO-POST TRIGGER ---
    try {
      console.log('[Cron] Auto-posting to Google Business Profile...');
      const postUrl = `https://ajprworld.com/blog/${slug}`;
      const summaryText = blogExcerpt || `Check out our latest guide on ${topic}. Learn exactly how to leverage this for your business growth today.`;
      
      // Attempt to publish to GBP
      await createLocalPost(blogTitle, summaryText, postUrl);
      console.log('[Cron] GBP Post created successfully!');
    } catch (e: any) {
      // We don't want to fail the whole cron if GBP fails, just log it.
      console.error('[Cron] Failed to post to Google Business Profile:', e.message || e);
    }
    // -------------------------------------------------

    return NextResponse.json({
      success: true,
      message: 'Daily blog post successfully generated and published!',
      topic,
      slug,
      title: blogTitle,
      wordCount,
    }, { status: 201 });

  } catch (err: any) {
    console.error('[Cron] Fatal error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return executeDailyBlogPipeline(req);
}

export async function POST(req: NextRequest) {
  return executeDailyBlogPipeline(req);
}
