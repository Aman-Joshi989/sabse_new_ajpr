import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },,
  alternates: {
    canonical: '/login'
  },
  openGraph: {
    title: 'AJPR World',
    description: 'AJPR World delivers premium digital solutions.',
    url: 'https://ajprworld.com/login',
    siteName: 'AJPR World',
    images: [
      {
        url: '/og-image.jpg',
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
