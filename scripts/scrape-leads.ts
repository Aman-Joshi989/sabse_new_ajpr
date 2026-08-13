import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { sql } from '../lib/db/queries';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const TARGET_SEARCH = "roofing companies in texas";

async function scrapeLeads() {
  console.log(`🚀 Starting Elite Lead Hunter for: "${TARGET_SEARCH}"`);
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // We'll scrape a public directory or search engine.
  // Using a Google search URL to find websites
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(TARGET_SEARCH)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });
  
  const html = await page.content();
  const $ = cheerio.load(html);
  
  const potentialLeads: { name: string; url: string }[] = [];
  
  // Find organic search results
  $('div.g').each((i, el) => {
    const title = $(el).find('h3').text();
    const link = $(el).find('a').attr('href');
    
    if (title && link && !link.includes('google.com') && !link.includes('yelp.com') && !link.includes('bbb.org')) {
      potentialLeads.push({ name: title, url: link });
    }
  });

  console.log(`Found ${potentialLeads.length} potential businesses. Deep scanning for emails...`);

  let addedLeads = 0;

  for (const lead of potentialLeads.slice(0, 5)) { // Limit to 5 for demo
    console.log(`Scanning ${lead.name} (${lead.url})...`);
    try {
      const leadPage = await browser.newPage();
      // Abort resources to speed up scraping
      await leadPage.setRequestInterception(true);
      leadPage.on('request', (req) => {
        if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
          req.abort();
        } else {
          req.continue();
        }
      });

      await leadPage.goto(lead.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const pageText = await leadPage.evaluate(() => document.body.innerText);
      
      // Elite Regex for finding emails
      const emailMatch = pageText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      
      if (emailMatch && emailMatch.length > 0) {
        // Filter out generic emails like info@ or sales@ if possible, or just take the first
        const email = emailMatch[0].toLowerCase();
        
        console.log(`✅ Found email: ${email} for ${lead.name}`);

        // Insert into the CRM!
        await sql`
          INSERT INTO sales_leads (name, email, company_size, budget, tech_stack, status, utm_source, utm_medium, utm_campaign)
          VALUES (
            ${lead.name}, 
            ${email}, 
            'Unknown', 
            '$0', 
            'Unknown', 
            'new', 
            'cold-outreach', 
            'scraper', 
            'roofing-texas'
          )
          ON CONFLICT DO NOTHING
        `;
        addedLeads++;
      } else {
        console.log(`❌ No email found on homepage for ${lead.name}`);
      }
      await leadPage.close();
    } catch (e) {
      console.log(`⚠️ Failed to scan ${lead.name}`);
    }
  }

  await browser.close();
  console.log(`✅ Autonomous Hunter finished. Added ${addedLeads} new leads to the CRM.`);
  process.exit(0);
}

scrapeLeads().catch(console.error);
