/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
