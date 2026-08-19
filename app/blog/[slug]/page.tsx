import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Script from 'next/script';
import { getBlogBySlug } from '@/lib/db/queries';
import { cleanMetaTitle, cleanMetaDescription } from '@/app/layout';

export const revalidate = 3600; // ISR: Revalidate every hour

function injectInternalLinks(markdown: string) {
    const links: Record<string, string> = {
        'Custom AI': '/services/business-ai-automation',
        'MVP': '/services/startup-mvp-development',
        'Web Development': '/services/web-development',
        'Software Engineering': '/services/saas-product-development',
        'UI/UX': '/services/graphics-branding',
        'Cloud': '/services/cloud-devops-services',
        'AI Automation': '/services/business-ai-automation',
    };

    let modified = markdown;
    for (const [keyword, url] of Object.entries(links)) {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
        const parts = modified.split(/(\\[[^\\]]+\\]\\([^)]+\\))/);

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0 && regex.test(parts[i])) {
                parts[i] = parts[i].replace(regex, `[$1](${url})`);
                break; // Only link first occurrence for SEO best practices
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

    return {
        alternates: { canonical: `https://ajprworld.com/blog/${params.slug}` },
        title: cleanTitle,
        description: cleanDesc,
        keywords: post.keywords,
        openGraph: {
            title: cleanTitle,
            description: cleanDesc,
            type: 'article',
            publishedTime: post.published_at.toISOString(),
            url: `https://ajprworld.com/blog/${post.slug}`,
            images: [
                {
                    url: post.image_url || 'https://ajprworld.com/og-image.jpg',
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
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description,
        datePublished: post.published_at.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'AJPR World',
            url: 'https://ajprworld.com'
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
        <article className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-6 md:px-12">
            {/* Inject JSON-LD Schema for Google SEO */}
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
                <header className="mb-10 pb-10 border-b border-slate-200 dark:border-slate-800 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        {post.title}
                    </h1>
                    <time className="text-sm font-medium text-slate-500 uppercase tracking-widest">
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </time>
                </header>

                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-500">
                    <ReactMarkdown components={{ h1: 'h2' }}>{injectInternalLinks(post.content)}</ReactMarkdown>
                </div>

                <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <a href="/contact" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                        Build your Custom AI MVP today
                    </a>
                </footer>
            </div>
        </article>
    );
}
