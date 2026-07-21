import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

/**
 * Tool for the AI to inject SEO metadata into a local Next.js file.
 * This is based on the logic we established in your `inject_seo.js` script.
 */
export const injectSEOMetadataTool = new DynamicStructuredTool({
  name: "inject_seo_metadata",
  description: "Updates a Next.js file with new SEO metadata (title, description, canonical url).",
  schema: z.object({
    filePath: z.string().describe("Relative path to the .tsx file from the project root, e.g. 'app/blog/page.tsx'"),
    title: z.string().describe("The optimized SEO title"),
    description: z.string().describe("The optimized SEO meta description"),
    url: z.string().describe("The canonical URL for this page")
  }),
  func: async ({ filePath, title, description, url }) => {
    try {
      const absolutePath = path.join(process.cwd(), filePath);
      if (!fs.existsSync(absolutePath)) {
        return `Error: File not found at ${filePath}`;
      }

      let content = fs.readFileSync(absolutePath, "utf8");

      // We'll generate the metadata code block
      const metadataTemplate = `
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${title}\`,
  description: \`${description.replace(/`/g, '\\`')}\`,
  alternates: {
    canonical: '${url}',
  },
  openGraph: {
    title: \`${title}\`,
    description: \`${description.replace(/`/g, '\\`')}\`,
    url: '${url}',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
};
`;

      // If metadata already exists, we might need a more advanced AST parser to replace it.
      // For now, if it exists, we skip to avoid breaking the file, or we can replace it.
      if (content.includes("export const metadata")) {
         // Advanced replacement logic would go here. For now, let's just return a notice.
         return `Notice: Metadata already exists in ${filePath}. The agent successfully generated recommendations, but automatic replacement is currently skipped to prevent syntax errors. You can manually apply: ${title}`;
      }

      const lines = content.split("\n");
      let lastImportIdx = -1;
      for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim().startsWith("import ")) {
              lastImportIdx = i;
          }
      }
      
      const cleanLines = content.split("\n");
      cleanLines.splice(lastImportIdx + 1, 0, metadataTemplate);
      fs.writeFileSync(absolutePath, cleanLines.join("\n"));

      return `Successfully injected SEO metadata into ${filePath}`;
    } catch (e: any) {
      return `Error injecting metadata: ${e.message}`;
    }
  }
});
