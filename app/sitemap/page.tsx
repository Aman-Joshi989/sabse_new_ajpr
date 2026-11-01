import Link from 'next/link';
import { getPublishedServices, getBlogs, getAllSeoRoutes, getGlossaryTerms } from '@/lib/db/queries';

export const metadata = {
  title: 'HTML Sitemap | AJPR World',
  description: 'Explore the complete HTML sitemap of AJPR World. Easily navigate our services, pricing guides, client comparisons, research reports, and developer tools.',
  alternates: {
    canonical: 'https://ajprworld.com/sitemap'
  },
  openGraph: {
    title: 'HTML Sitemap | AJPR World',
    description: 'Explore the complete HTML sitemap of AJPR World. Easily navigate our services, pricing guides, client comparisons, research reports, and developer tools.',
    url: 'https://ajprworld.com/sitemap',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJPR World Sitemap',
      }
    ],
  }
};

export default async function SitemapPage() {
  const [services, blogs, seoRoutes, glossaryTerms] = await Promise.all([
    getPublishedServices(),
    getBlogs(),
    getAllSeoRoutes().catch(() => []),
    getGlossaryTerms().catch(() => [])
  ]);

  const mainPages = [
    { title: 'Home', url: '/' },
    { title: 'About Us', url: '/about' },
    { title: 'AI Automation & Agent Systems', url: '/ai-systems' },
    { title: 'Services Hub', url: '/services' },
    { title: 'Portfolio & Case Studies', url: '/portfolio' },
    { title: 'Blog & Engineering Insights', url: '/blog' },
    { title: 'Marketing Strategy Consulting Guide', url: '/blog/marketing-strategy-consulting-how-to-choose-a-provider' },
    { title: 'Marketing Consultant Cost & Rates', url: '/blog/marketing-strategy-consultant-cost-rates' },
    { title: 'B2B Marketing Strategy Guide', url: '/blog/b2b-marketing-strategy-in-house-vs-agency-vs-consultant' },
    { title: 'Top B2B Growth Agencies Shortlist', url: '/blog/best-b2b-growth-marketing-agencies-us' },
    { title: 'Glossary Hub', url: '/glossary' },
    { title: 'Contact', url: '/contact' },
    { title: 'Careers', url: '/careers' },
    { title: 'Careers - Application Form', url: '/careers/apply' },
    { title: 'Startup Growth Kit', url: '/startup-growth-kit' },
    { title: 'Locations & Areas Served', url: '/locations' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Terms of Service', url: '/terms' },
    { title: 'Affiliates', url: '/affiliates' },
    { title: 'Network Search', url: '/network-search' },
    { title: 'Pricing Hub', url: '/pricing' },
    { title: 'SEO Cost Guide (2026)', url: '/pricing/seo-cost' },
    { title: 'PPC Management Cost', url: '/pricing/ppc-cost' },
    { title: 'Website Cost Guide', url: '/pricing/website-cost' },
    { title: 'Industry Solutions Hub', url: '/industries' },
    { title: 'Home Services Marketing', url: '/industries/home-services' },
    { title: 'SaaS Marketing Agency', url: '/industries/saas-marketing' },
    { title: 'Healthcare Practice SEO', url: '/industries/healthcare-marketing' },
    { title: 'Ecommerce Marketing', url: '/industries/ecommerce-marketing' },
    { title: 'Shopify SEO Agency', url: '/platforms/shopify-seo' },
    { title: 'Webflow Development & SEO', url: '/platforms/webflow-agency' },
    { title: 'GEO (AI Search Optimization)', url: '/services/geo-optimization' },
    { title: 'Agency Comparisons Hub', url: '/compare' },
    { title: 'WebFX Alternatives', url: '/compare/webfx-alternatives' },
    { title: 'Web Tonic Alternatives', url: '/compare/webtonic-alternatives' },
    { title: 'SmartSites Alternatives', url: '/compare/smartsites-alternatives' },
    { title: 'Single Grain Alternatives', url: '/compare/single-grain-alternatives' },
    { title: 'Free US Business Tools Hub', url: '/tools' },
    { title: 'Agency Pricing & ROI Calculator', url: '/tools/agency-pricing-calculator' },
    { title: 'Admin Cost & Labor Drag Calculator', url: '/tools/admin-cost-calculator' },
    { title: 'Client Response Email Generator', url: '/tools/client-response-generator' },
    { title: 'SaaS Bloat & Redundant Tool Audit', url: '/tools/saas-bloat-audit' },
    { title: 'AI Architecture & Cost Estimator', url: '/tools/ai-cost-estimator' },
    { title: 'AI Action Figure Generator', url: '/tools/action-figure-generator' },
    { title: '2026 Agency Pricing Report', url: '/research/agency-pricing-report' },
    { title: 'Resources & Knowledge Hub', url: '/resources' },
    { title: 'Roofing Contractors Web Systems', url: '/roofing-contractors' },
    { title: 'Free Growth & SEO Audit', url: '/free-audit' },
    { title: 'Chat Agents Playground', url: '/chat-agents' },
    { title: 'Demo Ruflo (Swarm Simulator)', url: '/demo-ruflo' },
    { title: 'Aman Joshi (Founder & CEO)', url: '/aman-joshi' },
    { title: 'Book a Strategy Call', url: '/book-call' },
    { title: 'Client Sign Up', url: '/signup/client' },
    { title: 'Developer Network Sign Up', url: '/signup/developer' },
    { title: 'Cloud Solutions', url: '/services/cloud-solutions' },
    { title: 'Website Security & Maintenance', url: '/services/website-security-maintenance' },
    { title: 'Technical SEO Services', url: '/services/technical-seo' },
    { title: 'Digital Marketing', url: '/services/digital-marketing' },
    { title: 'Graphics & Branding', url: '/services/graphics-branding' },
    { title: 'Web Development', url: '/services/web-development' },
    { title: 'Engineering Solutions Hub', url: '/solutions' },
    { title: 'Next.js MVP Agency', url: '/solutions/nextjs-mvp-agency' },
    { title: 'Custom AI Agent Development', url: '/solutions/custom-ai-agent-development' },
    { title: 'AI SaaS MVP Development', url: '/solutions/ai-saas-development' },
    { title: 'React Native Mobile Agency', url: '/solutions/react-native-agency' },
    { title: 'Python & FastAPI Backend Agency', url: '/solutions/python-fastapi-backend' },
    { title: 'Enterprise Workflow Automation', url: '/solutions/enterprise-workflow-automation' },
    { title: 'Cloud Architecture & DevOps Consulting', url: '/solutions/cloud-devops-consulting' },
    { title: 'Technical SEO & GEO Agency', url: '/solutions/technical-seo-agency' },
  ];

  const targetCities = [
    'austin', 'denver', 'phoenix', 'charlotte', 'tampa', 'nashville', 
    'dallas', 'atlanta', 'miami', 'chicago', 'boston', 'seattle',
    'new-york', 'san-francisco',
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 
    'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand',
    'london', 'toronto', 'sydney', 'dubai', 'singapore'
  ];
  const targetServices = [
    'seo-agency', 'ppc-agency', 'web-design', 'digital-marketing', 'social-media-marketing',
    'custom-software', 'web-development', 'app-development', 'ai-solutions', 'cloud-architecture'
  ];

  const localLocations = targetCities.flatMap(city => 
    targetServices.map(service => ({
      title: `${service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} in ${city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
      url: `/locations/${city}/${service}`
    }))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 pt-40 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-slate-900 dark:text-white">HTML Sitemap</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Main Pages */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Main Pages</h2>
            <ul className="space-y-3">
              {mainPages.map(page => (
                <li key={page.url}>
                  <Link href={page.url} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Glossary */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Our Services</h2>
            <ul className="space-y-3 mb-8">
              {services?.map((service: any) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            {glossaryTerms && glossaryTerms.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Glossary Terms</h2>
                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                  {glossaryTerms.map((term: any) => (
                    <div key={term.id}>
                      <Link href={`/glossary/${term.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline text-xs block">
                        {term.term}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Link href="/glossary" className="text-slate-500 hover:underline text-xs italic font-medium">View Glossary Hub &rarr;</Link>
                </div>
              </>
            )}
          </div>

          {/* Blogs */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Recent Articles</h2>
            <ul className="space-y-3">
              {blogs?.map((blog: any) => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Programmatic Routes */}
          <div className="col-span-1 lg:col-span-1">
             <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Programmatic Pages</h2>
             <div className="max-h-[600px] overflow-y-auto pr-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
               {seoRoutes && seoRoutes.map((route: any) => (
                 <div key={route.id} className="text-sm">
                   <Link href={route.route} className="text-blue-600 dark:text-blue-400 hover:underline">
                     {route.keyword || route.route.replace(/-/g, ' ').replace('/', '')}
                   </Link>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Local Services (Wide) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Local Service Areas</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {localLocations.map(loc => (
              <li key={loc.url}>
                <Link href={loc.url} className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                  {loc.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
