import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AJPR World',
    description: 'Contact AJPR World to discuss custom software development, web development, and digital marketing.',
    url: 'https://ajprworld.com/contact'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let seo = null;
  try {
    seo = await getSeoMetadata('/contact');
  } catch (err) {
    console.error("Failed to fetch SEO for contact:", err);
  }

  const title = seo?.title || 'Contact Us | Book a Strategy Session | AJPR World';
  const description = seo?.description || 'Ready to scale? Contact our engineering and legal teams to discuss custom software development, AI swarm orchestration, and compliance consulting.';

  return {
    alternates: { canonical: 'https://ajprworld.com/contact' },
    title: title,
    description: description,
    openGraph: {
      type: 'website',
      siteName: 'AJPR World',
      title: title,
      description: description,
      url: 'https://ajprworld.com/contact',
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
