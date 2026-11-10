import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

export async function generateMetadata(): Promise<Metadata> {
  const path = '/services/web-development';
  
  let seo;
  try {
    seo = await getSeoMetadata(path);
  } catch (e) {
    seo = null;
  }
  
  const title = seo?.title || 'Custom Web Development & Next.js Engineering | AJPR World';
  const description = seo?.description || 'Full-stack engineering specializing in high-performance Next.js web applications, scalable backend systems, and rapid MVP delivery in 2–4 weeks with 100% code ownership.';
  
  return {
    title,
    description,
    keywords: [
      'web dev agency',
      'web development agency',
      'senior web dev agency',
      'custom web application development',
      'Next.js web dev agency',
      'full stack web development',
      'software engineering agency'
    ],
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
