import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Script from 'next/script';
import { Client } from 'pg';

export const revalidate = 3600; // ISR: Revalidate every hour

function injectInternalLinks(markdown: string) {
    const links: Record<string, string> = {
        'Custom AI': '/services/ai-solutions',
        'MVP': '/services/custom-software',
        'Web Development': '/services/web-development',
        'Software Engineering': '/services/custom-software',
        'UI/UX': '/services/ui-ux-design',
        'Cloud': '/services/cloud-architecture',
        'AI Automation': '/services/ai-solutions',
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
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    
    const res = await client.query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
    await client.end();

    if (res.rows.length === 0) return null;
    return res.rows[0];
}

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPost(params.slug);
    
    if (!post) return { title: 'Not Found' };

    return {
        title: post.title,
        description: post.meta_description,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: post.meta_description,
            type: 'article',
            publishedTime: post.published_at.toISOString(),
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
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
                    <ReactMarkdown>{injectInternalLinks(post.content)}</ReactMarkdown>
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
