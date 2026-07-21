import { getPublishedServices, getSiteSettings } from '@/lib/db/queries'
import AboutClient from './AboutClient'
import { Metadata } from 'next'
import { seoOverrides } from '@/lib/seo-overrides'
export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export const metadata: Metadata = {
  ...seoOverrides['/about'],
  alternates: {
    canonical: 'https://ajprworld.com/about',
  },
  openGraph: {
    ...seoOverrides['/about'],
    url: 'https://ajprworld.com/about',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

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
