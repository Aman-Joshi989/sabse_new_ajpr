import { getSiteSettings } from '@/lib/db/queries';

export const OrganizationSchema = async () => {
  let settings: any = null;
  try {
    settings = await getSiteSettings();
  } catch (e) {
    console.error("Failed to load settings for OrganizationSchema:", e);
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AJPR World',
    alternateName: 'AJPR Tech',
    url: 'https://ajprworld.com',
    logo: 'https://ajprworld.com/logo/ajpr-logo.png',
    description: settings?.seo_description || 'AJPR World is a global technology and software engineering firm delivering custom AI MVPs, enterprise workflow automation, full-stack web applications, and Generative Engine Optimization (GEO).',
    founder: {
      '@type': 'Person',
      name: 'Aman Joshi',
      jobTitle: 'Founder & CEO',
      url: 'https://ajprworld.com/aman-joshi'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@ajprworld.com',
      contactType: 'technical sales & support',
      areaServed: ['US', 'GB', 'CA', 'AU', 'IN', 'Worldwide'],
      availableLanguage: ['en'],
    },
    sameAs: [
      'https://www.linkedin.com/company/ajprworld',
      'https://twitter.com/ajprworld',
      'https://github.com/Aman-Joshi989'
    ],
    knowsAbout: [
      'Custom AI MVP Development',
      'Autonomous AI Pipelines',
      'Full-Stack Web Development',
      'Generative Engine Optimization (GEO)',
      'Technical SEO',
      'Cloud Architecture'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technology & AI Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI MVP Development in 4 Weeks',
            url: 'https://ajprworld.com/services/custom-web-development-ai-solutions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business AI Automation & Autonomous Workflows',
            url: 'https://ajprworld.com/services/business-ai-automation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Automation & AI Agent Systems for Business (LeadOS, SupportOS, OpsOS)',
            url: 'https://ajprworld.com/ai-systems'
          }
        }
      ]
    }
  };

  return (
    <script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
