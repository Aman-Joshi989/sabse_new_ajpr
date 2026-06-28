import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers – Build the Future of Autonomous Systems | AJPR World',
  description: 'Join our team of systems engineers, automation specialists, and legal professionals. Discover active job openings at AJPR World.',
  alternates: {
    canonical: 'https://ajprworld.com/careers',
  },
  openGraph: {
    title: 'Careers – Build the Future of Autonomous Systems | AJPR World',
    description: 'Join our team of systems engineers, automation specialists, and legal professionals. Discover active job openings at AJPR World.',
    url: 'https://ajprworld.com/careers',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
