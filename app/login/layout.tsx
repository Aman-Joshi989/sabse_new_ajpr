import { Metadata } from 'next';
import FontLoader from '@/components/FontLoader';

export const metadata: Metadata = {
  title: 'Client & Team Portal Login | AJPR World',
  description: 'Access your AJPR World client dashboard, project milestones, real-time analytics, and engineering sprint deliverables.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://ajprworld.com/login'
  },
  openGraph: {
    title: 'Client & Team Portal Login | AJPR World',
    description: 'Access your AJPR World client dashboard, project milestones, real-time analytics, and engineering sprint deliverables.',
    url: 'https://ajprworld.com/login',
    siteName: 'AJPR World',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJPR World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FontLoader />
      {children}
    </>
  );
}
