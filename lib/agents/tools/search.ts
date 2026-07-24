import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Tool for the AI to query Google Search via SerpAPI.
 * Useful for keyword research, autocomplete, and competitor analysis.
 */
export const searchTool = new DynamicStructuredTool({
  name: "google_search_serpapi",
  description: "Searches Google using SerpAPI. Returns organic results, related searches, and 'people also ask' data.",
  schema: z.object({
    query: z.string().describe("The search query to look up on Google.")
  }),
  func: async ({ query }) => {
    try {
      const apiKey = process.env.SERPAPI_API_KEY;
      if (!apiKey) {
        return "Error: SERPAPI_API_KEY is not defined in the environment.";
      }

      const url = new URL('https://serpapi.com/search.json');
      url.searchParams.append('engine', 'google');
      url.searchParams.append('q', query);
      url.searchParams.append('api_key', apiKey);
      url.searchParams.append('num', '5'); // get top 5 organic results

      const response = await fetch(url.toString());
      if (!response.ok) {
        return `Failed to fetch search results. Status: ${response.status}`;
      }

      const data = await response.json();

      // Extract relevant SEO data
      const organicResults = data.organic_results?.map((res: any) => ({
        title: res.title,
        link: res.link,
        snippet: res.snippet
      })) || [];

      const relatedSearches = data.related_searches?.map((res: any) => res.query) || [];
      const relatedQuestions = data.related_questions?.map((res: any) => res.question) || [];

      return JSON.stringify({
        organicResults,
        relatedSearches,
        relatedQuestions
      });
    } catch (e: any) {
      return `Search error: ${e.message}`;
    }
  }
});
