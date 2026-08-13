import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function StartupGrowthKitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/startup-growth-kit');
      return {
    alternates: { canonical: '/startup-growth-kit' },
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/startup-growth-kit'}`,
        }
      };
}
