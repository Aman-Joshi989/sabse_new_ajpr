import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/careers');
  const title = seo?.title || 'Careers at AJPR World | Senior Engineering & Growth Roles';
  const description = seo?.description || 'Join AJPR World. We are hiring senior full-stack Next.js engineers, AI developers, and systems architects to build scalable digital platforms.';

  return {
    alternates: { canonical: 'https://ajprworld.com/careers' },
    title: title,
    description: description,
    openGraph: {
      type: 'website',
      siteName: 'AJPR World',
      title: title,
      description: description,
      url: `https://ajprworld.com/careers`,
        images: [
            {
                url: 'https://ajprworld.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AJPR World Careers',
            }
        ],
    }
  };
}
