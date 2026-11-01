import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Wrench, CheckCircle2, ArrowRight, PhoneCall, ShieldCheck, MapPin, Star, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Home Services Marketing Agency: HVAC & Roofing SEO | AJPR',
  description: 'Drive qualified local leads for HVAC, roofing, and plumbing contractors. Local SEO, Google Local Services Ads, and automated quote capture that scales.',
  alternates: {
    canonical: 'https://ajprworld.com/industries/home-services',
  },
  openGraph: {
    title: 'Home Services Marketing Agency: HVAC & Roofing SEO | AJPR',
    description: 'Drive qualified local leads for HVAC, roofing, and plumbing contractors. Local SEO, Google Local Services Ads, and automated quote capture that scales.',
    url: 'https://ajprworld.com/industries/home-services',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Services Marketing Agency - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Services Marketing Agency: HVAC & Roofing SEO | AJPR',
    description: 'Local 3-pack rankings, Google Guaranteed Ads, and high-ticket customer acquisition.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How do home service contractors get more calls from Google?',
    answer: 'Contractors win calls through three interconnected channels: Google Local Services Ads (the Google Guaranteed green checkmark at the very top of search), Google Maps local 3-pack rankings via Google Business Profile optimization, and localized organic service pages targeting specific city neighborhoods.'
  },
  {
    question: 'How much does digital marketing cost for an HVAC or roofing company?',
    answer: 'Most residential home service contractors spend between $2,000 and $5,000/month on agency management fees, paired with $2,500 to $10,000/month in direct ad spend across Google Local Services Ads and Google Search.'
  },
  {
    question: 'How do you prevent junk leads and out-of-area calls?',
    answer: 'We configure strict geographic boundary targeting in Google Ads, implement dynamic zip-code gating on quote request forms, and maintain negative keyword lists to exclude DIY searches (e.g. "how to fix water heater myself", "cheap parts").'
  },
  {
    question: 'How fast can a new plumbing or roofing company rank in Google Maps?',
    answer: 'With proper Google Business Profile verification, accurate local citation building, and localized review generation, initial Maps 3-pack appearances typically begin within 45 to 60 days, with call volume compounding by month 3.'
  }
];

export default function HomeServicesPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Home Services Digital Marketing & SEO',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'United States',
    description: 'Full-service local SEO, Google Local Services Ads, and lead generation for HVAC, plumbing, roofing, and electrical contractors.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-home-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/industries" className="hover:text-blue-600 transition-colors">Industries</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Home Services</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5" /> High-Intent Contractor Marketing
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Home Services Marketing Agency: HVAC, Roofing & Plumbing SEO
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            When homeowners have a burst pipe, a failing AC in July, or a storm-damaged roof, they don’t browse social media. They search Google and call the first trusted contractor they see. We ensure that contractor is you.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-950/90 to-slate-900 text-white border border-amber-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">Contractor Growth Case Study</div>
              <div className="text-2xl sm:text-3xl font-bold">+184% Booked Emergency Jobs</div>
              <p className="text-sm text-amber-100/80 mt-1 max-w-xl">
                Generated for a multi-truck plumbing & HVAC company within 90 days of restructuring their Google Local Services Ads and local Maps 3-pack profile.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-amber-500/25"
            >
              Get Contractor Growth Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core Pillars */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            The 4-Pillar Contractor Domination Engine
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Google Local Services Ads (LSA)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Secure the coveted Google Guaranteed badge. You pay only for real, qualified phone calls from homeowners in your licensed service radius.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Google Maps 3-Pack SEO</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Dominate localized search for high-ticket queries like "emergency roof repair near me" or "furnace replacement [city]" with geo-tagged citations and automated review velocity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">High-Converting Dispatch Funnels</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Replace slow generic contact forms with mobile-first tap-to-call buttons, instant quote calculators, and automated SMS dispatch alerts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Automated Review Generation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect your CRM (ServiceTitan, Housecall Pro, Jobber) to automatically text satisfied homeowners review links upon job completion.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-blue-600" />
            Home Services Marketing FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Explore Related Contractor Solutions & Pricing
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/roofing-contractors" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Roofing Contractor Marketing Hub →
            </Link>
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Local SEO Pricing Guide →
            </Link>
            <Link href="/locations/austin/seo-agency" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Austin Local SEO Agency →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-amber-600 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Fill Your Dispatch Schedule Next Month</h2>
          <p className="text-amber-100 max-w-xl mx-auto mb-8 text-base">
            Request an audit of your Google Business Profile and local competitor visibility. We’ll show you exactly how many calls you are missing in your service area.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:bg-amber-50 transition-all shadow-lg"
          >
            Claim Free Contractor Market Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
