import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://ajprworld.com/login'
  },
  openGraph: {
    title: 'Client & Team Login | AJPR World',
    description: 'Access your AJPR World client dashboard, project milestones, real-time analytics, and engineering progress.',
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
  return <>{children}</>;
}
