import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { createLLM } from "./llm-client";
import { searchTool } from "./tools/search";
import { z } from "zod";

// --- 1. Define State ---
export const KeywordGraphAnnotation = Annotation.Root({
  seedTopic: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  targetAudience: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "General",
  }),
  rawSearchResults: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  keywordIdeas: Annotation<any[]>({
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

export type KeywordCrewState = typeof KeywordGraphAnnotation.State;

// --- 2. Define Nodes (Agents) ---

/**
 * Agent 1: The Search Explorer
 * Uses SerpAPI to find real-world related searches and competitors.
 */
async function searchExplorerNode(state: KeywordCrewState) {
  console.log("🔍 [SearchExplorer] Querying Google for:", state.seedTopic);
  
  const searchResults = await searchTool.invoke({ query: state.seedTopic });
  
  return { 
    rawSearchResults: searchResults,
    status: "search_complete"
  };
}

/**
 * Agent 2: The Intent Analyzer & Strategist
 * Uses the LLM to categorize the raw data into actionable SEO keywords.
 */
async function intentAnalyzerNode(state: KeywordCrewState) {
  console.log("🧠 [IntentAnalyzer] Analyzing search data for:", state.seedTopic);
  
  const llm = createLLM(0.7, 'gpt-4o-mini').withStructuredOutput(z.object({
    keywords: z.array(z.object({
      keyword: z.string(),
      intent: z.enum(["Informational", "Navigational", "Commercial", "Transactional"]),
      competitionLevel: z.enum(["Low", "Medium", "High"]).describe("Estimated competition based on context"),
      whyTarget: z.string().describe("Why this keyword is valuable for the target audience")
    }))
  }));
  
  const prompt = `You are a Master SEO Strategist. 
  Seed Topic: "${state.seedTopic}"
  Target Audience: "${state.targetAudience}"
  
  Here is raw search data straight from Google (Top results, Related Searches, People Also Ask):
  ${state.rawSearchResults}
  
  Extract and generate exactly 8 highly valuable keywords (a mix of short-tail and long-tail). 
  For each keyword, determine its search intent, estimate the SEO competition level, and provide a 1-sentence rationale on why we should target it.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    keywordIdeas: response.keywords,
    status: "analysis_complete" 
  };
}

/**
 * Agent 3: The Report Generator
 * Formats the findings into a beautiful Markdown report.
 */
async function reportGeneratorNode(state: KeywordCrewState) {
  console.log("📝 [ReportGenerator] Drafting final SEO report...");
  const llm = createLLM(0.5);
  
  const prompt = `You are an SEO Content Director. 
  Topic: "${state.seedTopic}"
  Audience: "${state.targetAudience}"
  
  Here are the analyzed keywords:
  ${JSON.stringify(state.keywordIdeas, null, 2)}
  
  Write a comprehensive, professional, and visually appealing Markdown report.
  Include:
  1. An Executive Summary (2 sentences).
  2. A visually appealing table of the Target Keywords (Columns: Keyword, Intent, Competition, Rationale).
  3. Content Strategy Recommendations (3 actionable bullet points on what content to build based on these keywords).
  
  Use emojis appropriately. Return ONLY valid Markdown.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    finalReportMarkdown: response.content as string,
    status: "report_complete" 
  };
}

// --- 3. Build the Graph ---
export const createKeywordCrew = () => {
  const workflow = new StateGraph(KeywordGraphAnnotation)
    .addNode("searchExplorer", searchExplorerNode)
    .addNode("intentAnalyzer", intentAnalyzerNode)
    .addNode("reportGenerator", reportGeneratorNode)
    
    .addEdge(START, "searchExplorer")
    .addEdge("searchExplorer", "intentAnalyzer")
    .addEdge("intentAnalyzer", "reportGenerator")
    .addEdge("reportGenerator", END);

  return workflow.compile();
};
