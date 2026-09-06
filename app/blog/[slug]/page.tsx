import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Script from 'next/script';
import { 
    Clock, 
    ArrowLeft, 
    ArrowRight, 
    Share2, 
    Linkedin, 
    Twitter, 
    Calendar, 
    Sparkles, 
    BookOpen 
} from 'lucide-react';
import { getBlogBySlug, getBlogs } from '@/lib/db/queries';
import { cleanMetaTitle, cleanMetaDescription } from '@/app/layout';

export const revalidate = 3600; // ISR: Revalidate every hour

function injectInternalLinks(markdown: string) {
    if (!markdown) return '';
    const links: Record<string, string> = {
        'Custom AI': '/services/business-ai-automation',
        'MVP Development': '/services/startup-mvp-development',
        'MVP': '/services/startup-mvp-development',
        'Web Development': '/services/web-development',
        'Custom Software': '/services/saas-product-development',
        'Software Engineering': '/services/saas-product-development',
        'UI/UX Design': '/services/graphics-branding',
        'UI/UX': '/services/graphics-branding',
        'Cloud Infrastructure': '/services/cloud-devops-services',
        'Cloud': '/services/cloud-devops-services',
        'AI Automation': '/services/business-ai-automation',
        'Digital Marketing': '/services/digital-marketing',
    };

    let modified = markdown;
    for (const [keyword, url] of Object.entries(links)) {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
        // Match only outside markdown links [text](url)
        const parts = modified.split(/(\[[^\]]+\]\([^)]+\))/);

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0 && regex.test(parts[i])) {
                parts[i] = parts[i].replace(regex, `[$1](${url})`);
                break; // Only link first occurrence
            }
        }
        modified = parts.join('');
    }

    return modified;
}

async function getPost(slug: string) {
    const post = await getBlogBySlug(slug);
    if (!post) return null;
    return post;
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const post = await getPost(params.slug);

    if (!post) return { title: 'Not Found' };

    const cleanTitle = cleanMetaTitle(post.title || post.h1_title);
    const cleanDesc = cleanMetaDescription(post.meta_description || post.excerpt || `Read our latest blog on ${post.title}`);
    const publishedTime = post.published_at 
        ? new Date(post.published_at).toISOString() 
        : (post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString());

    return {
        alternates: { canonical: `https://ajprworld.com/blog/${params.slug}` },
        title: cleanTitle,
        description: cleanDesc,
        keywords: post.keywords,
        openGraph: {
            title: cleanTitle,
            description: cleanDesc,
            type: 'article',
            publishedTime: publishedTime,
            url: `https://ajprworld.com/blog/${post.slug}`,
            images: [
                {
                    url: post.image_url || post.cover_image || 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: cleanTitle,
                }
            ],
        }
    };
}

export default async function BlogPost(props: Props) {
    const params = await props.params;
    const [post, allBlogs] = await Promise.all([
        getPost(params.slug),
        getBlogs().catch(() => [])
    ]);

    if (!post) {
        notFound();
    }

    const publishedDate = post.published_at || post.created_at || new Date();
    const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const wordCount = (post.content || '').trim().split(/\s+/).length;
    const readingTime = Math.max(2, Math.ceil(wordCount / 220));

    // Get 3 related articles (excluding current article)
    const relatedPosts = ((allBlogs || []) as any[])
        .filter((b) => b.slug !== params.slug)
        .slice(0, 3);

    const articleUrl = `https://ajprworld.com/blog/${post.slug}`;
    const shareText = encodeURIComponent(`Read "${post.title}" by @ajprworld:`);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description || post.excerpt,
        datePublished: new Date(publishedDate).toISOString(),
        author: {
            '@type': 'Person',
            name: 'Aman Joshi',
            url: 'https://ajprworld.com/about'
        },
        publisher: {
            '@type': 'Organization',
            name: 'AJPR World',
            logo: {
                '@type': 'ImageObject',
                url: 'https://ajprworld.com/logo.png'
            }
        }
    };

    return (
        <article className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 md:px-12">
            {/* Inject JSON-LD Schema for Google SEO */}
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-4xl mx-auto">
                {/* Navigation & Breadcrumbs */}
                <div className="mb-8 flex items-center justify-between text-sm">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Articles</span>
                    </Link>
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                        {post.category || 'Engineering & Growth'}
                    </span>
                </div>

                {/* Main Article Container */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-10 md:p-14">
                    {/* Header */}
                    <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {readingTime} min read</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-8">
                            {post.title}
                        </h1>
                        
                        {/* Author & Social Share Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 shrink-0">
                                    <Image 
                                        src="/images/aman-joshi-profile.png" 
                                        alt="Aman Joshi" 
                                        fill 
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Aman Joshi</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Founder & Systems Architect</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                                    <Share2 className="w-3.5 h-3.5" /> Share:
                                </span>
                                <a 
                                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(articleUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-black hover:text-white dark:hover:bg-blue-600 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                                    aria-label="Share on X (Twitter)"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a 
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                                    aria-label="Share on LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </header>

                    {/* Cover Image if available */}
                    {(post.cover_image || post.image_url) && (
                        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <Image 
                                src={post.cover_image || post.image_url} 
                                alt={post.title} 
                                fill 
                                sizes="(max-width: 896px) 100vw, 896px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-2xl">
                        <ReactMarkdown components={{ h1: 'h2' }}>
                            {injectInternalLinks(post.content)}
                        </ReactMarkdown>
                    </div>

                    {/* High-Converting End-of-Post CTA Box */}
                    <div className="my-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" /> High-Performance Digital Systems
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                Ready to scale your product without tech debt?
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                                We architect high-performance web systems, custom AI automation workflows, and cloud database pipelines built for maximum scale and speed.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-4">
                                <Link 
                                    href="/book-call" 
                                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 inline-flex items-center gap-2 text-sm"
                                >
                                    Book a Discovery Call <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link 
                                    href="/services" 
                                    className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all text-sm"
                                >
                                    Explore Solutions
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Author Bio Box */}
                    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-md shrink-0">
                            <Image 
                                src="/images/aman-joshi-profile.png" 
                                alt="Aman Joshi" 
                                fill 
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aman Joshi</h3>
                                <span className="text-xs px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold rounded-full">
                                    Founder & Systems Architect
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                I partner with fast-growing startups and scaling companies to architect robust digital systems, eliminate manual overhead with autonomous workflows, and launch enterprise-grade web platforms.
                            </p>
                            <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                <a 
                                    href="https://www.linkedin.com/in/aman-joshi-/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="hover:underline flex items-center gap-1"
                                >
                                    <Linkedin className="w-3.5 h-3.5" /> Connect on LinkedIn
                                </a>
                                <span>•</span>
                                <Link href="/portfolio" className="hover:underline">
                                    View Architecture Portfolio &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Articles Section (Keeps users on-site & reduces bounce rate) */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Continue Reading
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Explore more actionable strategies and engineering architectures.
                                </p>
                            </div>
                            <Link 
                                href="/blog" 
                                className="hidden sm:inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline gap-1"
                            >
                                View all articles <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((related: any) => (
                                <Link 
                                    key={related.id || related.slug} 
                                    href={`/blog/${related.slug}`} 
                                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                >
                                    {related.cover_image ? (
                                        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <Image 
                                                src={related.cover_image} 
                                                alt={related.title} 
                                                fill 
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative h-44 w-full bg-gradient-to-br from-blue-600/15 to-indigo-600/15 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                                            <BookOpen className="w-10 h-10 text-blue-500/40" />
                                        </div>
                                    )}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                                            {related.category || 'Engineering'}
                                        </span>
                                        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
                                            {related.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-grow">
                                            {related.excerpt}
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                            Read article &rarr;
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 text-center sm:hidden">
                            <Link href="/blog" className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400">
                                View all articles &rarr;
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
