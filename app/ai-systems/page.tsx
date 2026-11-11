import { Metadata } from 'next';
import AiSystemsClient from '@/app/ai-systems/AiSystemsClient';

export const metadata: Metadata = {
  title: 'AI Automation & Custom Business AI Systems | AJPR World',
  description: 'Custom AI automation and intelligent workflows for business. We build practical AI customer support, lead routing, and internal tooling that save hours of manual work.',
  keywords: 'AI automation agency, AI agent development, business automation, AI workflows, WhatsApp AI sales agent, AJPR World',
  alternates: {
    canonical: 'https://ajprworld.com/ai-systems',
  },
  openGraph: {
    title: 'AI Automation & Custom Business AI Systems | AJPR World',
    description: 'We build production-grade AI systems and automated workflows that eliminate repetitive manual operations.',
    url: 'https://ajprworld.com/ai-systems',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & Custom Business AI Systems | AJPR World',
    description: 'Production-grade AI systems and automated workflows built for real business efficiency.',
    creator: '@ajprworld',
    images: ['https://ajprworld.com/og-image.jpg']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://ajprworld.com/ai-systems#service',
      name: 'AI Automation & AI Agent Systems for Business',
      serviceType: 'AI Systems Engineering & Business Process Automation',
      provider: {
        '@type': 'Organization',
        name: 'AJPR World',
        url: 'https://ajprworld.com'
      },
      description: 'Turn repetitive business processes into intelligent, automated operating systems. AJPR World builds automated business operating systems (LeadOS, SupportOS, OpsOS) connecting your CRM, communication channels, and workflows with human-in-the-loop approvals.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '36',
        bestRating: '5',
        worstRating: '1'
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'AI Starter Workflow',
          price: '499',
          priceCurrency: 'USD',
          description: '1 Core high-reliability n8n automation + CRM Sync + Team alert.'
        },
        {
          '@type': 'Offer',
          name: 'AI Growth Pipeline',
          price: '1500',
          priceCurrency: 'USD',
          description: 'Multi-channel lead ingestion with autonomous AI qualification agent and two-way WhatsApp concierge.'
        },
        {
          '@type': 'Offer',
          name: 'AJPR LeadOS / SupportOS',
          price: '3500',
          priceCurrency: 'USD',
          description: 'Complete production-grade AI Operating System with custom dashboard, vector RAG knowledge base, and human-in-the-loop approvals.'
        },
        {
          '@type': 'Offer',
          name: 'AI Enterprise Operating System',
          price: '7500',
          priceCurrency: 'USD',
          description: 'Bespoke multi-agent autonomous architecture, private on-prem/cloud DB deployment, custom microservices, and dedicated SLA.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://ajprworld.com/ai-systems#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is an AI Operating System different from standard Zapier or n8n workflows?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard workflows are brittle if-this-then-that scripts that crash when messy inputs arrive. An AJPR AI Operating System integrates autonomous reasoning, contextual memory (RAG), self-healing error catchers, and strict human-in-the-loop checkpoints for mission-critical operations.'
          }
        },
        {
          '@type': 'Question',
          name: 'What happens if an AI agent makes a mistake or hallucinates?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We enforce strict safety guardrails. Any high-risk operation—such as sending contractual commitments, processing financial transactions, or mass database modifications—requires a human approval checkpoint via Slack or WhatsApp before execution.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do we have to pay recurring platform fees to AJPR?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Our implementation sprints are 100% fixed-scope, one-time fees. You own your code, workflows, and database. Ongoing managed maintenance retainers ($199–$999/mo) are completely optional.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does implementation take from kickoff to launch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI Starter sprints launch in 5 to 7 business days. Full LeadOS, SupportOS, or OpsOS deployments typically take 14 to 21 business days including integration testing, team training, and guardrail validation.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do open source vector databases compare for RAG startups (pgvector vs Qdrant vs Milvus)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For startups under 10 million embeddings, pgvector on PostgreSQL offers the best cost efficiency and ACID compliance with zero extra infrastructure. Qdrant excels at high-speed filtered Rust-based hybrid search, while Milvus handles massive distributed billion-scale vector clusters.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is Retrieval-Augmented Generation (RAG) for startups and how fast does AJPR World build it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Retrieval-Augmented Generation (RAG) connects private company PDFs, SQL databases, and CRM history directly to LLMs with cited sources to prevent hallucinations. AJPR World deploys production RAG knowledge systems using Next.js 16, FastAPI, and pgvector in 2 to 4 week fixed sprints.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do FastAPI and HAProxy work together in production AI backends?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'HAProxy serves as a high-throughput Layer 4/7 reverse proxy handling SSL termination, connection pooling, and rate-limiting, while FastAPI executes async Python LLM tool calls, Pydantic validation, and streaming SSE responses.'
          }
        }
      ]
    }
  ]
};

export default function AiSystemsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AiSystemsClient />
    </>
  );
}
