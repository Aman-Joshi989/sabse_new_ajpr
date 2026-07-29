import { getBlogBySlug, getBlogs, getAffiliateLink } from '@/lib/db/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import { ArticleSchema } from '@/components/schema/ArticleSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { RelatedContent } from '@/components/RelatedContent';
import { AffiliateDisclosure } from '@/components/ui/AffiliateDisclosure';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import ShareButton from '@/components/ui/ShareButton';
import { getSeoMetadata } from "@/lib/db/queries";
import { TableOfContents } from '@/components/TableOfContents';
import ExitIntentPopup from '@/components/ExitIntentPopup';

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

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
  affiliate_product_slug?: string | null;
  amazon_asin?: string | null;
};

function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown.replace(/\r\n/g, '\n');

  // 1. Headings (## and ###)
  // Note: ID attributes will be added by TableOfContents component dynamically, or we could add them here
  html = html.replace(/^### (.*?)$/gm, '<h4 class="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-slate-100 text-left">$1</h4>');
  html = html.replace(/^## (.*?)$/gm, '<h3 class="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100 text-left">$1</h3>');
  html = html.replace(/^# (.*?)$/gm, '<h2 class="text-3xl font-bold mt-10 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2 text-slate-900 dark:text-slate-50 text-left">$1</h2>');

  // 2. Bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 3. Horizontal Rules (---)
  html = html.replace(/^---$/gm, '<hr class="my-8 border-slate-200 dark:border-slate-800" />');

  // 4. Bullet Lists (* items)
  html = html.replace(/^\*\s+(.*?)$/gm, '<li class="ml-6 list-disc mb-2 text-slate-800 dark:text-slate-200 text-left">$1</li>');

  // Wrap list items in <ul>
  html = html.replace(/(<li.*?>[\s\S]*?<\/li>\n?)+/g, (match) => {
    return `<ul class="my-6 space-y-2 list-disc pl-5">\n${match}</ul>\n`;
  });

  // 5. Links ([text](url))
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>');

  const SEO_KEYWORD_LINKS: Record<string, string> = {
    'web development': '/services/custom-web-development-ai-solutions',
    'custom software': '/services/custom-web-development-ai-solutions',
    'cloud architecture': '/services/business-ai-automation',
    'search engine optimization': '/services/ai-digital-marketing-services',
    'generative engine optimization': '/blog/what-is-geo-generative-engine-optimization',
    'saas': '/services/saas-product-development',
    'ui/ux': '/services/custom-web-development-ai-solutions'
  };

  // 6. Paragraphs
  const blocks = html.split(/\n\s*\n/);
  const parsedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<hr') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
      return trimmed;
    }
    
    let pContent = trimmed.replace(/\n/g, '<br />');
    
    // Auto-link SEO keywords (only if not already inside an HTML tag to prevent breaking hrefs)
    Object.entries(SEO_KEYWORD_LINKS).forEach(([keyword, url]) => {
      const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'i');
      pContent = pContent.replace(regex, `<a href="${url}" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold">$1</a>`);
    });

    return `<p class="leading-relaxed mb-6 text-slate-800 dark:text-slate-200 text-left">${pContent}</p>`;
  });
  
  return parsedBlocks.join('\n');
}

function getRobustMetaDescription(excerpt: string, content: string, minLen = 110, maxLen = 155): string {
  let desc = (excerpt || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  if (desc.length < minLen && content) {
      // Strip markdown/html from content to use as fallback text
      const cleanContent = content
          .replace(/[#*`_]/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      
      if (desc.length > 0 && !desc.endsWith('.')) {
          desc = desc + '. ' + cleanContent;
      } else if (desc.length > 0) {
          desc = desc + ' ' + cleanContent;
      } else {
          desc = cleanContent;
      }
  }

  if (desc.length <= maxLen && desc.length >= minLen) return desc;
  
  const sliced = desc.slice(0, maxLen - 3);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > maxLen * 0.7) {
      return desc.slice(0, lastSpace).trim() + '...';
  }
  return sliced.trim() + '...';
}

function getSeoTitle(title: string): string {
  const fullBrand = ' | AJPR World Blog';
  const shortBrand = ' | AJPR';
  const maxLen = 60;

  if ((title + fullBrand).length <= maxLen) {
    return title + fullBrand;
  }

  let baseTitle = title;
  if (title.includes(':')) {
    const parts = title.split(':');
    baseTitle = parts[0].trim();
  }

  if ((baseTitle + fullBrand).length <= maxLen) {
    return baseTitle + fullBrand;
  }

  if ((baseTitle + shortBrand).length <= maxLen) {
    return baseTitle + shortBrand;
  }

  const allowedLen = maxLen - shortBrand.length - 3;
  const sliced = baseTitle.slice(0, allowedLen);
  const lastSpace = sliced.lastIndexOf(' ');
  const truncated = lastSpace > allowedLen * 0.7 
    ? sliced.slice(0, lastSpace).trim() 
    : sliced.trim();

  return `${truncated}...${shortBrand}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const override = await getSeoMetadata(`/blog/${resolvedParams.slug}`);
  if (override) {
      return {
          title: override.title,
          description: override.description,
          openGraph: {
              title: override.title,
              description: override.description,
              url: `https://ajprworld.com/blog/${resolvedParams.slug}`,
              siteName: 'AJPR World',
              locale: 'en_US',
              type: 'article',
          }
      };
  }

  const blog = await getBlogBySlug(resolvedParams.slug) as BlogPost | undefined;
  if (!blog) return { title: 'Post Not Found' };

  const safeDesc = getRobustMetaDescription(blog.excerpt || '', blog.content || '');
  const seoTitle = getSeoTitle(blog.title);

  return {
    title: seoTitle,
    description: safeDesc,
    openGraph: {
      title: seoTitle,
      description: safeDesc,
      url: `https://ajprworld.com/blog/${resolvedParams.slug}`,
      siteName: 'AJPR World',
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(blog.created_at).toISOString(),
      authors: [blog.author || 'AJPR World'],
      images: blog.cover_image 
        ? [
            {
              url: blog.cover_image,
              width: 1200,
              height: 630,
              alt: blog.title,
            }
          ]
        : [
            {
              url: 'https://ajprworld.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: blog.title,
            }
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: safeDesc,
      creator: '@ajprworld',
      images: blog.cover_image ? [blog.cover_image] : ['https://ajprworld.com/og-image.jpg']
    },
    alternates: {
      canonical: `https://ajprworld.com/blog/${resolvedParams.slug}`,
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

  const allBlogs = await getBlogs();
  const relatedItems = allBlogs
    .filter((b: any) => b.slug !== resolvedParams.slug)
    .slice(0, 3)
    .map((b: any) => ({
      title: b.title,
      url: `/blog/${b.slug}`,
      excerpt: b.excerpt || 'Read this article to learn more.'
    }));

  let affiliateData = null;
  if (blog.amazon_asin) {
    // Algorithmic Amazon Data (Can be replaced with real PA-API later)
    affiliateData = {
      title: "Recommended Amazon Product",
      description: "Buy this highly-rated product directly from Amazon.",
      price: "Check Price on Amazon",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80",
      ctaUrl: `/amzn/${blog.amazon_asin}`,
      ctaText: "View on Amazon",
      pros: ["High Quality", "Prime Shipping", "Amazon Guarantee"],
      cons: ["Prices may vary"]
    };
  } else if (blog.affiliate_product_slug) {
    const dbLink = await getAffiliateLink(blog.affiliate_product_slug);
    if (dbLink) {
      affiliateData = {
        title: dbLink.title,
        description: dbLink.description || "Highly recommended product.",
        price: "Check Price",
        rating: 4.9,
        imageUrl: dbLink.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80",
        ctaUrl: `/go/${dbLink.slug}`,
        ctaText: "Get it Now",
        pros: ["Top Pick", "Tested & Verified"],
        cons: []
      };
    }
  }

  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Blog', item: 'https://ajprworld.com/blog' },
    { name: blog.title, item: `https://ajprworld.com/blog/${blog.slug}` }
  ];

  // Specific FAQs for GEO blog post to optimize for RAG citation
  const geoFaqs = [
    {
      question: "What is the difference between SEO and GEO?",
      answer: "Traditional SEO focuses on keywords and ranking pages in standard search engine results pages. GEO (Generative Engine Optimization) optimizes content structure, entity data, and authoritative citations so AI search systems like ChatGPT, Gemini, and Perplexity understand and cite your brand as the primary source."
    },
    {
      question: "What are the most important ranking factors for AI Search Engines?",
      answer: "Based on GEO research, the most critical retrieval factors include semantic relevance, authority signals, structured data schemas, source diversity, content freshness, and the inclusion of unique citable data such as statistics and expert quotes."
    },
    {
      question: "How can my business get cited in ChatGPT, Perplexity, and Gemini search?",
      answer: "To maximize AI citations, you must publish clear definitions of core concepts, provide original data with references, include structured tables, implement FAQ sections with schema markup, and ensure your website is fast and crawlable for AI user-agents."
    },
    {
      question: "Is traditional SEO still important in the age of AI?",
      answer: "Yes, traditional SEO provides the foundational domain authority, technical crawling readiness, and page structure that generative engines use to select reliable sources for their context window during RAG (Retrieval-Augmented Generation)."
    }
  ];

  const isGeoBlog = blog.slug === 'what-is-geo-generative-engine-optimization';

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema 
        title={blog.title}
        description={blog.excerpt}
        authorName={blog.author}
        datePublished={new Date(blog.created_at).toISOString()}
        image={blog.cover_image}
        url={`https://ajprworld.com/blog/${blog.slug}`}
      />
      {isGeoBlog && <FAQSchema faqs={geoFaqs} />}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 border-b border-slate-200 dark:border-slate-800">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors uppercase tracking-wider"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          AJPR World Blog
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
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-md relative">
            <Image 
              src={blog.cover_image} 
              alt={blog.title} 
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Main Content Layout with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Column */}
          <div className="lg:col-span-8">
            {/* Affiliate Disclosure - Required by FTC */}
            <AffiliateDisclosure />

            <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-12 mt-8 text-left">
                {blog.excerpt}
            </div>

            {/* Citable TL;DR Executive Summary (Optimized for AI RAG Citation) */}
            {isGeoBlog && (
              <div className="p-8 mb-12 bg-blue-50/50 dark:bg-blue-950/20 border-2 border-blue-500/20 rounded-2xl relative overflow-hidden backdrop-blur-sm text-left">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-lg font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2.5 animate-pulse" />
                  Executive Summary (TL;DR)
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mb-0">
                  Generative Engine Optimization (GEO) is defined as the strategic process of optimizing content so AI-powered retrieval systems (like Perplexity, ChatGPT, and Gemini AI Overviews) parse, prioritize, and cite your digital brand as an authoritative reference in their responses. Key components include structured FAQ data, semantic RAG formatting, citable statistics, and strong entity authority.
                </p>
              </div>
            )}
            
            <div 
              className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 prose-img:rounded-xl max-w-none text-slate-800 dark:text-slate-200"
              dangerouslySetInnerHTML={{ 
                __html: parseMarkdownToHtml(blog.content)
              }}
            />
            
            {/* Auto-Rendered Affiliate Product Card */}
            {affiliateData && (
              <div className="my-16">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-50 border-b border-slate-200 dark:border-slate-800 pb-2">
                  Our Top Recommendation
                </h3>
                <AffiliateProductCard 
                  productName={affiliateData.title}
                  rating={affiliateData.rating}
                  pros={affiliateData.pros}
                  cons={affiliateData.cons}
                  affiliateSlug={blog.affiliate_product_slug ?? undefined}
                  ctaUrl={affiliateData.ctaUrl}
                  buttonText={affiliateData.ctaText || affiliateData.price}
                  image={affiliateData.imageUrl}
                />
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <p className="text-slate-500 font-medium text-sm">Thanks for reading!</p>
              <ShareButton title={blog.title} />
            </div>

            {/* Semantic Internal Linking Silo */}
            <RelatedContent title="Related Articles" items={relatedItems} />
          </div>

          {/* Sidebar Column (Table of Contents) */}
          <aside className="hidden lg:block lg:col-span-4">
            <TableOfContents content={blog.content} />
          </aside>
        </div>
      </div>
      
      <ExitIntentPopup />
    </article>
  );
}
