import { Metadata } from 'next'
import SwarmSimulator from './SwarmSimulator'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Page() {
  return <SwarmSimulator />
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/demo-ruflo');
      return {
        alternates: { canonical: 'https://ajprworld.com/demo-ruflo' },
        robots: { index: false, follow: false },
        title: seo?.title || 'Swarm Simulator Demo | AJPR World',
        description: seo?.description || 'Internal interactive prototype simulator.',
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/demo-ruflo'}`,
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
