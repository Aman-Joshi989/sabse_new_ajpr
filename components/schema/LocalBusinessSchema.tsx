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
    '@id': 'https://ajprworld.com/#localbusiness',
    name: 'AJPR World',
    legalName: 'AJPR World Private Limited',
    taxID: 'U47912UT2025PTC019416',
    alternateName: ['AJPR World Private Limited', 'AJPR World Haldwani', 'AJPR Digital Marketing & Software'],
    url: 'https://ajprworld.com',
    logo: 'https://ajprworld.com/logo/ajpr-logo.png',
    image: 'https://ajprworld.com/og-image.jpg',
    description: settings?.seo_description || 'AJPR World is a premier technology and digital marketing company in Haldwani, Uttarakhand, delivering custom AI MVPs, Next.js web applications, full-funnel digital marketing, and Generative Engine Optimization (GEO).',
    telephone: '+91-99972-05257',
    email: 'hello@ajprworld.com',
    priceRange: '₹₹',
    currenciesAccepted: 'INR, USD',
    paymentAccepted: 'Credit Card, UPI, Wire Transfer, Net Banking',
    areaServed: [
      {
        '@type': 'City',
        name: 'Haldwani'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Uttarakhand'
      },
      {
        '@type': 'Country',
        name: 'India'
      },
      {
        '@type': 'Country',
        name: 'United States'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '161, Indraprastha Colony, Phase 3, Dahariya',
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '09:00',
        closes: '19:00'
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
      'https://github.com/Aman-Joshi989/Aman-Joshi989',
      'https://github.com/Aman-Joshi989/sabse_new_ajpr',
      'https://github.com/Aman-Joshi989/ajpr-seo-geo-audit',
      'https://tracxn.com/d/legal-entities/india/ajpr-world-private-limited/__meKOAfEBmf3LZImI0ObzovQFsTLUkTkYlbJeOsWCTX8',
      'https://www.falconebiz.com/company/AJPR-WORLD-PRIVATE-LIMITED-U47912UT2025PTC019416',
      'https://magicpin.in/Haldwani/Dahariya/Other/Ajpr-World-Private-Limited/store/417b411',
      'https://clutch.co/profile/ajpr-world',
      'https://www.goodfirms.co/company/ajpr-world',
      'https://peerlist.io/company/ajprworld',
      'https://sourceforge.net/p/ajprworld/'
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
