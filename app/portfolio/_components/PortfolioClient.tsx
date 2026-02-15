'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Sparkles, Zap, Monitor, Star, Menu, X } from 'lucide-react'
import { PortfolioCard } from './PortfolioCard'

interface PortfolioClientProps {
  initialProjects: any[];
}

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [projects] = useState(() => {
    const whitelist = ['tanishk', 'kumaun', 'dwaparyug'];
    return initialProjects.filter((p: any) =>
      whitelist.some(w => (p.title + (p.url || '')).toLowerCase().includes(w))
    );
  })

  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category))) as string[]]

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p: any) => p.category === selectedCategory)

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
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 overflow-hidden relative">
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
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800 mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">Crafting Digital Experiences</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-300% leading-tight">
            My Portfolio
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Transforming ideas into powerful digital solutions. Each project is crafted with
            <span className="text-purple-600 dark:text-purple-400 font-semibold"> cutting-edge technology</span> and
            <span className="text-pink-600 dark:text-pink-400 font-semibold"> exceptional design</span>.
          </p>

          {/* Stats Bar - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-8 sm:mt-12 max-w-lg mx-auto">
            {[
              { label: 'Projects', value: '10+', icon: <Monitor className="w-4 h-4 sm:w-5 sm:h-5" /> },
              { label: 'Clients', value: '10+', icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" /> },
              { label: 'Experience', value: '5Y+', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> }
            ].map((stat, i) => (
              <div key={i} className="group text-center">
                <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
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
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800"
            >
              <span className="text-slate-700 dark:text-slate-200 font-medium">Filter: {selectedCategory}</span>
              <Menu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
                      className={`w-full px-4 py-3 rounded-xl text-left transition-all ${selectedCategory === category
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
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border transition-all duration-300 text-sm sm:text-base ${selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white scale-105'
                  : 'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-500 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project: any, index: number) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PortfolioCard
                image={project.image_url}
                title={project.title}
                subtitle={project.description}
                category={project.category}
                stats={project.stats ? Object.entries(project.stats).map(([label, value]) => ({ label, value: String(value) })) : []}
                date={project.year}
                href={project.url}
                author="AJPR"
              />
            </div>
          ))}
        </div>

        {/* Call to Action - Mobile Optimized */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center px-4">
          <div className="inline-flex flex-col items-center">
            <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-200 mb-6 sm:mb-8">
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