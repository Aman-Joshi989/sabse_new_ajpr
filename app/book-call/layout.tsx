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
  const seo = await getSeoMetadata('/book-call').catch(() => null);
  const defaultTitle = 'Book a Strategy Call | 30-Min Senior Engineering Review | AJPR World';
  const defaultDesc = '★★★★★ 4.9 Rating. Book a direct 30-minute technical roadmap call with AJPR World senior architects. Discuss AI MVPs, Next.js architecture, and SEO retainers.';
  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDesc;

  return {
    alternates: { canonical: 'https://ajprworld.com/book-call' },
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'AJPR World',
      title,
      description,
      url: 'https://ajprworld.com/book-call',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Book Strategy Call | AJPR World',
        }
      ],
    }
  };
}
