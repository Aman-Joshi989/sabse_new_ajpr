import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function cleanDomainInput(raw: string): string {
  let clean = raw.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//i, '');
  clean = clean.replace(/\/.*$/, '');
  clean = clean.replace(/:\d+$/, '');
  return clean;
}

function isDisallowedHost(host: string): boolean {
  if (!host || host.length < 3) return true;
  if (
    host === 'localhost' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host.startsWith('10.') ||
    host.startsWith('192.168.') ||
    host.startsWith('172.16.') ||
    host.startsWith('169.254.')
  ) {
    return true;
  }
  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawDomain = body.domain || '';
    const domain = cleanDomainInput(rawDomain);

    if (!domain || isDisallowedHost(domain) || !domain.includes('.')) {
      return NextResponse.json(
        { error: 'Please enter a valid public domain (e.g. acme.com or yourstartup.io)' },
        { status: 400 }
      );
    }

    const targetUrl = `https://${domain}`;
    const startTime = Date.now();

    let res: Response;
    let usedHttp = false;

    try {
      res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; AJPR-Architecture-Audit/1.0; +https://ajprworld.com/free-audit)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(4500),
      });
    } catch (httpsErr) {
      // Fallback to HTTP if HTTPS fails
      try {
        usedHttp = true;
        res = await fetch(`http://${domain}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; AJPR-Architecture-Audit/1.0; +https://ajprworld.com/free-audit)',
          },
          signal: AbortSignal.timeout(4000),
        });
      } catch (httpErr: any) {
        return NextResponse.json({
          success: false,
          error: `Could not connect to ${domain}. Please verify the domain is live and reachable.`,
          domain,
        }, { status: 422 });
      }
    }

    const ttfb = Math.max(45, Date.now() - startTime);
    const headers = res.headers;

    // Security Checks
    const hasHsts = headers.has('strict-transport-security');
    const hasCsp = headers.has('content-security-policy');
    const hasXFrame = headers.has('x-frame-options');
    const hasXContentType = headers.has('x-content-type-options');
    const isHttps = !usedHttp;

    // Server & Framework Detection
    const serverHeader = (headers.get('server') || '').toLowerCase();
    const xPoweredBy = (headers.get('x-powered-by') || '').toLowerCase();
    const isVercel = headers.has('x-vercel-id') || serverHeader.includes('vercel');
    const isCloudflare = headers.has('cf-ray') || serverHeader.includes('cloudflare');
    const isAws = headers.has('x-amz-cf-id') || serverHeader.includes('cloudfront');

    // Read initial HTML slice for SEO & architecture signatures
    let htmlSlice = '';
    try {
      const text = await res.text();
      htmlSlice = text.slice(0, 45000); // 45KB sample
    } catch (e) {
      htmlSlice = '';
    }

    const isNextJs = isVercel || htmlSlice.includes('__NEXT_DATA__') || htmlSlice.includes('/_next/static/');
    const isWordPress = htmlSlice.includes('wp-content') || htmlSlice.includes('wp-includes');
    const isShopify = htmlSlice.includes('cdn.shopify.com');
    const isWebflow = htmlSlice.includes('webflow.com') || htmlSlice.includes('w-layout');

    let detectedStack = 'Custom Architecture';
    if (isNextJs) detectedStack = 'Next.js / React';
    else if (isWordPress) detectedStack = 'WordPress / PHP';
    else if (isShopify) detectedStack = 'Shopify';
    else if (isWebflow) detectedStack = 'Webflow';
    else if (xPoweredBy) detectedStack = xPoweredBy.toUpperCase();

    // SEO & Semantic Graph Checks
    const hasJsonLd = htmlSlice.includes('application/ld+json');
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(htmlSlice);
    const hasOgImage = htmlSlice.includes('property="og:image"') || htmlSlice.includes("property='og:image'");
    const hasViewport = htmlSlice.includes('name="viewport"') || htmlSlice.includes("name='viewport'");

    // Scoring Engine
    let perfScore = 95;
    if (ttfb > 800) perfScore -= 45;
    else if (ttfb > 450) perfScore -= 30;
    else if (ttfb > 250) perfScore -= 15;
    if (isWordPress) perfScore -= 10; // Overhead penalty

    let secScore = 20;
    if (isHttps) secScore += 30;
    if (hasHsts) secScore += 20;
    if (hasCsp) secScore += 15;
    if (hasXFrame) secScore += 10;
    if (hasXContentType) secScore += 5;

    let seoScore = 30;
    if (hasMetaDesc) seoScore += 25;
    if (hasOgImage) seoScore += 15;
    if (hasJsonLd) seoScore += 20;
    if (hasViewport) seoScore += 10;

    let geoScore = 35;
    if (hasJsonLd) geoScore += 35;
    if (hasMetaDesc) geoScore += 15;
    if (isNextJs) geoScore += 15;

    const overallScore = Math.round(
      perfScore * 0.35 + secScore * 0.25 + seoScore * 0.20 + geoScore * 0.20
    );

    // Identify Top 3 Actionable Bottlenecks
    const bottlenecks = [];
    if (ttfb > 250) {
      bottlenecks.push({
        title: `Slow Time to First Byte (${ttfb}ms)`,
        severity: ttfb > 600 ? 'high' : 'medium',
        detail: `Server response is ${ttfb}ms (target: < 150ms). Unoptimized backend queries or missing edge caching directly hurt Google Core Web Vitals.`,
      });
    }
    if (!hasHsts || !hasCsp) {
      bottlenecks.push({
        title: 'Missing Essential Security Headers',
        severity: !isHttps ? 'high' : 'medium',
        detail: `Missing ${!hasHsts ? 'HSTS' : ''} ${!hasCsp ? 'Content-Security-Policy (CSP)' : ''} headers. Leaves client sessions exposed to clickjacking and data tampering.`,
      });
    }
    if (!hasJsonLd) {
      bottlenecks.push({
        title: 'Zero JSON-LD Semantic Entity Schema',
        severity: 'high',
        detail: 'Search engine crawlers and AI models (ChatGPT, Google AI Overviews, Perplexity) cannot parse your business entity or authoritativeness.',
      });
    }
    if (bottlenecks.length < 3 && isWordPress) {
      bottlenecks.push({
        title: 'WordPress Plugin & DOM Overhead',
        severity: 'medium',
        detail: 'Detected monolithic CMS bundle dependencies that add script execution delay on mobile devices.',
      });
    }
    if (bottlenecks.length < 3 && !hasOgImage) {
      bottlenecks.push({
        title: 'Missing Social OpenGraph Tags',
        severity: 'low',
        detail: 'Links shared on LinkedIn, WhatsApp, and X will render without preview cards, cutting referral CTR by up to 60%.',
      });
    }

    return NextResponse.json({
      success: true,
      domain,
      overallScore: Math.min(98, Math.max(35, overallScore)),
      metrics: {
        ttfb,
        ttfbRating: ttfb < 200 ? 'Optimal' : ttfb < 450 ? 'Moderate' : 'Slow',
        detectedStack,
        isHttps,
        hasHsts,
        hasCsp,
        hasXFrame,
        hasJsonLd,
        hasMetaDesc,
        hasOgImage,
        hasViewport,
        server: isVercel ? 'Vercel Edge' : isCloudflare ? 'Cloudflare CDN' : isAws ? 'AWS CloudFront' : (serverHeader || 'Standard Origin'),
      },
      categoryScores: {
        performance: Math.max(30, Math.min(100, perfScore)),
        security: Math.max(25, Math.min(100, secScore)),
        seo: Math.max(30, Math.min(100, seoScore)),
        aiReadiness: Math.max(25, Math.min(100, geoScore)),
      },
      bottlenecks: bottlenecks.slice(0, 3),
    }, { status: 200 });
  } catch (error: any) {
    console.error('[Audit Scan API] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Diagnostic failed. Please check your URL and try again.',
    }, { status: 500 });
  }
}
