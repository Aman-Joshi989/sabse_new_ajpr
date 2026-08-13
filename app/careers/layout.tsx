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
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/careers'}`,
        }
      };
}
