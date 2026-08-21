import Link from 'next/link';
import { getPublishedServices, getBlogs, getAllSeoRoutes, getGlossaryTerms } from '@/lib/db/queries';

export const metadata = {
  title: 'Sitemap | AJPR World',
  description: 'HTML Sitemap for AJPR World - Premium Tech & Software Solutions.',
  alternates: {
    canonical: '/sitemap'
  },
  openGraph: {
    title: 'Sitemap | AJPR World',
    description: 'HTML Sitemap for AJPR World - Premium Tech & Software Solutions.',
    url: 'https://ajprworld.com/sitemap',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJPR World',
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
    { title: 'Services', url: '/services' },
    { title: 'Portfolio', url: '/portfolio' },
    { title: 'Blog', url: '/blog' },
    { title: 'Glossary', url: '/glossary' },
    { title: 'Contact', url: '/contact' },
    { title: 'Careers', url: '/careers' },
    { title: 'Startup Growth Kit', url: '/startup-growth-kit' },
    { title: 'Locations & Areas Served', url: '/locations' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Terms of Service', url: '/terms' },
    { title: 'Affiliates', url: '/affiliates' },
    { title: 'Network Search', url: '/network-search' },
    { title: 'Pricing', url: '/pricing' },
    { title: 'Resources', url: '/resources' },
    { title: 'AI Cost Estimator', url: '/tools/ai-cost-estimator' },
    { title: 'Roofing Contractors', url: '/roofing-contractors' },
    { title: 'Free Audit', url: '/free-audit' },
    { title: 'Chat Agents', url: '/chat-agents' },
    { title: 'Sign Up as Client', url: '/signup/client' },
    { title: 'Sign Up as Developer', url: '/signup/developer' },
    { title: 'CPU Demo', url: '/demo-cpu' },
    { title: 'Shining Demo', url: '/demo-shining' },
    { title: 'Ruflo Demo', url: '/demo-ruflo' },
  ];

  const targetCities = [
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 
    'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand',
    'new-york', 'london', 'san-francisco', 'singapore', 'dubai', 
    'sydney', 'toronto', 'austin', 'chicago', 'boston'
  ];
  const targetServices = [
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
                <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Glossary</h2>
                <ul className="space-y-3">
                  {glossaryTerms.slice(0, 15).map((term: any) => (
                    <li key={term.id}>
                      <Link href={`/glossary/${term.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        {term.term}
                      </Link>
                    </li>
                  ))}
                  <li><Link href="/glossary" className="text-slate-500 hover:underline text-sm italic">View all terms &rarr;</Link></li>
                </ul>
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
