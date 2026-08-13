import HomeClient from './HomeClient'
import { getPublishedServices, getBlogs, getSiteSettings, getSeoMetadata } from '@/lib/db/queries'
import type { Metadata } from 'next'

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

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
    <HomeClient 
      services={services} 
      blogs={blogs} 
      settings={settings} 
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/');
      return {
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/'}`,
        }
      };
}
