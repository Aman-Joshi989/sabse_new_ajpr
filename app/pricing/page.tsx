import { Metadata } from 'next';
import { getProducts } from '@/lib/db/queries';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing & Sprints | Custom Software, MVPs & Business Automation | AJPR World',
  description: 'Transparent fixed pricing for custom Next.js web applications, MVP engineering, and automated business systems starting from flat 2–4 week sprint rates.',
  alternates: {
    canonical: 'https://ajprworld.com/pricing'
  },
  openGraph: {
    title: 'Pricing & Sprints | Custom Software, MVPs & Business Automation | AJPR World',
    description: 'Transparent fixed pricing for custom Next.js web applications, MVP engineering, and automated business systems starting from flat 2–4 week sprint rates.',
    url: 'https://ajprworld.com/pricing',
    siteName: 'AJPR World',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pricing & Retainers | AJPR World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <main>
      <PricingClient products={products} />
    </main>
  );
}
