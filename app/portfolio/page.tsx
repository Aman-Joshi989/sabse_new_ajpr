import { getPortfolioItems, getSeoMetadata } from '@/lib/db/queries'
import PortfolioClient from './_components/PortfolioClient'
import { ItemListSchema } from '@/components/schema/ItemListSchema'
import type { Metadata } from 'next'

export const revalidate = 86400; // Cache for 24 hours (ISR) to protect Vercel free limits

export default async function PortfolioPage() {
    const projects = await getPortfolioItems();
    const listItems = Array.isArray(projects)
        ? projects.slice(0, 10).map((p: any, idx: number) => ({
            name: p.title || `Engineering Case Study #${idx + 1}`,
            description: p.description || 'Custom full-stack web application and growth architecture engineered by AJPR World.',
            url: p.url || 'https://ajprworld.com/portfolio#case-studies',
            position: idx + 1,
        }))
        : [];

    return (
        <>
            {listItems.length > 0 && (
                <ItemListSchema
                    name="AJPR World Engineering Case Studies & Production Builds"
                    description="Verified full-stack Next.js platforms, custom AI workflows, and technical growth deployments engineered by AJPR World."
                    items={listItems}
                />
            )}
            <PortfolioClient initialProjects={projects} />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
      const seo = await getSeoMetadata('/portfolio');
      const title = seo?.title || 'Verified Case Studies & Production Builds | AJPR World (4.9★)';
      const description = seo?.description || 'Explore production Next.js web applications, custom AI systems, and conversion growth architectures built by AJPR World with 100% client code ownership.';

      return {
        alternates: { canonical: 'https://ajprworld.com/portfolio' },
        title,
        description,
        openGraph: {
          title,
          description,
          url: 'https://ajprworld.com/portfolio',
            images: [
                {
                    url: 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'AJPR World Case Studies & Engineering Portfolio',
                }
            ],
        }
      };
}
