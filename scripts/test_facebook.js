require('dotenv').config({ path: '.env.local' });

async function testFacebookConnection() {
  console.log('Testing Facebook Graph API Connection...');

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    console.error('❌ FACEBOOK_PAGE_ID or FACEBOOK_ACCESS_TOKEN is missing in .env.local.');
    console.error('Please generate a Page Access Token from the Facebook Developer Portal.');
    process.exit(1);
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}?access_token=${accessToken}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Authentication failed:');
      console.error(data.error.message);
      process.exit(1);
    }

    console.log('✅ Authentication successful! Successfully connected to Facebook Page:');
    console.log(`Page Name: ${data.name}`);
    console.log(`Page ID: ${data.id}`);
    
    console.log('\nYou are now ready to post directly to Facebook without watermarks!');
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

testFacebookConnection();
