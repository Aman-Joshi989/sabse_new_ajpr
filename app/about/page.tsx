import { getPublishedServices, getSiteSettings } from '@/lib/db/queries'
import AboutClient from './AboutClient'
import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export default async function AboutPage() {
  let services: any[] = []
  let settings: any = null

  try {
    const [fetchedServices, fetchedSettings] = await Promise.all([
      getPublishedServices(),
      getSiteSettings()
    ])
    services = fetchedServices || []
    settings = fetchedSettings || null
  } catch (err) {
    console.error("Failed to fetch dynamic data for about page:", err)
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About AJPR World',
    description: 'Learn about AJPR World, a premium technology agency specializing in custom software engineering, web development, and digital marketing.',
    url: 'https://ajprworld.com/about'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutClient 
        services={services} 
        settings={settings} 
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let seo = null;
  try {
    seo = await getSeoMetadata('/about');
  } catch (err) {
    console.error("Failed to fetch SEO for about:", err);
  }

  // If the database returns the placeholder title, override it.
  const dbTitle = seo?.title;
  const isPlaceholder = dbTitle && dbTitle.includes('Ultimate Guide to About Page');
  
  const title = (!dbTitle || isPlaceholder) 
    ? 'About Us | AJPR World - Premium Tech Agency' 
    : dbTitle;
    
  const description = seo?.description || 'Learn about AJPR World, a premium technology agency specializing in custom software engineering, web development, and digital marketing.';

  return {
    alternates: { canonical: 'https://ajprworld.com/about' },
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://ajprworld.com/about',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AJPR World',
        }
      ],
    }
  };
}
