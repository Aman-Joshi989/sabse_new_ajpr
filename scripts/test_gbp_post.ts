import { config } from 'dotenv';
config({ path: '.env.local' });
import { createLocalPost } from '../lib/gbp';

async function main() {
  console.log('Testing Google Business Profile Post Creation...');

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS is not set.');
    process.exit(1);
  }

  if (!process.env.GBP_ACCOUNT_ID || !process.env.GBP_LOCATION_ID) {
    console.error('❌ GBP_ACCOUNT_ID or GBP_LOCATION_ID is not set in .env.local');
    console.error('Run: node scripts/test_gbp.js to find them.');
    process.exit(1);
  }

  try {
    const title = 'Test Post Title';
    const summary = 'This is a test summary for our Google Business Profile post created via the API! Hello world!';
    const postUrl = 'https://example.com/test-post';

    console.log('Publishing post...');
    const result = await createLocalPost(title, summary, postUrl);
    
    console.log('✅ Post published successfully!');
    console.log(result);
  } catch (error: any) {
    console.error('❌ Failed to publish post:', error.message || error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

main();
