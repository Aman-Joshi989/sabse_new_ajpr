import { getSiteSettings } from '@/lib/db/queries';
import Script from 'next/script';

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
    url: 'https://ajprworld.com',
    logo: 'https://ajprworld.com/logo.png',
    description: settings?.seo_description || 'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1234567890',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/ajprworld',
      'https://twitter.com/ajprworld',
      'https://www.facebook.com/ajprworld',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
