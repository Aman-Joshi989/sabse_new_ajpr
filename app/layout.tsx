import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'AJPR World – Your Partner for Legal, Tech & Business Growth',
  description: 'AJPR World delivers complete business solutions including web development, legal services, GST filing, company registration, and financial consulting. We help startups and businesses grow with reliable, end-to-end support.',
  keywords: 'Best Software, business solutions, web development, legal services, GST returns, company registration, financial consulting, India, business consulting India',
  alternates: { canonical: 'https://ajprworld.com' },
  openGraph: {
    title: 'AJPR World - Complete Business Solutions',
    description: 'Your one-stop partner for business success: tech, legal & financial services.',
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
    title: 'AJPR World - Complete Business Solutions',
    description: 'Legal, Tech & Financial Services for your business growth.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
  },
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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider user={user}>
            <CartProvider>
              <Header user={user} />
              <main className="min-h-screen">
                {children}
                <Analytics />
                <SpeedInsights />
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
