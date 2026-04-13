import { getBlogBySlug } from '@/lib/db/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { Metadata } from 'next';
import { ScrollProgress } from '@/components/magic-ui/ScrollProgress';
import { MotionFadeInOnce } from '@/components/magic-ui/MotionFadeIn';

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
    title: `${blog.title} | AJPR Daily`,
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
    <article className="min-h-screen bg-background relative overflow-hidden">
      <ScrollProgress />
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Navigation */}
      <MotionFadeInOnce delay={0.1} className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all posts
        </Link>
      </MotionFadeInOnce>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-6 pb-12">
        <MotionFadeInOnce delay={0.2} className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 font-medium">
          <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full border border-white/5 shadow-sm">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <time dateTime={new Date(blog.created_at).toISOString()}>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full border border-white/5 shadow-sm">
            <ClockIcon className="w-4 h-4 text-primary" />
            <span>{readingTime} min read</span>
          </div>
        </MotionFadeInOnce>

        <MotionFadeInOnce delay={0.3}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
            {blog.title}
          </h1>
        </MotionFadeInOnce>

        <MotionFadeInOnce delay={0.4}>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light border-l-4 border-primary/50 pl-6 rounded-r-lg bg-gradient-to-r from-primary/5 to-transparent py-2">
            {blog.excerpt}
          </p>
        </MotionFadeInOnce>

        {/* Author Block */}
        <MotionFadeInOnce delay={0.5} className="mt-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-primary/30 ring-2 ring-primary/20">
            {blog.author.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-foreground">{blog.author}</div>
            <div className="text-sm text-muted-foreground">Editor at AJPR World</div>
          </div>
        </MotionFadeInOnce>
      </header>

      {/* Cover Image */}
      {blog.cover_image && (
        <MotionFadeInOnce delay={0.6} className="max-w-6xl mx-auto px-4 md:px-6 mb-16 px-0 md:px-6 relative group">
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-[3rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative aspect-[21/9] w-full rounded-none md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-0 md:border border-white/10 ring-1 ring-white/5">
            <img 
              src={blog.cover_image} 
              alt={blog.title} 
              className="object-cover w-full h-full transition-transform duration-[20s] hover:scale-110 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-[2rem] pointer-events-none" />
          </div>
        </MotionFadeInOnce>
      )}

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <MotionFadeInOnce delay={0.7}>
          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:decoration-primary/50 hover:prose-a:decoration-primary max-w-none text-foreground/90 leading-loose prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n\n/g, '<br/><br/>') }}
          />
        </MotionFadeInOnce>
        
        {/* Footer actions */}
        <MotionFadeInOnce delay={0.8} className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md p-6 rounded-2xl">
          <p className="text-muted-foreground text-sm font-medium">Thanks for reading!</p>
          <div className="flex gap-4">
            <button className="text-sm font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-6 py-2.5 rounded-full transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0">
              Share Article
            </button>
          </div>
        </MotionFadeInOnce>
      </div>
    </article>
  );
}
