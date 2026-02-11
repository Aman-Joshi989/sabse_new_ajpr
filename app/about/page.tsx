'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
    Users, Target, Award, MapPin, Calendar, Building,
    Lightbulb, Heart, Zap, Globe, Star, TrendingUp,
    Code2, Palette, Cloud, ArrowRight, CheckCircle,
    Phone, Mail, Linkedin, Twitter, BookOpen, Trophy
} from 'lucide-react'

const teamMembers = [
    {
        name: 'Aman Joshi',
        role: 'Co-Founder & CEO',
        specialization: 'Technology Leadership & Strategy',
        experience: '5+ years',
        avatar: 'AJ',
        gradient: 'from-blue-500 to-cyan-500',
        description: 'Visionary leader with expertise in full-stack development and business strategy. Drives innovation and ensures client success through cutting-edge technology solutions.',
        skills: ['Strategic Planning', 'Full-Stack Development', 'Team Leadership', 'Client Relations', 'Technology Architecture'],
        achievements: ['Led 50+ successful projects', 'Built scalable tech solutions', 'Established AJPR World vision'],
        email: 'amanjoshi0525@gmail.com',
        phone: '+91 99972 05257'
    },
    {
        name: 'Priyank Rakholia',
        role: 'Co-Founder & Business Development',
        specialization: 'Business Growth & Client Relations',
        experience: '4+ years',
        avatar: 'PR',
        gradient: 'from-purple-500 to-pink-500',
        description: 'Dynamic business strategist focused on expanding market reach and building lasting client relationships. Expert in identifying growth opportunities and executing successful business plans.',
        skills: ['Business Development', 'Strategic Partnerships', 'Market Analysis', 'Client Acquisition', 'Revenue Growth'],
        achievements: ['Expanded client base by 300%', 'Established key partnerships', 'Drove business diversification'],
        email: 'priyankrakholia17@gmail.com',
        phone: '+91 98765 43211'
    },
    {
        name: 'Jatin Vaishnav',
        role: 'SDE-3 (Senior Software Engineer)',
        specialization: 'Advanced Software Development',
        experience: '6+ years',
        avatar: 'JV',
        gradient: 'from-green-500 to-emerald-500',
        description: 'Senior software engineer with deep expertise in modern web technologies, system architecture, and performance optimization. Leads technical innovation and mentors development teams.',
        skills: ['Next.js/React', 'System Architecture', 'Performance Optimization', 'Code Review', 'Technical Mentoring'],
        achievements: ['Architected scalable solutions', 'Reduced system latency by 60%', 'Led technical migrations'],
        email: 'jatin@ajprworld.com',
        phone: '+91 98765 43212'
    },
    {
        name: ' Triveni Chandra Nainwal',
        role: 'Account & Finance Manager',
        specialization: 'Financial Management & Compliance',
        experience: '15+ years',
        avatar: 'TCN',
        gradient: 'from-orange-500 to-red-500',
        description: 'Expert financial professional ensuring fiscal responsibility and regulatory compliance. Manages all financial operations with precision and strategic insight.',
        skills: ['Financial Planning', 'Tax Compliance', 'Budget Management', 'Regulatory Affairs', 'Risk Assessment'],
        achievements: ['Streamlined financial processes', 'Ensured 100% compliance', 'Optimized operational costs'],
        email: 'triveni.nainwal@gmail.com',
        phone: '+91 9811139030'
    }
]

const companyValues = [
    {
        icon: Lightbulb,
        title: 'Innovation First',
        description: 'We embrace cutting-edge technologies and creative solutions to solve complex business challenges.',
        gradient: 'from-yellow-400 to-orange-500'
    },
    {
        icon: Heart,
        title: 'Client Success',
        description: 'Your success is our success. We prioritize understanding and exceeding client expectations in every project.',
        gradient: 'from-pink-400 to-red-500'
    },
    {
        icon: Award,
        title: 'Excellence Driven',
        description: 'We maintain the highest standards in service delivery, code quality, and professional expertise.',
        gradient: 'from-purple-400 to-indigo-500'
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'We believe in the power of diverse perspectives and collaborative problem-solving approaches.',
        gradient: 'from-blue-400 to-cyan-500'
    }
]

const milestones = [
    {
        year: '2025',
        title: 'Company Founded',
        description: 'AJPR World established with a vision to bridge technology and business success',
        icon: Building,
        stats: 'Founded with 2 co-Co-Founders'
    },
    {
        year: '2025',
        title: 'Service Expansion',
        description: 'Expanded from tech services to comprehensive business solutions including legal and financial services',
        icon: Globe,
        stats: '7 service categories launched'
    },
    {
        year: '2025',
        title: 'Major Milestones',
        description: 'Achieved significant growth in client base and service delivery excellence',
        icon: Trophy,
        stats: '50+ projects completed'
    },
    {
        year: '2025',
        title: 'Industry Recognition',
        description: 'Recognized as a leading multi-service provider with 100% client satisfaction rate',
        icon: Star,
        stats: '100% client retention rate'
    }
]

export default function AboutPage() {
    const [activeTeamMember, setActiveTeamMember] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true)
            },
            { threshold: 0.1 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-600 rounded-full blur-3xl animate-float animation-delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center animate-fade-up">
                        <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-600 px-6 py-3 text-lg">
                            <Users className="w-5 h-5 mr-2" />
                            About AJPR World
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                            <span className="block text-slate-900 dark:text-white mb-4">Meet the Visionaries</span>
                            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                                Behind Your Success
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                            We're a passionate team of innovators, creators, and problem-solvers dedicated to
                            transforming your digital vision into reality with cutting-edge technology and expert services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Stats */}
            <section ref={sectionRef} className="py-16 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                        {[
                            { icon: Calendar, value: '3+', label: 'Years of Excellence', color: 'text-blue-600', description: 'Serving clients since 2025' },
                            { icon: Users, value: '4', label: 'Expert Team Members', color: 'text-green-600', description: 'Dedicated professionals' },
                            { icon: Award, value: '50+', label: 'Projects Delivered', color: 'text-purple-600', description: 'Across all service categories' },
                            { icon: Star, value: '100%', label: 'Client Satisfaction', color: 'text-yellow-600', description: 'Perfect retention rate' }
                        ].map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <Card key={index} className="text-center p-8 hover-lift group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg hover:shadow-xl">
                                    <CardContent className="space-y-4 p-0">
                                        <div className="mx-auto w-fit p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className={`h-10 w-10 ${stat.color}`} />
                                        </div>
                                        <div>
                                            <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                                {stat.value}
                                            </div>
                                            <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                                {stat.label}
                                            </div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                                {stat.description}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <div className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold">Our Leadership Team</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Meet the experienced professionals who drive AJPR World's success and innovation across all service domains.
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                        {/* Team Members Grid */}
                        <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 ${isVisible ? 'animate-fade-left animation-delay-400' : 'opacity-0'}`}>
                            {teamMembers.map((member, index) => (
                                <Card
                                    key={index}
                                    className={`group cursor-pointer hover-lift transition-all duration-300 ${activeTeamMember === index ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
                                        }`}
                                    onClick={() => setActiveTeamMember(index)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${member.gradient} text-white flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                            {member.avatar}
                                        </div>
                                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{member.name}</h4>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2">{member.role}</p>
                                        <Badge variant="outline" className="text-xs">
                                            {member.experience}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Active Member Details */}
                        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-right animation-delay-600' : 'opacity-0'}`}>
                            <Card className="p-8 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-2xl">
                                <CardContent className="p-0">
                                    <div key={activeTeamMember} className="animate-scale-in">
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${teamMembers[activeTeamMember].gradient} text-white flex items-center justify-center text-2xl font-bold shadow-lg`}>
                                                {teamMembers[activeTeamMember].avatar}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{teamMembers[activeTeamMember].name}</h3>
                                                <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">{teamMembers[activeTeamMember].role}</p>
                                                <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    {teamMembers[activeTeamMember].experience}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300 text-lg">Specialization:</h4>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                                    {teamMembers[activeTeamMember].specialization}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300 text-lg">About:</h4>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {teamMembers[activeTeamMember].description}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300 text-lg">Core Skills:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {teamMembers[activeTeamMember].skills.map((skill, idx) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300 text-lg">Key Achievements:</h4>
                                                <ul className="space-y-2">
                                                    {teamMembers[activeTeamMember].achievements.map((achievement, idx) => (
                                                        <li key={idx} className="flex items-start">
                                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                            <span className="text-slate-600 dark:text-slate-400">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`mailto:${teamMembers[activeTeamMember].email}`}>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Email
                                                    </Link>
                                                </Button>
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={`tel:${teamMembers[activeTeamMember].phone}`}>
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        Call
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Values */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-bold">Our Core Values</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            These fundamental principles guide every decision we make and define our company culture.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {companyValues.map((value, index) => {
                            const IconComponent = value.icon
                            return (
                                <Card key={index} className={`group hover-lift p-8 text-center bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${1 + (index * 0.1)}s` }}>
                                    <CardContent className="p-0 space-y-4">
                                        <div className={`mx-auto w-fit p-4 rounded-2xl bg-gradient-to-r ${value.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                            <IconComponent className="h-10 w-10" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">{value.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Company Timeline */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <div
                        className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-1000' : 'opacity-0'
                            }`}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold">Our Journey</h2>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            From humble beginnings to industry recognition - here's our story of growth, innovation, and success.
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden md:block"></div>

                        {milestones.map((milestone, index) => {
                            const IconComponent = milestone.icon
                            const isEven = index % 2 === 0
                            return (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                                    style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute md:static left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 mb-6 md:mb-0">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white z-10 shadow-2xl mx-auto md:mx-0">
                                            <IconComponent className="h-6 w-6 md:h-8 md:w-8" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`w-full md:w-5/12 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                                            }`}
                                    >
                                        <Card className="p-6 md:p-8 hover-lift bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl">
                                            <CardContent className="p-0">
                                                <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                                    {milestone.year}
                                                </Badge>
                                                <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                                                    {milestone.title}
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                                                    {milestone.description}
                                                </p>
                                                <div className="text-sm md:text-base text-blue-600 dark:text-blue-400 font-semibold">
                                                    {milestone.stats}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto animate-fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Join Our Success Story?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                            Whether you're looking for cutting-edge technology solutions, expert legal guidance,
                            or comprehensive business support, our team is ready to help you achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button size="lg" variant="secondary" className="hover-lift px-12 py-4 text-lg" asChild>
                                <Link href="/contact">
                                    <Users className="mr-2 h-6 w-6" />
                                    Work With Our Team
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-black hover:bg-white hover:text-blue-600 hover-lift px-12 py-4 text-lg" asChild>
                                <Link href="/services">
                                    <ArrowRight className="mr-2 h-6 w-6" />
                                    Explore Our Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
