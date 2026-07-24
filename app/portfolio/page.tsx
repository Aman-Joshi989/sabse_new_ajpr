import { getPortfolioItems } from '@/lib/db/queries'
import PortfolioClient from './_components/PortfolioClient'
import type { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export default async function PortfolioPage() {
    const projects = await getPortfolioItems();

    return <PortfolioClient initialProjects={projects} />
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/portfolio');
      return {
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/portfolio'}`,
        }
      };
}
