import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agency & Consultant Client Email Response Generator | AJPR World',
  description: 'Generate professional, executive-grade responses for tough client situations: scope creep, overdue invoices, price objections, and project delays.',
  alternates: {
    canonical: 'https://ajprworld.com/tools/client-response-generator',
  },
  openGraph: {
    title: 'Agency & Consultant Client Email Response Generator | AJPR World',
    description: 'Generate professional, executive-grade responses for tough client situations: scope creep, overdue invoices, price objections, and project delays.',
    url: 'https://ajprworld.com/tools/client-response-generator',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Client Email Response Generator | AJPR World',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency & Consultant Client Email Response Generator | AJPR World',
    description: 'Generate professional responses for tough client situations with 1 click.',
    images: ['https://ajprworld.com/og-image.jpg'],
  }
};

export default function ClientResponseGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
