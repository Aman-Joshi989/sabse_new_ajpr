const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const relPath = path.relative(appDir, filePath);
  let routePath = '/' + path.dirname(relPath).replace(/\\/g, '/');
  if (routePath === '/.') routePath = '/';
  
  // Skip dynamic route folders for simple replacement, 
  // they usually have generateMetadata and we need custom logic there.
  if (routePath.includes('[') || filePath.includes('app/layout.tsx')) {
      return;
  }

  let modified = false;

  // Case 1: export const metadata = { ... }
  const metadataRegex = /export\s+const\s+metadata(?:\s*:\s*Metadata)?\s*=\s*{([\s\S]*?)};/g;
  content = content.replace(metadataRegex, (match, inner) => {
    if (inner.includes('alternates:') || inner.includes('openGraph:')) {
        return match; // Already has it
    }
    
    // Extract title and description to reuse in OG
    let title = 'AJPR World';
    let desc = 'AJPR World delivers premium digital solutions.';
    
    const titleMatch = inner.match(/title:\s*['"](.*?)['"]/);
    if (titleMatch) title = titleMatch[1];
    
    const descMatch = inner.match(/description:\s*['"](.*?)['"]/);
    if (descMatch) desc = descMatch[1];

    modified = true;
    return `export const metadata: Metadata = {${inner.trimEnd()},
  alternates: {
    canonical: '${routePath}'
  },
  openGraph: {
    title: '${title}',
    description: '${desc}',
    url: 'https://ajprworld.com${routePath === '/' ? '' : routePath}',
    siteName: 'AJPR World',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '${title}',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};`;
  });

  if (modified) {
    // Add Metadata import if not present
    if (!content.includes('import { Metadata }') && !content.includes('import type { Metadata }')) {
        content = `import { Metadata } from 'next';\n${content}`;
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated metadata for ${routePath}`);
  }
}

const allFiles = getFiles(appDir);
allFiles.forEach(processFile);
console.log("Done updating static page metadata.");
