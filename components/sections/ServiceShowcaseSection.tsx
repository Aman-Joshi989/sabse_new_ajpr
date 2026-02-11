'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
    Code2, Palette, Smartphone, Cloud, Shield, Search, Database,
    Zap, Globe, ArrowRight, CheckCircle, Star, TrendingUp,
    Users, Clock, Award, Lightbulb, Rocket, Target
} from 'lucide-react'

const services = [
    {
        icon: Code2,
        title: 'Web Development',
        subtitle: 'Future-Ready Applications',
        description: 'Custom websites and web applications built with cutting-edge technologies like Next.js 14, TypeScript, and modern frameworks.',
        features: ['Next.js & React', 'TypeScript', 'Responsive Design', 'Performance Optimized', 'SEO-Friendly', 'PWA Ready'],
        technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        price: '₹25,000+',
        gradient: 'from-blue-500 to-cyan-500',
        popularity: 95,
        deliveryTime: '2-4 weeks',
        projects: 150
    },
    {
        icon: Smartphone,
        title: 'Mobile Development',
        subtitle: 'Cross-Platform Excellence',
        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
        features: ['React Native', 'Flutter', 'Native iOS/Android', 'Cross-platform', 'App Store Ready', 'Push Notifications'],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
        price: '₹50,000+',
        gradient: 'from-green-500 to-emerald-500',
        popularity: 88,
        deliveryTime: '4-8 weeks',
        projects: 95
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        subtitle: 'User-Centric Experiences',
        description: 'Beautiful, intuitive designs that enhance user experience and drive conversions through thoughtful design systems.',
        features: ['User Research', 'Wireframing', 'Visual Design', 'Design Systems', 'Prototyping', 'Usability Testing'],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
        price: '₹15,000+',
        gradient: 'from-purple-500 to-pink-500',
        popularity: 92,
        deliveryTime: '1-3 weeks',
        projects: 200
    },
    {
        icon: Cloud,
        title: 'Cloud Solutions',
        subtitle: 'Scalable Infrastructure',
        description: 'Modern cloud infrastructure and DevOps solutions to scale your applications and improve efficiency.',
        features: ['AWS/Azure/GCP', 'DevOps', 'CI/CD Pipelines', 'Container Orchestration', 'Infrastructure as Code', '24/7 Monitoring'],
        technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
        price: '₹30,000+',
        gradient: 'from-orange-500 to-red-500',
        popularity: 85,
        deliveryTime: '2-6 weeks',
        projects: 75
    },
    {
        icon: Database,
        title: 'AI & ML Integration',
        subtitle: 'Intelligent Solutions',
        description: 'Integrate artificial intelligence and machine learning capabilities to automate processes and gain insights.',
        features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Automation', 'Data Science'],
        technologies: ['Python', 'TensorFlow', 'OpenAI', 'Hugging Face', 'Scikit-learn'],
        price: '₹75,000+',
        gradient: 'from-indigo-500 to-purple-500',
        popularity: 78,
        deliveryTime: '6-12 weeks',
        projects: 45
    },
    {
        icon: Shield,
        title: 'Cybersecurity',
        subtitle: 'Digital Protection',
        description: 'Comprehensive security solutions to protect your applications, data, and digital assets from threats.',
        features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection', 'SSL/TLS', 'Security Monitoring'],
        technologies: ['OWASP', 'Nessus', 'Burp Suite', 'Wireshark', 'Metasploit'],
        price: '₹40,000+',
        gradient: 'from-red-500 to-pink-500',
        popularity: 82,
        deliveryTime: '3-5 weeks',
        projects: 60
    }
]

export default function ServiceShowcaseSection() {
    const [activeService, setActiveService] = useState(0)
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
        <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-600 border-0">
                        <Star className="w-4 h-4 mr-2" />
                        Our Service Offerings
                    </Badge>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="block text-slate-900 dark:text-white mb-2">Comprehensive</span>
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                            Technology Solutions
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        From concept to deployment, we offer end-to-end technology services
                        that transform your business and accelerate growth.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => {
                        const IconComponent = service.icon
                        const isActive = index === activeService

                        return (
                            <Card
                                key={index}
                                className={`group cursor-pointer transition-all duration-500 hover-lift ${isActive ? 'ring-2 ring-blue-500 shadow-2xl' : ''
                                    } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => setActiveService(index)}
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="h-8 w-8" />
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {service.projects}+ projects
                                        </Badge>
                                    </div>

                                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">
                                        {service.subtitle}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Popularity Bar */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">Popularity</span>
                                            <span className="text-sm text-slate-600">{service.popularity}%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${service.gradient} transition-all duration-1000`}
                                                style={{ width: isVisible ? `${service.popularity}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Key Features */}
                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            Key Features
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {service.features.slice(0, 4).map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center">
                                            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                                            Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                            {service.technologies.map((tech, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <div className="text-center">
                                            <div className="font-bold text-lg text-blue-600">{service.price}</div>
                                            <div className="text-xs text-slate-500">Starting Price</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-lg text-green-600">{service.deliveryTime}</div>
                                            <div className="text-xs text-slate-500">Delivery Time</div>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        className={`w-full group-hover:bg-gradient-to-r group-hover:${service.gradient} transition-all duration-300`}
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href="/contact">
                                            Get Quote
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Process Timeline */}
                <div className={`bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl p-8 md:p-12 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
                    <h3 className="text-3xl font-bold text-center mb-12">Our Development Process</h3>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Discovery', description: 'Understanding your vision and requirements', icon: Lightbulb },
                            { step: '02', title: 'Strategy', description: 'Planning the perfect solution roadmap', icon: Target },
                            { step: '03', title: 'Development', description: 'Building with cutting-edge technologies', icon: Code2 },
                            { step: '04', title: 'Launch', description: 'Deploying and scaling your success', icon: Rocket }
                        ].map((phase, index) => {
                            const IconComponent = phase.icon
                            return (
                                <div
                                    key={index}
                                    className="text-center group hover-lift"
                                    style={{ animationDelay: `${1 + (index * 0.2)}s` }}
                                >
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                            <IconComponent className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {phase.step}
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">{phase.title}</h4>
                                    <p className="text-slate-600 dark:text-slate-400">{phase.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-1000' : 'opacity-0'}`}>
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-8 md:p-12 shimmer-effect">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h3>
                        <p className="text-xl mb-8 text-blue-100">
                            Let's discuss your project and create something amazing together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="hover-lift" asChild>
                                <Link href="/contact">
                                    <Users className="mr-2 h-5 w-5" />
                                    Get Free Consultation
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-blue-600 hover-lift" asChild>
                                <Link href="/portfolio">
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    View Success Stories
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
