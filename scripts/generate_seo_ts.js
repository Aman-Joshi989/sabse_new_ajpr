const fs = require('fs');

const csvContent = fs.readFileSync('ajpr_full_seo_metadata.csv', 'utf8');
const lines = csvContent.split('\n');

let tsContent = `export const seoOverrides: Record<string, { title: string, description: string }> = {\n`;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Simple CSV parser for quoted fields
  const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if (!matches || matches.length < 3) continue;

  let url = matches[0].replace(/^"|"$/g, '');
  let title = matches[1].replace(/^"|"$/g, '').replace(/""/g, '"');
  let desc = matches[2].replace(/^"|"$/g, '').replace(/""/g, '"');

  // Extract path from URL
  const path = url.replace('https://ajprworld.com', '');
  
  tsContent += `  "${path}": {\n`;
  tsContent += `    title: ${JSON.stringify(title)},\n`;
  tsContent += `    description: ${JSON.stringify(desc)},\n`;
  tsContent += `  },\n`;
}

tsContent += `};\n`;

fs.writeFileSync('lib/seo-overrides.ts', tsContent);
console.log('✅ Generated lib/seo-overrides.ts successfully.');
