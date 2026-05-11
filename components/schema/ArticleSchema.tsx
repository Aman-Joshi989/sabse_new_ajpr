import Script from 'next/script';

interface ArticleSchemaProps {
  title: string;
  description: string;
  authorName: string;
  datePublished: string;
  image?: string | null;
  url: string;
}

export const ArticleSchema = ({
  title,
  description,
  authorName,
  datePublished,
  image,
  url,
}: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image ? [image] : [],
    datePublished: datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AJPR World',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ajprworld.com/logo.png', // Ensure this exists
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Script
      id={`article-schema-${title.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="lazyOnload"
    />
  );
};
