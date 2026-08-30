import { getSiteSettings } from '@/lib/db/queries';

export async function LocalBusinessSchema() {
  let settings: any = null;
  try {
    settings = await getSiteSettings();
  } catch (e) {
    console.error("Failed to load settings for LocalBusinessSchema:", e);
  }

  const region = settings?.geo_region || 'IN-DL';
  const placename = settings?.geo_placename || 'New Delhi';
  const position = settings?.geo_position || '28.6139;77.2090';
  const [lat, lng] = position.split(';');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'AJPR World',
    url: 'https://ajprworld.com',
    logo: 'https://ajprworld.com/logo.png',
    image: 'https://ajprworld.com/og-image.jpg',
    description: settings?.seo_description || 'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding.',
    telephone: '+91-1234567890',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: placename,
      addressRegion: region,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat || '28.6139',
      longitude: lng || '77.2090',
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
