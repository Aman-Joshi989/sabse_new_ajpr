const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const updates = [
  { route: '/portfolio', title: 'Engineering Portfolio | High-Growth Systems | AJPR' },
  { route: '/services', title: 'Technology Services | Software, AI & DevOps | AJPR' },
  { route: '/contact', title: 'Contact Us | Book a Strategy Session | AJPR World' },
  { route: '/services/technical-seo-services', title: 'Technical SEO Services | Optimize & Scale | AJPR' },
  { route: '/services/startup-mvp-development', title: 'Startup MVP Development | Rapid Engineering | AJPR' },
  { route: '/services/cloud-devops-services', title: 'Cloud Architecture & DevOps | AWS & CI/CD | AJPR' },
  { route: '/services/performance-marketing', title: 'Performance Marketing | High-Converting Ads | AJPR' },
  { route: '/careers', title: 'Careers | Build Autonomous AI & Software Systems' },
  { route: '/blog/why-jeff-bezos-investment-in-ai-for-chipmaking-could-revolutionize-startup-funding-in-tech', title: "Jeff Bezos' AI Chipmaking Investment & Startup Funding" },
  { route: '/demo-ruflo', title: 'RuFlo V3 Swarm Simulator | AI Agent Demo | AJPR' },
  { route: '/services/website-security-maintenance', title: 'Website Security & Maintenance | Proactive Protection' },
  { route: '/services/saas-product-development', title: 'SaaS Product Development | Scalable Architecture' },
  { route: '/services/ai-voice-agent-development', title: 'AI Voice Agent Development | Intelligent Voice | AJPR' },
  { route: '/blog/what-is-geo-generative-engine-optimization', title: 'What is Generative Engine Optimization (GEO)? | AJPR' },
  { route: '/blog/generative-engine-optimization-geo-the-complete-2026-strategy-guide-718', title: 'Generative Engine Optimization (GEO) 2026 Strategy' },
  { route: '/blog/why-startups-need-a-solid-systems-architecture-before-scaling-edition-891', title: 'Why Startups Need Solid Systems Architecture Before Scaling' },
  { route: '/blog/harnessing-aipowered-technical-seo-turbocharge-your-startups-online-presence-for-exponential-growth', title: 'Harnessing AI Technical SEO for Startup Growth | AJPR' }
];

async function run() {
  try {
    for (const u of updates) {
      if (u.title.length > 60) {
        console.warn(`WARNING: Title still over 60 chars: ${u.title.length} - ${u.title}`);
      }
      await pool.query('UPDATE seo_metadata SET title = $1 WHERE route = $2', [u.title, u.route]);
    }
    console.log('All updates complete.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
