import { Metadata } from 'next';
import Script from 'next/script';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  title: 'Agency & Consultant Client Email Response Generator | AJPR World',
  description: 'Generate professional, executive-grade responses for tough client situations: scope creep, overdue invoices, price objections, and project delays.',
  alternates: {
    canonical: 'https://ajprworld.com/tools/client-response-generator',
  },
  openGraph: {
    title: 'Agency & Consultant Client Email Response Generator | AJPR World',
    description: 'Generate professional, executive-grade responses for tough client situations: scope creep, overdue invoices, price objections, and project delays.',
    url: 'https://ajprworld.com/tools/client-response-generator',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Client Email Response Generator | AJPR World',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agency & Consultant Client Email Response Generator | AJPR World',
    description: 'Generate professional responses for tough client situations with 1 click.',
    images: ['https://ajprworld.com/og-image.jpg'],
  }
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Agency Client Email Response Generator',
  url: 'https://ajprworld.com/tools/client-response-generator',
  description: 'Free executive-grade AI response generator for tough client situations: scope creep, overdue invoices, price objections, and project delays.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AJPR World',
    url: 'https://ajprworld.com'
  }
};

const toolFaqs = [
  {
    question: 'How do you politely decline out-of-scope work from a client?',
    answer: 'The most effective formula is acknowledge, estimate, and offer a choice: validate the value of their idea, clearly state that it sits outside the agreed project scope, provide an estimated cost/timeline to complete it as an add-on, or suggest reserving it for Phase 2.'
  },
  {
    question: 'How do you collect overdue client invoices without damaging the relationship?',
    answer: 'Start with an automated gentle check-in assuming a clerical oversight. If unpaid after 7 days, state clearly that active development or deliverables must pause until the balance is reconciled, citing the agreed contract terms.'
  },
  {
    question: 'How does this client response generator work?',
    answer: 'Select your specific client scenario (scope creep, delayed feedback, price objection, or late payment), choose your desired tone (Firm & Professional, Collaborative, or Warm), add any specific details, and instantly copy or edit the generated script.'
  },
  {
    question: 'Is the AJPR Client Response Generator free?',
    answer: 'Yes, 100% free with no sign-up or credit card required. Agency founders, freelance engineers, and consultants can generate unlimited responses.'
  }
];

export default function ClientResponseGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQSchema faqs={toolFaqs} />
      <Script
        id="webapp-schema-client-response"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      {children}
    </>
  );
}
