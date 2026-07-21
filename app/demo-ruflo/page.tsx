import { Metadata } from 'next'
import SwarmSimulator from './SwarmSimulator'
import { seoOverrides } from '@/lib/seo-overrides'

export const metadata: Metadata = {
  ...seoOverrides['/demo-ruflo'],
  keywords: 'RuFlo, AI agents, agent swarm, swarm simulator, multi-agent system, AI coding assistant, AJPR World',
  alternates: {
    canonical: 'https://ajprworld.com/demo-ruflo',
  },
  openGraph: {
    ...seoOverrides['/demo-ruflo'],
    url: 'https://ajprworld.com/demo-ruflo',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function Page() {
  return <SwarmSimulator />
}
