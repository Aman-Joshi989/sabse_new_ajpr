import { StateGraph, START, END, MemorySaver, Annotation } from "@langchain/langgraph";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createLLM } from "./llm-client";
import { webScraperTool } from "./tools/web-scraper";
import { upsertSEOMetadataTool } from "./tools/db-editor";
import { z } from "zod";

// --- 1. Define State ---
export const GraphAnnotation = Annotation.Root({
  targetTopic: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  targetUrl: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  targetRoute: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  keywords: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  searchIntent: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  competitorInsights: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  finalSeoTitle: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  finalSeoDescription: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  status: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "started",
  }),
});

export type SEOCrewState = typeof GraphAnnotation.State;

// --- 2. Define Nodes (Agents) ---

/**
 * Agent 1: The Keyword & Intent Researcher
 */
async function researcherNode(state: SEOCrewState) {
  console.log("🕵️‍♂️ [Researcher] Analyzing keywords for:", state.targetTopic);
  const llm = createLLM(0.7, 'gpt-4o-mini').withStructuredOutput(z.object({
    keywords: z.array(z.string()),
    searchIntent: z.string()
  }));
  
  const prompt = `You are an expert SEO Researcher. The client wants to rank for the topic: "${state.targetTopic}". 
  Provide 5-10 high-value, long-tail keywords and describe the primary search intent (Informational, Transactional, etc.).`;

  const response: any = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    keywords: Array.isArray(response?.keywords) ? response.keywords : [],
    searchIntent: response?.searchIntent || "Commercial / Informational",
    status: "research_complete"
  };
}

/**
 * Agent 2: The Competitor Analyst
 */
async function analystNode(state: SEOCrewState) {
  console.log("📊 [Analyst] Scraping competitor URL:", state.targetUrl);
  
  let scrapedData = "";
  if (state.targetUrl) {
      scrapedData = await webScraperTool.invoke({ url: state.targetUrl });
  } else {
      scrapedData = "No competitor URL provided. Relying on general LLM knowledge.";
  }

  const llm = createLLM(0.4, 'gpt-4o-mini');
  const prompt = `You are a Competitor Analyst. 
  Target Topic: ${state.targetTopic}
  Keywords: ${state.keywords.join(", ")}
  
  Here is the scraped data from a top competitor page:
  ${scrapedData}
  
  Provide a concise summary of what makes this competitor page rank, their content gaps, and how we can beat them.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    competitorInsights: response.content as string,
    status: "analysis_complete" 
  };
}

/**
 * Agent 3: The SEO Copywriter & Optimizer
 */
async function copywriterNode(state: SEOCrewState) {
  console.log("✍️ [Copywriter] Generating SEO copy for:", state.targetRoute);
  const llm = createLLM(0.7, 'gpt-4o-mini').withStructuredOutput(z.object({
    title: z.string(),
    description: z.string()
  }));
  
  const prompt = `You are an elite SEO Copywriter. 
  Topic: ${state.targetTopic}
  Target Keywords: ${state.keywords.join(", ")}
  Search Intent: ${state.searchIntent}
  Competitor Insights: ${state.competitorInsights}
  
  Write a highly optimized, click-worthy Meta Title (under 60 chars) and Meta Description (under 160 chars) that beats the competitor.`;

  const response: any = await llm.invoke([new SystemMessage(prompt)]);
  const title = response?.title || `${state.targetTopic} | Premier Solutions by AJPR World`;
  const description = response?.description || `Explore ${state.targetTopic} with AJPR World. Expert architecture, AI automation, and high-performance engineering.`;
  
  console.log("🚀 [Optimizer] Injecting generated SEO into codebase...");
  const injectionResult = await upsertSEOMetadataTool.invoke({
      route: state.targetRoute,
      title: title,
      description: description
  });
  
  console.log(injectionResult);

  return { 
    finalSeoTitle: title,
    finalSeoDescription: description,
    status: "optimization_complete" 
  };
}

// --- 3. Build the Graph ---

export const createSEOCrew = () => {
  const workflow = new StateGraph(GraphAnnotation)
    .addNode("researcher", researcherNode)
    .addNode("analyst", analystNode)
    .addNode("copywriter", copywriterNode)
    
    .addEdge(START, "researcher")
    .addEdge("researcher", "analyst")
    .addEdge("analyst", "copywriter")
    .addEdge("copywriter", END);

  // Compile the graph
  return workflow.compile();
};
