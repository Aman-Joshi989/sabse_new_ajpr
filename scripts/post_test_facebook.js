require('dotenv').config({ path: '.env.local' });

async function runTestPost() {
  console.log('Initiating LIVE test post to Facebook Graph API...');

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    console.error('Missing credentials.');
    process.exit(1);
  }

  const message = "🚀 Testing our new custom backend automation for AJPR World! Direct API connection successful. No watermarks here!";
  const graphApiVersion = 'v19.0';
  const url = new URL(`https://graph.facebook.com/${graphApiVersion}/${pageId}/feed`);
  
  url.searchParams.append('message', message);
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
      console.error('❌ Facebook API Error:', data);
      process.exit(1);
    }

    console.log('✅ TEST POST SUCCESSFUL!');
    console.log(`Post ID: ${data.id}`);
    
    // The Post ID is usually formatted as {page_id}_{post_id}
    const parts = data.id.split('_');
    if (parts.length === 2) {
      console.log(`\nView your post here: https://facebook.com/${parts[0]}/posts/${parts[1]}`);
    }
  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

runTestPost();
