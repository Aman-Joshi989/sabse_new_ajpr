import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { OrganizationSchema } from '@/components/schema/OrganizationSchema';
import { LocalBusinessSchema } from '@/components/schema/LocalBusinessSchema';
import { getSiteSettings, getPublishedServices, getBlogs } from '@/lib/db/queries';
import LayoutClientEffect from '@/components/LayoutClientEffect';
import MobileActionDock from '@/components/MobileActionDock';

// Enable ISR: cache layout data for 24h to prevent Vercel ISR Write limits
export const revalidate = 86400;


// High-performance system font stack (zero render-blocking network requests, zero woff2 chains)
const inter = { variable: '--font-inter' }

export function cleanMetaTitle(title: string, maxLen = 60): string {
  if (!title) return '';
  const clean = title.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen - 3);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > maxLen * 0.7) {
    return clean.slice(0, lastSpace).trim() + '...';
  }
  return sliced.trim() + '...';
}

export function cleanMetaDescription(desc: string, maxLen = 158, minLen = 110): string {
  if (!desc) return '';
  const clean = desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  let target = clean;
  if (clean.length < minLen) {
    target = `${clean} | AJPR World builds custom AI MVPs and scalable web systems.`;
  }
  
  if (target.length <= maxLen && target.length >= minLen) return target;
  if (target.length <= maxLen) return target;
  
  const sliced = target.slice(0, maxLen - 3);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > maxLen * 0.7) {
    return sliced.slice(0, lastSpace).trim() + '...';
  }
  return sliced.trim() + '...';
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    const rawDesc = settings?.seo_description || 'AJPR World engineers custom AI MVPs, enterprise automation pipelines, and scalable web applications in 4 weeks for US startups and growing enterprises.';
    const seoDesc = cleanMetaDescription(rawDesc);
    const ogDesc = cleanMetaDescription(settings?.seo_description || 'Custom AI MVPs, web engineering, and autonomous workflows in 4 weeks.');
    const twitterDesc = cleanMetaDescription(settings?.seo_description || 'Custom AI MVPs, enterprise automation, and full-stack software development in 4 weeks.');

    return {
      metadataBase: new URL('https://ajprworld.com'),
      alternates: {
        canonical: 'https://ajprworld.com',
      },
      title: cleanMetaTitle(settings?.seo_title || 'AJPR World (AJPR) – Custom AI MVP Development & Software Engineering'),
      description: seoDesc,
      keywords: settings?.seo_keywords || 'Custom AI MVP, AI software development, US startup engineering, workflow automation, Next.js developer, B2B software agency',
      openGraph: {
        type: 'website',
        title: cleanMetaTitle(settings?.seo_title || 'AJPR World (AJPR) – Custom AI MVP Development & Software Engineering'),
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
      },
      twitter: {
        card: 'summary_large_image',
        title: cleanMetaTitle(settings?.seo_title || 'AJPR World - Premium Tech & Software Solutions'),
        description: twitterDesc,
        images: ['https://ajprworld.com/og-image.jpg'],
        creator: '@ajprworld',
      },
      other: {
        'geo.region': settings?.geo_region || 'IN-UT',
        'geo.placename': settings?.geo_placename || 'Haldwani',
        'geo.position': settings?.geo_position || '29.2183;79.5126',
        'ICBM': settings?.geo_icbm || '29.2183, 79.5126'
      }
    };
  } catch (error) {
    console.error("Failed to generate metadata dynamically:", error);
    return {
      title: 'AJPR World (AJPR) – Custom Software & AI Engineering',
      description: 'AJPR World engineers custom web development, software solutions, UI/UX design, and AI systems built for fast-growing businesses.',
    };
  }
}


import { AuthProvider } from '@/components/providers/AuthProvider'
import { CartProvider } from '@/components/providers/CartProvider'
import { RegionProvider } from '@/components/providers/RegionProvider'
import DeferredLayoutWidgets from '@/components/DeferredLayoutWidgets'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let footerServices: { title: string; slug: string }[] = [];
  let footerBlogs: { title: string; slug: string }[] = [];

  try {
    const [fetchedServices, fetchedBlogs] = await Promise.all([
      getPublishedServices(),
      getBlogs()
    ]);
    footerServices = Array.isArray(fetchedServices)
      ? fetchedServices.slice(0, 6).map((s: any) => ({ title: s.title, slug: s.slug }))
      : [];
    footerBlogs = Array.isArray(fetchedBlogs)
      ? fetchedBlogs.slice(0, 4).map((b: any) => ({ title: b.title, slug: b.slug }))
      : [];
  } catch (e) {
    console.error("Failed to fetch dynamic content in layout:", e);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Instant Synchronous Regional & Currency Auto-Detector */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('ajpr_region');
                  if (!saved) {
                    var cookieMatch = document.cookie.match(/ajpr_region=(US|IN)/);
                    if (cookieMatch) {
                      saved = cookieMatch[1];
                      localStorage.setItem('ajpr_region', saved);
                    }
                  }
                  if (!saved) {
                    var tz = (Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || '';
                    var offset = new Date().getTimezoneOffset();
                    var lang = navigator.language || '';
                    var isIndia = tz.indexOf('Calcutta') !== -1 || tz.indexOf('Kolkata') !== -1 || tz.indexOf('India') !== -1 || offset === -330 || lang.indexOf('-IN') !== -1 || lang === 'hi';
                    var reg = isIndia ? 'IN' : 'US';
                    var cur = isIndia ? 'INR' : 'USD';
                    localStorage.setItem('ajpr_region', reg);
                    localStorage.setItem('ajpr_currency', cur);
                    document.cookie = 'ajpr_region=' + reg + '; path=/; max-age=31536000; SameSite=Lax';
                    document.cookie = 'ajpr_currency=' + cur + '; path=/; max-age=31536000; SameSite=Lax';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
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
            <RegionProvider>
              <CartProvider>
                <LayoutClientEffect />
                <Header />
                <main className='min-h-screen pb-16 md:pb-0'>
                  {children}
                </main>
                <MobileActionDock />
                <Footer services={footerServices} blogs={footerBlogs} />
                <OrganizationSchema />
                <LocalBusinessSchema />
                <DeferredLayoutWidgets />
              </CartProvider>
            </RegionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
