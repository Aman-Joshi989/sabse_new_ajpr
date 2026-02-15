import { Star, ArrowUpRight } from 'lucide-react'

interface PortfolioCardProps {
    image?: string
    title: string
    subtitle?: string
    category?: string
    stats?: { label: string; value: string | number }[]
    author?: string
    date?: string
    href?: string
    className?: string
}

export function PortfolioCard({
    image,
    title,
    subtitle,
    category = "Project",
    stats = [],
    author = "AJPR",
    date = "2024",
    href,
    className = ""
}: PortfolioCardProps) {
    // Fallback for image
    const bgImage = image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    const CardContent = (
        <div className={`relative group w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl cursor-pointer bg-slate-900 ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)'
                    }}
                />
            </div>

            {/* Top Badge */}
            <div className="absolute top-6 left-6 z-20">
                <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">{category}</span>
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end mb-4">
                    <div className="max-w-[65%]">
                        <h2 className="text-2xl md:text-3xl font-bold mb-1 leading-tight text-white drop-shadow-sm">{title}</h2>
                        {subtitle && (
                            <p className="text-sm text-gray-200 font-medium line-clamp-1 opacity-90">{subtitle}</p>
                        )}
                    </div>

                    {/* Stats - Grid layout for right side */}
                    {stats.length > 0 && (
                        <div className="flex gap-4 text-right">
                            {stats.slice(0, 2).map((stat, idx) => (
                                <div key={idx} className="flex flex-col items-end">
                                    <div className="text-lg md:text-xl font-bold leading-none mb-1">{stat.value}</div>
                                    <div className="text-[10px] md:text-xs text-gray-300 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/30 mb-4" />

                {/* Footer */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-300">
                    <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                        {date} · {author}
                    </div>

                    <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        Live Demo
                        <ArrowUpRight className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                {CardContent}
            </a>
        );
    }

    return CardContent;
}
