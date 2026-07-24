import { NextResponse } from "next/server";
import { createOutrankCrew } from "@/lib/agents/outrank-crew";
import { revalidatePath } from "next/cache";

export const maxDuration = 300; // This takes a long time because it writes a full blog post

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { competitorUrl, secret } = body;

    // Simple security check
    const expectedSecret = process.env.AGENT_SECRET || 'ajprworld-agents-super-secret';
    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!competitorUrl) {
      return NextResponse.json(
        { error: "Missing required field: 'competitorUrl'" },
        { status: 400 }
      );
    }

    const app = createOutrankCrew();
    const initialState = {
      competitorUrl: competitorUrl,
    };

    console.log("[API] Triggering Outrank Agent for:", competitorUrl);
    const result = await app.invoke(initialState);
    
    // Revalidate frontend caches
    revalidatePath('/blog');
    revalidatePath('/dashboard/admin/blog');

    return NextResponse.json({
      success: true,
      message: "Outrank automation complete.",
      data: {
        markdownReport: result.finalReportMarkdown,
        generatedBlogSlug: result.generatedBlogSlug,
      },
    });
  } catch (error: any) {
    console.error("[API] Outrank Agent failed:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
