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
import { getSiteSettings, getPublishedServices } from '@/lib/db/queries';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    return {
      title: settings?.seo_title || 'AJPR World – Your Partner for Legal, Tech & Business Growth',
      description: settings?.seo_description || 'AJPR World delivers complete business solutions including web development, legal services, GST filing, company registration, and financial consulting.',
      keywords: settings?.seo_keywords || 'Best Software, business solutions, web development, legal services, GST returns',
      alternates: { canonical: settings?.canonical_url || 'https://ajprworld.com' },
      openGraph: {
        title: settings?.seo_title || 'AJPR World - Complete Business Solutions',
        description: settings?.seo_description || 'Your one-stop partner for business success: tech, legal & financial services.',
        url: settings?.canonical_url || 'https://ajprworld.com',
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
        title: settings?.seo_title || 'AJPR World - Complete Business Solutions',
        description: settings?.seo_description || 'Legal, Tech & Financial Services for your business growth.',
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
      title: 'AJPR World – Your Partner for Legal, Tech & Business Growth',
      description: 'AJPR World delivers complete business solutions including web development, legal services, GST filing, company registration, and financial consulting.',
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

  let services: any[] = [];
  try {
    services = await getPublishedServices();
  } catch (e) {
    console.error("Failed to fetch dynamic services in layout:", e);
  }

  return (
    <html lang="en" suppressHydrationWarning>
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
              <Footer />
              <Toaster />
              <Analytics />
              <SpeedInsights />
              <OrganizationSchema />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
