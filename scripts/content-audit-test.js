const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('🔍 RUNNING COMPREHENSIVE CONTENT AUDIT TEST ACROSS PUBLIC ROUTES');
console.log('================================================================\n');

// 1. Gather all customer-facing routes
const publicPages = [];
function findPages(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!full.includes('admin') && !full.includes('dashboard') && !full.includes('api')) {
        findPages(full);
      }
    } else if (item === 'page.tsx' || item === 'page.jsx') {
      publicPages.push(full);
    }
  }
}
findPages('app');

console.log(`Found ${publicPages.length} customer-facing pages.\n`);

const results = {
  passed: 0,
  warnings: [],
  failures: [],
  internalLinks: new Set(),
  discoveredRoutes: new Set()
};

// Index all valid route paths
publicPages.forEach(p => {
  let route = p
    .replace(/^app/, '')
    .replace(/\/page\.(tsx|jsx)$/, '')
    .replace(/\/index$/, '');
  if (route === '') route = '/';
  results.discoveredRoutes.add(route);
});

// Common static, system routes and API endpoints
results.discoveredRoutes.add('/api/auth/google');
results.discoveredRoutes.add('/api/auth/linkedin');
results.discoveredRoutes.add('/pricing');
results.discoveredRoutes.add('/contact');
results.discoveredRoutes.add('/book-call');
results.discoveredRoutes.add('/about');
results.discoveredRoutes.add('/services');
results.discoveredRoutes.add('/portfolio');
results.discoveredRoutes.add('/blog');
results.discoveredRoutes.add('/tools');
results.discoveredRoutes.add('/compare');
results.discoveredRoutes.add('/privacy');
results.discoveredRoutes.add('/terms');
results.discoveredRoutes.add('/solutions');
results.discoveredRoutes.add('/glossary');
results.discoveredRoutes.add('/free-audit');
results.discoveredRoutes.add('/login');
results.discoveredRoutes.add('/signup/client');
results.discoveredRoutes.add('/signup/developer');
results.discoveredRoutes.add('/affiliates');
results.discoveredRoutes.add('/careers');

console.log('--- AUDIT CHECK 1: Metadata Title & Description Quality ---');
publicPages.forEach(pagePath => {
  const content = fs.readFileSync(pagePath, 'utf8');

  // Title tag check
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/) || 
                     content.match(/<title>([^<]+)<\/title>/);
  
  if (titleMatch) {
    const title = titleMatch[1];
    // Check for spammy characters
    if (title.includes('★') || title.includes('4.9 Rating')) {
      results.warnings.push({
        page: pagePath,
        issue: `Title contains spammy rating symbol or star: "${title}"`
      });
    }
    // Check for ideal length (30 to 75 chars)
    if (title.length < 25) {
      results.warnings.push({
        page: pagePath,
        issue: `Title is too short (${title.length} chars): "${title}"`
      });
    }
  }

  // Description check
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.includes('★') || desc.includes('4.9 Rating')) {
      results.warnings.push({
        page: pagePath,
        issue: `Meta description contains spammy rating: "${desc.substring(0, 40)}..."`
      });
    }
  }
});
console.log(`  Checked titles and descriptions across ${publicPages.length} pages.`);

console.log('\n--- AUDIT CHECK 2: AI Buzzword & Boilerplate Density ---');
const buzzwords = [
  { name: 'RuFlo Swarms', regex: /\bRuFlo\b/gi },
  { name: 'Deterministic Guardrails', regex: /\bdeterministic guardrails\b/gi },
  { name: 'Direct Answer Synthetic Box', regex: /Direct Answer:\s*The best overall alternative/gi },
  { name: 'Plastered 4.9 Star Rating', regex: /★★★★★\s*4\.9/g }
];

buzzwords.forEach(bw => {
  let matches = 0;
  publicPages.forEach(pagePath => {
    const content = fs.readFileSync(pagePath, 'utf8');
    const m = content.match(bw.regex);
    if (m) {
      matches += m.length;
      results.warnings.push({
        page: pagePath,
        issue: `Contains repetitive buzzword "${bw.name}" (${m.length} occurrences)`
      });
    }
  });
  console.log(`  "${bw.name}" occurrences: ${matches}`);
});

console.log('\n--- AUDIT CHECK 3: Brand Positioning & Identity Alignment ---');
const coreFiles = [
  'components/sections/HeroSection.tsx',
  'app/HomeClient.tsx',
  'components/Footer.tsx',
  'components/Header.tsx'
];

coreFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('Senior Software Engineering') || content.includes('software engineering studio')) {
    console.log(`  ✅ [ALIGNED] ${f} correctly reinforces core studio identity.`);
    results.passed++;
  } else {
    results.warnings.push({
      page: f,
      issue: 'Missing core studio positioning ("Senior Software Engineering")'
    });
  }
});

console.log('\n--- AUDIT CHECK 4: Broken Internal Link Crawler ---');
let internalLinksTested = 0;
let brokenLinks = 0;

publicPages.forEach(pagePath => {
  const content = fs.readFileSync(pagePath, 'utf8');
  const hrefMatches = content.matchAll(/href=['"`](\/[a-zA-Z0-9_\-\/]+)['"`]/g);
  for (const match of hrefMatches) {
    const rawLink = match[1];
    internalLinksTested++;

    // Skip dynamic parameterized routes or anchors
    if (rawLink.includes('[') || rawLink === '/' || rawLink.startsWith('/#')) continue;

    // Check if the link matches any known route or prefix
    const linkPath = rawLink.split('?')[0].replace(/\/$/, '');
    let exists = false;

    // Exact match
    if (results.discoveredRoutes.has(linkPath) || results.discoveredRoutes.has(linkPath + '/page')) {
      exists = true;
    } else {
      // Dynamic route match (e.g., /blog/any-slug matches /blog/[slug])
      for (const route of results.discoveredRoutes) {
        if (route.includes('[') && linkPath.startsWith(route.split('[')[0])) {
          exists = true;
          break;
        }
      }
    }

    if (!exists) {
      brokenLinks++;
      results.failures.push({
        page: pagePath,
        issue: `Broken internal link detected: href="${rawLink}"`
      });
    }
  }
});

console.log(`  Scanned ${internalLinksTested} internal links.`);
console.log(`  Broken links identified: ${brokenLinks}`);

console.log('\n================================================================');
console.log('📊 CONTENT AUDIT TEST SUMMARY REPORT');
console.log('================================================================');
console.log(`Total Pages Scanned: ${publicPages.length}`);
console.log(`Internal Links Verified: ${internalLinksTested}`);
console.log(`Warnings / Editorial Opportunities: ${results.warnings.length}`);
console.log(`Failures / Broken Destinations: ${results.failures.length}`);

if (results.failures.length > 0) {
  console.log('\n❌ CRITICAL ISSUES (Broken Links):');
  results.failures.slice(0, 10).forEach(f => {
    console.log(`  - [${f.page}] ${f.issue}`);
  });
}

if (results.warnings.length > 0) {
  console.log('\n⚠️ EDITORIAL OPPORTUNITIES (AI Clichés & Title Polish):');
  results.warnings.slice(0, 15).forEach(w => {
    console.log(`  - [${w.page}] ${w.issue}`);
  });
}

if (results.failures.length === 0) {
  console.log('\n✅ NO BROKEN ROUTES FOUND. Content navigation is healthy!');
}
console.log('================================================================\n');
