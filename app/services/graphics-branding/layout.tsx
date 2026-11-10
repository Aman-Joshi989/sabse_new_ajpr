import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

export async function generateMetadata(): Promise<Metadata> {
  const path = '/services/graphics-branding';
  
  let seo;
  try {
    seo = await getSeoMetadata(path);
  } catch (e) {
    seo = null;
  }
  
  const title = seo?.title || 'Brand Identity & UI/UX Design Studio (2026) | AJPR World';
  const description = seo?.description || '★★★★★ 4.9 Rating (35 Reviews). Modern brand strategy, high-fidelity UI/UX design systems, Figma component libraries, and visual identity for tech companies.';
  
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
