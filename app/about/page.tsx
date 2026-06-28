import { getPublishedServices, getSiteSettings } from '@/lib/db/queries'
import AboutClient from './AboutClient'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us – Premium Software Development & Digital Systems | AJPR World',
  description: 'AJPR World is a premier technology agency engineering high-concurrency digital platforms, automated business pipelines, and brand identities.',
  alternates: {
    canonical: 'https://ajprworld.com/about',
  },
  openGraph: {
    title: 'About Us – Premium Software Development & Digital Systems | AJPR World',
    description: 'AJPR World is a premier technology agency engineering high-concurrency digital platforms, automated business pipelines, and brand identities.',
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
