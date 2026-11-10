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
  
  const title = seo?.title || 'UI/UX Design Systems & Brand Identity | AJPR World';
  const description = seo?.description || 'Modern product design, high-fidelity UI/UX design systems, Figma component libraries, and visual identity for software and web applications.';
  
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
