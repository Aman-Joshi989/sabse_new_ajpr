import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { neon } from "@neondatabase/serverless";

export const upsertSEOMetadataTool = tool(
  async ({ route, title, description }) => {
    try {
      console.log(`[DB Editor] Upserting SEO metadata for route: ${route}`);
      
      const url = process.env.DATABASE_URL;
      if (!url) {
        return "Failed: DATABASE_URL environment variable is missing. Cannot save to database.";
      }
      
      const sql = neon(url);
      
      await sql`
        INSERT INTO seo_metadata (route, title, description)
        VALUES (${route}, ${title}, ${description})
        ON CONFLICT (route) DO UPDATE 
        SET title = EXCLUDED.title, description = EXCLUDED.description, updated_at = CURRENT_TIMESTAMP
      `;
      
      return `Successfully saved SEO metadata to database for route: ${route}`;
    } catch (error: any) {
      console.error("[DB Editor Error]", error);
      return `Failed to save metadata: ${error.message}`;
    }
  },
  {
    name: "upsertSEOMetadata",
    description:
      "Saves or updates the finalized SEO Title and Description into the Neon PostgreSQL database for a specific route. This should be the final step of the SEO agent pipeline.",
    schema: z.object({
      route: z.string().describe("The URL route for the page (e.g., '/', '/about', '/startup-growth-kit')"),
      title: z.string().describe("The finalized SEO title optimized for high CTR and rankings (max 60 chars)"),
      description: z.string().describe("The finalized SEO description with secondary keywords (max 155 chars)"),
    }),
  }
);
