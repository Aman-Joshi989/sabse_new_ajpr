import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedServices, getBlogs, getAllSeoRoutes, getGlossaryTerms } from '@/lib/db/queries';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { 
  Compass, 
  Layers, 
  Code2, 
  TrendingUp, 
  Scale, 
  MapPin, 
  Wrench, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Site Directory & Architecture Index | AJPR World',
  description: 'Explore the complete verified index of AJPR World: technology services, client comparisons, pricing benchmarks, research reports, and regional engineering hubs.',
  alternates: {
    canonical: 'https://ajprworld.com/sitemap'
  },
  openGraph: {
    title: 'Site Directory & Architecture Index | AJPR World',
    description: 'Explore the complete verified index of AJPR World: technology services, client comparisons, pricing benchmarks, research reports, and regional engineering hubs.',
    url: 'https://ajprworld.com/sitemap',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJPR World Site Directory',
      }
    ],
  }
};

export default async function SitemapPage() {
  const [services, blogs, seoRoutes, glossaryTerms] = await Promise.all([
    getPublishedServices().catch(() => []),
    getBlogs().catch(() => []),
    getAllSeoRoutes().catch(() => []),
    getGlossaryTerms().catch(() => [])
  ]);

  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Sitemap', item: 'https://ajprworld.com/sitemap' }
  ];

  const corePages = [
    { title: 'Home', url: '/', desc: 'Next.js 16 software & growth engineering' },
    { title: 'About Us', url: '/about', desc: 'Our engineering leadership and thesis' },
    { title: 'AI Systems & Automation', url: '/ai-systems', desc: 'Autonomous business workflows and AI systems' },
    { title: 'Portfolio & Case Studies', url: '/portfolio', desc: 'Verified client builds and ROI data' },
    { title: 'Pricing & Retainers', url: '/pricing', desc: 'Transparent sprint & retainer pricing' },
    { title: 'Free Growth Audit', url: '/free-audit', desc: 'Senior architectural & SEO audit' },
    { title: 'Book Strategy Call', url: '/book-call', desc: '30-minute direct scoping sprint' },
    { title: 'Careers', url: '/careers', desc: 'Join our senior engineering team' },
    { title: 'Contact', url: '/contact', desc: 'Direct outreach & custom RFPs' },
  ];

  const comparisonPages = [
    { title: 'Web Tonic Alternatives', url: '/compare/webtonic-alternatives', desc: 'Compare Next.js engineering vs Web Tonic' },
    { title: 'WebFX Alternatives', url: '/compare/webfx-alternatives', desc: 'Transparent retainers vs MarketingCloudFX' },
    { title: 'SmartSites Alternatives', url: '/compare/smartsites-alternatives', desc: 'Full-stack engineering vs PPC agencies' },
    { title: 'Single Grain Alternatives', url: '/compare/single-grain-alternatives', desc: 'Technical SEO vs generic content retainers' },
    { title: 'DigiPhlox Alternatives (Haldwani)', url: '/compare/digiphlox-alternatives', desc: 'Local Uttarakhand agency comparison' },
    { title: 'The Infinix Alternatives (Haldwani)', url: '/compare/the-infinix-alternatives', desc: 'Regional growth & Maps marketing' },
  ];

  const pricingGuides = [
    { title: 'SEO Cost Guide (2026)', url: '/pricing/seo-cost', desc: 'Retainers, hourly rates, and SaaS benchmarks' },
    { title: 'PPC Management Cost', url: '/pricing/ppc-cost', desc: 'Google Search & LinkedIn ad pricing' },
    { title: 'Website Cost Guide', url: '/pricing/website-cost', desc: 'Custom web development budget ranges' },
    { title: '2026 Agency Pricing Report', url: '/research/agency-pricing-report', desc: 'Comprehensive B2B agency rate analysis' },
    { title: 'Startup Growth Kit', url: '/startup-growth-kit', desc: 'Essential resources for scaleup founders' },
  ];

  const businessTools = [
    { title: 'Agency Pricing & ROI Calculator', url: '/tools/agency-pricing-calculator', desc: 'Calculate ROI and blended agency fees' },
    { title: 'SaaS Bloat & Redundant Tool Audit', url: '/tools/saas-bloat-audit', desc: 'Find and eliminate subscription drag' },
    { title: 'Client Response Generator', url: '/tools/client-response-generator', desc: 'Generate professional client messaging' },
    { title: 'Admin Cost & Labor Drag Calculator', url: '/tools/admin-cost-calculator', desc: 'Measure internal operational inefficiencies' },
    { title: 'AI Cost Estimator', url: '/tools/ai-cost-estimator', desc: 'Estimate model tokens and infrastructure spend' },
  ];

  const regionalHubs = [
    { name: 'Haldwani (HQ)', slug: 'haldwani', highlight: true },
    { name: 'Nainital', slug: 'nainital' },
    { name: 'Dehradun', slug: 'dehradun' },
    { name: 'Haridwar', slug: 'haridwar' },
    { name: 'Roorkee', slug: 'roorkee' },
    { name: 'Rudrapur', slug: 'rudrapur' },
    { name: 'Austin', slug: 'austin' },
    { name: 'Dallas', slug: 'dallas' },
    { name: 'Tampa', slug: 'tampa' },
    { name: 'Miami', slug: 'miami' },
    { name: 'Chicago', slug: 'chicago' },
    { name: 'Denver', slug: 'denver' },
    { name: 'Seattle', slug: 'seattle' },
    { name: 'Phoenix', slug: 'phoenix' },
    { name: 'London', slug: 'london' },
    { name: 'Singapore', slug: 'singapore' },
    { name: 'Dubai', slug: 'dubai' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20 font-sans">
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-14 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-xs mb-4 border border-blue-200 dark:border-blue-800/40 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Complete System Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Site Architecture & Resource Index
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            A comprehensive, structured directory of all published engineering services, research reports, comparison benchmarks, and regional service hubs across AJPR World.
          </p>
        </div>

        {/* 3-Column Core Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Column 1: Core Pages */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Core Company Pages</h2>
            </div>
            <ul className="space-y-3.5 flex-1">
              {corePages.map((page) => (
                <li key={page.url}>
                  <Link 
                    href={page.url} 
                    className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      <span>{page.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{page.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Core Engineering Services */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Services & Engineering</h2>
            </div>
            <ul className="space-y-3.5 flex-1">
              <li>
                <Link href="/services/b2b-growth-marketing" className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="font-semibold text-sm flex items-center justify-between">
                    <span>B2B Growth Marketing</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">New</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Full-funnel customer acquisition & GEO</p>
                </Link>
              </li>
              <li>
                <Link href="/services/geo-optimization" className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="font-semibold text-sm">GEO & AI Search Citations</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ChatGPT, Perplexity, and Gemini optimization</p>
                </Link>
              </li>
              <li>
                <Link href="/services/technical-seo" className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="font-semibold text-sm">Technical SEO Services</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Core Web Vitals, SSR, and schema graph</p>
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="font-semibold text-sm">Custom Web Development</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Next.js 16 full-stack software engineering</p>
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-solutions" className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="font-semibold text-sm">Cloud Architecture & DevOps</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">AWS/GCP infrastructure and automated CI/CD</p>
                </Link>
              </li>
              <li>
                <Link href="/services/website-security-maintenance" className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <div className="font-semibold text-sm">Security & 24/7 Maintenance</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Uptime monitoring, backups, and SLAs</p>
                </Link>
              </li>
              {services && services.slice(0, 3).map((s: any) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <div className="font-semibold text-sm">{s.title}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{s.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing & Cost Guides */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Pricing & Cost Guides</h2>
            </div>
            <ul className="space-y-3.5 flex-1">
              {pricingGuides.map((guide) => (
                <li key={guide.url}>
                  <Link 
                    href={guide.url} 
                    className="group block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      <span>{guide.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{guide.desc}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Row 2: Comparisons & Interactive Tools */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Comparisons */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Agency & Platform Comparisons</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {comparisonPages.map((comp) => (
                <Link 
                  key={comp.url} 
                  href={comp.url}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {comp.title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{comp.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Business Tools */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Business Tools</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {businessTools.map((tool) => (
                <Link 
                  key={tool.url} 
                  href={tool.url}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tool.title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Regional Hubs & Areas Served */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-16">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" /> Global Footprint
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Regional Hubs & Local Service Areas</h2>
            </div>
            <Link 
              href="/locations"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All Locations <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {regionalHubs.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className={`p-3 rounded-xl border text-center transition-all ${
                  city.highlight
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500/40 text-blue-700 dark:text-blue-300 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-300 font-medium'
                } text-xs`}
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal & Regulatory Sub-footer Note */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            AJPR World is a registered private technology entity operating in Haldwani, Uttarakhand, India, serving clients across the United States, United Kingdom, and international tech corridors.
          </p>
          <div className="flex items-center justify-center gap-6 mt-3">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link href="/feed.xml" className="hover:underline">RSS Feed</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
