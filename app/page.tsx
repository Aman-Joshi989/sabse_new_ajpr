import dynamic from 'next/dynamic'
import { getPublishedServices, getBlogs, getSiteSettings } from '@/lib/db/queries'
import { seoOverrides } from '@/lib/seo-overrides'
import type { Metadata } from 'next'

const HomeClient = dynamic(() => import('./HomeClient'), {
  loading: () => <div className="min-h-screen bg-slate-50 dark:bg-[#030712] animate-pulse"></div>,
})


export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export const metadata: Metadata = {
  ...seoOverrides['/'],
  openGraph: {
    ...seoOverrides['/'],
    url: 'https://ajprworld.com/',
  }
}

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
