const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing Google Business Profile API connection...');
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('❌ GOOGLE_APPLICATION_CREDENTIALS is not set.');
    console.error('Please download your Service Account JSON file from Google Cloud Console and set the path in .env.local');
    process.exit(1);
  }

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/business.manage'],
    });

    const client = await auth.getClient();
    console.log('✅ Authentication successful! Service account is working.');

    // Test listing accounts
    const accountsUrl = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts';
    const accounts = await client.request({ url: accountsUrl });
    console.log('✅ Accounts retrieved:', accounts.data.accounts?.map(a => a.name) || 'None found');
    
    if (accounts.data.accounts && accounts.data.accounts.length > 0) {
      console.log('\nIMPORTANT: Add this account ID to your .env.local as GBP_ACCOUNT_ID:');
      const accountId = accounts.data.accounts[0].name.split('/')[1];
      console.log(`GBP_ACCOUNT_ID=${accountId}`);
      
      // Try to list locations
      const locationsUrl = `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId}/locations`;
      const locations = await client.request({
        url: locationsUrl,
        params: { readMask: 'name' }
      });
      
      if (locations.data.locations && locations.data.locations.length > 0) {
        console.log('\nIMPORTANT: Add this location ID to your .env.local as GBP_LOCATION_ID:');
        const locationId = locations.data.locations[0].name.split('/')[3];
        console.log(`GBP_LOCATION_ID=${locationId}`);
      } else {
        console.log('⚠️ No locations found under this account. Make sure your service account is added as a manager to your Google Business Profile.');
      }
    }
  } catch (error) {
    console.error('❌ API Test Failed:');
    if (error.response && error.response.data) {
      console.error('Exact Google API Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

testConnection();
