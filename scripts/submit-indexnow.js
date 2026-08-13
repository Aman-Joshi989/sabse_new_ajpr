const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

async function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const SITEMAP_URL = 'https://ajprworld.com/sitemap.xml';
  const HOST = 'ajprworld.com';
  
  // To use IndexNow, you need to generate a key (e.g., a random UUID) 
  // and host it at https://ajprworld.com/<key>.txt 
  // You can create a file in the /public folder for this.
  const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'your-indexnow-key'; 
  
  if (INDEXNOW_KEY === 'your-indexnow-key') {
      console.warn("WARNING: No INDEXNOW_KEY provided. Please set the INDEXNOW_KEY environment variable. Example: export INDEXNOW_KEY=my-secret-key");
  }

  try {
    console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
    const xml = await fetchSitemap(SITEMAP_URL);
    
    // Naive regex to extract URLs from sitemap
    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
        urls.push(match[1]);
    }

    if (urls.length === 0) {
        console.log("No URLs found in the sitemap.");
        return;
    }

    console.log(`Found ${urls.length} URLs. Submitting to IndexNow...`);

    const data = JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls
    });

    const options = {
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`IndexNow Response Status: ${res.statusCode}`);
        res.on('data', d => process.stdout.write(d));
    });

    req.on('error', (error) => {
        console.error('Error submitting to IndexNow:', error);
    });

    req.write(data);
    req.end();

  } catch (err) {
      console.error("Failed to run IndexNow submission script:", err);
  }
}

run();
