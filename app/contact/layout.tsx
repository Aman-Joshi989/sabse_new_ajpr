import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Our Engineering & Legal Teams | AJPR World',
  description: 'Book a strategy session with AJPR World. Let’s talk about custom software, automated n8n workflows, compliance consulting, and AI swarm orchestration.',
  alternates: {
    canonical: 'https://ajprworld.com/contact',
  },
  openGraph: {
    title: 'Contact Our Engineering & Legal Teams | AJPR World',
    description: 'Book a strategy session with AJPR World. Let’s talk about custom software, automated workflows, and compliance consulting.',
    url: 'https://ajprworld.com/contact',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
