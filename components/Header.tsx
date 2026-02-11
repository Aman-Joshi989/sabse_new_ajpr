'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from '@/components/ui/sheet'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    Menu, ChevronDown, Code2, Scale, Calculator,
    Phone, Building, ShoppingCart
} from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { useTheme } from 'next-themes'
import { useCart } from '@/components/providers/CartProvider'
import CartDrawer from '@/components/CartDrawer'

const navigation = [
    { name: 'Home', href: '/' },
    {
        name: 'Services',
        href: '/services',
        dropdown: [
            { name: 'Web Development', href: '/services/web-development', icon: Code2 },
            { name: 'Web Development', href: '/services/web-development', icon: Code2 },
            { name: 'Legal Services', href: '/services/legal', icon: Scale },
            { name: 'Financial Services', href: '/services/financial', icon: Calculator },
            { name: 'Business Registration', href: '/services/business', icon: Building },
            { name: 'Cloud Solutions', href: '/services/cloud-solutions', icon: Calculator },
            { name: 'Digital Marketing', href: '/services/digital-marketing', icon: Phone },
        ]
    },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
]

export default function Header({ user }: { user?: any }) {
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { resolvedTheme } = useTheme()
    const { cart, setIsCartOpen } = useCart()

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // helper to check if current route is active
    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/')
    }


    const logoSrc = mounted && resolvedTheme === 'dark' 
        ? "/logo/ajpr-logo-white.png" 
        : "/logo/ajpr-logo.png"

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? 'bg-background/95 backdrop-blur-lg shadow-lg'
                : 'bg-background/80 backdrop-blur-sm'
                } border-b border-border/50`}
        >
            <div className="container flex h-20 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative w-32 h-12 group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src={logoSrc}
                            alt="AJPR World Logo"
                            fill
                            className="object-contain"
                            priority
                            key={logoSrc} // Force re-render on src change
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={`flex items-center font-medium py-2 transition-colors ${isActive(item.href)
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-primary'
                                    }`}
                            >
                                {item.name}
                                {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                            </Link>

                            {item.dropdown && activeDropdown === item.name && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 animate-fade-down">
                                    {item.dropdown.map((subItem) => {
                                        const IconComponent = subItem.icon
                                        return (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className={`flex items-center px-4 py-3 transition-colors ${isActive(subItem.href)
                                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20'
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20'
                                                    }`}
                                            >
                                                <IconComponent className="w-5 h-5 mr-3 text-blue-600" />
                                                <div className="font-medium">{subItem.name}</div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="relative" 
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Button>
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 focus:outline-none">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border overflow-hidden">
                                        {user.avatar_url ? (
                                            <Image 
                                                src={user.avatar_url} 
                                                alt={user.name} 
                                                width={40} 
                                                height={40} 
                                                className="object-cover"
                                            /> 
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 animate-fade-down hidden group-hover:block">
                                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                                    </div>
                                    <Link 
                                        href={user.role === 'admin' ? '/dashboard/admin' : user.role === 'client' ? '/dashboard/client' : '/dashboard/developer'} 
                                        className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600"
                                    >
                                        <code className="material-symbols-outlined text-lg mr-2">dashboard</code>
                                        Dashboard
                                    </Link>
                                    <form action="/auth/logout" onSubmit={async (e) => {
                                        e.preventDefault();
                                        // Dynamic import to avoid server action in client component issues if not handled
                                        const { logout } = await import('@/app/actions');
                                        await logout();
                                    }}>
                                        <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-left">
                                            <code className="material-symbols-outlined text-lg mr-2">logout</code>
                                            Sign Out
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600">
                                    Log In
                                </Link>
                                <Button
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                    asChild
                                >
                                    <Link href="/contact">Get Quote</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center space-x-2">
                    <ModeToggle />
                    
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative" 
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="h-5 w-5" />
                            {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 p-6 overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle className="flex items-center space-x-2">
                                    <Image
                                        src={logoSrc}
                                        alt="AJPR World"
                                        width={120}
                                        height={40}
                                        className="object-contain"
                                        key={logoSrc + "-mobile"}
                                    />
                                </SheetTitle>
                            </SheetHeader>

                            {/* Mobile Nav with Accordion */}
                            <div className="flex flex-col mt-8 space-y-4">
                                {navigation.map((item) =>
                                    item.dropdown ? (
                                        <Accordion type="single" collapsible key={item.name} className="w-full">
                                            <AccordionItem value={item.name}>
                                                <AccordionTrigger
                                                    className={`text-lg font-medium ${isActive(item.href)
                                                        ? 'text-blue-600 dark:text-blue-400'
                                                        : 'hover:text-blue-600'
                                                        }`}
                                                >
                                                    {item.name}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="ml-2 space-y-2">
                                                        {item.dropdown.map((subItem) => {
                                                            const IconComponent = subItem.icon
                                                            return (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className={`flex items-center py-2 transition-colors ${isActive(subItem.href)
                                                                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                                                                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                                                                        }`}
                                                                >
                                                                    <IconComponent className="w-4 h-4 mr-2 text-blue-500" />
                                                                    {subItem.name}
                                                                </Link>
                                                            )
                                                        })}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`text-lg font-medium transition-colors ${isActive(item.href)
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'hover:text-blue-600'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                )}
                                
                                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                                    {user ? (
                                        <>
                                            <div className="flex items-center space-x-3 px-2 py-2">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border overflow-hidden">
                                                    {user.avatar_url ? (
                                                        <Image 
                                                            src={user.avatar_url} 
                                                            alt={user.name} 
                                                            width={40} 
                                                            height={40} 
                                                            className="object-cover"
                                                        /> 
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-lg">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{user.name}</p>
                                                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                                                </div>
                                            </div>

                                            <Link
                                                href={user.role === 'admin' ? '/dashboard/admin' : user.role === 'client' ? '/dashboard/client' : '/dashboard/developer'}
                                                className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
                                            >
                                                Dashboard
                                            </Link>
                                            
                                            <form action="/auth/logout" onSubmit={async (e) => {
                                                e.preventDefault();
                                                const { logout } = await import('@/app/actions');
                                                await logout();
                                            }}>
                                                <button className="w-full flex items-center text-lg font-medium text-red-600 hover:text-red-700 text-left">
                                                    Sign Out
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
                                        >
                                            Log In
                                        </Link>
                                    )}
                                </div>

                                {/* CTA Button */}
                                <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all" asChild>
                                    <Link href="/contact">Get Quote</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <CartDrawer />
        </header>
    )
}
