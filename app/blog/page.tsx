import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/db/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import React from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AJPR World Blog – Systems, Automation & Growth',
  description: 'Insightful articles about modern systems engineering, local SEO automation, and AI swarm orchestration.',
  alternates: {
    canonical: 'https://ajprworld.com/blog',
  },
  openGraph: {
    title: 'AJPR World Blog – Systems, Automation & Growth',
    description: 'Insightful articles about modern systems engineering, local SEO automation, and AI swarm orchestration.',
    url: 'https://ajprworld.com/blog',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-24 pb-20 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <header className="border-b border-slate-200 dark:border-slate-800/80 pb-6 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-500/20">B</span>
                  AJPR World Blog
              </h1>
              <p className="text-slate-500 dark:text-slate-450 text-sm mt-2 font-medium">
                Insightful articles about modern systems engineering, local AEO, and AI swarm orchestration.
              </p>
            </div>
        </header>

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
