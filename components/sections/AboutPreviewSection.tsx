'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
    Users, Target, Award, MapPin, Calendar, Building,
    Lightbulb, Heart, Zap, Globe, Star, TrendingUp,
    Code2, Palette, Cloud, ArrowRight, CheckCircle
} from 'lucide-react'

const teamMembers = [
    {
        name: 'Aman Joshi',
        role: 'Co-Founder & Lead Developer',
        expertise: 'Full-Stack Development, System Architecture',
        experience: '5+ years',
        avatar: 'AJ',
        gradient: 'from-blue-500 to-cyan-500',
        skills: ['Next.js', 'Node.js', 'AWS', 'TypeScript']
    },
    {
        name: 'Priya Sharma',
        role: 'Senior UI/UX Designer',
        expertise: 'Design Systems, User Experience',
        experience: '6+ years',
        avatar: 'PS',
        gradient: 'from-purple-500 to-pink-500',
        skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping']
    },
    {
        name: 'Rohit Kumar',
        role: 'DevOps Engineer',
        expertise: 'Cloud Infrastructure, Automation',
        experience: '4+ years',
        avatar: 'RK',
        gradient: 'from-green-500 to-emerald-500',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform']
    },
    {
        name: 'Sneha Gupta',
        role: 'AI/ML Specialist',
        expertise: 'Machine Learning, Data Science',
        experience: '15+ years',
        avatar: 'SG',
        gradient: 'from-orange-500 to-red-500',
        skills: ['Python', 'TensorFlow', 'OpenAI', 'Data Science']
    }
]

const companyValues = [
    {
        icon: Lightbulb,
        title: 'Innovation First',
        description: 'We embrace cutting-edge technologies and creative solutions to solve complex problems.',
        gradient: 'from-yellow-400 to-orange-500'
    },
    {
        icon: Heart,
        title: 'Client-Centric',
        description: 'Your success is our success. We prioritize understanding and exceeding client expectations.',
        gradient: 'from-pink-400 to-red-500'
    },
    {
        icon: Award,
        title: 'Excellence Driven',
        description: 'We maintain the highest standards in code quality, design, and project delivery.',
        gradient: 'from-purple-400 to-indigo-500'
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'We believe in the power of diverse perspectives and collaborative problem-solving.',
        gradient: 'from-blue-400 to-cyan-500'
    }
]

const milestones = [
    {
        year: '2025',
        title: 'Company Founded',
        description: 'Started with a vision to bridge the gap between innovation and business success',
        icon: Building
    },
    {
        year: '2025',
        title: 'First 50 Projects',
        description: 'Achieved our first major milestone by successfully delivering 50+ projects',
        icon: Target
    },
    {
        year: '2025',
        title: 'Global Recognition',
        description: 'Expanded internationally and received industry recognition for innovation',
        icon: Globe
    },
    {
        year: '2025',
        title: 'AI Integration',
        description: 'Leading the way in AI-powered solutions and intelligent automation',
        icon: Zap
    }
]

export default function AboutPreviewSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [activeTeamMember, setActiveTeamMember] = useState(0)
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
                <div className="absolute top-40 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-600 rounded-full blur-3xl animate-float animation-delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-600">
                        <Users className="w-4 h-4 mr-2" />
                        About AJPR World
                    </Badge>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="block text-slate-900 dark:text-white mb-2">Meet the Team</span>
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                            Behind Your Success
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        We're a passionate team of innovators, creators, and problem-solvers dedicated to
                        transforming your digital vision into reality with cutting-edge technology.
                    </p>
                </div>

                {/* Company Stats */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
                    {[
                        { icon: Calendar, value: '3+', label: 'Years of Excellence', color: 'text-blue-600' },
                        { icon: Users, value: '10+', label: 'Expert Team Members', color: 'text-green-600' },
                        { icon: Award, value: '50+', label: 'Projects Delivered', color: 'text-purple-600' },
                        { icon: Star, value: '4.9', label: 'Client Satisfaction', color: 'text-yellow-600' }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon
                        return (
                            <Card key={index} className="text-center p-6 hover-lift group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg">
                                <CardContent className="space-y-4 p-0">
                                    <div className="mx-auto w-fit p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className={`h-8 w-8 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Team Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Team Members Grid */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-left animation-delay-400' : 'opacity-0'}`}>
                        <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Our Expert Team</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {teamMembers.map((member, index) => (
                                <Card
                                    key={index}
                                    className={`group cursor-pointer hover-lift transition-all duration-300 ${activeTeamMember === index ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'
                                        }`}
                                    onClick={() => setActiveTeamMember(index)}
                                >
                                    <CardContent className="p-6 text-center">
                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${member.gradient} text-white flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                                            {member.avatar}
                                        </div>
                                        <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                                        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{member.role}</p>
                                        <Badge variant="outline" className="text-xs">
                                            {member.experience}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Active Team Member Details */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-right animation-delay-600' : 'opacity-0'}`}>
                        <Card className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-xl">
                            <CardContent className="p-0">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${teamMembers[activeTeamMember].gradient} text-white flex items-center justify-center text-2xl font-bold`}>
                                        {teamMembers[activeTeamMember].avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{teamMembers[activeTeamMember].name}</h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium">{teamMembers[activeTeamMember].role}</p>
                                        <Badge className="mt-2 bg-green-100 text-green-800">
                                            {teamMembers[activeTeamMember].experience}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Expertise:</h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {teamMembers[activeTeamMember].expertise}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Core Skills:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {teamMembers[activeTeamMember].skills.map((skill, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Company Values */}
                <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h3>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            These principles guide everything we do and define who we are as a company.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {companyValues.map((value, index) => {
                            const IconComponent = value.icon
                            return (
                                <Card key={index} className="group hover-lift p-6 text-center bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-0 space-y-4">
                                        <div className={`mx-auto w-fit p-4 rounded-2xl bg-gradient-to-r ${value.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="h-8 w-8" />
                                        </div>
                                        <h4 className="text-xl font-bold">{value.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Company Timeline */}
                <div
                    className={`mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-1000' : 'opacity-0'
                        }`}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h3>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            From humble beginnings to industry recognition - here's our story of growth and innovation.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line (hidden on small screens to avoid overlap) */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden md:block"></div>

                        {milestones.map((milestone, index) => {
                            const IconComponent = milestone.icon
                            const isEven = index % 2 === 0
                            return (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute md:static left-1/2 md:left-auto transform -translate-x-1/2 md:translate-x-0 mb-6 md:mb-0">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white z-10 mx-auto md:mx-0">
                                            <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`w-full md:w-5/12 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                                            }`}
                                    >
                                        <Card className="p-4 md:p-6 hover-lift bg-white dark:bg-slate-800 border-0 shadow-lg">
                                            <CardContent className="p-0">
                                                <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                                    {milestone.year}
                                                </Badge>
                                                <h4 className="text-lg md:text-xl font-bold mb-2">
                                                    {milestone.title}
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                                                    {milestone.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


                {/* CTA Section */}
                <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-1200' : 'opacity-0'}`}>
                    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 md:p-12 border-0 shadow-2xl">
                        <CardContent className="p-0 space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold">
                                Join Our Success Story
                            </h3>
                            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                Ready to work with a team that's passionate about your success?
                                Let's create something extraordinary together.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="secondary" className="hover-lift" asChild>
                                    <Link href="/contact">
                                        <Users className="mr-2 h-5 w-5" />
                                        Meet Our Team
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-blue-600 hover-lift" asChild>
                                    <Link href="/about">
                                        <ArrowRight className="mr-2 h-5 w-5" />
                                        Learn More About Us
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
