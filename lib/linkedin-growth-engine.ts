/**
 * AJPR WORLD LINKEDIN PAGE GROWTH PROGRAM — CORE ENGINE
 * 
 * Strategic Objectives:
 * 1. Establish AJPR World (urn:li:organization:107565213) as the premier B2B Growth Engineering authority.
 * 2. Execute the "Founder-to-Company Dual Distribution Loop" (Aman Joshi personal profile + AJPR World company page).
 * 3. Drive high-intent traffic to the $1,500 48-Hour Diagnostic Audit without algorithm link penalties (First-Comment trick).
 * 4. Leverage high-dwell visual formats (PDF Carousels & Contrarian Teardowns).
 */

import { Pool } from 'pg';

export interface GrowthCarouselSlide {
  slideNumber: number;
  headline: string;
  subheadline: string;
  bullets?: string[];
  takeaway?: string;
}

export interface GrowthProgramPost {
  id: string;
  pillar: 'agency-economics' | 'geo-ai-search' | 'programmatic-seo' | 'diagnostic-audits';
  pillarTitle: string;
  dayOfWeek: 'Monday' | 'Wednesday' | 'Friday';
  suggestedTime: string; // e.g. "08:15 AM EST"
  theme: string;
  hook: string;
  body: string;
  firstComment: string;
  hashtags: string[];
  callToAction: string;
  carousel: {
    title: string;
    description: string;
    slides: GrowthCarouselSlide[];
  };
}

export const AJPR_GROWTH_POSTS: GrowthProgramPost[] = [
  {
    id: 'growth-1-agency-economics',
    pillar: 'agency-economics',
    pillarTitle: 'Contrarian Agency Economics & Engineering Leverage',
    dayOfWeek: 'Monday',
    suggestedTime: '08:15 AM EST',
    theme: 'Why $10,000/mo Traditional Agency Retainers Fail in 2026',
    hook: `Most companies spending $5,000 to $15,000/mo on marketing agencies are getting scammed.

Not because the agencies are malicious.
Because their business model belongs in 2018.`,
    body: `Most companies spending $5,000 to $15,000/mo on marketing agencies are getting scammed.

Not because the agencies are malicious.
Because their business model belongs in 2018.

Here is what happens behind the scenes at a traditional agency:

1. You talk to a charismatic VP of Sales during the pitch.
2. You sign a 6-month contract with a $10,000/mo retainer.
3. The account gets handed to a 22-year-old junior coordinator juggling 14 accounts.
4. Month 1: "Onboarding & Audit" (zero execution).
5. Month 2: Two generic blog posts written by ChatGPT with zero domain expertise.
6. Month 3: A 40-page PDF report measuring vanity metrics like "Impressions" and "Reach".

When you ask why pipeline isn’t growing, the answer is always:
"SEO and brand take 12 to 18 months."

Meanwhile, a lean, technical team can now do in 30 days what took a 20-person agency 6 months:
→ Programmatic landing page engines that dominate local search
→ Real-time attribution pipelines connected to your CRM
→ Custom AI agents automating lead enrichment and follow-ups
→ Conversion-focused web engineering with 99+ Core Web Vitals

The future of growth isn't more slide decks.
It's engineering leverage.

If your marketing partner doesn't know how to code, build automated pipelines, or prove direct ROI to your P&L, you don't have a growth agency.

You have an expensive freelance coordinator.

Agree or disagree? Drop your thoughts below. 👇`,
    firstComment: `📌 Full breakdown on how to choose a modern growth partner without burning budget: https://ajprworld.com/blog/marketing-strategy-consulting-how-to-choose-a-provider

Need an objective teardown of your current marketing stack? We run 48-Hour Diagnostic Audits at AJPR World: https://ajprworld.com/audit`,
    hashtags: ['#B2BMarketing', '#StartupGrowth', '#AgencyLife', '#SoftwareEngineering', '#AJPRWorld'],
    callToAction: 'Book a 48-Hour Diagnostic Audit at ajprworld.com/audit',
    carousel: {
      title: 'The $10,000/mo Agency Trap',
      description: 'Why traditional retainers are dying and what modern founders use instead.',
      slides: [
        {
          slideNumber: 1,
          headline: 'The $10,000/mo Agency Trap',
          subheadline: 'Why traditional retainers are dying and what modern technical founders use instead.',
          takeaway: 'Swipe to see the hidden breakdown →'
        },
        {
          slideNumber: 2,
          headline: 'What You Pay For vs What You Get',
          subheadline: 'The Traditional Retainer Lifecycle:',
          bullets: [
            'Pitch: Handled by senior executives',
            'Execution: Handed to junior interns',
            'Deliverable: 40-page vanity PDF reports',
            'Outcome: Zero direct pipeline attribution'
          ]
        },
        {
          slideNumber: 3,
          headline: 'The 4 Pillars of Engineering Leverage',
          subheadline: 'Replace manual fluff with automated code:',
          bullets: [
            'Programmatic SEO: 100+ high-intent pages in days',
            'Server-Side Tracking: Zero dropped conversion data',
            'AI Inbound Enrichment: Real-time lead scoring',
            'Sub-150ms Speed: 99+ Core Web Vitals on Next.js'
          ]
        },
        {
          slideNumber: 4,
          headline: 'The 3 Terms to Demand Before Signing',
          subheadline: 'Protect your P&L:',
          bullets: [
            '1. Flat retainer under $25k ad spend',
            '2. 100% IP and code ownership from Day 1',
            '3. Live dashboard access, not monthly PDFs'
          ]
        },
        {
          slideNumber: 5,
          headline: 'Scale With Code, Not Headcount',
          subheadline: 'Follow AJPR World for high-velocity growth and engineering teardowns.',
          takeaway: 'Visit ajprworld.com to audit your growth infrastructure.'
        }
      ]
    }
  },
  {
    id: 'growth-2-geo-ai-search',
    pillar: 'geo-ai-search',
    pillarTitle: 'Generative Engine Optimization (GEO) & AI Search Architecture',
    dayOfWeek: 'Wednesday',
    suggestedTime: '08:15 AM EST',
    theme: 'How to Win in ChatGPT, Perplexity, and Google SGE Search in 2026',
    hook: `Ranking #1 on Google is no longer the holy grail.

Last week, a B2B founder told me:
"Our organic traffic dropped 22%, but our inbound pipeline stayed completely flat."`,
    body: `Ranking #1 on Google is no longer the holy grail.

Last week, a B2B founder told me:
"Our organic traffic dropped 22%, but our inbound pipeline stayed completely flat."

Here is why:
Buyers don't scroll through 10 blue links anymore.
They ask ChatGPT, Perplexity, or Google AI Overviews:
"What is the best enterprise solution for X?"

If your brand isn’t cited in the synthesized LLM answer, you don't exist to high-intent buyers.

This is Generative Engine Optimization (GEO).

At AJPR World, we analyzed over 500 AI synthesized responses.
Here are the 4 non-negotiable rules to get cited by LLMs:

1. Double E-E-A-T Dual-Author Verification
AI models index who wrote it and who verified it. Single-author generic posts get flagged as low-confidence. Credentialed peer review wins citations.

2. Primary Research & Proprietary Data Sets
LLMs cite original survey data, proprietary pricing reports, and numerical benchmarks. If you cite secondary sources, the AI cites them, not you.

3. Structured Schema Architecture
Deep nested JSON-LD schema (TechArticle, Organization, Dataset) gives the LLM crawler direct machine-readable facts without hallucination risk.

4. Concise "Answer-Engine" Snippets
Place a 4-bullet executive summary directly before the fold. When an LLM searches for the direct answer, this is the exact block it extracts.

Organic search isn't dying.
It is evolving from keyword matching to entity authority.

Are you optimizing for search crawlers or LLM synthesis engines? 👇`,
    firstComment: `📌 Read our complete technical guide on Generative Engine Optimization (GEO): https://ajprworld.com/blog/generative-engine-optimization-guide

Discover where your site stands in AI search with an AJPR World Diagnostic: https://ajprworld.com/audit`,
    hashtags: ['#AI', '#GEO', '#SearchEngineOptimization', '#Perplexity', '#B2BStrategy', '#AJPRWorld'],
    callToAction: 'Check your AI search readiness at ajprworld.com',
    carousel: {
      title: 'The GEO Playbook: Winning AI Search',
      description: 'How to get your company cited in ChatGPT, Perplexity, and Gemini answers.',
      slides: [
        {
          slideNumber: 1,
          headline: 'The GEO Playbook for 2026',
          subheadline: 'How high-growth B2B companies get cited in ChatGPT, Claude, and Perplexity answers.',
          takeaway: 'Swipe to see the 4 extraction signals →'
        },
        {
          slideNumber: 2,
          headline: 'The Shift: 10 Blue Links vs AI Synthesis',
          subheadline: 'What changed:',
          bullets: [
            'Traditional: User clicks 3-5 links and reads blogs',
            'AI Search: LLM reads 100 pages and cites the top 2 authorities',
            'Result: Less vanity traffic, 3x higher conversion intent'
          ]
        },
        {
          slideNumber: 3,
          headline: 'Signal 1 & 2: Machine Extraction',
          subheadline: 'Technical setup:',
          bullets: [
            '1. Dual Author Schema: Verified editorial credentials',
            '2. Answer Block: 4-bullet concise answer above the fold'
          ]
        },
        {
          slideNumber: 4,
          headline: 'Signal 3 & 4: Data Authority',
          subheadline: 'Content architecture:',
          bullets: [
            '3. Proprietary Datasets: Original numerical research',
            '4. Nested JSON-LD: Machine-readable entity mapping'
          ]
        },
        {
          slideNumber: 5,
          headline: 'Audit Your Generative Visibility',
          subheadline: 'AJPR World helps enterprise brands engineer organic and AI search dominance.',
          takeaway: 'Follow AJPR World for more systems architecture.'
        }
      ]
    }
  },
  {
    id: 'growth-3-programmatic-seo',
    pillar: 'programmatic-seo',
    pillarTitle: 'Programmatic SEO & Sub-150ms Web Engineering',
    dayOfWeek: 'Friday',
    suggestedTime: '08:15 AM EST',
    theme: 'Scaling 100+ High-Intent Landing Pages with 99+ Core Web Vitals',
    hook: `Most marketing teams take 6 months to launch 10 landing pages.

A growth engineer launches 150 pages in 48 hours.

Here is the exact Next.js architecture we use:`,
    body: `Most marketing teams take 6 months to launch 10 landing pages.

A growth engineer launches 150 pages in 48 hours.

Here is the exact Next.js architecture we use at AJPR World:

The Old Way:
- Designer creates 10 Figma mocks
- Copywriter writes 10 separate documents
- Developer builds 10 individual pages in WordPress or Webflow
- Pages load in 3.8 seconds with 42 plugins
- Outcome: $25,000 spent, slow load times, poor rankings

The Engineering Way (Programmatic Architecture):
1. Dataset Modeling:
Define an enterprise schema for your buyer persona, problem taxonomy, and regional clusters.

2. Next.js Static Generation:
Use generateStaticParams with Incremental Static Regeneration (ISR). Every page pre-renders in under 100ms.

3. Dynamic Component Injection:
Modular components for localized proof points, pricing calculators, and interactive audit forms.

4. 99+ Core Web Vitals:
Zero layout shift (CLS: 0), sub-1.2s Largest Contentful Paint (LCP), and sub-100ms Interaction to Next Paint (INP).

When a page loads in 120ms, bounce rates drop by 40% and Google prioritizes your crawl budget.

Speed is not just a dev metric.
Speed is a conversion lever.

How fast is your primary landing page loading right now? Check with PageSpeed and let's discuss below. 👇`,
    firstComment: `📌 Benchmark your site speed and architecture against the AJPR standard: https://ajprworld.com

We build programmatic growth engines that scale without developer bottlenecks. See our case studies: https://ajprworld.com/case-studies`,
    hashtags: ['#NextJS', '#WebPerformance', '#CoreWebVitals', '#ProgrammaticSEO', '#GrowthEngineering', '#AJPRWorld'],
    callToAction: 'Audit your site speed at ajprworld.com',
    carousel: {
      title: 'Programmatic Growth Architecture',
      description: 'How to build high-converting programmatic pages with Next.js.',
      slides: [
        {
          slideNumber: 1,
          headline: '150 Landing Pages in 48 Hours',
          subheadline: 'The Next.js Programmatic Growth Architecture.',
          takeaway: 'Swipe for the technical diagram →'
        },
        {
          slideNumber: 2,
          headline: 'The Performance Bottleneck',
          subheadline: 'Why CMS platforms fail at scale:',
          bullets: [
            'WordPress/Webflow: 3.5s+ load times, bloated scripts',
            'High bounce rates: Every 1s delay = 7% conversion drop',
            'Google crawl penalty: Slow pages burn search budget'
          ]
        },
        {
          slideNumber: 3,
          headline: 'The Next.js 16 Stack',
          subheadline: 'Engineered for sub-150ms performance:',
          bullets: [
            'Turbopack + ISR: Instant compilation & caching',
            'Tailwind CSS: Sub-20kb zero-runtime stylesheet',
            'Server Components: Minimal client-side JavaScript'
          ]
        },
        {
          slideNumber: 4,
          headline: 'The 3-Step Scaling Pipeline',
          subheadline: 'From data to revenue:',
          bullets: [
            '1. Schema: Map high-intent search taxonomy',
            '2. Engine: Automated template hydration',
            '3. Conversion: Embedded 48-Hour Audit modals'
          ]
        },
        {
          slideNumber: 5,
          headline: 'Build With AJPR World',
          subheadline: 'Engineering-led marketing that outpaces traditional agencies.',
          takeaway: 'Follow AJPR World for more system blueprints.'
        }
      ]
    }
  },
  {
    id: 'growth-4-diagnostic-audits',
    pillar: 'diagnostic-audits',
    pillarTitle: 'The 48-Hour Diagnostic Audit & Risk Reversal',
    dayOfWeek: 'Monday',
    suggestedTime: '08:15 AM EST',
    theme: 'Why B2B Buying Decisions Are Stuck (And How to Unstick Them)',
    hook: `If you want to sell a $60,000 annual contract to a smart CEO, stop pitching the $60,000 contract on Day 1.

Smart executives don't hate spending money.
They hate risk.`,
    body: `If you want to sell a $60,000 annual contract to a smart CEO, stop pitching the $60,000 contract on Day 1.

Smart executives don't hate spending money.
They hate risk.

When you ask a prospect to sign a 6-month or 12-month retainer on a cold discovery call:
- Their internal legal team slows it down
- Their CFO demands 3 quotes
- The project stalls for 90 days in committee

Here is the exact model we use at AJPR World to eliminate risk:
The "Paid Diagnostic Audit" Wedge.

Instead of demanding a marriage on the first date, we offer a standalone, flat-fee 48-Hour Diagnostic Audit ($1,500):

What the client gets:
1. Full Core Web Vitals and architecture audit
2. Generative Search & GEO readiness scorecard
3. Real-time CRM attribution pipeline inspection
4. The exact 90-day technical roadmap with prioritized ROI

Why it works for the client:
- Low risk: It’s an easy corporate credit card purchase
- Fast turnaround: Actionable data in 48 hours, not 6 weeks
- Zero lock-in: They own the entire roadmap regardless of who builds it

Why it works for AJPR World:
- Filters out unqualified prospects instantly
- Proves engineering competence with hard data
- Over 70% of audit clients immediately hire us to execute the roadmap

De-risk the purchase, and the sale handles itself.

Do you offer a diagnostic wedge in your B2B funnel? 👇`,
    firstComment: `📌 Learn more about the AJPR World 48-Hour Diagnostic Audit: https://ajprworld.com/audit

Read our transparent pricing and services teardown: https://ajprworld.com/pricing/seo-cost`,
    hashtags: ['#B2BSales', '#Consulting', '#ProductizedServices', '#GrowthStrategy', '#AJPRWorld'],
    callToAction: 'Book a Diagnostic Audit at ajprworld.com/audit',
    carousel: {
      title: 'The Diagnostic Wedge Strategy',
      description: 'How to close 6-figure B2B contracts by de-risking the first transaction.',
      slides: [
        {
          slideNumber: 1,
          headline: 'The Diagnostic Wedge',
          subheadline: 'How to close 6-figure B2B contracts by de-risking the first purchase.',
          takeaway: 'Swipe to see the conversion funnel →'
        },
        {
          slideNumber: 2,
          headline: 'The Retainer Sales Trap',
          subheadline: 'Why cold discovery calls stall:',
          bullets: [
            'CFO demands 3 competitive bids',
            'Legal delays contracts by 60 days',
            'High perceived risk of buyer remorse',
            'Outcome: Pipeline stalls in committee'
          ]
        },
        {
          slideNumber: 3,
          headline: 'The 48-Hour Diagnostic Audit',
          subheadline: 'The low-friction alternative:',
          bullets: [
            '$1,500 flat fee: No procurement committee needed',
            '48-hour delivery: Concrete ROI and technical roadmap',
            'Full IP ownership: Client owns all data and code'
          ]
        },
        {
          slideNumber: 4,
          headline: 'The 70% Conversion Loop',
          subheadline: 'Why diagnostics convert:',
          bullets: [
            'Clients see real data, not generic sales slides',
            'Trust is established before pitching retainers',
            '70%+ hire AJPR World to execute the plan'
          ]
        },
        {
          slideNumber: 5,
          headline: 'Upgrade Your Growth Funnel',
          subheadline: 'Follow AJPR World for more B2B systems teardowns.',
          takeaway: 'Book your audit at ajprworld.com/audit'
        }
      ]
    }
  }
];

function getPoolInstance(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
  });
}

/**
 * Checks the database for the active LinkedIn token status.
 */
export async function checkLinkedInTokenHealth(): Promise<{
  connected: boolean;
  expired: boolean;
  expiresAt: string | null;
  daysRemaining: number;
  hasToken: boolean;
}> {
  const pool = getPoolInstance();
  if (!pool) {
    return { connected: false, expired: true, expiresAt: null, daysRemaining: 0, hasToken: false };
  }

  try {
    const res = await pool.query(
      "SELECT access_token, expires_at FROM social_tokens WHERE platform = 'linkedin' ORDER BY created_at DESC LIMIT 1"
    );
    if (res.rows.length === 0 || !res.rows[0].access_token) {
      return { connected: false, expired: true, expiresAt: null, daysRemaining: 0, hasToken: false };
    }

    const row = res.rows[0];
    const expiresAt = row.expires_at ? new Date(row.expires_at) : null;
    const now = new Date();

    if (!expiresAt) {
      return { connected: true, expired: false, expiresAt: null, daysRemaining: 60, hasToken: true };
    }

    const diffMs = expiresAt.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const expired = diffMs <= 0;

    return {
      connected: !expired,
      expired,
      expiresAt: expiresAt.toISOString(),
      daysRemaining,
      hasToken: true
    };
  } catch (e) {
    console.error('[Growth Engine] Error checking token health:', e);
    return { connected: false, expired: true, expiresAt: null, daysRemaining: 0, hasToken: false };
  } finally {
    await pool.end();
  }
}

/**
 * Low-level LinkedIn UGC Post sender without dependencies on next/cache.
 */
export async function sendDirectLinkedInPost(params: {
  text: string;
  articleUrl?: string;
  articleTitle?: string;
  articleDescription?: string;
  companyId?: string;
  target?: 'company' | 'person' | 'both';
}): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  const pool = getPoolInstance();
  if (!pool) {
    return { success: false, error: 'Database connection missing.' };
  }

  let accessToken: string | null = null;
  try {
    const res = await pool.query(
      "SELECT access_token FROM social_tokens WHERE platform = 'linkedin' ORDER BY created_at DESC LIMIT 1"
    );
    if (res.rows.length > 0 && res.rows[0].access_token) {
      accessToken = res.rows[0].access_token;
    }
  } catch (err: any) {
    return { success: false, error: `Failed to fetch token: ${err.message}` };
  } finally {
    await pool.end();
  }

  if (!accessToken) {
    return { success: false, error: 'No active LinkedIn access token found in database. Run with --auth-url first.' };
  }

  const companyId = params.companyId || process.env.LINKEDIN_COMPANY_ID || '107565213';
  const target = params.target || 'company';
  const results = {
    person: { attempted: false, success: false, error: null as any, data: null as any },
    company: { attempted: false, success: false, error: null as any, data: null as any },
  };

  const executePost = async (authorUrn: string) => {
    const payload: any = {
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: params.text,
          },
          shareMediaCategory: params.articleUrl ? 'ARTICLE' : 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    };

    if (params.articleUrl) {
      payload.specificContent['com.linkedin.ugc.ShareContent'].media = [
        {
          status: 'READY',
          description: { text: params.articleDescription || '' },
          originalUrl: params.articleUrl,
          title: { text: params.articleTitle || '' },
        },
      ];
    }

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API returned ${response.status}: ${await response.text()}`);
    }
    return await response.json();
  };

  // 1. Post to personal profile if requested
  if (target === 'person' || target === 'both') {
    results.person.attempted = true;
    try {
      const userReq = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      const userData = await userReq.json();
      if (!userData.sub) throw new Error('Could not fetch user ID (sub) from LinkedIn userinfo');
      const data = await executePost(`urn:li:person:${userData.sub}`);
      results.person.success = true;
      results.person.data = data;
    } catch (e: any) {
      results.person.error = e.message;
      console.error('Personal LinkedIn post failed:', e.message);
    }
  }

  // 2. Post to Company Page
  if (target === 'company' || target === 'both') {
    results.company.attempted = true;
    try {
      const data = await executePost(`urn:li:organization:${companyId}`);
      results.company.success = true;
      results.company.data = data;
    } catch (e: any) {
      results.company.error = e.message;
      console.error('Company LinkedIn post failed:', e.message);
    }
  }

  const isSuccess =
    (target === 'both' && (results.person.success || results.company.success)) ||
    (target === 'person' && results.person.success) ||
    (target === 'company' && results.company.success);

  return {
    success: isSuccess,
    data: results,
    error: isSuccess ? undefined : (results.company.error || results.person.error || 'Publish failed'),
  };
}

/**
 * Publishes a curated Growth Program post directly to the AJPR World LinkedIn Page and/or Founder profile.
 */
export async function executeGrowthPublish(params: {
  postIndex?: number;
  postId?: string;
  target?: 'company' | 'person' | 'both';
  customText?: string;
}): Promise<{
  success: boolean;
  publishedTo: string;
  postTheme: string;
  firstComment: string;
  data?: any;
  error?: string;
}> {
  const companyId = process.env.LINKEDIN_COMPANY_ID || '107565213';
  const target = params.target || 'company';

  // Find post
  let selectedPost = AJPR_GROWTH_POSTS[0];
  if (params.postId) {
    const found = AJPR_GROWTH_POSTS.find(p => p.id === params.postId);
    if (found) selectedPost = found;
  } else if (params.postIndex !== undefined && AJPR_GROWTH_POSTS[params.postIndex]) {
    selectedPost = AJPR_GROWTH_POSTS[params.postIndex];
  }

  const postText = params.customText || `${selectedPost.body}\n\n${selectedPost.hashtags.join(' ')}`;

  const result = await sendDirectLinkedInPost({
    text: postText,
    companyId: companyId,
    target: target,
  });

  return {
    success: result.success,
    publishedTo: target,
    postTheme: selectedPost.theme,
    firstComment: selectedPost.firstComment,
    data: result.data,
    error: result.error,
  };
}
