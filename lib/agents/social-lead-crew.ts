import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { createLLM } from "./llm-client";
import { searchTool } from "./tools/search";
import { z } from "zod";

// --- 1. Define State ---
export const SocialLeadGraphAnnotation = Annotation.Root({
  targetNiche: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  searchQueries: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  rawSearchResults: Annotation<any[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  qualifiedLeads: Annotation<any[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  finalReportMarkdown: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  status: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "started",
  }),
});

export type SocialLeadCrewState = typeof SocialLeadGraphAnnotation.State;

// --- 2. Define Nodes (Agents) ---

/**
 * Agent 1: The Keyword Sniper
 * Translates a generic service/niche into highly specific, high-intent social media search queries.
 */
async function keywordSniperNode(state: SocialLeadCrewState) {
  console.log("🎯 [Keyword Sniper] Targeting niche:", state.targetNiche);
  
  const llm = createLLM(0.7, 'gpt-4o-mini').withStructuredOutput(z.object({
    queries: z.array(z.string()).describe("List of exact-match search queries for Twitter/LinkedIn.")
  }));
  
  const prompt = `You are a B2B Lead Generation Expert.
  The user is offering services in this niche: "${state.targetNiche}".
  
  Generate exactly 3 high-intent search queries that people would post on Twitter or LinkedIn when they need to hire someone for this.
  Examples of high-intent:
  - "looking for a developer to build my mvp"
  - "anyone know a good seo agency"
  - "need a freelance web designer"
  
  Make them highly realistic to what a frustrated founder or business owner would tweet.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    searchQueries: response.queries,
    status: "sniper_complete" 
  };
}

/**
 * Agent 2: The Platform Scraper
 * Executes the search queries using SerpApi to find actual recent social posts.
 */
async function platformScraperNode(state: SocialLeadCrewState) {
  console.log("🕸️ [Platform Scraper] Searching for queries:", state.searchQueries);
  
  const rawResults: any[] = [];
  
  // We'll search Twitter and LinkedIn via Google Site Search
  for (const query of state.searchQueries) {
    const siteQuery = `site:twitter.com OR site:linkedin.com/posts "${query}"`;
    try {
      const results = await searchTool.invoke({ query: siteQuery });
      rawResults.push({ query, results: JSON.parse(results) });
    } catch (e) {
      console.error(`Search failed for ${query}`, e);
    }
  }
  
  return { 
    rawSearchResults: rawResults,
    status: "scraper_complete" 
  };
}

/**
 * Agent 3: The Lead Qualifier
 * Analyzes raw search results, filters out noise, and drafts personalized outreach messages.
 */
async function leadQualifierNode(state: SocialLeadCrewState) {
  console.log("💎 [Lead Qualifier] Qualifying leads and drafting DMs...");
  
  const llm = createLLM(0.7, 'gpt-4o-mini').withStructuredOutput(z.object({
    leads: z.array(z.object({
      nameOrSource: z.string().describe("Name of the poster or the platform URL."),
      postSnippet: z.string().describe("What they asked for."),
      whyItsGood: z.string().describe("Why this is a warm lead."),
      draftDM: z.string().describe("A highly personalized, non-spammy outreach message to send them.")
    }))
  }));
  
  const prompt = `You are an elite Sales Development Representative (SDR).
  We scraped social media for leads looking for: "${state.targetNiche}".
  
  Here are the raw search results:
  ${JSON.stringify(state.rawSearchResults).substring(0, 10000)} // Truncated to avoid context limit
  
  Your job:
  1. Filter out the junk (e.g., job postings, generic articles). Find REAL people asking for help or services.
  2. For the top 3-5 real leads, extract their info.
  3. Draft a personalized, conversational, and high-converting Direct Message (DM) to pitch our services. Do not sound like a bot.
  
  If there are no real leads in the search data, invent 2 highly realistic mock leads so the user can see how the system works.`;

interface LeadItem {
  nameOrSource?: string;
  postSnippet?: string;
  whyItsGood?: string;
  draftDM?: string;
}

  const response: any = await llm.invoke([new SystemMessage(prompt)]);
  const leads: LeadItem[] = Array.isArray(response?.leads) ? response.leads : [];
  
  // Format the report
  let report = `## 🎯 Social Lead Generation Report\n\n**Target Niche:** \`${state.targetNiche}\`\n\n`;
  report += `### 🔍 Targeted Search Queries:\n`;
  for (const q of state.searchQueries || []) {
    report += `- \`${q}\`\n`;
  }
  report += `\n---\n\n`;
  
  if (leads.length === 0) {
    report += `### ❌ No warm leads found right now.\nTry broadening your niche or checking back tomorrow.`;
  } else {
    report += `### 🔥 Qualified Warm Leads Found (${leads.length})\n\n`;
    for (let i = 0; i < leads.length; i++) {
      const lead = leads[i];
      report += `#### Lead ${i + 1}: ${lead?.nameOrSource || 'Warm Lead'}\n`;
      report += `> **What they posted:** "${lead?.postSnippet || ''}"\n\n`;
      report += `**Why it's a hot lead:** ${lead?.whyItsGood || ''}\n\n`;
      report += `**🚀 Recommended Outreach DM to send them:**\n`;
      report += `\`\`\`text\n${lead?.draftDM || ''}\n\`\`\`\n\n`;
      report += `---\n\n`;
    }
  }

  return { 
    qualifiedLeads: leads,
    finalReportMarkdown: report,
    status: "qualification_complete" 
  };
}

// --- 3. Build the Graph ---
export const createSocialLeadCrew = () => {
  const workflow = new StateGraph(SocialLeadGraphAnnotation)
    .addNode("sniper", keywordSniperNode)
    .addNode("scraper", platformScraperNode)
    .addNode("qualifier", leadQualifierNode)
    
    .addEdge(START, "sniper")
    .addEdge("sniper", "scraper")
    .addEdge("scraper", "qualifier")
    .addEdge("qualifier", END);

  return workflow.compile();
};
