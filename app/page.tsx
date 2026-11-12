import HomeClient from './HomeClient'
import { getPublishedServices, getSeoMetadata } from '@/lib/db/queries'
import { FAQSchema } from '@/components/schema/FAQSchema'
import { ItemListSchema } from '@/components/schema/ItemListSchema'
import { WebSiteSchema } from '@/components/schema/WebSiteSchema'
import { HOMEPAGE_FAQS } from '@/lib/homepage-faqs'
import type { Metadata } from 'next'

export const revalidate = 86400; // Cache for 24 hours (ISR) to protect Vercel free limits

export default async function HomePage() {
  let services: any[] = []

  try {
    // Only project minimal card fields to keep RSC payload lightweight (<150 KB target)
    const fetchedServices = await getPublishedServices()
    services = Array.isArray(fetchedServices)
      ? fetchedServices.slice(0, 3).map((s: any) => ({
          title: s.title,
          description: s.description,
          slug: s.slug,
          category: s.category,
          keywords: Array.isArray(s.keywords) ? s.keywords.slice(0, 4) : [],
        }))
      : []
  } catch (err) {
    console.error("Failed to fetch dynamic data for homepage:", err)
  }

  return (
    <>
      <WebSiteSchema />
      <FAQSchema faqs={HOMEPAGE_FAQS} />
      <ItemListSchema
        name="AJPR World Commercial Engineering Capabilities & Investment Benchmarks"
        description="Core digital engineering sprints, custom AI architectures, website cost calculators, and agency alternative evaluations by AJPR World."
        items={[
          {
            name: "Custom AI MVP Development Sprints",
            description: "Production-ready AI architectures and functional web MVPs delivered in 2 to 4 weeks with complete GitHub repository and IP transfer.",
            url: "https://ajprworld.com/ai-systems",
            position: 1,
          },
          {
            name: "Full-Stack Web Engineering & Next.js Systems",
            description: "Sub-second Next.js web applications, PostgreSQL architecture, custom API backends, and 99+ Core Web Vitals performance.",
            url: "https://ajprworld.com/services/web-development",
            position: 2,
          },
          {
            name: "Website Development Cost Calculator (2026)",
            description: "Interactive cost breakdown for web builds, comparing $3,500 SMB platforms against $20,000+ enterprise custom applications.",
            url: "https://ajprworld.com/pricing/website-cost",
            position: 3,
          },
          {
            name: "SEO & Generative Engine Optimization Retainers",
            description: "ROI-driven organic search and AI search engine citation retainers starting from $1,500/month for high-growth businesses.",
            url: "https://ajprworld.com/pricing/seo-cost",
            position: 4,
          },
          {
            name: "Website Maintenance & Security Cost Guide",
            description: "Transparent maintenance pricing ($149 – $899/mo) and 24/7 security SLA guarantees vs unpredictable emergency agency rates.",
            url: "https://ajprworld.com/services/website-maintenance-cost",
            position: 5,
          },
          {
            name: "Objective Agency Alternative Comparisons",
            description: "Independent evaluation matrix comparing Web Tonic and WebFX legacy retainer lock-ins with AJPR World modern engineering.",
            url: "https://ajprworld.com/compare",
            position: 6,
          },
          {
            name: "Rootstrap Alternatives: 2026 AI Product Studio Evaluation",
            description: "Comparing Rootstrap $50k–$150k enterprise quotes against AJPR World 2–4 week AI MVP sprints ($4,500) and Next.js 16 architectures.",
            url: "https://ajprworld.com/compare/rootstrap-alternatives",
            position: 7,
          },
          {
            name: "Altar.io Alternatives: 2026 Startup Studio Evaluation",
            description: "Evaluate Altar.io discovery workshops ($40k–$90k) against AJPR World 2–4 week production AI MVP delivery, full TypeScript stack, and zero discovery bloat.",
            url: "https://ajprworld.com/compare/altar-io-alternatives",
            position: 8,
          },
        ]}
      />
      <HomeClient 
        services={services} 
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let seo = null;
  try {
    seo = await getSeoMetadata('/');
  } catch (error) {
    console.error("Failed to fetch SEO metadata for homepage:", error);
  }

  const defaultTitle = 'AJPR World (AJPR) – Software, SEO & AI Studio (4.9★)';
  const defaultDesc = 'AJPR World (AJPR) is a senior software engineering and AI studio by Aman Joshi. Production Next.js apps, technical SEO & AI systems with 100% code ownership.';
  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDesc;

  return {
    metadataBase: new URL('https://ajprworld.com'),
    alternates: { canonical: 'https://ajprworld.com' },
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://ajprworld.com',
      siteName: 'AJPR World',
      type: 'website',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AJPR World - Custom AI MVPs & Scalable Software Engineering',
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['https://ajprworld.com/og-image.jpg'],
      creator: '@ajprworld',
      site: '@ajprworld',
    }
  };
}
