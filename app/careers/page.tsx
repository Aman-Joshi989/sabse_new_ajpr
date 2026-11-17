import React from 'react';
import { getPublishedJobPostings, DbJobPosting } from '@/lib/db/queries';
import CareersClient, { JobOpeningItem } from './CareersClient';

export const revalidate = 60; // Revalidate every 60 seconds (ISR) or on-demand via revalidatePath

const FALLBACK_JOBS: JobOpeningItem[] = [
  {
    id: 'senior-fullstack-engineer',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    job_type: 'Full-time / High-Yield Sprint',
    location: 'Remote (India / Global) • Hybrid (Haldwani / Delhi NCR)',
    experience: '2–5+ years',
    compensation: '₹10,00,000 – ₹20,00,000 / $24k – $48k + Sprint Bonuses',
    short_summary: 'Architect and deploy sub-200ms edge web platforms and MVPs for US, UK, and global tech clients using Next.js 16 and PostgreSQL.',
    skills: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Turbopack'],
    responsibilities: [
      'Architect, develop, and deploy production-grade Next.js App Router applications with sub-200ms TTFB.',
      'Design clean relational database schemas, migrations, and query indexes on PostgreSQL / Supabase / Neon.',
      'Ship clean server actions, optimistic UI states, and robust error-handling boundaries.',
      'Participate in high-speed PR reviews with 100% type safety and zero tolerance for bundle bloat.'
    ],
    must_haves: [
      'Strong practical experience shipping Next.js App Router in production (Server Components, Suspense, Streaming).',
      'High proficiency in TypeScript, relational SQL queries, and REST/GraphQL API construction.',
      'Obsessive care for Core Web Vitals (LCP < 1.2s, 0 CLS, high Lighthouse scores).'
    ],
    highlights: ['Direct collaboration with Lead Architect Aman Joshi', 'Zero corporate bureaucracy — code ships daily', '100% remote flexibility with modern tooling']
  },
  {
    id: 'ai-automation-engineer',
    title: 'Autonomous AI & Workflow Systems Engineer',
    department: 'AI Systems',
    job_type: 'Full-time / High-Yield Sprint',
    location: 'Remote (Worldwide)',
    experience: '2+ years',
    compensation: '₹8,00,000 – ₹18,00,000 / $20k – $40k + Milestone Share',
    short_summary: 'Construct autonomous multi-agent pipelines, CRM auto-triaging swarms, and RAG architectures powered by frontier LLMs and Python.',
    skills: ['Python', 'FastAPI', 'LangChain / LlamaIndex', 'OpenAI & Gemini APIs', 'pgvector', 'n8n', 'Webhooks'],
    responsibilities: [
      'Build and maintain autonomous multi-agent systems that automate candidate screening, CRM dispatch, and lead triage.',
      'Develop retrieval-augmented generation (RAG) pipelines with hybrid search, semantic chunking, and pgvector embeddings.',
      'Implement resilient webhook listeners, background job queues, and automated retry mechanisms.',
      'Fine-tune system prompts, evaluate synthetic outputs, and enforce reliable execution boundaries and response schemas.'
    ],
    must_haves: [
      'Demonstrated experience building real-world AI applications using OpenAI, Anthropic, or Gemini APIs.',
      'Strong Python and FastAPI or Node.js backend engineering foundations.',
      'Familiarity with webhook architectures, asynchronous job queues, and structured JSON outputs.'
    ],
    highlights: ['Work with frontier AI models on real production workloads', 'High autonomy in choosing agent architecture and tooling', 'Direct impact on revenue-generating client pipelines']
  },
  {
    id: 'technical-seo-growth-engineer',
    title: 'Technical SEO & Generative Search Architect',
    department: 'Growth & SEO',
    job_type: 'Full-time / High-Yield Sprint',
    location: 'Remote',
    experience: '2–4+ years',
    compensation: '₹7,00,000 – ₹15,00,000 / $18k – $36k + Revenue Performance Bonus',
    short_summary: 'Scale programmatic SEO platforms, coordinate 26+ JSON-LD schema graphs, and execute Generative Engine Optimization (GEO) for AI citations.',
    skills: ['Programmatic SEO', 'JSON-LD Schema Graphs', 'Core Web Vitals', 'Ahrefs & GSC', 'IndexNow API', 'GEO'],
    responsibilities: [
      'Engineer scalable programmatic SEO systems generating high-intent landing pages with unique localized data.',
      'Author complex JSON-LD knowledge graphs (ItemList, FAQPage, Organization, Service, Article) that search bots love.',
      'Execute Generative Engine Optimization (GEO) ensuring clients win citations in ChatGPT, Perplexity, and Google AI Overviews.',
      'Monitor and diagnose crawl anomalies, indexation drops, and server response TTFB in real time.'
    ],
    must_haves: [
      'Proven track record of measurably scaling organic search impressions and ranking in competitive commercial niches.',
      'Deep technical mastery of schema markup, canonical logic, sitemap trees, and modern crawling protocols (IndexNow).',
      'Ability to write clean semantic HTML/React components and analyze Google Search Console datasets.'
    ],
    highlights: ['Dominate cutting-edge search engineering (GEO + SEO)', 'Generous upside on search revenue growth', 'Work with top-tier international SaaS and B2B clients']
  },
  {
    id: 'frontend-ui-ux-engineer',
    title: 'Frontend UI/UX Product Engineer',
    department: 'Engineering',
    job_type: 'Full-time / Contractor',
    location: 'Remote • Hybrid (Haldwani / Delhi NCR)',
    experience: '1–4 years',
    compensation: '₹6,00,000 – ₹14,00,000 / $16k – $32k + Sprint Bonuses',
    short_summary: 'Translate high-fidelity product concepts into pixel-perfect React 19 / Tailwind interfaces with fluid 60fps micro-interactions.',
    skills: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'TypeScript', 'Figma'],
    responsibilities: [
      'Convert intricate Figma designs into production React 19 components with spotless typography and spacing.',
      'Craft fluid, performance-conscious micro-interactions and animations using Framer Motion.',
      'Ensure 100% responsive execution across mobile (375px), tablet, and 4K desktop screens without layout shifts.',
      'Build reusable design-system component libraries using Tailwind CSS and Radix UI primitives.'
    ],
    must_haves: [
      'A public portfolio or live GitHub repository demonstrating exceptional visual craft, spacing, and typography.',
      'Deep fluency in Tailwind CSS, modern CSS layouts (CSS Grid, flexbox, clamp), and SVG animation.',
      'Zero tolerance for sloppy UI alignment, poor color contrast, or sluggish mobile performance.'
    ],
    highlights: ['Build award-winning agency and product interfaces', 'Freedom to implement world-class visual styling and motion', 'Modern stack with zero legacy jQuery/Bootstrap tech debt']
  },
  {
    id: 'open-application',
    title: 'Open Engineering Application & Developer Network',
    department: 'Developer Network',
    job_type: 'Flexible Sprint Contracts / Pod Collaborator',
    location: 'Worldwide Remote',
    experience: 'All levels welcome (Demonstrated ability required)',
    compensation: 'Fixed Sprint Rates ($1,500 – $4,500 per sprint or competitive hourly)',
    short_summary: 'Are you a high-caliber builder in Rust, Go, Python, Cloud Architecture, or DevOps? Join our specialized sprint pod roster.',
    skills: ['Rust', 'Go', 'Python', 'DevOps / AWS / GCP', 'Flutter', 'Security Auditing'],
    responsibilities: [
      'Collaborate on client sprint deliverables requiring specialized domain architecture.',
      'Deliver focused, production-ready modules with comprehensive tests and documentation.',
      'Participate in architecture reviews and sprint milestone planning.'
    ],
    must_haves: [
      'Demonstrated track record of shipping software independently or in high-tempo teams.',
      'Clear, transparent asynchronous communication skills.',
      'Pride in code quality, security, and performance.'
    ],
    highlights: ['Choose the client sprints that fit your availability', 'Competitive USD/INR payouts with 0 corporate politics', 'Collaborate with a vetted network of senior developers']
  }
];

export default async function CareersPage() {
  let dbJobs: DbJobPosting[] = [];
  try {
    dbJobs = await getPublishedJobPostings();
  } catch (err) {
    console.error("Failed to load jobs from database:", err);
  }

  const jobsToDisplay: JobOpeningItem[] = (dbJobs && dbJobs.length > 0)
    ? dbJobs.map((j) => ({
        id: j.id || j.slug,
        title: j.title,
        department: j.department,
        job_type: j.job_type,
        location: j.location,
        experience: j.experience,
        compensation: j.compensation,
        short_summary: j.short_summary,
        skills: j.skills || [],
        responsibilities: j.responsibilities || [],
        must_haves: j.must_haves || [],
        highlights: j.highlights || []
      }))
    : FALLBACK_JOBS;

  return <CareersClient initialJobs={jobsToDisplay} />;
}
