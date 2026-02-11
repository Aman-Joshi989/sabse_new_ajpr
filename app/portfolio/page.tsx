'use client'

import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github, ArrowUpRight, Sparkles, Code2, Palette, Zap, Globe, Monitor, Smartphone, Star, ChevronRight, Menu, X } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Tarot Tanishk',
    url: 'https://tarottanishk.com',
    category: 'Spiritual & Wellness',
    tags: ['Wix', 'JavaScript', 'CSS'],
    description: 'A mystical tarot reading platform with immersive user experience and spiritual guidance.',
    gradient: 'from-purple-400 via-pink-400 to-indigo-400',
    accent: 'bg-gradient-to-r from-purple-400 to-pink-400',
    year: '2024',
    featured: true,
    stats: { users: '5K+', rating: '4.9', performance: '99%' }
  },
  {
    id: 2,
    title: 'Soul Capture',
    category: 'Spiritual & Wellness',
    tags: ['Wordpress', 'PHP', 'Elementor',],
    description: 'A mystical stone healing e-commerce platform with immersive user experience and spiritual guidance.',
    gradient: 'from-indigo-400 via-purple-400 to-pink-400',
    accent: 'bg-gradient-to-r from-indigo-400 to-purple-400',
    year: '2024',
    stats: { transactions: '100K+', uptime: '99.9%', users: '10K+' }
  },
  {
    id: 3,
    title: 'Pankaj Sammal Arts',
    url: 'https://pankajsammalarts.com',
    category: 'Art & Portfolio',
    tags: ['Laravel', 'PHP', 'MySQL'],
    description: 'An elegant artist portfolio showcasing contemporary artworks with interactive galleries.',
    gradient: 'from-orange-400 via-red-400 to-pink-400',
    accent: 'bg-gradient-to-r from-orange-400 to-red-400',
    year: '2024',
    featured: true,
    stats: { views: '10K+', rating: '5.0', artworks: '200+' }
  },
  {
    id: 4,
    title: 'Dwaparyug',
    url: 'https://dwaparyug.org',
    category: 'Cultural & Heritage',
    tags: ['Next.js', 'Neondb', 'Node.js', 'Tailwind CSS','Prisma'],
    description: 'A cultural heritage platform preserving ancient wisdom and traditions for modern audiences.',
    gradient: 'from-amber-400 via-yellow-400 to-orange-400',
    accent: 'bg-gradient-to-r from-amber-400 to-yellow-400',
    year: '2024',
    featured: true,
    stats: { articles: '500+', rating: '4.8', members: '3K+' }
  },
  {
    id: 5,
    title: 'Kumaun University Nainital',
    url: 'https://www.kunainital.ac.in/',
    category: 'Education',
    tags: ['Laravel', 'PHP', 'MySQL'],
    description: 'Comprehensive university website with student portal, academic resources, and administration systems.',
    gradient: 'from-blue-400 via-cyan-400 to-teal-400',
    accent: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    year: '2023',
    featured: true,
    stats: { students: '20K+', courses: '100+', rating: '4.7' }
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    category: 'Retail & Commerce',
    tags: ['Next.js', 'Stripe', 'Prisma'],
    description: 'High-performance e-commerce solution with real-time inventory and seamless checkout experience.',
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    accent: 'bg-gradient-to-r from-green-400 to-emerald-400',
    year: '2024',
    stats: { sales: '$1M+', products: '5K+', conversion: '3.5%' }
  },
  {
    id: 7,
    title: 'FinTech Dashboard',
    category: 'Finance',
    tags: ['React', 'D3.js', 'WebSocket'],
    description: 'Real-time financial analytics dashboard with advanced data visualization and AI insights.',
    gradient: 'from-indigo-400 via-purple-400 to-pink-400',
    accent: 'bg-gradient-to-r from-indigo-400 to-purple-400',
    year: '2024',
    stats: { transactions: '100K+', uptime: '99.9%', users: '10K+' }
  },
  {
    id: 8,
    title: 'Healthcare App',
    category: 'Healthcare',
    tags: ['React Native', 'Firebase', 'AI/ML'],
    description: 'Telemedicine platform connecting patients with healthcare providers seamlessly.',
    gradient: 'from-cyan-400 via-blue-400 to-purple-400',
    accent: 'bg-gradient-to-r from-cyan-400 to-blue-400',
    year: '2023',
    stats: { consultations: '50K+', doctors: '500+', rating: '4.9' }
  },
  {
    id: 9,
    title: 'Social Impact Network',
    category: 'Social Good',
    tags: ['Vue.js', 'GraphQL', 'AWS'],
    description: 'Community platform driving social change through collaborative initiatives and impact tracking.',
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    accent: 'bg-gradient-to-r from-pink-400 to-rose-400',
    year: '2023',
    stats: { campaigns: '200+', volunteers: '15K+', impact: '$5M+' }
  }
]

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [touchedCard, setTouchedCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 overflow-hidden relative">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-30 animate-float-slow" />
        </div>
        
        {/* Dot Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div ref={containerRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs sm:text-sm text-purple-700 font-medium">Crafting Digital Experiences</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-300% leading-tight">
            My Portfolio
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Transforming ideas into powerful digital solutions. Each project is crafted with 
            <span className="text-purple-600 font-semibold"> cutting-edge technology</span> and 
            <span className="text-pink-600 font-semibold"> exceptional design</span>.
          </p>

          {/* Stats Bar - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-12 max-w-lg mx-auto">
            {[
              { label: 'Projects', value: '10+', icon: <Monitor className="w-4 h-4 sm:w-5 sm:h-5" /> },
              { label: 'Clients', value: '10+', icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" /> },
              { label: 'Experience', value: '5Y+', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> }
            ].map((stat, i) => (
              <div key={i} className="group text-center">
                <div className="flex flex-col items-center gap-1 text-slate-500 group-hover:text-purple-600 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{stat.label}</span>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter - Mobile Optimized */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          {/* Mobile Filter Toggle */}
          <div className="sm:hidden mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-purple-200"
            >
              <span className="text-slate-700 font-medium">Filter: {selectedCategory}</span>
              <Menu className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          {/* Mobile Filter Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 sm:hidden">
              <div className="absolute inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Select Category</h3>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-50 text-slate-700 hover:bg-purple-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filter */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white scale-105'
                    : 'border-purple-200 hover:border-purple-400 text-slate-600 hover:text-purple-600 bg-white hover:bg-purple-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative animate-fade-up touch-manipulation"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onTouchStart={() => setTouchedCard(project.id)}
              onTouchEnd={() => setTouchedCard(null)}
            >
              <div className={`relative bg-white rounded-2xl sm:rounded-3xl border-2 ${
                hoveredProject === project.id || touchedCard === project.id 
                  ? 'border-purple-400' 
                  : 'border-purple-100'
              } transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]`}>
                
                {/* Gradient Top Bar */}
                <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${project.gradient}`} />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span className="hidden sm:inline">Featured</span>
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6 lg:p-8">
                  {/* Project Header */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${project.accent} rounded-xl sm:rounded-2xl flex items-center justify-center`}>
                        <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-500">{project.year}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-slate-800 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-600 font-medium">{project.category}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg text-xs text-purple-700 border border-purple-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  {project.stats && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 py-3 sm:py-4 border-t border-purple-100">
                      {Object.entries(project.stats).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <div className="text-base sm:text-lg font-bold text-purple-600">{value}</div>
                          <div className="text-xs text-slate-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform text-sm sm:text-base"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </a>
                    ) : (
                      <button className="flex-1 bg-slate-100 text-slate-400 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed text-sm sm:text-base">
                        <ExternalLink className="w-4 h-4" />
                        Coming Soon
                      </button>
                    )}
                    <button className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors border border-purple-200">
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action - Mobile Optimized */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center px-4">
          <div className="inline-flex flex-col items-center">
            <p className="text-xl sm:text-2xl text-slate-700 mb-6 sm:mb-8">
              Have a project in mind? Let's create something 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold"> amazing together</span>
            </p>
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-base sm:text-lg text-white overflow-hidden hover:scale-105 active:scale-95 transition-transform">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateX(-50%) translateY(-50%) scale(1);
          }
          50% {
            transform: translateX(-50%) translateY(-60%) scale(1.15);
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }

        .bg-300\% {
          background-size: 300% 300%;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .touch-manipulation {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }
        }
      `}</style>
    </section>
  )
}