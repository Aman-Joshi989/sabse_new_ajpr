import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { saveSeoContent } from '../lib/db/queries';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Use .env.local for Next.js

// Map the key for the AI SDK
if (process.env.GEMINI_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY;
}

const CITIES = [
  'Austin',
  'San Francisco',
  'London',
  'New York',
  'Toronto'
];

const SERVICES = [
  'Web Design',
  'SEO Optimization',
  'AI Automation'
];

async function generateContent(city: string, service: string) {
  console.log(`Generating content for ${service} in ${city}...`);
  
  const prompt = `
    You are an elite SEO copywriter. Write a high-converting landing page for a B2B agency offering ${service} in ${city}.
    The copy must be unique, mentioning local aspects of ${city} if possible, and highly focused on ROI.

    Return EXACTLY a JSON object with these keys (and no markdown formatting or backticks outside of the JSON string):
    {
      "h1_title": "Punchy H1 title including ${service} and ${city}",
      "hero_subtitle": "2 sentence subtitle focusing on ROI",
      "body_html": "3-4 paragraphs of HTML copy (using <h2>, <p>, <ul>) explaining why businesses in ${city} need this, and why our agency is the best choice. Keep it professional and persuasive.",
      "meta_title": "SEO Meta Title (max 60 chars)",
      "meta_description": "SEO Meta Description (max 155 chars)"
    }
  `;

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    // Clean up potential markdown code block wrappers
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanedText);

    const route = `/locations/${city.toLowerCase().replace(/ /g, '-')}/${service.toLowerCase().replace(/ /g, '-')}`;

    await saveSeoContent({
      route,
      city,
      service,
      h1_title: data.h1_title,
      hero_subtitle: data.hero_subtitle,
      body_html: data.body_html,
      meta_title: data.meta_title,
      meta_description: data.meta_description
    });

    console.log(`✅ Saved ${route}`);
  } catch (error) {
    console.error(`❌ Failed for ${service} in ${city}:`, error);
  }
}

async function run() {
  console.log("🚀 Starting Elite SEO Content Engine...");
  
  for (const city of CITIES) {
    for (const service of SERVICES) {
      await generateContent(city, service);
      // Slight delay to avoid rate limits
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  
  console.log("✅ All content generated and saved to DB.");
  process.exit(0);
}

run();
