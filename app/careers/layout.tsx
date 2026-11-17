import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Layout({ children }: { children: React.ReactNode }) {
  const careersSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://ajprworld.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Careers', 'item': 'https://ajprworld.com/careers' }
        ]
      },
      {
        '@type': 'JobPosting',
        'title': 'Senior Full Stack Engineer',
        'description': 'Architect and deploy sub-200ms edge web platforms and MVPs for US, UK, and global tech clients using Next.js 16, React 19, TypeScript, and PostgreSQL.',
        'datePosted': '2026-01-15T00:00:00Z',
        'validThrough': '2026-12-31T23:59:59Z',
        'employmentType': 'FULL_TIME',
        'hiringOrganization': {
          '@type': 'Organization',
          'name': 'AJPR World',
          'sameAs': 'https://ajprworld.com',
          'logo': 'https://ajprworld.com/logo/ajpr-logo.png'
        },
        'jobLocationType': 'TELECOMMUTE',
        'applicantLocationRequirements': {
          '@type': 'Country',
          'name': 'India'
        },
        'baseSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'INR',
          'value': {
            '@type': 'QuantitativeValue',
            'minValue': 1000000,
            'maxValue': 2000000,
            'unitText': 'YEAR'
          }
        }
      },
      {
        '@type': 'JobPosting',
        'title': 'Autonomous AI & Workflow Systems Engineer',
        'description': 'Construct autonomous multi-agent pipelines, CRM auto-triaging swarms, and RAG architectures powered by frontier LLMs and Python.',
        'datePosted': '2026-01-15T00:00:00Z',
        'validThrough': '2026-12-31T23:59:59Z',
        'employmentType': 'FULL_TIME',
        'hiringOrganization': {
          '@type': 'Organization',
          'name': 'AJPR World',
          'sameAs': 'https://ajprworld.com',
          'logo': 'https://ajprworld.com/logo/ajpr-logo.png'
        },
        'jobLocationType': 'TELECOMMUTE',
        'applicantLocationRequirements': {
          '@type': 'Country',
          'name': 'India'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
      />
      {children}
    </>
  );
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
