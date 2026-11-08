import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import * as cheerio from "cheerio";

/**
 * Tool for the AI to scrape textual content from a given URL to analyze competitors or find backlinks.
 */
export const webScraperTool = new DynamicStructuredTool({
  name: "scrape_web_page",
  description: "Scrapes the main text content, headers, and title from a given URL. Useful for competitor analysis.",
  schema: z.object({
    url: z.string().describe("The full URL of the webpage to scrape.")
  }),
  func: async ({ url }: { url: string }) => {
    try {
      let targetUrl = url.trim();
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
      }
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        redirect: 'follow',
      });
      
      if (!response.ok) {
        return `Failed to fetch ${url}. Status: ${response.status}`;
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Remove scripts, styles, etc.
      $('script, style, noscript, iframe, img, svg').remove();
      
      const title = $('title').text().trim();
      const metaDesc = $('meta[name="description"]').attr('content') || '';
      
      // Extract headers
      const headers: string[] = [];
      $('h1, h2, h3').each((_, el) => {
        headers.push($(el).text().trim());
      });
      
      const mainText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 5000); // Limit length
      
      return JSON.stringify({
        title,
        metaDescription: metaDesc,
        headers: headers.slice(0, 10), // Limit headers
        contentSnippet: mainText
      });
    } catch (e: any) {
      return `Scraping error: ${e.message}`;
    }
  }
});
