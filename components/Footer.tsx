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
            { name: 'Custom Web Dev', href: '/services/custom-web-development-ai-solutions' },
            { name: 'AI Chatbot Dev', href: '/services/ai-chatbot-development' },
            { name: 'AI Automation', href: '/services/business-ai-automation' },
            { name: 'AI Voice Agents', href: '/services/ai-voice-agent-development' },
            { name: 'Digital Marketing', href: '/services/ai-digital-marketing-services' },
            { name: 'Performance Marketing', href: '/services/performance-marketing' },
        ];

    const activeBlogs = blogs && blogs.length > 0
        ? blogs.slice(0, 3).map((b: any) => ({ name: b.title, href: `/blog/${b.slug}` }))
        : [
            { name: 'What is GEO (AI Search)?', href: '/blog/what-is-geo-generative-engine-optimization' }
        ];

    const companyLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Startup Growth Kit', href: '/startup-growth-kit' },
        { name: 'Aman Joshi (CEO)', href: '/aman-joshi' },
        { name: 'AI Chat Playground', href: '/chat-agents' },
        { name: 'Swarm Simulator', href: '/demo-ruflo' },
        { name: 'Tech & AI Glossary', href: '/glossary' },
        { name: 'Locations & Areas Served', href: '/locations' },
        { name: 'Sitemap', href: '/sitemap' },
    ];

    const logoSrc = mounted && resolvedTheme === 'dark'
        ? "/logo/ajpr-logo-white.png"
        : "/logo/ajpr-logo.png"

    // Hide global footer on dashboard, login, and full-screen routes
    if (
        pathname.startsWith('/dashboard') || 
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
                    <div className="md:w-1/4">
                        <Link href="/" className="inline-block mb-6 relative w-32 h-12">
                            <Image
                                src={logoSrc}
                                alt="AJPR World"
                                fill
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Links Columns */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
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
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 text-sm">

                    {/* Left Side: Country & Links */}
                    <div className="flex flex-wrap items-center gap-6 mb-4 md:mb-0">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                            <Image
                                src="https://flagcdn.com/in.svg"
                                alt="India"
                                width={20}
                                height={15}
                                className="object-cover rounded-sm"
                            />
                            India
                        </div>
                        <div className="flex gap-6 text-slate-500 dark:text-slate-500">
                            <Link href="/privacy" className="hover:text-slate-800 dark:hover:text-slate-300">Privacy</Link>
                            <Link href="/terms" className="hover:text-slate-800 dark:hover:text-slate-300">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Right Side: Socials */}
                    <div className="flex items-center gap-6 text-slate-400 dark:text-slate-500">
                        <Link href="https://x.com/AjprWorld" target="_blank" rel="nofollow" className="hover:text-blue-500 transition-colors">
                            <Twitter className="w-5 h-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="https://www.instagram.com/ajprworld/" target="_blank" rel="nofollow" className="hover:text-pink-600 transition-colors">
                            <Instagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="https://facebook.com" target="_blank" rel="nofollow" className="hover:text-blue-700 transition-colors">
                            <Facebook className="w-5 h-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="https://www.linkedin.com/company/ajpr-world" target="_blank" rel="nofollow" className="hover:text-blue-600 transition-colors">
                            <Linkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="https://youtube.com" target="_blank" rel="nofollow" className="hover:text-red-600 transition-colors">
                            <Youtube className="w-5 h-5" />
                            <span className="sr-only">YouTube</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
