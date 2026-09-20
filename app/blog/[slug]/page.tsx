import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import { getBlogBySlug, getBlogs } from '@/lib/db/queries';
import { cleanMetaTitle, cleanMetaDescription } from '@/app/layout';
import { constructEnterpriseMetadata } from '@/lib/seo';
import BlogArticleClient from './BlogArticleClient';

export const revalidate = 3600; // ISR: Revalidate every hour

function injectInternalLinks(markdown: string) {
    if (!markdown) return '';
    const links: Record<string, string> = {
        'SEO Retainer': '/pricing/seo-cost',
        'SEO Pricing': '/pricing/seo-cost',
        'PPC Management': '/pricing/ppc-cost',
        'Website Cost': '/pricing/website-cost',
        'WebFX Alternatives': '/compare/webfx-alternatives',
        'Generative Engine Optimization': '/services/geo-optimization',
        'GEO': '/services/geo-optimization',
        'Shopify SEO': '/platforms/shopify-seo',
        'Webflow Agency': '/platforms/webflow-agency',
        'Agency Pricing Calculator': '/tools/agency-pricing-calculator',
        'Agency Pricing Report': '/research/agency-pricing-report',
        'Digital Marketing': '/services/digital-marketing',
    };

    let modified = markdown;
    for (const [keyword, url] of Object.entries(links)) {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
        const parts = modified.split(/(\[[^\]]+\]\([^)]+\))/);

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0 && regex.test(parts[i])) {
                parts[i] = parts[i].replace(regex, `[$1](${url})`);
                break;
            }
        }
        modified = parts.join('');
    }

    return modified;
}

function extractHeadings(markdown: string) {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2].trim().replace(/\*\*/g, '');
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        headings.push({ level, text, id });
    }
    return headings;
}

import { getCornerstonePost, CORNERSTONE_BLOG_POSTS } from '@/lib/blog-data';

async function getPost(slug: string) {
    const dbPost = await getBlogBySlug(slug).catch(() => null);
    if (dbPost) return dbPost;
    return getCornerstonePost(slug) || null;
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const post = await getPost(params.slug);

    if (!post) {
        return constructEnterpriseMetadata({
            path: `/blog/${params.slug}`,
            defaultTitle: 'Article Not Found | AJPR World',
            defaultDesc: 'The requested engineering and growth article could not be found on AJPR World.',
            noIndex: true,
        });
    }

    const publishedTime = post.published_at 
        ? new Date(post.published_at).toISOString() 
        : new Date().toISOString();

    return constructEnterpriseMetadata({
        path: `/blog/${post.slug}`,
        title: post.title ? `${post.title} | AJPR World` : 'Growth Insights | AJPR World',
        description: post.meta_description || post.excerpt,
        defaultTitle: `${post.title || 'Growth Strategy Guide'} | AJPR World`,
        defaultDesc: `Read ${post.title}: actionable insights, engineering blueprints, and growth playbooks by AJPR World.`,
        image: post.image_url || post.cover_image || 'https://ajprworld.com/og-image.jpg',
        type: 'article',
        publishedTime,
        authors: post.author ? [post.author] : ['Aman Joshi'],
    });
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

    const updatedDate = post.updated_at 
        ? new Date(post.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : formattedDate;

    const content = post.content || '';
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(3, Math.ceil(wordCount / 220));

    // Extract headings for interactive Table of Contents
    const headings = extractHeadings(content);
    const contentWithLinks = injectInternalLinks(content);

    // Get 3 related articles combining DB posts and cornerstone articles
    const combinedBlogs = [
        ...CORNERSTONE_BLOG_POSTS,
        ...((allBlogs || []) as any[])
    ];
    const seenSlugs = new Set([params.slug]);
    const relatedPosts: any[] = [];
    for (const b of combinedBlogs) {
        if (!seenSlugs.has(b.slug)) {
            seenSlugs.add(b.slug);
            relatedPosts.push(b);
            if (relatedPosts.length >= 3) break;
        }
    }

    const articleUrl = `https://ajprworld.com/blog/${post.slug}`;
    const shareText = encodeURIComponent(`Read "${post.title}" by @ajprworld:`);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description || post.excerpt,
        datePublished: new Date(publishedDate).toISOString(),
        dateModified: new Date(post.updated_at || publishedDate).toISOString(),
        author: {
            '@type': 'Person',
            name: post.author || 'Aman Joshi',
            url: 'https://ajprworld.com/aman-joshi'
        },
        editor: {
            '@type': 'Person',
            name: 'Zahra Sanati'
        },
        publisher: {
            '@type': 'Organization',
            name: 'AJPR World',
            url: 'https://ajprworld.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://ajprworld.com/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl
        }
    };

    return (
        <>
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <BlogArticleClient
                post={post}
                contentWithLinks={contentWithLinks}
                headings={headings}
                formattedDate={formattedDate}
                updatedDate={updatedDate}
                readingTime={readingTime}
                articleUrl={articleUrl}
                shareText={shareText}
                relatedPosts={relatedPosts}
            />
        </>
    );
}
