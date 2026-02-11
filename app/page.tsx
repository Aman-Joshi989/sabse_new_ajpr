'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Users, Award, Calendar,
  Lightbulb, Heart, Star,
  ArrowRight, CheckCircle,
  CreditCard, Info, Shield, XCircle
} from 'lucide-react'
import PricingSection from '@/components/PricingSection'

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



export default function AboutPage() {
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
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent to-orange-600 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <Badge className="mb-8 bg-secondary/20 text-primary px-6 py-3 text-lg">
              <Users className="w-5 h-5 mr-2" />
              About AJPR World
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="block text-foreground mb-4">Meet the Visionaries</span>
              <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text">
                Behind Your Success
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're a passionate team of innovators, creators, and problem-solvers dedicated to
              transforming your digital vision into reality with cutting-edge technology and expert services.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section ref={sectionRef} className="py-16 bg-card">
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
                <Card key={index} className="text-center p-8 hover-lift group bg-secondary/10 border-0 shadow-lg hover:shadow-xl">
                  <CardContent className="space-y-4 p-0">
                    <div className="mx-auto w-fit p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-10 w-10 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-foreground mb-2">
                        {stat.value}
                      </div>
                      <div className="text-lg font-semibold text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
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

      {/* Pricing & Scope Section */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Scope of Work & Terms</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent pricing and comprehensive service packages tailored to your business needs.
            </p>
          </div>

          {/* Common Scope */}
          <div className={`mb-20 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
            <Card className="border-l-4 border-l-primary shadow-lg bg-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Scope of Work (Common for All Packages)</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-blue-600">Website Pages</h4>
                    <ul className="space-y-3">
                      {['Home', 'About Us', 'Services', 'Contact Us'].map((item, i) => (
                        <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-blue-600">Core Features</h4>
                    <ul className="space-y-3">
                      {[
                        'Mobile & tablet responsive design',
                        'Clean corporate UI (HR-focused)',
                        'WhatsApp Call / Chat button',
                        'Contact form with email notification',
                        'SEO-friendly page structure'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* Enterprise & Custom Solutions */}
          <div className={`mb-20 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-500' : 'opacity-0'}`}>
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
              
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-6 flex-1">
                    <div>
                      <Badge className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 mb-4">
                        For Large Organizations
                      </Badge>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">Enterprise & Custom Solutions</h3>
                      <p className="text-slate-300 text-lg leading-relaxed">
                        Need a tailored solution for your specific business logic? We build scalable, high-performance applications with custom architecture designed to grow with your enterprise.
                      </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        'Custom Microservices Architecture',
                        'Dedicated Project Manager',
                        '24/7 Priority Support & SLAs',
                        'Advanced Security & Compliance',
                        'Automated CI/CD Pipelines',
                        'Cloud Infrastructure Setup'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center text-slate-200">
                          <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 min-w-[250px] bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-1">Starting from</div>
                      <div className="text-4xl font-bold text-white mb-2">Custom</div>
                      <div className="text-xs text-slate-400">Based on requirements</div>
                    </div>
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href="/contact">
                        Request Custom Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <p className="text-xs text-center text-slate-400 max-w-[200px]">
                      Schedule a free consultation with our technical architects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Terms & Exclusions */}
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Terms
                </h4>
                <ul className="space-y-2">
                  {[
                    '50% advance before project start',
                    '50% after final approval'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-900/20 border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
                  <Info className="w-5 h-5 mr-2 text-red-600" />
                  Exclusions
                </h4>
                <ul className="space-y-2">
                  {[
                    'Domain & hosting charges',
                    'Paid plugins or third-party tools',
                    'Content writing',
                    'Backend systems / admin panel'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Post-Delivery Support
                </h4>
                <div className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  7 days free bug-fix support after delivery
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      <PricingSection />
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




      {/* CTA Section - Minimalist Centered */}
      <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        {/* Minimalist SVG Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.1] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#e2e8f0" className="dark:fill-slate-800" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Soft decorative circles */}
            <circle cx="10%" cy="20%" r="200" fill="url(#blue-gradient)" opacity="0.1" />
            <circle cx="90%" cy="80%" r="300" fill="url(#blue-gradient)" opacity="0.1" />
            <defs>
              <radialGradient id="blue-gradient">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
            <div className="inline-block">
              <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
                Partner With Us
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Ready to Join Our<br />
                <span className="text-blue-600 dark:text-blue-500">Success Story?</span>
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Be the first to experience our dedicated support and cutting-edge solutions. 
              Transform your digital vision today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-full px-10 py-7 text-lg shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" asChild>
                <Link href="/contact">
                  Work With Our Team
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-full px-10 py-7 text-lg" asChild>
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
