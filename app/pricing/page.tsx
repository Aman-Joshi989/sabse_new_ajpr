import { getProducts } from '@/lib/db/queries';
import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing & Packages | AJPR World',
  description: 'Transparent pricing for premium web development, MVP engineering, and SEO audits.',
};

export default async function PricingPage() {
  const products = await getProducts();

  return (
    <main>
      <PricingClient products={products} />
    </main>
  );
}
