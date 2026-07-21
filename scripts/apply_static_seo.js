const fs = require('fs');
const path = require('path');

const staticPages = {
  "/": "app/layout.tsx", // Root metadata is usually in layout.tsx
  "/portfolio": "app/portfolio/page.tsx",
  "/about": "app/about/page.tsx",
  "/blog": "app/blog/page.tsx",
  "/services": "app/services/page.tsx",
  "/contact": "app/contact/page.tsx",
  "/privacy": "app/privacy/page.tsx",
  "/terms": "app/terms/page.tsx",
  "/startup-growth-kit": "app/startup-growth-kit/page.tsx",
  "/aman-joshi": "app/aman-joshi/page.tsx",
  "/careers": "app/careers/page.tsx",
  "/demo-ruflo": "app/demo-ruflo/page.tsx",
  "/book-call": "app/book-call/page.tsx"
};

for (const [route, filePath] of Object.entries(staticPages)) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  // Some files might be layout.tsx instead of page.tsx, let's check
  if (!fs.existsSync(fullPath)) {
    const altPath = fullPath.replace('page.tsx', 'layout.tsx');
    if (fs.existsSync(altPath)) {
      staticPages[route] = filePath.replace('page.tsx', 'layout.tsx');
    } else {
      console.log(`❌ Skipped ${route} (File not found)`);
      continue;
    }
  }

  const actualPath = path.join(__dirname, '..', staticPages[route]);
  let content = fs.readFileSync(actualPath, 'utf8');

  // If there's an existing export const metadata, replace it
  const metadataRegex = /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\{[\s\S]*?\};?/g;
  const newMetadataCode = `import { seoOverrides } from '@/lib/seo-overrides';\n\nexport const metadata: Metadata = {\n  ...seoOverrides['${route}'],\n  openGraph: { ...seoOverrides['${route}'], url: 'https://ajprworld.com${route}' }\n};`;

  if (content.match(metadataRegex)) {
    content = content.replace(metadataRegex, newMetadataCode);
    // Remove duplicate imports if we just added it multiple times by accident, or ensure Metadata is imported
  } else {
    // Inject it after imports
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfImport = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfImport + 1) + '\n' + newMetadataCode + '\n' + content.slice(endOfImport + 1);
    } else {
      content = newMetadataCode + '\n' + content;
    }
  }

  // Ensure Metadata is imported from next
  if (!content.includes("import { Metadata } from 'next'") && !content.includes("import type { Metadata } from 'next'")) {
     content = `import { Metadata } from 'next';\n` + content;
  }
  
  // Ensure seoOverrides isn't imported twice
  if ((content.match(/import { seoOverrides }/g) || []).length > 1) {
     content = content.replace("import { seoOverrides } from '@/lib/seo-overrides';\n\n", "");
  }

  fs.writeFileSync(actualPath, content);
  console.log(`✅ Updated ${staticPages[route]}`);
}
