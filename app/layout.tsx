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
import { LocalBusinessSchema } from '@/components/schema/LocalBusinessSchema';
import { getSiteSettings, getPublishedServices, getBlogs } from '@/lib/db/queries';
import LayoutClientEffect from '@/components/LayoutClientEffect';
import FontLoader from '@/components/FontLoader';

// Enable ISR: cache layout data for 60s, revalidate in background
export const revalidate = 60;


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export function cleanMetaTitle(title: string, maxLen = 60): string {
  if (!title) return '';
  const clean = title.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 3).trim() + '...';
}

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
      metadataBase: new URL('https://ajprworld.com'),
      title: cleanMetaTitle(settings?.seo_title || 'AJPR World – Premium Tech, Custom Software & Creative Branding'),
      description: seoDesc,
      keywords: settings?.seo_keywords || 'Best Software, tech solutions, web development, custom software, UI/UX design, cloud deployment, digital branding',
      openGraph: {
        type: 'website',
        title: cleanMetaTitle(settings?.seo_title || 'AJPR World - Premium Tech & Software Solutions'),
        description: ogDesc,
        url: 'https://ajprworld.com',
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


import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import FloatingLeadWidget from '@/components/FloatingLeadWidget'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let services: any[] = [];
  let blogs: any[] = [];

  try {
    const [fetchedServices, fetchedBlogs] = await Promise.all([
      getPublishedServices(),
      getBlogs()
    ]);
    services = fetchedServices || [];
    blogs = fetchedBlogs || [];
  } catch (e) {
    console.error("Failed to fetch dynamic content in layout:", e);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <FontLoader />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NCWB8DWL');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} font-sans`} suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NCWB8DWL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <LayoutClientEffect />
              <Header services={services} />
              <main className='min-h-screen'>
                {children}
              </main>
              <ExitIntentPopup />
              <FloatingLeadWidget />
              <Footer services={services} blogs={blogs} />
              <Toaster />
              <Analytics />
              <SpeedInsights />
              <OrganizationSchema />
              <LocalBusinessSchema />
              <Script
                id="ahrefs-analytics"
                src="/analytics/ahrefs.js"
                data-key="NBGEPf0K5JrRzkOhDpu04A"
                data-api="https://analytics.ahrefs.com/api/event"
                data-error="https://analytics.ahrefs.com/api/error"
                strategy="lazyOnload"
                async
              />
              <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
