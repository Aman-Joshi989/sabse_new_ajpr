const fs = require('fs');

const filesToFix = [
  'app/about/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/blog/page.tsx',
  'app/book-call/layout.tsx',
  'app/careers/layout.tsx',
  'app/contact/layout.tsx',
  'app/demo-ruflo/page.tsx',
  'app/glossary/[term]/page.tsx',
  'app/locations/[city]/[service]/page.tsx',
  'app/page.tsx',
  'app/portfolio/page.tsx',
  'app/privacy/page.tsx',
  'app/startup-growth-kit/layout.tsx',
  'app/terms/page.tsx'
];

for (const rel of filesToFix) {
  let content = fs.readFileSync(rel, 'utf8');
  let routePath = '/' + rel.replace('app/', '').replace('/page.tsx', '').replace('page.tsx', '').replace('/layout.tsx', '').replace('layout.tsx', '');
  if (routePath === '/') routePath = '';
  
  // The goal is to find `return {` inside `generateMetadata` and inject the canonical URL.
  // Since we have dynamic routes like [slug], we should construct the url dynamically.
  
  const hasDynamicParams = routePath.includes('[');
  
  if (hasDynamicParams) {
    if (rel.includes('[slug]') && !rel.includes('[location]')) {
       // app/blog/[slug]
       content = content.replace(/(export async function generateMetadata[\s\S]*?return\s*{)/, `$1\n    alternates: { canonical: \`/blog/\${slug}\` },`);
    } else if (rel.includes('[term]')) {
       content = content.replace(/(export async function generateMetadata[\s\S]*?return\s*{)/, `$1\n    alternates: { canonical: \`/glossary/\${term}\` },`);
    } else if (rel.includes('[city]/[service]')) {
       content = content.replace(/(export async function generateMetadata[\s\S]*?return\s*{)/, `$1\n    alternates: { canonical: \`/locations/\${city}/\${service}\` },`);
    }
  } else {
    content = content.replace(/(export async function generateMetadata[\s\S]*?return\s*{)/, `$1\n    alternates: { canonical: '${routePath}' },`);
  }
  
  fs.writeFileSync(rel, content);
  console.log(`Updated ${rel}`);
}
