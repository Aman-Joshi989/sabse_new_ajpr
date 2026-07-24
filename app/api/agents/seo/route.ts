import { NextResponse } from "next/server";
import { createSEOCrew } from "@/lib/agents/seo-crew";

export const maxDuration = 60; // Allow function to run up to 60 seconds

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, targetRoute, targetUrl, secret } = body;

    // Simple security check to prevent unauthorized trigger
    const expectedSecret = process.env.AGENT_SECRET || 'ajprworld-agents-super-secret';
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!topic || !targetRoute) {
      return NextResponse.json(
        { error: "Missing required fields: 'topic' or 'targetRoute'" },
        { status: 400 }
      );
    }

    const app = createSEOCrew();
    const initialState = {
      targetTopic: topic,
      targetRoute: targetRoute,
      targetUrl: targetUrl || "",
    };

    console.log("[API] Triggering SEO Agent for:", targetRoute);
    const result = await app.invoke(initialState);

    return NextResponse.json({
      success: true,
      message: "SEO optimization complete.",
      data: {
        keywords: result.keywords,
        searchIntent: result.searchIntent,
        newMetaTitle: result.finalSeoTitle,
        newMetaDescription: result.finalSeoDescription,
      },
    });
  } catch (error: any) {
    console.error("[API] SEO Agent failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
