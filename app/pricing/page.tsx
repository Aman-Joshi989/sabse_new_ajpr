import { Metadata } from 'next';
import { getProducts } from '@/lib/db/queries';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing & Packages | AJPR World',
  description: 'Transparent pricing for premium web development, MVP engineering, and SEO audits.',,
  alternates: {
    canonical: '/pricing'
  },
  openGraph: {
    title: 'Pricing & Packages | AJPR World',
    description: 'Transparent pricing for premium web development, MVP engineering, and SEO audits.',
    url: 'https://ajprworld.com/pricing',
    siteName: 'AJPR World',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pricing & Packages | AJPR World',
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
