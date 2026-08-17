import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function BookCallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/book-call');
      return {
    alternates: { canonical: '/book-call' },
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/book-call'}`,
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
