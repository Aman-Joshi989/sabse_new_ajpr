'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Users, Award, Clock, Globe, Star, Zap, Shield } from 'lucide-react'

const stats = [
    {
        icon: TrendingUp,
        value: 500,
        suffix: '+',
        label: 'Projects Delivered',
        description: 'Successfully completed projects across various industries',
        color: 'text-blue-600'
    },
    {
        icon: Users,
        value: 150,
        suffix: '+',
        label: 'Happy Clients',
        description: 'Satisfied clients who trust our expertise',
        color: 'text-green-600'
    },
    {
        icon: Award,
        value: 98,
        suffix: '%',
        label: 'Success Rate',
        description: 'Projects delivered on time and within budget',
        color: 'text-purple-600'
    },
    {
        icon: Clock,
        value: 24,
        suffix: '/7',
        label: 'Support',
        description: 'Round-the-clock technical assistance',
        color: 'text-orange-600'
    },
    {
        icon: Globe,
        value: 25,
        suffix: '+',
        label: 'Countries Served',
        description: 'Global reach with local expertise',
        color: 'text-cyan-600'
    },
    {
        icon: Star,
        value: 4.9,
        suffix: '/5',
        label: 'Client Rating',
        description: 'Average satisfaction rating from our clients',
        color: 'text-yellow-600'
    },
    {
        icon: Zap,
        value: 99,
        suffix: '%',
        label: 'Uptime',
        description: 'Reliable infrastructure and services',
        color: 'text-pink-600'
    },
    {
        icon: Shield,
        value: 100,
        suffix: '%',
        label: 'Secure',
        description: 'Zero security breaches in our applications',
        color: 'text-red-600'
    }
]

export default function StatsSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    // Animate numbers
                    stats.forEach((stat, index) => {
                        const duration = 2000
                        const steps = 60
                        const increment = stat.value / steps
                        let current = 0

                        const timer = setInterval(() => {
                            current += increment
                            if (current >= stat.value) {
                                current = stat.value
                                clearInterval(timer)
                            }
                            setAnimatedValues(prev => {
                                const newValues = [...prev]
                                newValues[index] = current
                                return newValues
                            })
                        }, duration / steps)
                    })
                }
            },
            { threshold: 0.3 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon
                        return (
                            <div
                                key={index}
                                className={`text-center transform transition-all duration-500 hover:scale-105 ${isVisible ? 'animate-fade-up' : 'opacity-0'
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                                    <IconComponent className="h-8 w-8 mx-auto mb-4 opacity-80" />
                                    <div className="text-3xl md:text-4xl font-bold mb-2">
                                        {typeof animatedValues[index] === 'number'
                                            ? (stat.suffix === '/5' ? animatedValues[index].toFixed(1) : Math.floor(animatedValues[index]))
                                            : animatedValues[index]
                                        }
                                        <span className="text-lg">{stat.suffix}</span>
                                    </div>
                                    <div className="text-sm opacity-90 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
