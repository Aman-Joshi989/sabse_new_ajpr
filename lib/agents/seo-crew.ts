import { StateGraph, START, END, MemorySaver } from "@langchain/langgraph";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createLLM } from "./llm-client";
import { webScraperTool } from "./tools/web-scraper";
import { injectSEOMetadataTool } from "./tools/file-editor";
import { z } from "zod";

// --- 1. Define State ---
export interface SEOCrewState {
  targetTopic: string;
  targetUrl: string; // The competitor URL to analyze
  targetFile: string; // Local .tsx file to inject SEO into
  
  // Phase 1: Research
  keywords: string[];
  searchIntent: string;
  
  // Phase 2: Competitor Analysis
  competitorInsights: string;
  
  // Phase 3: Copywriting
  finalSeoTitle: string;
  finalSeoDescription: string;
  
  // Execution status
  status: string;
}

const graphState = {
  targetTopic: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  targetUrl: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  targetFile: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  keywords: {
    value: (x: string[], y: string[]) => y ?? x,
    default: () => [],
  },
  searchIntent: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  competitorInsights: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  finalSeoTitle: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  finalSeoDescription: {
    value: (x: string, y: string) => y ?? x,
    default: () => "",
  },
  status: {
    value: (x: string, y: string) => y ?? x,
    default: () => "started",
  },
};

// --- 2. Define Nodes (Agents) ---

/**
 * Agent 1: The Keyword & Intent Researcher
 */
async function researcherNode(state: SEOCrewState) {
  console.log("🕵️‍♂️ [Researcher] Analyzing keywords for:", state.targetTopic);
  const llm = createLLM(0.7).withStructuredOutput(z.object({
    keywords: z.array(z.string()),
    searchIntent: z.string()
  }));
  
  const prompt = `You are an expert SEO Researcher. The client wants to rank for the topic: "${state.targetTopic}". 
  Provide 5-10 high-value, long-tail keywords and describe the primary search intent (Informational, Transactional, etc.).`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    keywords: response.keywords,
    searchIntent: response.searchIntent,
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

  const llm = createLLM(0.4);
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
  console.log("✍️ [Copywriter] Generating SEO copy for:", state.targetFile);
  const llm = createLLM(0.7).withStructuredOutput(z.object({
    title: z.string(),
    description: z.string()
  }));
  
  const prompt = `You are an elite SEO Copywriter. 
  Topic: ${state.targetTopic}
  Target Keywords: ${state.keywords.join(", ")}
  Search Intent: ${state.searchIntent}
  Competitor Insights: ${state.competitorInsights}
  
  Write a highly optimized, click-worthy Meta Title (under 60 chars) and Meta Description (under 160 chars) that beats the competitor.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  console.log("🚀 [Optimizer] Injecting generated SEO into codebase...");
  const injectionResult = await injectSEOMetadataTool.invoke({
      filePath: state.targetFile,
      title: response.title,
      description: response.description,
      url: `https://ajprworld.com/${state.targetFile.replace('app/', '').replace('/page.tsx', '')}`
  });
  
  console.log(injectionResult);

  return { 
    finalSeoTitle: response.title,
    finalSeoDescription: response.description,
    status: "optimization_complete" 
  };
}

// --- 3. Build the Graph ---

export const createSEOCrew = () => {
  const workflow = new StateGraph({ channels: graphState })
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
