import { NextRequest, NextResponse } from "next/server";
import { createBlog } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  const apiKey = process.env.AJPR_API_KEY;

  // 1. Safety check: make sure the server has been configured with an API key
  if (!apiKey) {
    console.error("AJPR_API_KEY is not defined in the environment variables.");
    return NextResponse.json(
      { error: "Publishing API key not configured on server. Please set AJPR_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  // 2. Authenticate the request
  const requestKey = req.headers.get("x-api-key");
  if (requestKey !== apiKey) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or missing x-api-key header." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const {
      slug,
      title,
      content,
      excerpt,
      category,
      author,
      cover_image,
      published,
      affiliate_product_slug,
      amazon_asin
    } = body;

    // 3. Validation
    if (!title) {
      return NextResponse.json({ error: "Missing required field: title" }, { status: 400 });
    }
    if (!content) {
      return NextResponse.json({ error: "Missing required field: content" }, { status: 400 });
    }

    // Auto-generate slug if not provided
    const resolvedSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    if (!resolvedSlug) {
      return NextResponse.json({ error: "Could not generate a valid slug from the title." }, { status: 400 });
    }

    // 4. Create the blog post in the database
    const result = await createBlog({
      slug: resolvedSlug,
      title,
      content,
      excerpt: excerpt || (content.length > 150 ? content.substring(0, 150) + "..." : content),
      category: category || "Technology",
      author: author || "AJPR Team",
      cover_image: cover_image || "/blog/default-cover.jpg",
      published: published !== undefined ? published : true,
      affiliate_product_slug: affiliate_product_slug || null,
      amazon_asin: amazon_asin || null
    });

    return NextResponse.json({
      success: true,
      message: "Blog post published successfully",
      slug: resolvedSlug
    }, { status: 201 });

  } catch (error: any) {
    console.error("n8n publish API error:", error);
    return NextResponse.json(
      { error: "Failed to publish blog post", details: error.message },
      { status: 500 }
    );
  }
}
