import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://ajprworld.com'

  const aiUserAgents = [
    '*',
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

  const rules = aiUserAgents.map((agent) => ({
    userAgent: agent,
    allow: '/',
    disallow: ['/dashboard/', '/api/', '/login', '/_next/'],
  }))

  return {
    rules,
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
