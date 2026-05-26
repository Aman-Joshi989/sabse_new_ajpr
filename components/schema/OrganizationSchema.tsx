import Script from 'next/script';

export const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AJPR World',
    url: 'https://ajprworld.com',
    logo: 'https://ajprworld.com/logo.png', // Ensure this URL points to the actual logo
    description: 'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1234567890', // TODO: Update with actual phone number
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/ajprworld', // TODO: Update with actual links
      'https://twitter.com/ajprworld',
      'https://www.facebook.com/ajprworld',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="lazyOnload"
    />
  );
};
