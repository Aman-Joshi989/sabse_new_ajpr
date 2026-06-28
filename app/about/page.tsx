import { getPublishedServices, getSiteSettings } from '@/lib/db/queries'
import AboutClient from './AboutClient'

export const dynamic = 'force-dynamic'

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
