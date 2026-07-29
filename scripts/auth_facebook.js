const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = 3000;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const APP_ID = process.env.FACEBOOK_APP_ID;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;

if (!APP_ID || !APP_SECRET) {
  console.error('❌ FACEBOOK_APP_ID or FACEBOOK_APP_SECRET is missing in .env.local');
  process.exit(1);
}

app.get('/auth', (req, res) => {
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&config_id=1965618530898054`;
  console.log('➡️ Redirecting you to Facebook to approve permissions...');
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  
  if (!code) {
    return res.status(400).send('No code provided by Facebook.');
  }

  console.log('✅ Received authorization code from Facebook. Exchanging for tokens...');

  try {
    // 1. Exchange code for short-lived User Access Token
    const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${APP_SECRET}&code=${code}`;
    let response = await fetch(tokenUrl);
    let data = await response.json();
    
    if (data.error) throw new Error(data.error.message);
    const shortLivedToken = data.access_token;

    // 2. Exchange short-lived token for long-lived User Access Token
    console.log('🔄 Exchanging for long-lived token...');
    const longLivedUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${shortLivedToken}`;
    response = await fetch(longLivedUrl);
    data = await response.json();
    
    if (data.error) throw new Error(data.error.message);
    const longLivedToken = data.access_token;

    // 3. Get the user's Pages and their never-expiring Page Access Tokens
    console.log('📄 Fetching your Facebook Pages...');
    const pagesUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}`;
    response = await fetch(pagesUrl);
    data = await response.json();
    
    if (data.error) throw new Error(data.error.message);
    
    const pages = data.data;
    if (!pages || pages.length === 0) {
      return res.send('⚠️ We could not find any Facebook Pages associated with this account where you have admin access.');
    }

    // We will automatically use the first Page found
    const targetPage = pages[0];
    const pageId = targetPage.id;
    const pageToken = targetPage.access_token;

    console.log(`✅ Successfully generated Page Access Token for: ${targetPage.name}`);

    // 4. Save to .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace if exists, otherwise append
    if (envContent.includes('FACEBOOK_PAGE_ID=')) {
      envContent = envContent.replace(/FACEBOOK_PAGE_ID=.*/, `FACEBOOK_PAGE_ID=${pageId}`);
    } else {
      envContent += `\nFACEBOOK_PAGE_ID=${pageId}`;
    }
    
    if (envContent.includes('FACEBOOK_ACCESS_TOKEN=')) {
      envContent = envContent.replace(/FACEBOOK_ACCESS_TOKEN=.*/, `FACEBOOK_ACCESS_TOKEN=${pageToken}`);
    } else {
      envContent += `\nFACEBOOK_ACCESS_TOKEN=${pageToken}`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('💾 Tokens saved to .env.local!');

    res.send(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: green;">✅ Success!</h1>
          <p>Successfully generated a never-expiring Page Access Token for <strong>${targetPage.name}</strong>.</p>
          <p>The tokens have been automatically saved to your .env.local file.</p>
          <p>You can close this window and stop the script in your terminal.</p>
        </body>
      </html>
    `);
    
    setTimeout(() => {
      console.log('Shutting down server...');
      process.exit(0);
    }, 2000);

  } catch (error) {
    console.error('❌ Error during OAuth flow:', error.message);
    res.status(500).send('An error occurred. Check terminal for details.');
  }
});

app.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('🚀 Facebook OAuth Server is running!');
  console.log('======================================================');
  console.log(`1. Open your browser and go to: http://localhost:${PORT}/auth`);
  console.log('2. Log into Facebook and approve the permissions.');
  console.log('3. Come back here when you see the Success message!');
  console.log('======================================================\n');
});
