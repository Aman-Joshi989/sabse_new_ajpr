export async function triggerSocialSyndication(post: { title: string, url: string, excerpt: string }) {
  try {
    // Check if the user has a webhook URL set in environment variables
    const webhookUrl = process.env.SYNDICATION_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.warn("No SYNDICATION_WEBHOOK_URL provided. Skipping social syndication.");
      return { success: false, message: 'No webhook URL configured' };
    }

    const payload = {
      event: "new_blog_post",
      data: {
        title: post.title,
        url: post.url,
        excerpt: post.excerpt,
        social_snippet: `🚀 New Post: ${post.title}\n\n${post.excerpt}\n\nRead the full breakdown here: ${post.url} #AJPRWorld #Tech #Startup #SoftwareEngineering`,
        timestamp: new Date().toISOString()
      }
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Webhook failed with status ${response.status}`);
      return { success: false, message: `Webhook failed: ${response.status}` };
    }

    console.log("Successfully triggered social syndication webhook.");
    return { success: true };
  } catch (error) {
    console.error("Error triggering syndication webhook:", error);
    return { success: false, error };
  }
}
