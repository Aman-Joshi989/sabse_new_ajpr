/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://ajprworld.com', // 👈 Your main domain
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/server-sitemap.xml'], // if needed
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://ajprworld.com/sitemap.xml',
        ],
    },
}
