import Link from 'next/link';
import { getBlogs } from '@/lib/db/queries';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

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

export default async function BlogIndexPage() {
  const allBlogs = await getBlogs() as BlogPost[];
  
  const featuredPost = allBlogs.length > 0 ? allBlogs[0] : null;
  const moreNews = allBlogs.length > 1 ? allBlogs.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-6 pt-8">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">G</span>
                AJPR The Keyword
            </h1>
        </header>

        {blogsEmptyState(allBlogs)}

        {/* Featured Post */}
        {featuredPost && (
            <section className="relative group">
                <Link href={`/blog/${featuredPost.slug}`} className="block overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                    <div className="grid md:grid-cols-2 gap-0">
                        {featuredPost.cover_image && (
                            <div className="relative h-64 md:h-auto overflow-hidden">
                                <img 
                                    src={featuredPost.cover_image} 
                                    alt={featuredPost.title}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                            <div className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                                <span>Featured</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                <time>{new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 line-clamp-3">
                                {featuredPost.excerpt}
                            </p>
                            <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform w-max">
                                Read article <ArrowRight className="ml-2 w-4 h-4" />
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
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">More news</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {moreNews.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
                            <Card className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col rounded-xl">
                                {blog.cover_image && (
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <img 
                                            src={blog.cover_image} 
                                            alt={blog.title}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-3 tracking-wider uppercase">
                                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                                        {blog.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-500">By {blog.author}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        )}

      </div>
    </div>
  );
}

function blogsEmptyState(blogs: BlogPost[]) {
    if (blogs.length > 0) return null;
    return (
        <div className="text-center py-32 border border-dashed rounded-2xl border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-50">No stories yet</h3>
            <p className="text-slate-500">Check back later for our latest updates and news.</p>
        </div>
    )
}
