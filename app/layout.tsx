import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { OrganizationSchema } from '@/components/schema/OrganizationSchema';
import { getSiteSettings, getPublishedServices, getBlogs } from '@/lib/db/queries';
import { headers } from 'next/headers';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export function cleanMetaDescription(desc: string, maxLen = 155): string {
  if (!desc) return '';
  const clean = desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen - 3);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > maxLen * 0.7) {
      return clean.slice(0, lastSpace).trim() + '...';
  }
  return sliced.trim() + '...';
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    const rawDesc = settings?.seo_description || 'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding.';
    const seoDesc = cleanMetaDescription(rawDesc);
    const ogDesc = cleanMetaDescription(settings?.seo_description || 'Your premium partner for tech, custom software & creative branding.');
    const twitterDesc = cleanMetaDescription(settings?.seo_description || 'Premium web development, custom software engineering & creative branding for business growth.');

    return {
      title: settings?.seo_title || 'AJPR World – Premium Tech, Custom Software & Creative Branding',
      description: seoDesc,
      keywords: settings?.seo_keywords || 'Best Software, tech solutions, web development, custom software, UI/UX design, cloud deployment, digital branding',
      openGraph: {
        title: settings?.seo_title || 'AJPR World - Premium Tech & Software Solutions',
        description: ogDesc,
        url: 'https://ajprworld.com',
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
      },
      twitter: {
        card: 'summary_large_image',
        title: settings?.seo_title || 'AJPR World - Premium Tech & Software Solutions',
        description: twitterDesc,
        images: ['https://ajprworld.com/og-image.jpg'],
        creator: '@ajprworld',
      },
      other: {
        'geo.region': settings?.geo_region || 'IN-DL',
        'geo.placename': settings?.geo_placename || 'New Delhi',
        'geo.position': settings?.geo_position || '28.6139;77.2090',
        'ICBM': settings?.geo_icbm || '28.6139, 77.2090'
      }
    };
  } catch (error) {
    console.error("Failed to generate metadata dynamically:", error);
    return {
      title: 'AJPR World – Premium Tech, Custom Software & Creative Branding',
      description: 'AJPR World delivers premium web development, custom software engineering, UI/UX design, and AI solutions.',
    };
  }
}

import { getSession } from '@/lib/auth';

import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartProvider } from '@/components/providers/CartProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession();
  const user = session?.user;

  // Extract current pathname from custom request headers
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isExcludedRoute = pathname === '/login' || pathname.startsWith('/dashboard');

  let services: any[] = [];
  let blogs: any[] = [];

  if (!isExcludedRoute) {
    try {
      services = await getPublishedServices();
      blogs = await getBlogs();
    } catch (e) {
      console.error("Failed to fetch dynamic content in layout:", e);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider user={user}>
            <CartProvider>
              <Header user={user} services={services} />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer services={services} blogs={blogs} />
              <Toaster />
              <Analytics />
              <SpeedInsights />
              <OrganizationSchema />
              <Script
                id="ahrefs-analytics"
                src="/analytics/ahrefs.js"
                data-key="NBGEPf0K5JrRzkOhDpu04A"
                data-api="https://analytics.ahrefs.com/api/event"
                data-error="https://analytics.ahrefs.com/api/error"
                strategy="lazyOnload"
                async
              />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
