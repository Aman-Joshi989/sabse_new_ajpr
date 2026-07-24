import { NextResponse } from "next/server";
import { createBacklinkCrew } from "@/lib/agents/backlink-crew";

export const maxDuration = 60; // Allow function to run up to 60 seconds

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetUrl, keyword, secret } = body;

    // Simple security check
    const expectedSecret = process.env.AGENT_SECRET || 'ajprworld-agents-super-secret';
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!keyword) {
      return NextResponse.json(
        { error: "Missing required field: 'keyword'" },
        { status: 400 }
      );
    }

    const app = createBacklinkCrew();
    const initialState = {
      targetUrl: targetUrl || "Our Website",
      seedKeyword: keyword,
    };

    console.log("[API] Triggering Backlink Agent for keyword:", keyword);
    const result = await app.invoke(initialState);

    return NextResponse.json({
      success: true,
      message: "Backlink research complete.",
      data: {
        markdownReport: result.finalReportMarkdown,
        opportunities: result.linkOpportunities,
      },
    });
  } catch (error: any) {
    console.error("[API] Backlink Agent failed:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
