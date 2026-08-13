import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/db/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import React from 'react';
import { Metadata } from 'next';
import { getSeoMetadata } from "@/lib/db/queries";

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times
type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  cover_image: string | null;
  created_at: Date;
  published: boolean;
};

function getBlogCategory(blog: BlogPost): string {
  const title = blog.title.toLowerCase();
  const excerpt = (blog.excerpt || '').toLowerCase();
  if (title.includes('seo') || title.includes('geo') || title.includes('marketing') || excerpt.includes('seo') || excerpt.includes('geo')) {
    return 'Growth & SEO';
  }
  if (title.includes('automated') || title.includes('workflow') || title.includes('ruflo') || title.includes('swarm') || excerpt.includes('automate')) {
    return 'Automation';
  }
  return 'Engineering';
}

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category || 'All';

  let allBlogs: BlogPost[] = [];
  try {
    const fetched = await getBlogs();
    allBlogs = (fetched || []) as BlogPost[];
  } catch (err) {
    console.error("Failed to load blogs:", err);
  }

  // Map category to each blog
  const blogsWithCategory = allBlogs.map(b => ({
    ...b,
    category: getBlogCategory(b)
  }));

  const categories = ['All', 'Engineering', 'Growth & SEO', 'Automation'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogsWithCategory
    : blogsWithCategory.filter(b => b.category === selectedCategory);

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const moreNews = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AJPR World Blog',
    description: 'Expert insights on custom software engineering, web development, AI automation, and SEO by AJPR World.',
    url: 'https://ajprworld.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'AJPR World',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ajprworld.com/images/aman-joshi-profile.png'
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-24 pb-20 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Hero */}
        <div className="relative py-16 md:py-24 rounded-[3rem] bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-[#090D1A] border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden mb-12 flex flex-col items-center text-center px-4 group">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[400px] h-[400px] bg-blue-600/10 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-600/20 transition-all duration-700" />
            
            <div className="relative z-10 max-w-3xl flex flex-col items-center">
              <Badge className="mb-8 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-none font-black tracking-widest px-4 py-1.5 uppercase text-[10px] shadow-sm">
                Engineering & Growth Insights
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white leading-[1.05]">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Growth</span> Journal.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                Actionable tactics on custom web development, AI automation frameworks, and dominating local search rankings. Built for startups and scaling brands.
              </p>
            </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-24 border border-dashed rounded-2xl border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/30">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">No articles found</h3>
            <p className="text-slate-500 text-sm">There are no articles listed under the category "{selectedCategory}" at this time.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
                <section className="relative group">
                    <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/85 shadow-sm transition-all hover:shadow-xl group-hover:-translate-y-1 duration-300">
                        <div className="grid md:grid-cols-2 gap-0">
                            {featuredPost.cover_image ? (
                                <div className="relative h-64 md:h-[420px] overflow-hidden">
                                    <Image 
                                        src={featuredPost.cover_image} 
                                        alt={featuredPost.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            ) : (
                              <div className="relative h-64 md:h-[420px] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-white/40" />
                              </div>
                            )}
                            <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                                <div className="flex flex-wrap items-center gap-3 text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">
                                    <Badge className="bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20 border border-blue-500/10 font-bold">{featuredPost.category}</Badge>
                                    <span className="w-1 h-1 rounded-full bg-slate-350 dark:bg-slate-700"></span>
                                    <time className="flex items-center gap-1 font-semibold text-slate-500"><Clock className="w-3.5 h-3.5" />{new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                </div>
                                <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-2 transition-transform w-max">
                                    Read article <ArrowRight className="ml-2 w-4.5 h-4.5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* More News Grid */}
            {moreNews.length > 0 && (
                <section className="space-y-8">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Recent Articles</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {moreNews.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                                <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col rounded-2xl">
                                    {blog.cover_image ? (
                                        <div className="relative h-52 w-full overflow-hidden">
                                            <Image 
                                                src={blog.cover_image} 
                                                alt={blog.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                      <div className="relative h-52 w-full bg-gradient-to-br from-blue-600/80 to-indigo-700/80 flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-white/30" />
                                      </div>
                                    )}
                                    <CardContent className="p-6 flex flex-col flex-grow space-y-4">
                                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                            <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border-none font-bold">{blog.category}</Badge>
                                            <time className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                            {blog.title}
                                        </h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 flex-grow">
                                            {blog.excerpt}
                                        </p>
                                        <div className="pt-2 flex items-center text-blue-600 dark:text-blue-400 text-xs font-bold group-hover:translate-x-1.5 transition-transform w-max">
                                            Read full article <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/blog');
      return {
    alternates: { canonical: '/blog' },
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/blog'}`,
        }
      };
}
