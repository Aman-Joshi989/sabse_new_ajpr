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
    '@id': 'https://ajprworld.com/#organization',
    name: 'AJPR World',
    alternateName: ['AJPR Tech', 'AJPR World LLC', 'AJPR Software'],
    legalName: 'AJPR World',
    url: 'https://ajprworld.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://ajprworld.com/logo/ajpr-logo.png',
      caption: 'AJPR World Logo',
      width: '512',
      height: '512'
    },
    image: 'https://ajprworld.com/og-image.jpg',
    description: settings?.seo_description || 'AJPR World is a premier technology and software engineering firm delivering custom AI MVPs, enterprise workflow automation, full-stack Next.js web applications, and Generative Engine Optimization (GEO) for fast-growing US companies.',
    slogan: 'Custom AI MVPs, Scalable Web Systems & Enterprise Automation in 4 Weeks',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nainital Road / Kaladhungi Road',
      addressLocality: 'Haldwani',
      addressRegion: 'Uttarakhand',
      postalCode: '263139',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '29.2183',
      longitude: '79.5126'
    },
    founder: {
      '@type': 'Person',
      '@id': 'https://ajprworld.com/aman-joshi/#person',
      name: 'Aman Joshi',
      jobTitle: 'Founder & CEO',
      url: 'https://ajprworld.com/aman-joshi',
      sameAs: [
        'https://www.linkedin.com/in/aman-joshi989',
        'https://twitter.com/ajprworld',
        'https://x.com/ajprworld',
        'https://github.com/Aman-Joshi989'
      ],
      description: 'Founder and Lead Software Architect at AJPR World, engineering AI agent swarms, high-performance web systems, and custom MVPs.'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'technical sales & support',
        email: 'hello@ajprworld.com',
        url: 'https://ajprworld.com/contact',
        areaServed: ['US', 'GB', 'CA', 'AU', 'IN', 'Worldwide'],
        availableLanguage: ['en']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'consulting & architecture',
        email: 'hello@ajprworld.com',
        url: 'https://ajprworld.com/book-call',
        areaServed: ['US', 'GB', 'CA', 'AU', 'IN', 'Worldwide'],
        availableLanguage: ['en']
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/ajpr-world',
      'https://twitter.com/AjprWorld',
      'https://x.com/AjprWorld',
      'https://www.facebook.com/ajprworld',
      'https://www.instagram.com/ajprworld/',
      'https://www.youtube.com/@AJPRWorld',
      'https://github.com/Aman-Joshi989',
      'https://clutch.co/profile/ajpr-world',
      'https://www.goodfirms.co/company/ajpr-world',
      'https://www.producthunt.com/@ajprworld',
      'https://peerlist.io/company/ajprworld',
      'https://sourceforge.net/p/ajprworld/',
      'https://wellfound.com/company/ajpr-world',
      'https://dev.to/ajprworld'
    ],
    knowsAbout: [
      'Custom AI MVP Development',
      'Autonomous AI Agent Systems',
      'Generative Engine Optimization (GEO)',
      'Technical SEO Services',
      'Cloud Architecture & DevOps',
      'Website Security & Maintenance',
      'Next.js Full-Stack Engineering',
      'B2B SaaS Product Development',
      'Enterprise Workflow Automation'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Core Technology & AI Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom AI MVP Development in 4 Weeks',
            url: 'https://ajprworld.com/services/web-development',
            description: 'Rapid prototyping, engineering, and deployment of production-grade AI MVPs with full code and IP ownership.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Security & Maintenance',
            url: 'https://ajprworld.com/services/website-security-maintenance',
            description: '24/7 uptime monitoring, zero-day patch management, automated encrypted backups, and security hardening.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud & DevOps Services',
            url: 'https://ajprworld.com/services/cloud-solutions',
            description: 'Automated CI/CD deployment pipelines, container orchestration, AWS/GCP architecture, and cloud cost optimization.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Technical SEO & Generative Engine Optimization (GEO)',
            url: 'https://ajprworld.com/services/geo-optimization',
            description: 'Core Web Vitals optimization, semantic schema markup, entity graph citations, and AI search visibility.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Autonomous AI Workflows & Agent Systems',
            url: 'https://ajprworld.com/ai-systems',
            description: 'Custom multi-agent workflows, customer triage pods, and operational automation.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'B2B Growth Marketing Agency & Consulting',
            url: 'https://ajprworld.com/services/b2b-growth-marketing',
            description: 'Full-funnel demand generation, programmatic technical SEO, Generative Engine Optimization, and qualified pipeline acquisition.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agency Alternatives & Commercial Benchmark Hub',
            url: 'https://ajprworld.com/compare/webtonic-alternatives',
            description: 'Transparent 2026 pricing, velocity, and architecture comparisons against traditional digital agencies.'
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
