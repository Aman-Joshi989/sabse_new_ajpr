import { NextResponse } from "next/server";
import { createKeywordCrew } from "@/lib/agents/keyword-crew";

export const maxDuration = 60; // Allow function to run up to 60 seconds

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, audience, secret } = body;

    // Simple security check
    const expectedSecret = process.env.AGENT_SECRET || 'ajprworld-agents-super-secret';
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!topic) {
      return NextResponse.json(
        { error: "Missing required field: 'topic'" },
        { status: 400 }
      );
    }

    const app = createKeywordCrew();
    const initialState = {
      seedTopic: topic,
      targetAudience: audience || "General audience",
    };

    console.log("[API] Triggering Keyword Research Agent for:", topic);
    const result = await app.invoke(initialState);

    return NextResponse.json({
      success: true,
      message: "Keyword research complete.",
      data: {
        markdownReport: result.finalReportMarkdown,
        keywords: result.keywordIdeas,
      },
    });
  } catch (error: any) {
    console.error("[API] Keyword Agent failed:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
