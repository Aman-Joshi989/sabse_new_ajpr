export interface LinkedInContentItem {
  id: string;
  day: 'Monday' | 'Wednesday' | 'Friday';
  theme: string;
  hook: string;
  text: string;
  firstComment: string;
  hashtags: string[];
  carouselSlides?: {
    slideNumber: number;
    headline: string;
    subheadline: string;
    points?: string[];
  }[];
}

export const CURATED_LINKEDIN_POSTS: LinkedInContentItem[] = [
  {
    id: 'post-1-agency-teardown',
    day: 'Monday',
    theme: 'Contrarian Agency Economics & Engineering Leverage',
    hook: 'Most companies spending $5,000 to $15,000/mo on marketing agencies are getting scammed.\n\nNot because the agencies are malicious.\nBecause their business model belongs in 2018.',
    text: `Most companies spending $5,000 to $15,000/mo on marketing agencies are getting scammed.

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
    firstComment: 'Full breakdown on how to choose a modern growth partner without burning budget: https://ajprworld.com/blog/marketing-strategy-consulting-how-to-choose-a-provider',
    hashtags: ['#B2BMarketing', '#StartupGrowth', '#AgencyLife', '#SoftwareEngineering', '#AJPRWorld'],
    carouselSlides: [
      {
        slideNumber: 1,
        headline: 'The $10,000/mo Agency Trap',
        subheadline: 'Why traditional retainers are dying and what modern founders use instead.',
      },
      {
        slideNumber: 2,
        headline: 'What You Pay For vs What You Get',
        subheadline: 'The Hidden Breakdown:',
        points: [
          'Pitch: Handled by senior executives',
          'Execution: Handed to junior interns',
          'Deliverable: 40-page vanity PDF reports',
          'Outcome: Zero direct pipeline attribution'
        ]
      },
      {
        slideNumber: 3,
        headline: 'The 4 Pillars of Engineering Leverage',
        subheadline: 'Replace manual fluff with code:',
        points: [
          'Programmatic SEO: 100+ high-intent pages in days',
          'Server-Side Tracking: Zero dropped conversion data',
          'AI Inbound Enrichment: Real-time lead scoring',
          'Sub-150ms Speed: 99+ Core Web Vitals'
        ]
      },
      {
        slideNumber: 4,
        headline: 'The Checklist Before Signing',
        subheadline: 'Demand these 3 terms:',
        points: [
          '1. Flat retainer under $25k ad spend',
          '2. 100% IP and code ownership from Day 1',
          '3. Live dashboard access, not monthly PDFs'
        ]
      },
      {
        slideNumber: 5,
        headline: 'Scale With Code, Not Headcount',
        subheadline: 'Follow Aman Joshi & AJPR World for high-velocity engineering and growth teardowns.',
      }
    ]
  },
  {
    id: 'post-2-geo-ai-search',
    day: 'Wednesday',
    theme: 'Generative Engine Optimization (GEO) & AI Search',
    hook: 'Ranking #1 on Google is no longer the holy grail.\n\nLast week, a B2B founder told me:\n"Our organic traffic dropped 22%, but our inbound pipeline stayed flat."',
    text: `Ranking #1 on Google is no longer the holy grail.

Last week, a B2B founder told me:
"Our organic traffic dropped 22%, but our inbound pipeline stayed flat."

Here is why: Search has fundamentally fractured.

Prospects are no longer typing 3 keywords into Google and clicking 5 blue links.
They are asking Perplexity, ChatGPT, and Claude:
→ "Compare the top 3 Webflow agencies for healthcare startups."
→ "What does an enterprise SEO retainer cost in 2026?"
→ "Which agency is best for B2B outbound automation?"

The AI doesn't visit your page and click an ad. 
It synthesizes the answer directly.

If your website isn't optimized for GEO (Generative Engine Optimization), you are completely invisible to the highest-intent buyers.

How to make your platform AI-discoverable right now:

1. Kill generic fluff: LLMs prioritize original data, first-party benchmarks, and definitive tables over 2,000 words of filler.
2. Publish transparent pricing: If an AI crawler can't extract your cost structure, it recommends your competitor who has it listed.
3. Deploy Schema.org with zero errors: Complete entity graph linking (Article, Service, Organization, and FAQ schema).
4. Unblock AI bots in robots.txt: If you block GPTBot or PerplexityBot out of fear, you remove yourself from the recommendation engine.

The winners of the next 3 years won't be the ones gaming Google's algorithm.
It will be the brands that AI models trust as canonical sources of truth.

Are you preparing your website for AI search yet?`,
    firstComment: 'We published the full 2026 Generative Engine Optimization guide here: https://ajprworld.com/services/geo-optimization',
    hashtags: ['#GEO', '#GenerativeEngineOptimization', '#AI', '#SEO2026', '#SearchEngineOptimization'],
    carouselSlides: [
      {
        slideNumber: 1,
        headline: 'Google SEO vs. GEO in 2026',
        subheadline: 'Why ranking #1 is obsolete if Perplexity answers the query directly.',
      },
      {
        slideNumber: 2,
        headline: 'How AI Crawlers Pick Winners',
        subheadline: 'Perplexity, ChatGPT, and Claude prioritize:',
        points: [
          'First-party data tables and benchmark studies',
          'Transparent, machine-readable pricing',
          'Flawless Schema.org entity graphs',
          'Fast server TTFB (< 200ms)'
        ]
      },
      {
        slideNumber: 3,
        headline: 'The 4 Critical Fixes to Make Today',
        subheadline: 'Immediate action plan:',
        points: [
          'Allow GPTBot and PerplexityBot in robots.txt',
          'Add FAQSchema and ServiceSchema to high-intent pages',
          'Replace generic opinions with hard metrics',
          'Submit updated URLs via IndexNow API'
        ]
      },
      {
        slideNumber: 4,
        headline: 'The Future of Discovery',
        subheadline: 'Be the canonical citation that AI engines reference every single day.',
      }
    ]
  },
  {
    id: 'post-3-transparent-pricing',
    day: 'Friday',
    theme: 'Transparent Pricing & Agency Retainer Comparison',
    hook: 'Why do 95% of digital marketing agencies hide their pricing?\n\nBecause ambiguity allows them to charge you based on your funding round instead of their actual cost.',
    text: `Why do 95% of digital marketing agencies hide their pricing?

Because ambiguity allows them to charge you based on your funding round instead of their actual cost.

We analyzed over 150 agency proposals across North America.
Here is the real 2026 pricing benchmark:

1. SEO Management:
• Freelancers: $750 – $1,500/mo (Good for basic on-page, zero dev support)
• Mid-Market Agencies: $2,500 – $6,000/mo (Standard retainer for technical SEO + content)
• Enterprise/National: $8,000 – $25,000/mo (Includes digital PR, high-end content clusters)

2. PPC Management:
• Under $25k spend: Flat fee ($1,500 – $3,500/mo)
• Over $50k spend: 10% to 15% of ad spend
⚠️ Warning: Never allow an agency to charge a markup on raw media spend.

3. Custom Web Application & MVP:
• WordPress template: $3,000 – $8,000 (Bloated, slow, plugin dependent)
• Next.js / TypeScript custom build: $6,000 – $25,000 (Sub-150ms speed, limitless scale, enterprise security)

At AJPR World, we believe opaque pricing is an outdated relic.
When you show exact costs upfront:
→ Unqualified leads filter themselves out
→ Serious founders book calls ready to build
→ Trust is established before the first conversation

What has been your experience with agency pricing transparency?`,
    firstComment: 'Explore our complete interactive agency pricing calculator and free benchmarks: https://ajprworld.com/pricing',
    hashtags: ['#AgencyPricing', '#B2BSaaS', '#PPC', '#SEO', '#TransparentPricing'],
    carouselSlides: [
      {
        slideNumber: 1,
        headline: 'The 2026 Digital Agency Pricing Guide',
        subheadline: 'Real market rates for SEO, PPC, and Custom Web Engineering.',
      },
      {
        slideNumber: 2,
        headline: 'SEO Retainer Benchmarks',
        subheadline: 'What you should actually pay:',
        points: [
          'Solo Specialist: $750 - $1,500/mo',
          'Boutique Engineering Agency: $2,500 - $6,000/mo',
          'Legacy Enterprise: $10,000+/mo'
        ]
      },
      {
        slideNumber: 3,
        headline: 'PPC Management Rules',
        subheadline: 'Flat Fee vs. Percentage:',
        points: [
          'Under $25k/mo spend: Flat retainer only',
          'Over $50k/mo spend: Tiered 10-12%',
          'Zero markups on ad spend invoices'
        ]
      },
      {
        slideNumber: 4,
        headline: 'Calculate Your Exact Costs',
        subheadline: 'Use our free interactive calculator at ajprworld.com/tools',
      }
    ]
  },
  {
    id: 'post-4-speed-and-code',
    day: 'Monday',
    theme: 'Web Engineering, Core Web Vitals & Conversion Rates',
    hook: 'Every 100ms of latency costs you 1% in conversions.\n\nYet most agencies deliver websites loaded with 35 plugins that take 4.8 seconds to load on mobile.',
    text: `Every 100ms of latency costs you 1% in conversions.

Yet most agencies deliver websites loaded with 35 plugins that take 4.8 seconds to load on mobile.

Last month, we audited a B2B SaaS platform spending $15,000/month on Google Ads.
Their bounce rate was 68%.

When we ran a Lighthouse performance audit:
• Time-to-First-Byte (TTFB): 1.9 seconds
• Largest Contentful Paint (LCP): 4.6 seconds
• Cumulative Layout Shift: 0.28 (elements jumping across the screen)

More than half of their paid ad clicks left before the page even finished rendering.
They weren't suffering from an ad copy problem.
They had an infrastructure problem.

How we fixed it in 5 days:
1. Migrated the frontend to Next.js 15 with Server Components.
2. Inlined critical CSS and purged all unneeded third-party libraries.
3. Implemented AVIF and WebP image optimization with responsive srcset.
4. Set up edge caching on Cloudflare CDN.

The results:
→ TTFB dropped to 85ms
→ Mobile load time dropped to 1.1s
→ Conversion rate increased by +38% with the exact same ad spend

Before you burn another dollar on ad campaigns or redesigns, fix your foundational engineering.

How fast is your primary landing page loading right now?`,
    firstComment: 'Get a free technical and Core Web Vitals architecture audit here: https://ajprworld.com/free-audit',
    hashtags: ['#WebPerformance', '#CoreWebVitals', '#Nextjs', '#ConversionRateOptimization', '#TechStack'],
    carouselSlides: [
      {
        slideNumber: 1,
        headline: 'The Latency Tax on Paid Ads',
        subheadline: 'Why slow pages destroy your ROAS before the user reads a single word.',
      },
      {
        slideNumber: 2,
        headline: 'The Speed Audit Breakdown',
        subheadline: 'Target benchmarks for 2026:',
        points: [
          'TTFB: Under 200ms',
          'LCP: Under 2.0s on 4G Mobile',
          'CLS: Under 0.05',
          'Total Page Weight: Under 1.2 MB'
        ]
      },
      {
        slideNumber: 3,
        headline: 'The Engineering Stack of Winners',
        subheadline: 'Replace plugin bloat with:',
        points: [
          'Next.js 15 Server Components',
          'Tailwind CSS / Vanilla CSS without runtime overhead',
          'Edge caching on global CDN nodes',
          'Server-side conversion dataLayers'
        ]
      }
    ]
  }
];
