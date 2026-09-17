import { getPortfolioItems } from '@/lib/db/queries'
import PortfolioClient from './_components/PortfolioClient'
import type { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export const revalidate = 86400; // Cache for 24 hours (ISR) to protect Vercel free limits

export default async function PortfolioPage() {
    const projects = await getPortfolioItems();

    return <PortfolioClient initialProjects={projects} />
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/portfolio');
      return {
        alternates: { canonical: 'https://ajprworld.com/portfolio' },
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/portfolio'}`,
            images: [
                {
                    url: 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'AJPR World',
                }
            ],
        }
      };
}
