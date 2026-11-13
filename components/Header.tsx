'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Briefcase,
  Code2,
  Cloud,
  Palette,
  Phone,
  Layers,
  Lock,
  Cpu,
  Bot,
  Scale,
  TrendingUp,
  ShieldCheck,
  Menu,
  ChevronDown,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  X
} from 'lucide-react'

const iconRegistry: Record<string, any> = {
  Briefcase,
  Code2,
  Cloud,
  Palette,
  Phone,
  Layers,
  Lock,
  Cpu,
  Bot,
  Scale,
  TrendingUp,
  ShieldCheck
}

import { ModeToggle } from '@/components/mode-toggle'
import RegionSelector from '@/components/RegionSelector'
import { useRegion } from '@/components/providers/RegionProvider'
import { useTheme } from 'next-themes'
import { useCart } from '@/components/providers/CartProvider'
import { useAuth } from '@/components/providers/AuthProvider'
import { logout } from '@/app/actions'
import { trackBookCall } from '@/lib/analytics'

const CartDrawer = dynamic(() => import('@/components/CartDrawer'), { ssr: false })
const MobileNavDrawer = dynamic(() => import('@/components/MobileNavDrawer'), { ssr: false })

export default function Header({ services }: { services?: any[] }) {
    const [scrolled, setScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)
    const [hasOpenedCart, setHasOpenedCart] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [hasOpenedMobileMenu, setHasOpenedMobileMenu] = useState(false)
    const pathname = usePathname()

    const { resolvedTheme } = useTheme()
    const { cart, isCartOpen, setIsCartOpen } = useCart()

    useEffect(() => {
        if (isCartOpen) {
            setHasOpenedCart(true)
        }
    }, [isCartOpen])
    const { user } = useAuth()
    const lastScrollY = useRef(0)

    // Map dynamic services to dropdown items with clear, customer-friendly titles
    const coreServices = [
        { name: 'AI Automation & Agent Systems', href: '/ai-systems', icon_name: 'Cpu', desc: 'LeadOS, WhatsApp agents & business systems' },
        { name: 'Custom Web Development', href: '/services/web-development', icon_name: 'Code2', desc: 'Next.js, high-speed apps & APIs' },
        { name: 'Website Security & Maintenance', href: '/services/website-security-maintenance', icon_name: 'ShieldCheck', desc: '24/7 uptime, automated backups & security SLA' },
        { name: 'Technical SEO & GEO', href: '/services/technical-seo', icon_name: 'TrendingUp', desc: 'Core Web Vitals, JSON-LD & AI citations' },
        { name: 'Cloud Solutions & DevOps', href: '/services/cloud-solutions', icon_name: 'Cloud', desc: 'AWS, GCP, Docker & 99.99% uptime' },
        { name: 'AI Chatbots & Agents', href: '/services/ai-chatbot-development', icon_name: 'Bot', desc: 'Context-aware LLMs & autonomous workflows' },
        { name: 'SaaS Platform Architecture', href: '/services/saas-product-development', icon_name: 'Layers', desc: 'Multi-tenant apps & scalable backends' },
        { name: 'Digital Growth Marketing', href: '/services/digital-marketing', icon_name: 'Phone', desc: 'Performance marketing & revenue funnels' }
    ];

    const pricingLinks = [
        { name: 'Packages & Transparent Pricing', href: '/pricing', icon_name: 'Briefcase', desc: 'Flat project sprints & monthly retainers' },
        { name: 'Website Cost Calculator', href: '/pricing/website-cost', icon_name: 'Scale', desc: 'Interactive breakdown for web builds' },
        { name: 'SEO & Growth Retainers', href: '/pricing/seo-cost', icon_name: 'TrendingUp', desc: 'ROI-driven organic search tiers' },
        { name: 'Agency ROI Estimator', href: '/tools/agency-pricing-calculator', icon_name: 'ShieldCheck', desc: 'Compare in-house vs. senior agency ROI' },
        { name: 'Agency Comparisons Hub', href: '/compare', icon_name: 'Scale', desc: 'Objective agency alternatives & benchmark audits' }
    ];

    const resourceLinks = [
        { name: 'Engineering Solutions Hub', href: '/solutions', icon_name: 'Layers', desc: 'High-velocity 4-week tech stack sprints' },
        { name: 'Interactive Business Tools', href: '/tools', icon_name: 'Cpu', desc: 'Calculators, audit tools & generators' },
        { name: 'Free Architecture Audit', href: '/free-audit', icon_name: 'ShieldCheck', desc: 'Comprehensive technical review in 48 hours' },
        { name: 'Engineering Insights & Blog', href: '/blog', icon_name: 'Briefcase', desc: 'Technical playbooks & growth case studies' },
        { name: 'Tech & AI Glossary', href: '/glossary', icon_name: 'Layers', desc: 'Plain-English technical definitions' }
    ];

    // High-clarity 5-pillar navigation
    const navigation = [
        {
            name: 'Services',
            href: '/services',
            dropdown: coreServices
        },
        { 
            name: 'Work', 
            href: '/portfolio' 
        },
        {
            name: 'Pricing',
            href: '/pricing',
            dropdown: pricingLinks
        },
        {
            name: 'Resources',
            href: '/tools',
            dropdown: resourceLinks
        },
        { 
            name: 'About', 
            href: '/about' 
        },
    ]

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrolled(currentScrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // helper to check if current route is active
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname === href || pathname.startsWith(href + '/')
    }

    const logoSrc = mounted && resolvedTheme === 'dark'
        ? "/logo/ajpr-logo-white.png"
        : "/logo/ajpr-logo.png"

    // Hide global header on dashboard and admin/login routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname === '/login') {
        return null;
    }

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-colors duration-200 ${scrolled
                ? 'bg-white/90 dark:bg-[#030712]/90 backdrop-blur-xl shadow-sm border-b border-slate-200/80 dark:border-slate-800/80'
                : 'bg-transparent backdrop-blur-none border-b border-transparent'
                }`}
        >
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group shrink-0" title="AJPR World - Senior Software Engineering & AI Studio" aria-label="AJPR World - Senior Software Engineering & AI Studio">
                    <div className="group-hover:opacity-90 transition-opacity duration-300">
                        <Image
                            src="/logo/ajpr-logo.png"
                            alt="AJPR World - Senior Software Engineering & AI Studio"
                            width={112}
                            height={40}
                            className="object-contain dark:hidden"
                        />
                        <Image
                            src="/logo/ajpr-logo-white.png"
                            alt="AJPR World - Senior Software Engineering & AI Studio"
                            width={112}
                            height={40}
                            className="object-contain hidden dark:block"
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-2 h-full">
                    {navigation.map((item) => (
                        <div
                            key={item.name}
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                prefetch={false}
                                className={`flex items-center text-sm font-semibold px-3.5 py-1.5 rounded-full transition-all outline-none ${isActive(item.href)
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                                    }`}
                            >
                                {item.name}
                                {item.dropdown && <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />}
                            </Link>

                            {item.dropdown && activeDropdown === item.name && (
                                <div className="absolute top-full -left-4 mt-1 w-80 bg-white dark:bg-[#0a0f1c] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 animate-fade-down z-50">
                                    <div className="space-y-1">
                                        {item.dropdown.map((subItem) => {
                                            const IconComponent = subItem.icon_name 
                                                ? iconRegistry[subItem.icon_name] || Briefcase 
                                                : Briefcase
                                            return (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    prefetch={false}
                                                    className={`flex items-start p-2.5 rounded-xl transition-all ${isActive(subItem.href)
                                                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                                                        }`}
                                                >
                                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shrink-0 mr-3">
                                                        <IconComponent className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{subItem.name}</div>
                                                        {subItem.desc && (
                                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{subItem.desc}</div>
                                                        )}
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 px-2 py-1 flex items-center justify-between text-xs">
                                        <Link href={item.href} prefetch={false} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                                            View all {item.name.toLowerCase()} &rarr;
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="hidden lg:flex items-center space-x-2.5">
                    <RegionSelector />
                    <ModeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open Shopping Cart"
                    >
                        <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Open Shopping Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Button>

                    {user ? (
                        <div className="relative group">
                            <button type="button" className="flex items-center space-x-2 focus:outline-none" aria-label="User Account Menu">
                                <span className="sr-only">User Account Menu</span>
                                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 overflow-hidden">
                                    {user.avatar_url ? (
                                        <Image
                                            src={user.avatar_url}
                                            alt={user.name}
                                            width={36}
                                            height={36}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                            </button>
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#0a0f1c] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 animate-fade-down hidden group-hover:block z-50">
                                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                                </div>
                                <Link
                                    href={user.role === 'admin' ? '/dashboard/admin' : user.role === 'client' ? '/dashboard/client' : '/dashboard/developer'}
                                    className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600"
                                >
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Link>
                                <form action={logout}>
                                    <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-left">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2.5">
                            <Link href="/login" prefetch={false} className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1">
                                Log In
                            </Link>
                            <Button
                                className="h-9 px-4 text-xs font-bold rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-md hover:shadow-lg transition-all"
                                asChild
                            >
                                <Link href="/book-call" prefetch={false} onClick={() => trackBookCall('header_desktop')}>Book Strategy Call</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center space-x-1.5">
                    <RegionSelector />
                    <ModeToggle />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Open Shopping Cart"
                    >
                        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Open Shopping Cart</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Open Mobile Menu"
                        onClick={() => {
                            setHasOpenedMobileMenu(true)
                            setMobileMenuOpen(true)
                        }}
                    >
                        <Menu className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Open Mobile Menu</span>
                    </Button>
                </div>
            </div>
            {hasOpenedMobileMenu && (
                <MobileNavDrawer
                    open={mobileMenuOpen}
                    onOpenChange={setMobileMenuOpen}
                    logoSrc={logoSrc}
                    navigation={navigation}
                    iconRegistry={iconRegistry}
                    isActive={isActive}
                    user={user}
                />
            )}
            {hasOpenedCart && <CartDrawer />}
        </header>
    )
}
