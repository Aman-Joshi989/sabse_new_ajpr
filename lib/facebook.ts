export async function publishToFacebook(message: string, linkUrl?: string) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    throw new Error('FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN must be set in the environment variables.');
  }

  // Construct the Graph API URL for publishing a feed post
  const graphApiVersion = 'v19.0';
  const url = new URL(`https://graph.facebook.com/${graphApiVersion}/${pageId}/feed`);
  
  url.searchParams.append('message', message);
  if (linkUrl) {
    url.searchParams.append('link', linkUrl);
  }
  url.searchParams.append('access_token', accessToken);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Facebook Graph API Error:', data);
      throw new Error(data.error?.message || 'Failed to publish to Facebook');
    }

    console.log('Successfully published to Facebook. Post ID:', data.id);
    return data;
  } catch (error) {
    console.error('Error in publishToFacebook:', error);
    throw error;
  }
}
