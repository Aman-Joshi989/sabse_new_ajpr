import { MetadataRoute } from 'next'
import { getPublishedServices, getBlogs, getGlossaryTerms, getAllSeoRoutes } from '@/lib/db/queries'

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
      url: `${baseUrl}/demo-cpu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/demo-shining`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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
      url: `${baseUrl}/tools/ai-cost-estimator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
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
  ]

  // Programmatic local SEO pages for Uttarakhand
  const targetCities = [
    'haldwani', 'nainital', 'dehradun', 'roorkee', 'haridwar', 
    'rudrapur', 'kashipur', 'pantnagar', 'uttarakhand',
    'new-york', 'london', 'san-francisco', 'singapore', 'dubai', 
    'sydney', 'toronto', 'austin', 'chicago', 'boston'
  ];
  const targetServices = [
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
      servicePages = [...servicePages, ...baseServices];
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

  // Combine all routes
  return [...staticPages, ...servicePages, ...blogPages, ...glossaryPages, ...programmaticRoutes]
}
