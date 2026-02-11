'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Code2, Database, Cloud, Smartphone, Globe, Shield,
    Zap, Palette, Server, Monitor, Cpu, HardDrive
} from 'lucide-react'

const technologies = {
    'Frontend': {
        icon: Monitor,
        color: 'from-blue-500 to-cyan-500',
        items: [
            { name: 'Next.js 14', level: 95, icon: '⚡' },
            { name: 'React 18', level: 98, icon: '⚛️' },
            { name: 'TypeScript', level: 92, icon: '🔷' },
            { name: 'Tailwind CSS', level: 96, icon: '🎨' },
            { name: 'Framer Motion', level: 88, icon: '🎬' },
            { name: 'Three.js', level: 82, icon: '🎲' }
        ]
    },
    'Backend': {
        icon: Server,
        color: 'from-green-500 to-emerald-500',
        items: [
            { name: 'Node.js', level: 94, icon: '🟢' },
            { name: 'Python', level: 90, icon: '🐍' },
            { name: 'GraphQL', level: 85, icon: '🔗' },
            { name: 'REST APIs', level: 96, icon: '🌐' },
            { name: 'Microservices', level: 88, icon: '🔧' },
            { name: 'WebSockets', level: 82, icon: '🔌' }
        ]
    },
    'Database': {
        icon: Database,
        color: 'from-purple-500 to-pink-500',
        items: [
            { name: 'PostgreSQL', level: 92, icon: '🐘' },
            { name: 'MongoDB', level: 90, icon: '🍃' },
            { name: 'Redis', level: 86, icon: '🔴' },
            { name: 'Prisma', level: 94, icon: '🔺' },
            { name: 'Supabase', level: 88, icon: '⚡' },
            { name: 'Firebase', level: 85, icon: '🔥' }
        ]
    },
    'Cloud & DevOps': {
        icon: Cloud,
        color: 'from-orange-500 to-red-500',
        items: [
            { name: 'AWS', level: 90, icon: '☁️' },
            { name: 'Vercel', level: 96, icon: '▲' },
            { name: 'Docker', level: 88, icon: '🐳' },
            { name: 'Kubernetes', level: 82, icon: '⚙️' },
            { name: 'GitHub Actions', level: 92, icon: '🚀' },
            { name: 'Terraform', level: 80, icon: '🏗️' }
        ]
    },
    'Mobile': {
        icon: Smartphone,
        color: 'from-indigo-500 to-purple-500',
        items: [
            { name: 'React Native', level: 92, icon: '📱' },
            { name: 'Flutter', level: 85, icon: '🦋' },
            { name: 'Expo', level: 90, icon: '📲' },
            { name: 'Swift', level: 78, icon: '🍎' },
            { name: 'Kotlin', level: 80, icon: '🤖' },
            { name: 'Ionic', level: 75, icon: '⚡' }
        ]
    },
    'AI & ML': {
        icon: Cpu,
        color: 'from-pink-500 to-rose-500',
        items: [
            { name: 'TensorFlow', level: 85, icon: '🧠' },
            { name: 'OpenAI GPT', level: 90, icon: '🤖' },
            { name: 'Hugging Face', level: 88, icon: '🤗' },
            { name: 'LangChain', level: 82, icon: '🔗' },
            { name: 'Computer Vision', level: 80, icon: '👁️' },
            { name: 'NLP', level: 86, icon: '💬' }
        ]
    }
}

export default function TechnologyStackSection() {
    const [activeTab, setActiveTab] = useState('Frontend')
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:text-purple-600">
                        <Code2 className="w-4 h-4 mr-2" />
                        Technology Stack
                    </Badge>

                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="block text-slate-900 dark:text-white mb-2">Cutting-Edge</span>
                        <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                            Technologies We Master
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        We stay at the forefront of technology, using the latest tools and frameworks
                        to build robust, scalable, and future-ready solutions.
                    </p>
                </div>

                {/* Technology Tabs */}
                <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
                    {Object.entries(technologies).map(([category, data]) => {
                        const IconComponent = data.icon
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 hover-lift ${activeTab === category
                                    ? `bg-gradient-to-r ${data.color} text-white shadow-lg`
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:shadow-md'
                                    }`}
                            >
                                <IconComponent className="w-5 h-5 mr-2" />
                                <span className="font-medium">{category}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Technology Grid */}
                <div className={`transition-all duration-500 ${isVisible ? 'animate-fade-up animation-delay-400' : 'opacity-0'}`}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {technologies[activeTab as keyof typeof technologies].items.map((tech, index) => (
                            <Card
                                key={`${activeTab}-${index}`}
                                className="hover-lift group bg-white dark:bg-slate-800 border-0 shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{tech.icon}</span>
                                            <h3 className="font-semibold text-lg">{tech.name}</h3>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {tech.level}%
                                        </Badge>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                                            <span>Proficiency</span>
                                            <span>{tech.level}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${technologies[activeTab as keyof typeof technologies].color} transition-all duration-1000 ease-out`}
                                                style={{
                                                    width: isVisible ? `${tech.level}%` : '0%',
                                                    transitionDelay: `${index * 0.1}s`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className={`mt-16 grid md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
                    {[
                        { label: 'Technologies Mastered', value: '50+', icon: Code2 },
                        { label: 'Years of Experience', value: '10+', icon: Shield },
                        { label: 'Projects Delivered', value: '50+', icon: Zap },
                        { label: 'Happy Clients', value: '100+', icon: Globe }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon
                        return (
                            <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover-lift">
                                <div className="mx-auto w-fit p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
                                    <IconComponent className="h-8 w-8 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {stat.label}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
