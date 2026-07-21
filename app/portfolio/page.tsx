import { getPortfolioItems } from '@/lib/db/queries'
import PortfolioClient from './_components/PortfolioClient'
import { seoOverrides } from '@/lib/seo-overrides'
import type { Metadata } from 'next'

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export const metadata: Metadata = {
  ...seoOverrides['/portfolio'],
  openGraph: {
    ...seoOverrides['/portfolio'],
    url: 'https://ajprworld.com/portfolio',
  }
}

export default async function PortfolioPage() {
    const projects = await getPortfolioItems();

    return <PortfolioClient initialProjects={projects} />
}
