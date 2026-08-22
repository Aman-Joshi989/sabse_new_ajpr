const fs = require('fs');
const sitemapTs = fs.readFileSync('app/sitemap.ts', 'utf8');
const sitemapPage = fs.readFileSync('app/sitemap/page.tsx', 'utf8');

// very naive regex to pull URLs
const xmlUrls = [...sitemapTs.matchAll(/url: \`\$\{baseUrl\}(.*?)\`/g)].map(m => m[1]);
const xmlUrls2 = [...sitemapTs.matchAll(/url: \`\$\{baseUrl\}\$\{r\.route\}\`/g)].map(m => "dynamic_route");

console.log("Found XML static routes count: " + xmlUrls.length);

const htmlUrls = [...sitemapPage.matchAll(/url: '(.*?)'/g)].map(m => m[1]);
console.log("Found HTML static routes count: " + htmlUrls.length);

const missing = xmlUrls.filter(url => !htmlUrls.includes(url) && url !== '');
console.log("Pages in XML but not in HTML static list: ", missing);
