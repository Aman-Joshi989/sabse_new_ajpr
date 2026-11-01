import { MetadataRoute } from 'next'
import { getPublishedServices, getBlogs, getGlossaryTerms, getAllSeoRoutes } from '@/lib/db/queries'
import { PROGRAMMATIC_SOLUTIONS } from '@/lib/solutions-data'

export const revalidate = 86400; // Cache for 24 hours to prevent SEO bots from draining Neon DB compute

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ajprworld.com'

  // Define static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-systems`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/startup-growth-kit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/demo-ruflo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chat-agents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aman-joshi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/affiliates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    {
      url: `${baseUrl}/book-call`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/free-audit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/signup/client`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup/developer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/client-response-generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/admin-cost-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/saas-bloat-audit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/ai-cost-estimator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/action-figure-generator`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roofing-contractors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/network-search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/services/cloud-solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/digital-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/graphics-branding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/web-development`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/geo-optimization`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing/seo-cost`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing/ppc-cost`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing/website-cost`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries/home-services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries/saas-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries/healthcare-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries/ecommerce-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/platforms/shopify-seo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/platforms/webflow-agency`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/compare/webfx-alternatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare/webtonic-alternatives`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/agency-pricing-calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/research/agency-pricing-report`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog/marketing-strategy-consulting-how-to-choose-a-provider`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/marketing-strategy-consultant-cost-rates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/b2b-marketing-strategy-in-house-vs-agency-vs-consultant`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/best-b2b-growth-marketing-agencies-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/website-security-maintenance`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/technical-seo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Programmatic local SEO pages for US Metros, Global Hubs, and Regional Hubs
  const targetCities = [
    'austin', 'denver', 'phoenix', 'charlotte', 'tampa', 'nashville', 
    'dallas', 'atlanta', 'miami', 'chicago', 'boston', 'seattle',
    'new-york', 'san-francisco', 'london', 'toronto', 'sydney', 'dubai', 'singapore',
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 
    'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand'
  ];
  const targetServices = [
    'seo-agency', 'ppc-agency', 'web-design', 'digital-marketing', 'social-media-marketing',
    'custom-software', 'web-development', 'app-development', 'ai-solutions', 'cloud-architecture'
  ];
  
  const localServices: MetadataRoute.Sitemap = [];
  for (const city of targetCities) {
    for (const service of targetServices) {
      localServices.push({
        url: `${baseUrl}/locations/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  let servicePages: MetadataRoute.Sitemap = [...localServices];
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    // Fetch dynamic services from Neon database
    const services = await getPublishedServices();
    if (Array.isArray(services)) {
      // Standard service pages
      const baseServices: MetadataRoute.Sitemap = services.map((service: any) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.created_at ? new Date(service.created_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      // Programmatic service location pages for global tech hubs
      const globalHubs = ['new-york', 'london', 'san-francisco', 'singapore', 'dubai'];
      const locationServicePages: MetadataRoute.Sitemap = [];
      for (const service of services) {
        for (const city of globalHubs) {
          locationServicePages.push({
            url: `${baseUrl}/services/${service.slug}/${city}`,
            lastModified: service.created_at ? new Date(service.created_at) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          });
        }
      }

      servicePages = [...servicePages, ...baseServices, ...locationServicePages];
    }
  } catch (error) {
    console.error('Error fetching services for sitemap:', error)
  }

  try {
    // Fetch dynamic blogs from Neon database
    const blogs = await getBlogs()
    if (Array.isArray(blogs)) {
      blogPages = blogs.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.created_at ? new Date(blog.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error)
  }

  let glossaryPages: MetadataRoute.Sitemap = []
  try {
    const terms = await getGlossaryTerms()
    if (Array.isArray(terms)) {
      glossaryPages = terms.map((term: any) => ({
        url: `${baseUrl}/glossary/${term.slug}`,
        lastModified: term.created_at ? new Date(term.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    }
  } catch (error) {
    console.error('Error fetching glossary terms for sitemap:', error)
  }

  // 4. Fetch AI Programmatic SEO Location Routes
  let programmaticRoutes: MetadataRoute.Sitemap = [];
  try {
    const seoRoutes = await getAllSeoRoutes();
    programmaticRoutes = seoRoutes.map((r: any) => ({
      url: `${baseUrl}${r.route}`,
      lastModified: r.updated_at,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch programmatic SEO routes for sitemap", error);
  }

  // 5. High-Intent Programmatic Tech Stack & Solution Pages
  const solutionPages: MetadataRoute.Sitemap = Object.keys(PROGRAMMATIC_SOLUTIONS).map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Combine all routes
  return [...staticPages, ...servicePages, ...solutionPages, ...blogPages, ...glossaryPages, ...programmaticRoutes]
}
