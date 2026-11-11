export const WebSiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://ajprworld.com/#website',
        url: 'https://ajprworld.com',
        name: 'AJPR World',
        description: 'AJPR World is a senior software engineering studio building custom AI MVPs, scalable web platforms, and automated business systems with 100% code ownership.',
        publisher: {
          '@id': 'https://ajprworld.com/#organization'
        },
        creator: {
          '@id': 'https://ajprworld.com/aman-joshi/#person'
        },
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://ajprworld.com/services?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        ],
        inLanguage: 'en-US'
      },
      {
        '@type': 'SiteNavigationElement',
        '@id': 'https://ajprworld.com/#navigation',
        name: 'AJPR World Primary Site Navigation',
        hasPart: [
          {
            '@type': 'WebPage',
            name: 'Custom Web Development Services',
            url: 'https://ajprworld.com/services/web-development',
            description: 'Sub-second Next.js web applications, PostgreSQL architecture, and 99+ Core Web Vitals.'
          },
          {
            '@type': 'WebPage',
            name: 'Autonomous AI MVP Development & Agents',
            url: 'https://ajprworld.com/ai-systems',
            description: 'Custom AI MVPs, LangGraph autonomous workflows, and operational triage agents in 2 to 4 weeks.'
          },
          {
            '@type': 'WebPage',
            name: 'Website Security & Maintenance',
            url: 'https://ajprworld.com/services/website-security-maintenance',
            description: '24/7 uptime monitoring, security SLA, and automated disaster recovery.'
          },
          {
            '@type': 'WebPage',
            name: 'Technical SEO & Generative Engine Optimization',
            url: 'https://ajprworld.com/services/technical-seo',
            description: 'Entity graph citations, AI search engine optimization, and structured JSON-LD schemas.'
          },
          {
            '@type': 'WebPage',
            name: 'SaaS Platform Architecture & Multi-Tenant Systems',
            url: 'https://ajprworld.com/services/saas-product-development',
            description: 'Enterprise multi-tenant software platforms, Stripe billing integration, and role-based access control.'
          },
          {
            '@type': 'WebPage',
            name: 'Transparent Sprint Pricing & Retainers',
            url: 'https://ajprworld.com/pricing',
            description: 'Predictable fixed sprint costs and dedicated senior pod retainers with zero hourly creep.'
          },
          {
            '@type': 'WebPage',
            name: 'Website Development Cost Calculator',
            url: 'https://ajprworld.com/pricing/website-cost',
            description: 'Interactive cost model comparing SMB builds against enterprise web platforms in 2026.'
          },
          {
            '@type': 'WebPage',
            name: 'SEO Cost in 2026: Pricing Guide',
            url: 'https://ajprworld.com/pricing/seo-cost',
            description: 'Organic search marketing retainers and Generative Engine Optimization benchmarks.'
          },
          {
            '@type': 'WebPage',
            name: 'Agency ROI Estimator & Calculator',
            url: 'https://ajprworld.com/tools/agency-pricing-calculator',
            description: 'Calculate real financial savings comparing internal US/India hiring vs. dedicated engineering pods.'
          },
          {
            '@type': 'WebPage',
            name: 'Competitor Benchmarks & Agency Alternatives',
            url: 'https://ajprworld.com/compare',
            description: 'Objective comparisons against WebFX, Rootstrap, and legacy offshore agencies.'
          },
          {
            '@type': 'WebPage',
            name: 'Aman Joshi, Founder & Systems Architect',
            url: 'https://ajprworld.com/aman-joshi',
            description: 'Direct systems architecture leadership, full code ownership philosophy, and verified client portfolio.'
          },
          {
            '@type': 'WebPage',
            name: 'Book a 30-Minute Architecture Session',
            url: 'https://ajprworld.com/book-call',
            description: 'Direct scoping consultation for web applications, AI MVPs, and business automation.'
          }
        ]
      }
    ]
  };

  return (
    <script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

