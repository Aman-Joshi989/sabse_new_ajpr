import React from 'react';
import { Metadata } from 'next';
import ActionFigureClient from './ActionFigureClient';

export const metadata: Metadata = {
  title: 'AI Action Figure Generator | AJPR World',
  description: 'Design and generate custom mint-in-box 3D action figures with blister packaging, collectible accessories, power stats, and AI generator prompts.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://ajprworld.com/tools/action-figure-generator',
  },
  openGraph: {
    title: 'AI Action Figure Generator | AJPR World',
    description: 'Turn yourself, your team, or your hero into a mint-in-box collectible 3D action figure with custom blister pack and accessories.',
    url: 'https://ajprworld.com/tools/action-figure-generator',
    siteName: 'AJPR World',
    images: [
      {
        url: 'https://ajprworld.com/images/tools/action-figure-founder.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Action Figure Generator - AJPR World',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Action Figure Generator | AJPR World',
    description: 'Turn yourself into a mint-in-box collectible 3D action figure with custom packaging.',
    creator: '@ajprworld',
    images: ['https://ajprworld.com/images/tools/action-figure-founder.jpg']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': 'AI Action Figure Generator & Blister Box Maker',
  'applicationCategory': 'MultimediaApplication',
  'operatingSystem': 'All',
  'offers': {
    '@type': 'Offer',
    'price': '0',
    'priceCurrency': 'USD'
  },
  'description': 'Interactive generator that turns founders, developers, professionals, and characters into custom collectible action figures in blister toy packaging.',
  'publisher': {
    '@type': 'Organization',
    'name': 'AJPR World',
    'url': 'https://ajprworld.com'
  }
};

export default function ActionFigurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ActionFigureClient />
    </>
  );
}
