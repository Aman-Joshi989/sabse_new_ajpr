import { getPublishedServices, getBlogs, getSiteSettings } from '@/lib/db/queries'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

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
