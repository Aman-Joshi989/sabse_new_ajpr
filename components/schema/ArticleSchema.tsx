interface ArticleSchemaProps {
  title: string;
  description: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  image?: string | null;
  url: string;
}

export const ArticleSchema = ({
  title,
  description,
  authorName,
  datePublished,
  dateModified,
  image,
  url,
}: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image ? [image] : ['https://ajprworld.com/og-image.jpg'],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://ajprworld.com/aman-joshi',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://ajprworld.com/#organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ajprworld.com/logo/ajpr-logo.png',
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  const safeId = title.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();

  return (
    <script
      id={`article-schema-${safeId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
