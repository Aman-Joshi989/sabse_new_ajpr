const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-scroll-area',
    ],
  },
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './lib/empty-polyfill.js',
      '../build/polyfills/polyfill-module.js': './lib/empty-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './lib/empty-polyfill.js',
      'next/dist/build/polyfills/polyfill-module.js': './lib/empty-polyfill.js',
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      const emptyPolyfill = path.resolve(__dirname, './lib/empty-polyfill.js');
      config.resolve.alias['next/dist/build/polyfills/polyfill-module'] = emptyPolyfill;
      config.resolve.alias['../build/polyfills/polyfill-module'] = emptyPolyfill;
    }
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/_next/static/chunks/:path*.js',
          destination: '/api/static-fallback',
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ajprworld.com',
          },
        ],
        destination: 'https://ajprworld.com/:path*',
        permanent: true,
      },
      {
        source: '/services/ppc-management/:city',
        destination: '/locations/:city/ppc-agency',
        permanent: true,
      },
      {
        source: '/services/ppc-management',
        destination: '/pricing/ppc-cost',
        permanent: true,
      },
      {
        source: '/pricing/website-maintenance',
        destination: '/services/website-maintenance-cost',
        permanent: true,
      },
      {
        source: '/pricing/website-maintenance-cost',
        destination: '/services/website-maintenance-cost',
        permanent: true,
      },
      {
        source: '/services/website-maintenance',
        destination: '/services/website-maintenance-cost',
        permanent: true,
      },
      {
        source: '/blog/the-ultimate-guide-to-custom-software-development-with-ai-integration-for-startups',
        destination: '/blog/the-ultimate-guide-to-custom-software-development-for-startups-with-ai-integration',
        permanent: true,
      },
      // --- Legacy 404 Resolution Redirects for Google Search Console ---
      {
        source: '/demo-shining',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/demo-cpu',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/authors',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services/business',
        destination: '/services/b2b-growth-marketing',
        permanent: true,
      },
      {
        source: '/services/financial',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/blog/why-most-mvps-fail-and-the-system-architecture-that-prevents-it-edition-372',
        destination: '/blog/why-most-mvps-fail-and-the-system-architecture-that-prevents-it-edition-930',
        permanent: true,
      },
      {
        source: '/blog/how-to-build-a-productionready-mvp-in-4-weeks-using-nextjs-and-postgres-edition-288',
        destination: '/blog/how-to-build-a-productionready-mvp-in-4-weeks-using-nextjs-and-postgres-edition-583',
        permanent: true,
      },
      {
        source: '/blog/how-to-build-a-productionready-mvp-in-4-weeks-using-nextjs-and-postgres-711',
        destination: '/blog/how-to-build-a-productionready-mvp-in-4-weeks-using-nextjs-and-postgres-edition-583',
        permanent: true,
      },
      {
        source: '/blog/how-to-automate-b2b-lead-generation-using-ai-agents-in-2026-769',
        destination: '/blog/how-to-automate-b2b-lead-generation-using-ai-agents-in-2026-edition-790',
        permanent: true,
      },
      {
        source: '/blog/generative-engine-optimization-geo-the-next-frontier-of-seo-edition-537',
        destination: '/blog/generative-engine-optimization-geo-the-complete-2026-strategy-guide-edition-428',
        permanent: true,
      },
      {
        source: '/blog/generative-engine-optimization-geo-the-complete-2026-strategy-guide-718',
        destination: '/blog/generative-engine-optimization-geo-the-complete-2026-strategy-guide-edition-428',
        permanent: true,
      },
      {
        source: '/blog/building-multitenant-saas-products-a-stepbystep-engineering-guide-edition-917',
        destination: '/blog/building-multitenant-saas-products-a-stepbystep-engineering-guide-edition-756',
        permanent: true,
      },
      {
        source: '/blog/why-startups-need-a-solid-systems-architecture-before-scaling-edition-891',
        destination: '/blog/the-systems-architecture-every-b2b-saas-startup-needs-before-series-a-edition-446',
        permanent: true,
      },
      {
        source: '/blog/why-startups-need-a-solid-systems-architecture-before-scaling-edition-176',
        destination: '/blog/the-systems-architecture-every-b2b-saas-startup-needs-before-series-a-edition-446',
        permanent: true,
      },
      {
        source: '/blog/the-deployment-framework-engineering-predictable-product-launches-edition-457',
        destination: '/blog/the-lean-mvp-playbook-ship-fast-validate-faster-scale-confidently-edition-389',
        permanent: true,
      },
      {
        source: '/blog/aipowered-geo-and-aeo-synergy-the-ultimate-guide-to-scaling-your-startups-mvp-visibility-in-competitive-markets',
        destination: '/blog/generative-engine-optimization-geo-the-complete-2026-strategy-guide-edition-428',
        permanent: true,
      },
      {
        source: '/blog/unlocking-ai-automation-the-secret-to-scalable-mvp-development-for-tech-startups',
        destination: '/blog/how-custom-ai-mvps-are-transforming-healthcare-startups',
        permanent: true,
      },
      // Legacy AI and security insights redirected to /ai-systems
      {
        source: '/blog/how-openais-rogue-ai-incidents-are-shaping-the-future-of-cybersecurity-strategies-for-startups',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/the-rise-of-rogue-ai-what-startups-need-to-know-about-cybersecurity-in-the-age-of-openai',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-ai-boom-how-startups-can-thrive-amidst-rising-cybersecurity-challenges',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/ai-compliance-in-2026-strategies-for-startups-to-navigate-regulatory-challenges-and-thrive',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/ai-safety-initiatives-how-industry-leaders-are-collaborating-to-mitigate-rogue-ai-threats',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/how-to-protect-your-startup-from-rogue-ai-lessons-from-the-recent-openai-incident',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/the-rise-of-openweight-ai-models-what-startups-need-to-know-to-compete-with-giants',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-rogue-ai-landscape-lessons-for-startups-in-cybersecurity-and-ethics',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/apple-vs-openai-what-the-trade-secrets-lawsuit-means-for-the-future-of-ai-innovation',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/the-implications-of-openais-rogue-model-what-startups-need-to-know-to-safeguard-ai-integration',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-ai-revolution-what-ben-afflecks-587m-bet-on-filmmaking-technology-means-for-startups',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-new-frontier-of-ai-security-lessons-from-openais-recent-breach',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-ai-landscape-what-startups-must-learn-from-the-recent-openaihugging-face-incident',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/why-jeff-bezos-investment-in-ai-for-chipmaking-could-revolutionize-startup-funding-in-tech',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/how-aidriven-technologies-are-shaping-the-future-of-financial-markets-and-investment-strategies',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/disrupting-the-status-quo-how-openweight-ai-models-are-redefining-startup-strategies-in-2024',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/aidriven-startups-navigating-the-new-frontiers-of-wealth-and-innovation-in-tech',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/the-rise-of-openweight-ai-models-a-game-changer-for-startups-competing-in-the-global-tech-landscape',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/disrupting-the-status-quo-how-openweight-ai-models-are-redefining-startup-strategies-in-2026',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/unleashing-the-power-of-gpt56-how-to-leverage-openais-latest-model-for-revolutionary-startup-innovations',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/architecture-of-multi-agent-ai-swarms',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-ai-security-landscape-lessons-from-openais-recent-breach-and-what-startups-can-learn',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/unlocking-the-future-of-ai-companions-what-openais-screenless-speaker-means-for-startup-innovation',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/chinas-ai-race-what-the-launch-of-the-worlds-largest-open-ai-model-means-for-global-tech-dynamics',
        destination: '/ai-systems',
        permanent: true,
      },
      {
        source: '/blog/navigating-the-future-of-ai-security-lessons-from-the-openai-hacking-incident-and-strategies-for-startup-resilience',
        destination: '/ai-systems',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
