import { getBlogBySlug } from '@/lib/db/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  cover_image: string | null;
  created_at: Date;
  published: boolean;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug) as BlogPost | undefined;
  if (!blog) return { title: 'Post Not Found' };

  return {
    title: `${blog.title} | AJPR The Keyword`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.cover_image ? [{ url: blog.cover_image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug) as BlogPost | undefined;

  if (!blog) {
    notFound();
  }

  // Calculate estimated reading time (approx 200 words per minute)
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 border-b border-slate-200 dark:border-slate-800">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          AJPR The Keyword
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8 text-slate-900 dark:text-slate-50">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 border-t border-b border-slate-200 dark:border-slate-800 py-4">
            <span className="text-slate-900 dark:text-slate-50 font-bold">By {blog.author}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <time dateTime={new Date(blog.created_at).toISOString()}>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <span>{readingTime} min read</span>
        </div>
      </header>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-md">
            <img 
              src={blog.cover_image} 
              alt={blog.title} 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-12">
            {blog.excerpt}
        </div>
        
        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 prose-img:rounded-xl max-w-none text-slate-800 dark:text-slate-200"
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n\n/g, '<br/><br/>') }}
        />
        
        {/* Footer Actions */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <p className="text-slate-500 font-medium text-sm">Thanks for reading!</p>
          <button className="text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-6 py-2 rounded-full transition-colors text-slate-900 dark:text-slate-50">
            Share Article
          </button>
        </div>
      </div>
    </article>
  );
}
