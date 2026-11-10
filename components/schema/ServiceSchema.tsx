interface ServiceSchemaProps {
  name: string;
  description: string;
  providerName?: string;
  url: string;
  image?: string;
  serviceType?: string;
  price?: string | number;
  priceCurrency?: string;
}

export const ServiceSchema = ({
  name,
  description,
  providerName = 'AJPR World',
  url,
  image,
  serviceType,
  price,
  priceCurrency = 'USD',
}: ServiceSchemaProps) => {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    serviceType: serviceType || name,
    description: description,
    provider: {
      '@type': 'Organization',
      '@id': 'https://ajprworld.com/#organization',
      name: providerName,
      url: 'https://ajprworld.com',
      logo: 'https://ajprworld.com/logo/ajpr-logo.png',
    },
    brand: {
      '@type': 'Brand',
      name: 'AJPR World',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '38',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    ],
    url: url,
    image: image ? [image] : ['https://ajprworld.com/og-image.jpg'],
  };

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: priceCurrency,
      availability: 'https://schema.org/InStock',
      url: url,
    };
  }

  const safeId = name.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();

  return (
    <script
      id={`service-schema-${safeId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
