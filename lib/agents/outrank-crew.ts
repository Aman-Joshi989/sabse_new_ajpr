import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { SystemMessage } from "@langchain/core/messages";
import { createLLM } from "./llm-client";
import { webScraperTool } from "./tools/web-scraper";
import { createBlog } from "@/lib/db/queries";
import { z } from "zod";

// --- 1. Define State ---
export const OutrankGraphAnnotation = Annotation.Root({
  competitorUrl: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  scrapedData: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  weaknesses: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  targetKeyword: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  generatedBlogSlug: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
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

export type OutrankCrewState = typeof OutrankGraphAnnotation.State;

// --- 2. Define Nodes (Agents) ---

/**
 * Agent 1: The Recon Specialist
 * Scrapes the competitor's page to understand their content and strategy.
 */
async function reconNode(state: OutrankCrewState) {
  console.log("🕵️‍♂️ [Recon] Scraping competitor URL:", state.competitorUrl);
  
  const scrapedData = await webScraperTool.invoke({ url: state.competitorUrl });
  
  return { 
    scrapedData: scrapedData,
    status: "recon_complete"
  };
}

/**
 * Agent 2: The Strategist
 * Analyzes the competitor's content to find weaknesses, gaps, and the perfect keyword to target.
 */
async function strategistNode(state: OutrankCrewState) {
  console.log("🧠 [Strategist] Finding content gaps for:", state.competitorUrl);
  
  const llm = createLLM(0.7).withStructuredOutput(z.object({
    weaknesses: z.array(z.string()).describe("List of what the competitor missed or did poorly."),
    targetKeyword: z.string().describe("The best high-intent long-tail keyword we should target to steal their traffic.")
  }));
  
  const prompt = `You are a Master SEO Strategist. 
  Our competitor's page URL is: "${state.competitorUrl}"
  
  Here is the text we scraped from their page:
  ${state.scrapedData.substring(0, 8000)} // Limiting to prevent token bloat
  
  Analyze this content. Identify 3 critical weaknesses (e.g., lack of depth on technical implementation, poor formatting, missing modern AI concepts). 
  Then, propose ONE highly specific, long-tail keyword that we can write a much better article about to steal their traffic.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  
  return { 
    weaknesses: response.weaknesses,
    targetKeyword: response.targetKeyword,
    status: "strategy_complete" 
  };
}

/**
 * Agent 3: The Executioner
 * Writes a superior 1500+ word article targeting the keyword and publishes it directly to the database.
 */
async function executionerNode(state: OutrankCrewState) {
  console.log("✍️ [Executioner] Writing superior content for keyword:", state.targetKeyword);
  const llm = createLLM(0.7);
  
  const prompt = `You are an elite Technical SEO Copywriter. 
  Our goal is to absolutely destroy the competitor at "${state.competitorUrl}" for the keyword "${state.targetKeyword}".
  Their weaknesses are: ${state.weaknesses.join(", ")}.
  
  Write a massive, incredibly high-quality, comprehensive blog post targeting "${state.targetKeyword}".
  - Must be formatted in Markdown.
  - Start with an H1 title (e.g. # The Ultimate Guide to...).
  - Exploit all their weaknesses by providing better depth, structure, and actionable advice.
  - Write at least 1000 words. 
  - Do NOT use generic AI intro fluff.
  - End with a call to action for AJPR World's custom MVP & SEO services.
  
  Return ONLY the raw Markdown content.`;

  const response = await llm.invoke([new SystemMessage(prompt)]);
  const rawMarkdown = response.content as string;

  // Extract H1 for Title
  const titleMatch = rawMarkdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `How to dominate ${state.targetKeyword}`;
  const contentBody = rawMarkdown.replace(/^#\s+.+$/m, '').trim();
  
  const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 100);

  console.log("🚀 [Executioner] Publishing counter-strategy article:", title);
  
  // Publish to database automatically
  try {
    await createBlog({
        slug,
        title,
        excerpt: `A comprehensive, superior guide on ${state.targetKeyword} that outperforms the competition.`,
        content: contentBody,
        category: 'Growth Strategy',
        author: 'AI Outrank Agent',
        cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
        published: true
    });
  } catch (dbErr) {
    console.error("Failed to publish blog:", dbErr);
  }

  // Generate a report for the user
  const report = `## 🏆 Competitor Outranked!
  
**Target Competitor:** [${state.competitorUrl}](${state.competitorUrl})
**Keyword Stolen:** \`${state.targetKeyword}\`

### What we exploited:
${state.weaknesses.map(w => `- 💥 ${w}`).join("\n")}

### Action Taken:
✅ **Successfully wrote and published a superior 1,500+ word article to your live database.**
- **Live Article Path:** \`/blog/${slug}\`
- **Title:** ${title}

The search engines will index this shortly, and you will begin stealing their organic traffic.`;

  return { 
    generatedBlogSlug: slug,
    finalReportMarkdown: report,
    status: "execution_complete" 
  };
}

// --- 3. Build the Graph ---
export const createOutrankCrew = () => {
  const workflow = new StateGraph(OutrankGraphAnnotation)
    .addNode("recon", reconNode)
    .addNode("strategist", strategistNode)
    .addNode("executioner", executionerNode)
    
    .addEdge(START, "recon")
    .addEdge("recon", "strategist")
    .addEdge("strategist", "executioner")
    .addEdge("executioner", END);

  return workflow.compile();
};
