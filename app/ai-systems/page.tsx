import { Metadata } from 'next';
import AiSystemsClient from './AiSystemsClient';

export const metadata: Metadata = {
  title: 'AI Automation & AI Agent Systems for Business | AJPR World',
  description: 'Turn repetitive business processes into intelligent, automated operating systems. AJPR World builds LeadOS, SupportOS, and OpsOS powered by n8n, WhatsApp API, and enterprise AI agents with deterministic guardrails.',
  keywords: 'AI automation agency, AI agent development, n8n automation, LeadOS, WhatsApp AI sales agent, AI business systems, AI lead qualification, AJPR World',
  alternates: {
    canonical: 'https://ajprworld.com/ai-systems',
  },
  openGraph: {
    title: 'AI Automation & AI Agent Systems for Business | AJPR World',
    description: 'We architect production-grade AI Operating Systems that turn repetitive business operations into automated revenue engines.',
    url: 'https://ajprworld.com/ai-systems',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation & AI Agent Systems for Business | AJPR World',
    description: 'Stop buying $50 disconnected Zapier workflows. We architect production-grade AI Operating Systems for business.',
    creator: '@ajprworld',
    images: ['https://ajprworld.com/og-image.jpg']
  }
};

export default function AiSystemsPage() {
  return <AiSystemsClient />;
}
