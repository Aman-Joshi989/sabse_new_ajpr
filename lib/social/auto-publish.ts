export async function syndicateBlogToSocials(blogData: {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  source: 'manual' | 'ai-autonomous';
}) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("⚠️ MAKE_WEBHOOK_URL is not set in environment. Skipping social auto-posting.");
    return false;
  }

  const postUrl = `https://ajprworld.com/blog/${blogData.slug}`;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: blogData.title,
        excerpt: blogData.excerpt,
        url: postUrl,
        image_url: blogData.coverImage || "https://ajprworld.com/og-image.jpg",
        source: blogData.source,
        timestamp: new Date().toISOString()
      }),
    });

    if (response.ok) {
      console.log(`✅ Successfully triggered social auto-poster for: ${blogData.title}`);
      return true;
    } else {
      console.error(`❌ Failed to trigger social auto-poster: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error("❌ Error triggering social webhook:", error);
    return false;
  }
}
