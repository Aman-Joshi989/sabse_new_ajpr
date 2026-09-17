import { Metadata } from 'next';
import AgencyPricingCalculatorClient from './AgencyPricingCalculatorClient';

export const metadata: Metadata = {
  title: 'Agency Pricing & ROI Calculator (2026) | AJPR Tools',
  description: 'Calculate realistic monthly SEO and PPC agency retainers against your target revenue and average customer value. Model your 12-month marketing ROI.',
  alternates: {
    canonical: 'https://ajprworld.com/tools/agency-pricing-calculator',
  },
  openGraph: {
    title: 'Agency Pricing & ROI Calculator (2026) | AJPR Tools',
    description: 'Calculate realistic monthly SEO and PPC agency retainers against your target revenue and average customer value. Model your 12-month marketing ROI.',
    url: 'https://ajprworld.com/tools/agency-pricing-calculator',
    siteName: 'AJPR World',
    type: 'website',
  },
};

export default function AgencyPricingCalculatorPage() {
  return <AgencyPricingCalculatorClient />;
}
