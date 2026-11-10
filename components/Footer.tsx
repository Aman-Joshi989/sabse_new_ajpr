"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Footer({ services, blogs }: { services?: any[]; blogs?: any[] }) {
    const pathname = usePathname()
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const activeServices = services && services.length > 0
        ? services.slice(0, 6).map((s: any) => ({ name: s.title, href: `/services/${s.slug}` }))
        : [
            { name: 'B2B Growth Marketing', href: '/services/b2b-growth-marketing' },
            { name: 'GEO (AI Search Optimization)', href: '/services/geo-optimization' },
            { name: 'Website Security & Maintenance', href: '/services/website-security-maintenance' },
            { name: 'Technical SEO Services', href: '/services/technical-seo' },
            { name: 'Cloud Solutions & DevOps', href: '/services/cloud-solutions' },
            { name: 'Shopify SEO Agency', href: '/platforms/shopify-seo' },
            { name: 'Webflow Development & SEO', href: '/platforms/webflow-agency' },
            { name: 'Custom Web Dev', href: '/services/web-development' },
            { name: 'Website Maintenance Cost', href: '/services/website-maintenance-cost' },
            { name: 'Digital Marketing', href: '/services/digital-marketing' },
        ];

    const activeBlogs = blogs && blogs.length > 0
        ? blogs.slice(0, 4).map((b: any) => ({ name: b.title, href: `/blog/${b.slug}` }))
        : [
            { name: 'Top Marketing Companies in Haldwani', href: '/blog/top-digital-marketing-companies-in-haldwani' },
            { name: 'Marketing Strategy Consulting', href: '/blog/marketing-strategy-consulting-how-to-choose-a-provider' },
            { name: '2026 Agency Pricing Report', href: '/research/agency-pricing-report' },
            { name: 'WebFX Alternatives Comparison', href: '/compare/webfx-alternatives' }
        ];

    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Areas We Serve', href: '/locations' },
        { name: 'Digital Marketing Haldwani', href: '/locations/haldwani/digital-marketing' },
        { name: 'PPC Agency Singapore', href: '/locations/singapore/ppc-agency' },
        { name: 'London MVP Studio', href: '/locations/london/custom-software' },
        { name: 'Pricing & Retainers', href: '/pricing' },
        { name: 'Agency Comparisons', href: '/compare' },
        { name: 'Web Tonic Alternatives', href: '/compare/webtonic-alternatives' },
        { name: 'Rootstrap Alternatives', href: '/compare/rootstrap-alternatives' },
        { name: 'Client Portal', href: '/signup/client' },
        { name: 'Developer Network', href: '/signup/developer' },
        { name: 'Partner Program', href: '/affiliates' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ];

    const resourceLinks = [
        { name: 'Free Technical Audit', href: '/free-audit' },
        { name: 'Agency ROI Calculator', href: '/tools/agency-pricing-calculator' },
        { name: 'Engineering Solutions', href: '/solutions' },
        { name: 'AI Automation & Workflows', href: '/ai-systems' },
        { name: 'SEO & Growth Retainers', href: '/pricing/seo-cost' },
        { name: 'PPC Management Cost', href: '/pricing/ppc-cost' },
        { name: 'Website Cost Guide', href: '/pricing/website-cost' },
        { name: 'B2B Growth Marketing', href: '/services/b2b-growth-marketing' },
        { name: 'Tech & AI Glossary', href: '/glossary' },
    ];

    const logoSrc = mounted && resolvedTheme === 'dark'
        ? "/logo/ajpr-logo-white.png"
        : "/logo/ajpr-logo.png"

    // Hide global footer on dashboard, admin, login, and full-screen routes
    if (
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/admin') ||
        pathname === '/login' ||
        pathname === '/chat-agents'
    ) {
        return null;
    }

    return (
        <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-16 border-t border-slate-100 dark:border-slate-800 font-sans transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Logo & Main Links Grid */}
                <div className="flex flex-col md:flex-row justify-between mb-24 gap-12">

                    {/* Brand / Logo Section */}
                    <div className="md:w-1/4 space-y-4">
                        <Link href="/" className="inline-block relative w-32 h-12">
                            <Image
                                src={logoSrc}
                                alt="AJPR World"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Boutique full-stack web engineering & autonomous AI systems pod. We assume 100% responsibility for your software stability, delivery timelines, and intellectual property.
                        </p>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-medium space-y-1 pt-1">
                            <div>Direct: <a href="mailto:hello@ajprworld.com" className="text-blue-600 dark:text-blue-400 hover:underline">hello@ajprworld.com</a></div>
                            <div>Scoping: <Link href="/book-call" className="text-emerald-600 dark:text-emerald-400 hover:underline">Book 1-on-1 Architect Session</Link></div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-slate-900 dark:text-white">Services</h3>
                            <ul className="space-y-3 text-sm">
                                {activeServices.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-slate-900 dark:text-white">Company</h3>
                            <ul className="space-y-3 text-sm">
                                {companyLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-slate-900 dark:text-white">Resources</h3>
                            <ul className="space-y-3 text-sm">
                                {resourceLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-slate-900 dark:text-white">Trending Insights</h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                                        Blog Archive
                                    </Link>
                                </li>
                                {activeBlogs.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 gap-4">

                    {/* Left Side: Copyright & Country */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span>© {new Date().getFullYear()} AJPR World. All rights reserved.</span>
                        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                            <Image
                                src="https://flagcdn.com/in.svg"
                                alt="India"
                                width={16}
                                height={12}
                                className="object-cover rounded-[2px]"
                            />
                            <span>India</span>
                        </div>
                    </div>

                    {/* Center: Legal */}
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                    </div>

                    {/* Right Side: Socials */}
                    <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                        <Link href="https://twitter.com/AjprWorld" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-blue-500 transition-colors p-1" title="X (Twitter)">
                            <Twitter className="w-4 h-4" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="https://www.instagram.com/ajprworld/" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-pink-600 transition-colors p-1" title="Instagram">
                            <Instagram className="w-4 h-4" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="https://www.facebook.com/ajprworld" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-blue-700 transition-colors p-1" title="Facebook">
                            <Facebook className="w-4 h-4" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="https://www.linkedin.com/company/ajpr-world" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-blue-600 transition-colors p-1" title="LinkedIn">
                            <Linkedin className="w-4 h-4" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="https://www.youtube.com/@AJPRWorld" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-red-600 transition-colors p-1" title="YouTube">
                            <Youtube className="w-4 h-4" />
                            <span className="sr-only">YouTube</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
