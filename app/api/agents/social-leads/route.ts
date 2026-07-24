import { NextResponse } from "next/server";
import { createSocialLeadCrew } from "@/lib/agents/social-lead-crew";

export const maxDuration = 120; // LangGraph workflows might take time

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetNiche, secret } = body;

    const expectedSecret = process.env.AGENT_SECRET || 'ajprworld-agents-super-secret';
    if (secret !== expectedSecret && secret !== process.env.NEXT_PUBLIC_AGENT_SECRET_UI) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!targetNiche) {
      return NextResponse.json(
        { error: "Missing required field: 'targetNiche'" },
        { status: 400 }
      );
    }

    const app = createSocialLeadCrew();
    const initialState = {
      targetNiche: targetNiche,
    };

    console.log("[API] Triggering Social Lead Agent for:", targetNiche);
    const result = await app.invoke(initialState);
    
    return NextResponse.json({
      success: true,
      message: "Lead generation complete.",
      data: {
        markdownReport: result.finalReportMarkdown,
        leads: result.qualifiedLeads,
      },
    });
  } catch (error: any) {
    console.error("[API] Social Lead Agent failed:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
