'use client'

import { Star, ArrowUpRight, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface PortfolioCardProps {
    image?: string
    title: string
    subtitle?: string
    category?: string
    stats?: { label: string; value: string | number }[]
    tags?: string[]
    author?: string
    date?: string
    href?: string
    className?: string
    isFeatured?: boolean
}

export function PortfolioCard({
    image,
    title,
    subtitle,
    category = "Project",
    stats = [],
    tags = [],
    author = "AJPR",
    date = "2026",
    href,
    className = "",
    isFeatured = false
}: PortfolioCardProps) {
    const bgImage = image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl ${className} ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
        >
            {/* Image Section */}
            <div className={`relative w-full ${isFeatured ? 'aspect-[16/9]' : 'aspect-square'} overflow-hidden`}>
                <motion.img
                    src={bgImage}
                    alt={title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 dark:from-slate-950 dark:via-slate-950/40 to-transparent opacity-90" />

                {/* Status Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <Badge className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 text-white uppercase tracking-wider text-[10px] font-bold px-3 py-1">
                        {category}
                    </Badge>
                    {isFeatured && (
                        <Badge className="bg-blue-600 dark:bg-purple-500 text-white border-0 text-[10px] font-bold px-3 py-1">
                            FEATURED
                        </Badge>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 relative z-10 -mt-12">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <h3 className={`font-bold text-white tracking-tight leading-none ${isFeatured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                            {title}
                        </h3>
                        <p className="text-slate-300 dark:text-slate-400 text-sm md:text-base font-medium line-clamp-2 max-w-[90%] font-outfit">
                            {subtitle}
                        </p>
                    </div>
                    {href && (
                        <motion.a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 transition-colors shadow-lg"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </motion.a>
                    )}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 4 && (
                        <span className="text-[11px] font-bold text-slate-500">+{tags.length - 4} more</span>
                    )}
                </div>

                {/* Stats Grid */}
                {stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                        {stats.map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-mono">{stat.value}</div>
                                <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 uppercase tracking-widest font-black">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Date/Author Line */}
                <div className="mt-6 flex items-center justify-between text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                    <span>{author}</span>
                    <span>{date}</span>
                </div>
            </div>

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 skew-x-12 translate-x-full group-hover:translate-x-[-100%]" />
        </motion.div>
    )
}
