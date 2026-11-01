interface ItemListItem {
  name: string;
  description: string;
  url: string;
  position?: number;
}

interface ItemListSchemaProps {
  name: string;
  description: string;
  items: ItemListItem[];
}

export const ItemListSchema = ({ name, description, items }: ItemListSchemaProps) => {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position ?? index + 1,
      name: item.name,
      description: item.description,
      url: item.url,
    })),
  };

  return (
    <script
      id="item-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
