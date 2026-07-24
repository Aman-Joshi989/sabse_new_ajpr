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

  return (
    <AboutClient 
      services={services} 
      settings={settings} 
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/about');
      return {
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/about'}`,
        }
      };
}
