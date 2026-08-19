import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/careers');
      return {
    alternates: { canonical: '/careers' },
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          type: 'website',
          siteName: 'AJPR World',
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/careers'}`,
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
