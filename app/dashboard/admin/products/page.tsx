import { getAllProducts } from '@/lib/db/queries';
import ProductClient from './ProductClient';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getAllProducts();
  
  return <ProductClient initialProducts={products} />;
}
