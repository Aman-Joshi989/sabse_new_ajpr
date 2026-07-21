import { Metadata } from 'next'
import { seoOverrides } from '@/lib/seo-overrides'

export const metadata: Metadata = {
  ...seoOverrides['/book-call'],
  alternates: {
    canonical: 'https://ajprworld.com/book-call',
  },
  openGraph: {
    ...seoOverrides['/book-call'],
    url: 'https://ajprworld.com/book-call',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function BookCallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
