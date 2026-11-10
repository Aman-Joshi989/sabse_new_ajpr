import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

export async function generateMetadata(): Promise<Metadata> {
  const path = '/services/digital-marketing';
  
  let seo;
  try {
    seo = await getSeoMetadata(path);
  } catch (e) {
    seo = null;
  }
  
  const title = seo?.title || 'Digital Growth & Search Marketing | AJPR World';
  const description = seo?.description || 'Full-funnel digital growth services combining technical SEO, search engine visibility, paid PPC acquisition, and conversion rate optimization.';
  
  return {
    title,
    description,
    alternates: { canonical: `https://ajprworld.com${path}` },
    openGraph: {
      title,
      description,
      url: `https://ajprworld.com${path}`,
      siteName: 'AJPR World',
      type: 'website',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    }
  };
}
