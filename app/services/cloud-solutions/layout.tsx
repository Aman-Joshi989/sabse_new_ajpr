import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Services', item: 'https://ajprworld.com/services' },
    { name: 'Cloud & DevOps Services', item: 'https://ajprworld.com/services/cloud-solutions' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name="Cloud & DevOps Services"
        description="Enterprise cloud architecture, container orchestration (Docker/Kubernetes), automated CI/CD pipelines, AWS/GCP migration, and 99.99% uptime engineering."
        providerName="AJPR World"
        url="https://ajprworld.com/services/cloud-solutions"
      />
      {children}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const path = '/services/cloud-solutions';
  
  let seo;
  try {
    seo = await getSeoMetadata(path);
  } catch (e) {
    seo = null;
  }
  
  const title = seo?.title || 'Cloud Infrastructure & DevOps Engineering | AWS, GCP & Architecture | AJPR World';
  const description = seo?.description || 'Cloud architecture, Docker and Kubernetes containerization, automated CI/CD pipelines, and high-availability database infrastructure.';
  
  return {
    metadataBase: new URL('https://ajprworld.com'),
    title,
    description,
    alternates: { canonical: `https://ajprworld.com${path}` },
    openGraph: {
      title,
      description,
      url: `https://ajprworld.com${path}`,
      siteName: 'AJPR World',
      type: 'website',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ajprworld.com/og-image.jpg'],
      creator: '@ajprworld',
      site: '@ajprworld',
    }
  };
}
