import { Metadata } from 'next';
import Script from 'next/script';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: 'SaaS Bloat & Subscription Cost Audit Tool | AJPR World',
  description: 'Calculate how much your business wastes on disconnected SaaS subscriptions like Zapier, HubSpot, and Airtable, and see how consolidation saves thousands annually.',
  alternates: {
    canonical: 'https://ajprworld.com/tools/saas-bloat-audit',
  },
  openGraph: {
    title: 'SaaS Bloat & Subscription Cost Audit Tool | AJPR World',
    description: 'Calculate how much your business wastes on disconnected SaaS subscriptions and discover consolidation savings.',
    url: 'https://ajprworld.com/tools/saas-bloat-audit',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SaaS Bloat Audit Calculator | AJPR World',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Bloat & Subscription Cost Audit Tool | AJPR World',
    description: 'Audit your monthly software subscription stack and eliminate redundant recurring costs.',
    images: ['https://ajprworld.com/og-image.jpg'],
  }
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SaaS Bloat & Subscription Cost Audit Tool',
  url: 'https://ajprworld.com/tools/saas-bloat-audit',
  description: 'Calculate annual waste across disconnected SaaS subscriptions (Zapier, HubSpot, Airtable) and calculate consolidation ROI.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AJPR World',
    url: 'https://ajprworld.com'
  }
};

const toolFaqs = [
  {
    question: 'What is SaaS bloat and how does it hurt modern businesses?',
    answer: 'SaaS bloat occurs when a company accumulates overlapping, unmonitored software subscriptions across teams. It leads to duplicate seat fees, data silos, security vulnerabilities, and fragile third-party automations (like dozens of broken Zapier connections).'
  },
  {
    question: 'How much does the average SMB or agency waste on SaaS subscriptions?',
    answer: 'Industry benchmarks show the average 10–50 person company wastes between $18,000 and $45,000 every year on unused seats, redundant tools (e.g. paying for Notion, ClickUp, and Asana simultaneously), and premium tier add-ons.'
  },
  {
    question: 'How does consolidating SaaS into custom software save money?',
    answer: 'By consolidating disconnected third-party tools into a unified Next.js + PostgreSQL internal portal, companies eliminate monthly per-seat licensing, gain full data sovereignty, and cut ongoing subscription overhead by 60% to 80%.'
  },
  {
    question: 'Is this SaaS bloat audit calculator free to use?',
    answer: 'Yes, 100% free with no email or sign-up required to calculate your projected annual waste and consolidation payback period.'
  }
];

export default function SaasBloatAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQSchema faqs={toolFaqs} />
      <Script
        id="webapp-schema-saas-bloat"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      {children}
    </>
  );
}
