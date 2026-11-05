import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ajprworld.com'
  const disallowedPaths = [
    '/dashboard/',
    '/api/',
    '/_next/',
    '/login',
    '/careers/apply',
    '/admin/',
    '/book-call?*',
  ]

  // Standard search engine crawlers (Googlebot, Bingbot, Applebot, DuckDuckGo)
  const standardCrawlers = [
    '*',
    'Googlebot',
    'Bingbot',
    'Applebot',
    'DuckDuckBot',
    'YandexBot',
  ]

  // Generative Engine & AI Search Bots (Crucial for GEO / conversational LLM citations)
  const aiCrawlers = [
    'ChatGPT-User',
    'GPTBot',
    'OAI-SearchBot',
    'ClaudeBot',
    'anthropic-ai',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'CCBot',
    'cohere-ai',
    'Meta-ExternalAgent',
    'Omgilibot',
    'Diffbot',
  ]

  const rules = [
    ...standardCrawlers.map((agent) => ({
      userAgent: agent,
      allow: '/',
      disallow: disallowedPaths,
    })),
    ...aiCrawlers.map((agent) => ({
      userAgent: agent,
      allow: '/',
      disallow: disallowedPaths,
    })),
  ]

  return {
    rules,
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
