import { Metadata } from 'next'
import { seoOverrides } from '@/lib/seo-overrides'

export const metadata: Metadata = {
  ...seoOverrides['/contact'],
  alternates: {
    canonical: 'https://ajprworld.com/contact',
  },
  openGraph: {
    ...seoOverrides['/contact'],
    url: 'https://ajprworld.com/contact',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
