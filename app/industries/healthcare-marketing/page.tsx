import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Stethoscope, CheckCircle2, ArrowRight, ShieldCheck, HeartPulse, MapPin, Users, HelpCircle } from 'lucide-react';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Healthcare Marketing Agency: Medical & Dental SEO | AJPR',
  description: 'HIPAA-compliant healthcare marketing and SEO for medical practices and dental clinics. Attract new patients with local search and reputation management.',
  alternates: {
    canonical: 'https://ajprworld.com/industries/healthcare-marketing',
  },
  openGraph: {
    title: 'Healthcare Marketing Agency: Medical & Dental SEO | AJPR',
    description: 'HIPAA-compliant healthcare marketing and SEO for medical practices and dental clinics. Attract new patients with local search and reputation management.',
    url: 'https://ajprworld.com/industries/healthcare-marketing',
    siteName: 'AJPR World',
    type: 'article',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Healthcare Marketing Agency - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Marketing Agency: Medical & Dental SEO | AJPR',
    description: 'HIPAA-compliant healthcare marketing and localized patient acquisition.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'How do you ensure healthcare digital marketing is 100% HIPAA compliant?',
    answer: 'We configure privacy-first tracking architectures that never transmit Protected Health Information (PHI) to third-party ad networks. We implement server-side tracking, anonymized booking IDs, and secure Business Associate Agreements (BAAs) where required.'
  },
  {
    question: 'How do dental and medical practices rank #1 in local Google Maps?',
    answer: 'Ranking requires consistent physician directory citations (NPI registry, Healthgrades, WebMD, Zocdoc), localized procedure pages, structured Physician schema markup, and an automated SMS review engine that consistently earns authentic Google patient reviews.'
  },
  {
    question: 'What is the average cost to acquire a new patient via digital marketing?',
    answer: 'Patient acquisition costs vary by specialty. General dentistry patients typically cost between $45 and $95 to acquire, whereas high-ticket cosmetic procedures (invisalign, dental implants, elective surgery) range from $250 to $700 per booked patient.'
  },
  {
    question: 'Can Google Ads still be run for medical conditions?',
    answer: 'Yes, but healthcare Google Ads are subject to strict personalized advertising policies. Remarketing to patients based on specific health conditions is restricted, so we deploy high-intent search query capture and localized landing pages that convert direct intent.'
  }
];

export default function HealthcareMarketingPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Healthcare & Medical Practice Marketing',
    provider: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com',
    },
    areaServed: 'United States',
    description: 'HIPAA-compliant medical SEO, local 3-pack patient acquisition, and reputation management for healthcare practices.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <FAQSchema faqs={faqs} />
      <Script
        id="service-schema-healthcare"
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
          <span className="text-slate-900 dark:text-slate-200">Healthcare Marketing</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <HeartPulse className="w-3.5 h-3.5" /> HIPAA-Compliant Growth
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Healthcare Marketing Agency: Medical & Dental Practice SEO
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Attract qualified new patients while safeguarding patient privacy. We combine physician schema, localized Google Maps optimization, and reputation engines built specifically for medical clinics and specialty dental practices.
          </p>

          {/* Proof Block */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 to-slate-900 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Medical Practice Case Study</div>
              <div className="text-2xl sm:text-3xl font-bold">+240 New Patients / Month</div>
              <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
                Delivered for a multi-provider specialty clinic by capturing top-3 local Maps positions for high-value surgical and dental implant searches.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              Get Healthcare Marketing Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core Capabilities */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Medical Practice Patient Acquisition Engine
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">HIPAA-Compliant Analytics & Tracking</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Safeguard your practice against HHS OCR penalties with server-side conversion modeling that strips all Protected Health Information (PHI) before analytics ingestion.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Local 3-Pack & Doctor Directory Authority</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Synchronize physician listings across Google Business Profile, Healthgrades, Vitals, WebMD, and Zocdoc to build unbeatable local authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Physician Schema & Medical E-E-A-T</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Meet Google’s highest quality standards for Your Money or Your Life (YMYL) content with verified medical author bios, peer-reviewed clinical citations, and structured Physician schema.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Automated Patient Review Collection</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect your practice management software to send post-appointment SMS survey prompts, generating a steady stream of 5-star Google reviews.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-emerald-600" />
            Healthcare Marketing FAQs
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

        {/* Contextual links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-16">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Related Healthcare SEO Guides & Pricing
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Healthcare SEO Retainers Guide →
            </Link>
            <Link href="/locations/charlotte/seo-agency" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              Charlotte Medical Practice SEO →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-emerald-600 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Grow Your Patient Caseload Safely</h2>
          <p className="text-emerald-100 max-w-xl mx-auto mb-8 text-base">
            Request a confidential review of your practice’s local search visibility and HIPAA compliance posture.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-emerald-50 transition-all shadow-lg"
          >
            Claim Free Practice Growth Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
