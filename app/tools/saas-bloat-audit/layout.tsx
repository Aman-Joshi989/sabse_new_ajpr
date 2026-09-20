import { Metadata } from 'next';

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

export default function SaasBloatAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
