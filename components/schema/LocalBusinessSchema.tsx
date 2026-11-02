import { getSiteSettings } from '@/lib/db/queries';

export async function LocalBusinessSchema() {
  let settings: any = null;
  try {
    settings = await getSiteSettings();
  } catch (e) {
    console.error("Failed to load settings for LocalBusinessSchema:", e);
  }

  const region = settings?.geo_region || 'IN-UT';
  const placename = settings?.geo_placename || 'Haldwani';
  const position = settings?.geo_position || '29.2183;79.5126';
  const [lat, lng] = position.split(';');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AJPR World',
    url: 'https://ajprworld.com',
    logo: 'https://ajprworld.com/logo/ajpr-logo.png',
    image: 'https://ajprworld.com/og-image.jpg',
    description: settings?.seo_description || 'AJPR World is a premier technology and digital marketing company delivering custom AI MVPs, Next.js web applications, full-funnel digital marketing, and Generative Engine Optimization (GEO).',
    telephone: '+91-99972-05257',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nainital Road / Kaladhungi Road',
      addressLocality: placename,
      addressRegion: 'Uttarakhand',
      postalCode: '263139',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat || '29.2183',
      longitude: lng || '79.5126',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://www.linkedin.com/company/ajprworld',
      'https://twitter.com/ajprworld',
      'https://www.facebook.com/ajprworld'
    ]
  };

  return (
    <script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
