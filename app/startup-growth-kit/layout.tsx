import { Metadata } from 'next'
import { seoOverrides } from '@/lib/seo-overrides'

export const metadata: Metadata = {
  ...seoOverrides['/startup-growth-kit'],
  alternates: {
    canonical: 'https://ajprworld.com/startup-growth-kit',
  },
  openGraph: {
    ...seoOverrides['/startup-growth-kit'],
    url: 'https://ajprworld.com/startup-growth-kit',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function StartupGrowthKitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
