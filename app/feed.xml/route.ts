import { getBlogs } from '@/lib/db/queries';
import { CORNERSTONE_BLOG_POSTS } from '@/lib/blog-data';

export const revalidate = 3600; // Cache for 1 hour to prevent DB drain

export async function GET() {
  let blogs: any[] = [];
  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error('Failed to fetch blogs for RSS feed', error);
  }

  // Ensure cornerstone articles are included in the RSS feed
  const combinedBlogs = [...blogs];
  for (const cp of CORNERSTONE_BLOG_POSTS) {
    if (!combinedBlogs.some(b => b.slug === cp.slug)) {
      combinedBlogs.unshift({
        slug: cp.slug,
        title: cp.title,
        excerpt: cp.excerpt,
        author: cp.author,
        created_at: cp.published_at,
      });
    }
  }

  const siteUrl = 'https://ajprworld.com';

  const rssItems = combinedBlogs
    .map((blog) => {
      const blogUrl = `${siteUrl}/blog/${blog.slug}`;
      const pubDate = new Date(blog.created_at).toUTCString();
      // Ensure description is properly escaped
      const description = (blog.excerpt || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      const title = (blog.title || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      return `
    <item>
      <title>${title}</title>
      <link>${blogUrl}</link>
      <guid>${blogUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${blog.author ? `<author>${blog.author}</author>` : ''}
    </item>`;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AJPR World Blog</title>
    <link>${siteUrl}</link>
    <description>Insights on software engineering, UI/UX design, cloud architecture, and digital branding from AJPR World.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
