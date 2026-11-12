import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  ExternalLink,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Building2,
  FolderGit2,
} from 'lucide-react';
import { getPortfolioItems } from '@/lib/db/queries';
import { getPublicApprovedReviews } from '@/lib/db/reviews';
import {
  GOOGLE_REVIEW_URL,
  CLUTCH_PROFILE_URL,
  GOODFIRMS_PROFILE_URL,
  SOURCEFORGE_PROFILE_URL,
} from '@/lib/constants/reviews';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import ReviewSubmissionClient from '@/components/reviews/ReviewSubmissionClient';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Client Reviews & Verification Hub | AJPR World',
  description:
    'Explore verified client project reviews, submit direct sprint feedback, or leave an independent review for AJPR World on Google, Clutch, and GoodFirms.',
  alternates: {
    canonical: 'https://ajprworld.com/reviews',
  },
  openGraph: {
    title: 'Client Reviews & Verification Hub | AJPR World',
    description:
      'Independent third-party review profiles on Google, Clutch, and GoodFirms plus verified direct client project testimonials.',
    url: 'https://ajprworld.com/reviews',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJPR World Client Reviews & Verification Hub',
      },
    ],
  },
};

const REVIEW_PORTALS = [
  {
    name: 'Google Business Profile',
    badge: 'Primary Search & Local Maps',
    description:
      'Share an independent public review on our Haldwani, Uttarakhand studio listing to help local and global buyers evaluate response speed and delivery.',
    href: GOOGLE_REVIEW_URL,
    cta: 'Leave or Read Google Reviews',
  },
  {
    name: 'Clutch.co Agency Profile',
    badge: 'B2B Verified Analyst Platform',
    description:
      'Independent analyst-verified B2B software and digital growth reviews covering budget accuracy, sprint velocity, and post-launch support.',
    href: CLUTCH_PROFILE_URL,
    cta: 'Review on Clutch',
  },
  {
    name: 'GoodFirms Verified Directory',
    badge: 'Engineering & Growth Directory',
    description:
      'Evaluate AJPR World ratings for custom Next.js development, website security maintenance, and technical SEO execution.',
    href: GOODFIRMS_PROFILE_URL,
    cta: 'Review on GoodFirms',
  },
  {
    name: 'SourceForge & Developer Hub',
    badge: 'Open Engineering & Benchmark Proof',
    description:
      'Inspect open technical benchmarks, repository deliverables, and independent developer community feedback.',
    href: SOURCEFORGE_PROFILE_URL,
    cta: 'View Developer Profile',
  },
];

export default async function ReviewsPage() {
  const [approvedReviews, portfolioProjects] = await Promise.all([
    getPublicApprovedReviews(30),
    getPortfolioItems().catch(() => []),
  ]);

  const shippedClients = Array.isArray(portfolioProjects) ? portfolioProjects.slice(0, 6) : [];

  return (
    <main className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-100 py-14 md:py-20">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: 'https://ajprworld.com' },
          { name: 'Reviews', item: 'https://ajprworld.com/reviews' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-medium">Client Reviews</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" /> Verified Client Trust & Independent Feedback
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-5">
            AJPR World Client Reviews & Third-Party Verification
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Every engineering sprint and growth retainer at AJPR World is led directly by senior systems architects with full repository ownership and published pricing. Inspect shipped{' '}
            <Link href="/portfolio" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              client case studies
            </Link>
            , compare us objectively in our{' '}
            <Link href="/compare/webtonic-alternatives" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              2026 agency benchmark
            </Link>
            , review{' '}
            <Link href="/services/website-maintenance-cost" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              website maintenance costs
            </Link>
            , or explore{' '}
            <Link href="/services/b2b-growth-marketing" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              B2B growth consulting
            </Link>
            .
          </p>
        </header>

        {/* External Review Platforms */}
        <section aria-labelledby="third-party-platforms" className="mb-14">
          <h2 id="third-party-platforms" className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Independent Review Platforms
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Worked with our team on a custom build, maintenance retainer, or SEO growth engagement? Leave an independent public review on any verified directory below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEW_PORTALS.map((portal) => (
              <div
                key={portal.name}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                    {portal.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{portal.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {portal.description}
                  </p>
                </div>
                <a
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {portal.cta} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Verified On-Site Submissions */}
        <section aria-labelledby="verified-submissions" className="mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 id="verified-submissions" className="text-2xl font-bold text-slate-900 dark:text-white">
                Verified Direct Client Testimonials
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Only work-email-verified client submissions approved by our delivery verification desk appear here.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Inspect Shipped Production Builds <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {approvedReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {approvedReviews.map((rev) => (
                <article
                  key={rev.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-1" aria-label={`${rev.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Verified Client
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    &ldquo;{rev.review_text}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{rev.client_name}</div>
                      <div className="text-slate-500 dark:text-slate-400">
                        {[rev.role_title, rev.company_name].filter(Boolean).join(' • ') || rev.project_type}
                      </div>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{rev.project_type}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Zero Fabricated Quotes — Only Verified Client Feedback
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Our direct on-site verified review feed is newly launched. While historical client reviews live on Google Business Profile and client case files, below are live shipped client engagements from our PostgreSQL portfolio database—and you can submit your verified feedback directly below.
                  </p>
                </div>
              </div>

              {shippedClients.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
                  {shippedClients.map((proj: any) => (
                    <div
                      key={proj.id || proj.title}
                      className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{proj.category || 'Production System'}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Submission Form */}
        <section
          id="submit-review"
          aria-labelledby="submit-review-heading"
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-10 shadow-sm mb-14"
        >
          <div className="max-w-2xl mb-6">
            <h2 id="submit-review-heading" className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Submit Direct Verified Client Feedback
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Takes under 60 seconds. Your work email is used solely to verify your project engagement and is never published publicly.
            </p>
          </div>
          <ReviewSubmissionClient />
        </section>

        {/* Engineering Transparency Footer Callout */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-blue-600" /> Evaluate Our Engineering Firsthand
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Review our founder architecture profile on{' '}
              <Link href="/aman-joshi" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Aman Joshi&apos;s page
              </Link>
              , explore{' '}
              <Link href="/locations/haldwani/digital-marketing" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                our Haldwani HQ digital growth practice
              </Link>
              , or schedule a direct 1-on-1 architecture session.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/book-call"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Book Architecture Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/919997205257?text=Hi%20Aman%2C%20I%27d%20like%20to%20share%20a%20review%20or%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Direct
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

