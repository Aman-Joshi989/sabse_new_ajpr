interface ServiceSchemaProps {
  name: string;
  description: string;
  providerName: string;
  url: string;
  image?: string;
}

export const ServiceSchema = ({
  name,
  description,
  providerName,
  url,
  image,
}: ServiceSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: providerName,
      url: 'https://ajprworld.com',
    },
    url: url,
    image: image ? [image] : [],
  };

  return (
    <script
      id={`service-schema-${name.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
