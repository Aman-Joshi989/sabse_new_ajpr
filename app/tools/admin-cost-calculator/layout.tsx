import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'US Business Admin Cost & AI Automation ROI Calculator | AJPR World',
  description: 'Calculate monthly burned payroll on repetitive administrative busywork and see your projected return on autonomous AI workflows and n8n systems.',
  alternates: {
    canonical: 'https://ajprworld.com/tools/admin-cost-calculator',
  },
  openGraph: {
    title: 'US Business Admin Cost & AI Automation ROI Calculator | AJPR World',
    description: 'Calculate monthly burned payroll on repetitive administrative busywork and see your projected return on autonomous AI workflows.',
    url: 'https://ajprworld.com/tools/admin-cost-calculator',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Business Admin Cost & Automation Calculator | AJPR World',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Business Admin Cost & AI Automation ROI Calculator | AJPR World',
    description: 'Calculate monthly burned payroll on administrative tasks and see your projected ROI with autonomous AI systems.',
    images: ['https://ajprworld.com/og-image.jpg'],
  }
};

export default function AdminCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
