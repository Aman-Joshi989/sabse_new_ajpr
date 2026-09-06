import { getBlogs } from '@/lib/db/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, Github, Linkedin, Twitter } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';

export const revalidate = 86400; // Cache for 24 hours (ISR) to protect Vercel free limits

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  
  return {
    title: `${decodedName} - Author Profile | AJPR World`,
    description: `Read articles by ${decodedName}, an expert at AJPR World.`,
    alternates: {
      canonical: `https://ajprworld.com/authors/${resolvedParams.name}`,
    },
    openGraph: {
      title: `${decodedName} - Author Profile | AJPR World`,
      description: `Read articles by ${decodedName}, an expert at AJPR World.`,
      url: `https://ajprworld.com/authors/${resolvedParams.name}`,
      type: 'profile',
      siteName: 'AJPR World',
      images: ['https://ajprworld.com/og-image.jpg']
    }
  };
}

export default async function AuthorProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);
  
  // Fetch all blogs and filter by author
  const allBlogs = await getBlogs();
  const authorBlogs = allBlogs.filter((b: any) => b.author.toLowerCase() === decodedName.toLowerCase());

  if (authorBlogs.length === 0) {
    // If we have no blogs by this author, they probably don't exist as an author
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Authors', item: 'https://ajprworld.com/authors' },
    { name: decodedName, item: `https://ajprworld.com/authors/${resolvedParams.name}` }
  ];

  // E-E-A-T Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: decodedName,
    url: `https://ajprworld.com/authors/${resolvedParams.name}`,
    jobTitle: 'Verified Expert',
    worksFor: {
      '@type': 'Organization',
      name: 'AJPR World'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Author Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400 shrink-0">
            {decodedName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{decodedName}</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-xl">
              An expert contributor at AJPR World, specializing in technical solutions, web architecture, and digital strategy.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          Articles by {decodedName}
        </h2>
        
        <div className="space-y-6">
          {authorBlogs.map((blog: any) => (
            <Link 
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="block group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                <ArrowLeftIcon className="w-5 h-5 text-slate-400 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
