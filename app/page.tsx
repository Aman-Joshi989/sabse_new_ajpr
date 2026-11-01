import HomeClient from './HomeClient'
import { getPublishedServices, getBlogs, getSiteSettings, getSeoMetadata } from '@/lib/db/queries'
import { FAQSchema } from '@/components/schema/FAQSchema'
import { HOMEPAGE_FAQS } from '@/lib/homepage-faqs'
import type { Metadata } from 'next'

export const revalidate = 86400; // Cache for 24 hours (ISR) to protect Vercel free limits

export default async function HomePage() {
  let services: any[] = []
  let blogs: any[] = []
  let settings: any = null

  try {
    // Fetch all required data dynamically from Neon database
    const [fetchedServices, fetchedBlogs, fetchedSettings] = await Promise.all([
      getPublishedServices(),
      getBlogs(),
      getSiteSettings()
    ])
    
    services = fetchedServices || []
    blogs = fetchedBlogs || []
    settings = fetchedSettings || null
  } catch (err) {
    console.error("Failed to fetch dynamic data for homepage:", err)
  }

  return (
    <>
      <FAQSchema faqs={HOMEPAGE_FAQS} />
      <HomeClient 
        services={services} 
        blogs={blogs} 
        settings={settings} 
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let seo = null;
  try {
    seo = await getSeoMetadata('/');
  } catch (error) {
    console.error("Failed to fetch SEO metadata for homepage:", error);
  }

  const defaultTitle = 'Custom AI MVP Development & Software Agency | AJPR World';
  const defaultDesc = 'AJPR World engineers custom AI MVPs, enterprise automation pipelines, and scalable web applications in 4 weeks for US startups and growing companies.';
  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDesc;

  return {
    metadataBase: new URL('https://ajprworld.com'),
    alternates: { canonical: 'https://ajprworld.com' },
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://ajprworld.com',
      siteName: 'AJPR World',
      type: 'website',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AJPR World - Custom AI MVPs & Scalable Software Engineering',
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['https://ajprworld.com/og-image.jpg'],
      creator: '@ajprworld',
      site: '@ajprworld',
    }
  };
}
