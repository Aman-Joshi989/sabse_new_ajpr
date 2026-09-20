import { Metadata } from 'next';
import { getProducts } from '@/lib/db/queries';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing & Packages | Custom Software & SEO | AJPR',
  description: 'Explore upfront pricing for custom software development, Next.js web applications, MVP engineering, and technical SEO audits tailored for ambitious brands.',
  alternates: {
    canonical: 'https://ajprworld.com/pricing'
  },
  openGraph: {
    title: 'Pricing & Packages | Custom Software & SEO | AJPR',
    description: 'Explore upfront pricing for custom software development, Next.js web applications, MVP engineering, and technical SEO audits tailored for ambitious brands.',
    url: 'https://ajprworld.com/pricing',
    siteName: 'AJPR World',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
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
