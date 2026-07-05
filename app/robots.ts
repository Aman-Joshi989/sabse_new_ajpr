import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ajprworld.com'

  // Standard crawlers (Googlebot, Bingbot, etc.)
  const defaultRule = {
    userAgent: '*',
    allow: '/',
    disallow: ['/dashboard/', '/api/', '/_next/'],
  }

  // AI and Generative Engine bots (Important for GEO/AI citations)
  // If you want to block them instead, change allow to '/' and disallow to '/'
  const aiUserAgents = [
    'ChatGPT-User',
    'GPTBot',
    'OAI-SearchBot',
    'ClaudeBot',
    'anthropic-ai',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'CCBot',
    'Omgilibot'
  ]

  const aiRules = aiUserAgents.map((agent) => ({
    userAgent: agent,
    allow: '/',
    disallow: ['/dashboard/', '/api/', '/_next/'],
  }))

  return {
    rules: [defaultRule, ...aiRules],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
