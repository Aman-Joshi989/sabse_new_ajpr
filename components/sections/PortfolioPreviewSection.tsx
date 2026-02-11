'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
    ExternalLink, Github, ArrowRight, Eye, Star, Clock,
    Globe, Smartphone, ShoppingCart, Heart, Zap, TrendingUp
} from 'lucide-react'

const portfolioProjects = [
    {
        id: 1,
        title: 'EcoCommerce Platform',
        category: 'E-commerce',
        description: 'A sustainable e-commerce platform built with Next.js 14, featuring AI-powered product recommendations and carbon footprint tracking.',
        image: '/api/placeholder/600/400', // You'll replace with actual images
        technologies: ['Next.js 14', 'TypeScript', 'Stripe', 'AI/ML', 'PostgreSQL'],
        features: ['AI Recommendations', 'Carbon Tracking', 'Real-time Chat', 'Payment Gateway'],
        stats: { views: '2.5M', users: '50K', rating: 4.9 },
        gradient: 'from-green-500 to-emerald-600',
        icon: ShoppingCart,
        status: 'Live',
        year: '2025',
        client: 'EcoTech Solutions',
        duration: '4 months'
    },
    {
        id: 2,
        title: 'HealthCare Connect',
        category: 'Healthcare',
        description: 'Comprehensive telemedicine platform connecting patients with healthcare providers, featuring video consultations and AI diagnostics.',
        image: '/api/placeholder/600/400',
        technologies: ['React Native', 'Node.js', 'WebRTC', 'TensorFlow', 'MongoDB'],
        features: ['Video Calls', 'AI Diagnostics', 'Appointment Booking', 'Medical Records'],
        stats: { views: '1.8M', users: '25K', rating: 4.8 },
        gradient: 'from-blue-500 to-cyan-600',
        icon: Heart,
        status: 'Live',
        year: '2025',
        client: 'MediCore Systems',
        duration: '6 months'
    },
    {
        id: 3,
        title: 'FinTech Dashboard',
        category: 'Finance',
        description: 'Advanced financial analytics dashboard with real-time market data, portfolio management, and predictive insights using machine learning.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Redis'],
        features: ['Real-time Data', 'Predictive Analytics', 'Portfolio Tracking', 'Risk Assessment'],
        stats: { views: '3.2M', users: '75K', rating: 4.9 },
        gradient: 'from-purple-500 to-pink-600',
        icon: TrendingUp,
        status: 'Live',
        year: '2025',
        client: 'InvestPro Capital',
        duration: '3 months'
    },
    {
        id: 4,
        title: 'EduTech Learning Hub',
        category: 'Education',
        description: 'Interactive learning platform with gamification, progress tracking, and AI-powered personalized learning paths.',
        image: '/api/placeholder/600/400',
        technologies: ['Next.js', 'Three.js', 'WebGL', 'OpenAI', 'Supabase'],
        features: ['Gamification', 'AR/VR Learning', 'Progress Analytics', 'Peer Collaboration'],
        stats: { views: '1.5M', users: '40K', rating: 4.7 },
        gradient: 'from-orange-500 to-red-600',
        icon: Zap,
        status: 'Live',
        year: '2025',
        client: 'EduFuture Inc',
        duration: '5 months'
    },
    {
        id: 5,
        title: 'Smart City IoT',
        category: 'IoT',
        description: 'Smart city management system integrating IoT sensors, real-time monitoring, and predictive maintenance for urban infrastructure.',
        image: '/api/placeholder/600/400',
        technologies: ['React', 'IoT', 'AWS', 'Machine Learning', 'PostgreSQL'],
        features: ['IoT Integration', 'Real-time Monitoring', 'Predictive Maintenance', 'Data Analytics'],
        stats: { views: '900K', users: '15K', rating: 4.8 },
        gradient: 'from-indigo-500 to-blue-600',
        icon: Globe,
        status: 'Live',
        year: '2025',
        client: 'SmartCity Corp',
        duration: '8 months'
    },
    {
        id: 6,
        title: 'Social Impact Network',
        category: 'Social',
        description: 'Community-driven platform for social causes, featuring crowdfunding, volunteer management, and impact tracking.',
        image: '/api/placeholder/600/400',
        technologies: ['React Native', 'GraphQL', 'Blockchain', 'Flutter', 'Firebase'],
        features: ['Crowdfunding', 'Volunteer Network', 'Impact Tracking', 'Community Forums'],
        stats: { views: '1.2M', users: '30K', rating: 4.6 },
        gradient: 'from-pink-500 to-rose-600',
        icon: Heart,
        status: 'Live',
        year: '2025',
        client: 'ChangeMakers NGO',
        duration: '4 months'
    }
]

export default function PortfolioPreviewSection() {
    const [activeProject, setActiveProject] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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

    // Auto-rotate featured projects
    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setActiveProject((prev) => (prev + 1) % 3) // Rotate through first 3 projects
            }, 5000)
            return () => clearInterval(interval)
        }
    }, [isVisible])

    return (
        <section
            id="portfolio-preview"
            ref={sectionRef}
            className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-3xl animate-float animation-delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:text-purple-600">
                        <Eye className="w-4 h-4 mr-2" />
                        Featured Projects
                    </Badge>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="block text-slate-900 dark:text-white mb-2">Our Success</span>
                        <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                            Stories & Innovations
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Discover how we've transformed businesses across industries with innovative solutions,
                        cutting-edge technology, and exceptional user experiences.
                    </p>
                </div>

                {/* Featured Project Carousel */}
                <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
                    <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden hover-lift">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Project Image/Visual */}
                            <div className="relative h-80 lg:h-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                                <div className={`absolute inset-0 bg-gradient-to-r ${portfolioProjects[activeProject].gradient} opacity-20`}></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-8xl opacity-30">
                                        {React.createElement(portfolioProjects[activeProject].icon)}
                                    </div>
                                </div>
                                <Badge className="absolute top-6 left-6 bg-green-500 text-white">
                                    {portfolioProjects[activeProject].status}
                                </Badge>
                                <Badge className="absolute top-6 right-6 bg-white/20 text-white backdrop-blur-sm">
                                    {portfolioProjects[activeProject].year}
                                </Badge>
                            </div>

                            {/* Project Details */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <Badge variant="outline" className="mb-4">
                                        {portfolioProjects[activeProject].category}
                                    </Badge>
                                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                                        {portfolioProjects[activeProject].title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                                        {portfolioProjects[activeProject].description}
                                    </p>
                                </div>

                                {/* Project Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{portfolioProjects[activeProject].stats.views}</div>
                                        <div className="text-xs text-slate-500">Page Views</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{portfolioProjects[activeProject].stats.users}</div>
                                        <div className="text-xs text-slate-500">Active Users</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
                                            <Star className="w-5 h-5 mr-1" />
                                            {portfolioProjects[activeProject].stats.rating}
                                        </div>
                                        <div className="text-xs text-slate-500">User Rating</div>
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {portfolioProjects[activeProject].technologies.map((tech, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <Button className="flex-1" asChild>
                                        <Link href={`/portfolio#project-${portfolioProjects[activeProject].id}`}>
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Details
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="#demo">
                                            <Eye className="mr-2 h-4 w-4" />
                                            Live Demo
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {portfolioProjects.slice(0, 3).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveProject(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeProject
                                        ? 'bg-white shadow-lg'
                                        : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Portfolio Grid */}
                <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-400' : 'opacity-0'}`}>
                    {portfolioProjects.map((project, index) => {
                        const IconComponent = project.icon
                        return (
                            <Card
                                key={project.id}
                                className="group hover-lift overflow-hidden bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Project Image */}
                                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <IconComponent className={`h-16 w-16 text-slate-400 group-hover:scale-110 transition-transform duration-300 ${hoveredCard === index ? 'animate-bounce-gentle' : ''
                                            }`} />
                                    </div>
                                    <Badge className="absolute top-4 left-4 bg-white/20 text-white backdrop-blur-sm">
                                        {project.category}
                                    </Badge>
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <Badge className="bg-green-500 text-white text-xs">
                                            {project.status}
                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Client & Duration */}
                                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-slate-500">
                                        <div>
                                            <span className="font-medium">Client:</span>
                                            <div>{project.client}</div>
                                        </div>
                                        <div>
                                            <span className="font-medium">Duration:</span>
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {project.duration}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.features.slice(0, 2).map((feature, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {feature}
                                                </Badge>
                                            ))}
                                            {project.features.length > 2 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{project.features.length - 2} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <Button size="sm" className="flex-1 text-xs" asChild>
                                            <Link href={`/portfolio#project-${project.id}`}>
                                                View Details
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href="#demo">
                                                <Github className="h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 md:p-12 shimmer-effect">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Build Something Amazing?
                        </h3>
                        <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                            Join our portfolio of successful projects. Let's create your next digital masterpiece together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="hover-lift" asChild>
                                <Link href="/contact">
                                    Start Your Project
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-purple-600 hover-lift" asChild>
                                <Link href="/portfolio">
                                    View All Projects
                                    <Eye className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
