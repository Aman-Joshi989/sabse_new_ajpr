import { createSEOCrew } from "../lib/agents/seo-crew";

async function run() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error("Usage: npx tsx scripts/run_seo_agents.ts <Topic> <Target_TSX_File> [Competitor_URL]");
    console.error("Example: npx tsx scripts/run_seo_agents.ts 'custom software development' 'app/services/page.tsx' 'https://competitor.com'");
    process.exit(1);
  }

  const [topic, targetFile, targetUrl = ""] = args;

  console.log(`\n🚀 Starting SEO Agent Crew`);
  console.log(`Topic: ${topic}`);
  console.log(`Target Local File: ${targetFile}`);
  if (targetUrl) console.log(`Competitor URL: ${targetUrl}`);
  console.log("--------------------------------------------------\n");

  const app = createSEOCrew();

  try {
    const initialState = {
      targetTopic: topic,
      targetFile: targetFile,
      targetUrl: targetUrl
    };

    const result = await app.invoke(initialState);

    console.log("\n✅ SEO Crew Execution Complete!\n");
    console.log("--- RESULTS ---");
    console.log(`Generated Keywords: \n- ${result.keywords?.join('\n- ')}\n`);
    console.log(`Search Intent: ${result.searchIntent}\n`);
    console.log(`New Meta Title: ${result.finalSeoTitle}`);
    console.log(`New Meta Description: ${result.finalSeoDescription}`);
    console.log("--------------------------------------------------");
    
  } catch (error) {
    console.error("Agent execution failed:", error);
  }
}

run();
