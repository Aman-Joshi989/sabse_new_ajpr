import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { createLLM } from "./llm-client";
import { searchTool } from "./tools/search";
import { z } from "zod";

// --- 1. Define State ---
export const BacklinkGraphAnnotation = Annotation.Root({
  targetUrl: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  seedKeyword: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  rawSearchResults: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  linkOpportunities: Annotation<any[]>({
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

export type BacklinkCrewState = typeof BacklinkGraphAnnotation.State;

// --- 2. Define Nodes (Agents) ---

/**
 * Agent 1: The Prospector
 * Uses SerpAPI to find the top ranking sites for the keyword (potential targets or competitors).
 */
async function prospectorNode(state: BacklinkCrewState) {
  console.log("🔍 [Prospector] Searching Google for backlink targets matching:", state.seedKeyword);
  
  // E.g., we search for the keyword, or we search for footprints like 'keyword + "write for us"'
  // We'll keep it broad and let the LLM deduce opportunities from top results
  const searchResults = await searchTool.invoke({ query: state.seedKeyword });
  
  return { 
    rawSearchResults: searchResults,
    status: "prospecting_complete"
  };
}

/**
 * Agent 2: The Opportunity Analyzer
 * Uses the LLM to deduce what kind of sites these are and generate outreach strategies.
 */
async function analyzerNode(state: BacklinkCrewState) {
  console.log("🧠 [OpportunityAnalyzer] Analyzing top domains for:", state.seedKeyword);
  
  const llm = createLLM(0.7).withStructuredOutput(z.object({
    opportunities: z.array(z.object({
      domainOrTitle: z.string(),
      siteType: z.enum(["Blog", "News", "Resource Page", "Directory", "Competitor", "Other"]),
      outreachAngle: z.string().describe("E.g., Guest post, broken link, or mention request"),
      pitchIdea: z.string().describe("A 1-sentence idea of what to pitch them in an email")
    }))
  }));
  
  const prompt = `You are a Master SEO Link Builder. 
  Our Client URL: "${state.targetUrl}"
  Target Keyword: "${state.seedKeyword}"
  
  Here is raw organic search data straight from Google (Top results for the keyword):
  ${state.rawSearchResults}
  
  Identify exactly 5-8 strong backlink outreach opportunities based on these results.
  If a result is a direct competitor, the outreach angle might be analyzing *their* backlinks (Skyscraper technique).
  If it's a blog/news site, pitch a guest post or expert quote.
  If it's a resource page, pitch adding our client's link.
  
  Be creative, actionable, and specific.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    linkOpportunities: response.opportunities,
    status: "analysis_complete" 
  };
}

/**
 * Agent 3: The Report Generator
 * Formats the findings into a beautiful Markdown report.
 */
async function reportGeneratorNode(state: BacklinkCrewState) {
  console.log("📝 [ReportGenerator] Drafting final Backlink Strategy report...");
  const llm = createLLM(0.5);
  
  const prompt = `You are an Outreach Director. 
  Client URL: "${state.targetUrl}"
  Keyword: "${state.seedKeyword}"
  
  Here are the deduced link-building opportunities:
  ${JSON.stringify(state.linkOpportunities, null, 2)}
  
  Write a highly actionable, professional Markdown report.
  Include:
  1. An Executive Summary (2 sentences).
  2. A visually appealing table of the Target Domains/Sites (Columns: Target Site, Site Type, Outreach Angle, Pitch Idea).
  3. One generic but highly converting Cold Email Template they can use to pitch these sites.
  
  Use emojis appropriately. Return ONLY valid Markdown.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    finalReportMarkdown: response.content as string,
    status: "report_complete" 
  };
}

// --- 3. Build the Graph ---
export const createBacklinkCrew = () => {
  const workflow = new StateGraph(BacklinkGraphAnnotation)
    .addNode("prospector", prospectorNode)
    .addNode("analyzer", analyzerNode)
    .addNode("reportGenerator", reportGeneratorNode)
    
    .addEdge(START, "prospector")
    .addEdge("prospector", "analyzer")
    .addEdge("analyzer", "reportGenerator")
    .addEdge("reportGenerator", END);

  return workflow.compile();
};
