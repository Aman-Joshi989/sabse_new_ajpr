import { Metadata } from 'next';
import { getProducts } from '@/lib/db/queries';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: '2026 Pricing & Retainers | Custom Software, MVPs & SEO | AJPR World',
  description: '★★★★★ 4.9 Rating (52 Reviews). Transparent fixed pricing for custom Next.js web applications, MVP engineering, programmatic SEO, and AI growth retainers starting at $1,500/mo.',
  alternates: {
    canonical: 'https://ajprworld.com/pricing'
  },
  openGraph: {
    title: '2026 Pricing & Retainers | Custom Software, MVPs & SEO | AJPR World',
    description: '★★★★★ 4.9 Rating (52 Reviews). Transparent fixed pricing for custom Next.js web applications, MVP engineering, programmatic SEO, and AI growth retainers starting at $1,500/mo.',
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
