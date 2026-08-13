import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Technical & SEO Audit | AJPR World',
  description: 'Apply for a free technical architecture and SEO audit from our senior engineering team.',,
  alternates: {
    canonical: '/free-audit'
  },
  openGraph: {
    title: 'Free Technical & SEO Audit | AJPR World',
    description: 'Apply for a free technical architecture and SEO audit from our senior engineering team.',
    url: 'https://ajprworld.com/free-audit',
    siteName: 'AJPR World',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Technical & SEO Audit | AJPR World',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default function FreeAuditPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Copy & Benefits */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Limited Time Offer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Is your tech stack holding back your revenue?
            </h1>
            <p className="text-lg text-slate-400 mb-10">
              Apply for a comprehensive Technical & SEO Audit. Our senior engineers will analyze your platform and provide an actionable roadmap to increase performance, security, and conversions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-slate-900 p-3 rounded-lg mr-4">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Performance & Core Web Vitals</h3>
                  <p className="text-slate-400">We identify bottlenecks slowing down your TTFB and impacting your Google rankings.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-slate-900 p-3 rounded-lg mr-4">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Architecture & Security</h3>
                  <p className="text-slate-400">Review of your database schemas, API structures, and potential vulnerabilities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Lead Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25"></div>
            <div className="relative">
              <LeadForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
