import { Metadata } from 'next'
import { seoOverrides } from '@/lib/seo-overrides'

export const metadata: Metadata = {
  ...seoOverrides['/careers'],
  alternates: {
    canonical: 'https://ajprworld.com/careers',
  },
  openGraph: {
    ...seoOverrides['/careers'],
    url: 'https://ajprworld.com/careers',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
