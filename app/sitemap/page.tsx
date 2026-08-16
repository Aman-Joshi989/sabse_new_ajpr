import Link from 'next/link';
import { getPublishedServices, getBlogs } from '@/lib/db/queries';

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
    type: 'website'
  }
};

export default async function SitemapPage() {
  const [services, blogs] = await Promise.all([
    getPublishedServices(),
    getBlogs()
  ]);

  const mainPages = [
    { title: 'Home', url: '/' },
    { title: 'About Us', url: '/about' },
    { title: 'Services', url: '/services' },
    { title: 'Portfolio', url: '/portfolio' },
    { title: 'Blog', url: '/blog' },
    { title: 'Contact', url: '/contact' },
    { title: 'Careers', url: '/careers' },
    { title: 'Startup Growth Kit', url: '/startup-growth-kit' },
    { title: 'Locations & Areas Served', url: '/locations' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Terms of Service', url: '/terms' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 pt-40 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-black mb-12 text-slate-900 dark:text-white">HTML Sitemap</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Main Pages */}
          <div>
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

          {/* Services */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Our Services</h2>
            <ul className="space-y-3">
              {services?.map((service: any) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blogs */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Recent Articles</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {blogs?.map((blog: any) => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
