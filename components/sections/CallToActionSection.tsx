'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
    Phone, Mail, MessageCircle, MapPin, Clock,
    ArrowRight, Zap, Users, Award, Globe,
    Building
} from 'lucide-react'

const contactMethods = [
    {
        icon: Phone,
        title: 'Call Us',
        description: 'Direct consultation available',
        action: 'tel:+919811139030',
        label: '+91 82737 92119',
        gradient: 'from-green-500 to-emerald-500'
    },
    {
        icon: Mail,
        title: 'Email Us',
        description: 'Send your requirements',
        action: 'mailto:ajprworld@gmail.com',
        label: 'ajprworld@gmail.com',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp',
        description: 'Quick chat & file sharing',
        action: 'https://wa.me/919811139030',
        label: 'Chat on WhatsApp',
        gradient: 'from-green-400 to-green-600'
    },
    {
        icon: MapPin,
        title: 'Visit Office',
        description: 'Meet us in person',
        action: '#location',
        label: 'Ballabgarh, Faridabad',
        gradient: 'from-purple-500 to-pink-500'
    }
]

export default function CallToActionSection() {
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
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-float animation-delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Main CTA Header */}
                <div className={`text-center space-y-8 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
                    <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 text-base">
                        <Zap className="w-5 h-5 mr-2" />
                        Ready to Get Started?
                    </Badge>

                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        <span className="block mb-4">Contact for Work Outsource</span>
                        <span className="block text-3xl md:text-5xl text-blue-300">
                            वर्कआउटसोर्स के लिए संपर्क करें
                        </span>
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-6">
                        <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                            Please contact us for <strong>GST / TDS / Income Tax Returns</strong>, Day-to-Day Accounting,
                            Inventory, Taxation, Payroll, ESI & PF Returns, ROC & MCA Services,
                            New Company & GST/TAN/PAN Registration, and Digital Signature Services.
                        </p>
                        <p className="text-lg md:text-xl text-purple-200 leading-relaxed">
                            कृपया जीएसटी / टीडीएस / आयकर रिटर्न, दैनिक लेखांकन, इन्वेंटरी, कराधान, पेरोल,
                            ईएसआई और पीएफ रिटर्न, आरओसी और एमसीए सेवाओं, नई कंपनी और जीएसटी/टैन/पैन
                            पंजीकरण, और डिजिटल हस्ताक्षर सेवाओं के लिए हमसे संपर्क करें।
                        </p>
                    </div>
                </div>

                {/* Contact Methods Grid */}
                <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
                    {contactMethods.map((method, index) => {
                        const IconComponent = method.icon
                        return (
                            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover-lift group">
                                <CardContent className="p-6 text-center">
                                    <div className={`mx-auto w-fit p-4 mb-4 rounded-full bg-gradient-to-r ${method.gradient} group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                                    <p className="text-blue-200 text-sm mb-4">{method.description}</p>
                                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-slate-900" asChild>
                                        <Link href={method.action}>
                                            {method.label}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Company Details */}
                <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-400' : 'opacity-0'}`}>
                    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                        <CardContent className="p-8 md:p-12">
                            <div className="text-center space-y-6">
                                <div className="flex items-center justify-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <Building className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-2xl md:text-3xl font-bold">AJPR World</h3>
                                        <p className="text-blue-200">Multi-Service Solutions Provider</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 text-center">
                                    <div className="space-y-2">
                                        <MapPin className="w-8 h-8 mx-auto text-blue-300" />
                                        <h4 className="font-semibold">Our Location</h4>
                                        <p className="text-blue-200 text-sm">
                                            Near Sector 59-60<br />
                                            Ballabgarh, Faridabad<br />
                                            Haryana, India
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Clock className="w-8 h-8 mx-auto text-green-300" />
                                        <h4 className="font-semibold">Business Hours</h4>
                                        <p className="text-blue-200 text-sm">
                                            Monday - Saturday<br />
                                            9:00 AM - 7:00 PM<br />
                                            Sunday: By Appointment
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Users className="w-8 h-8 mx-auto text-purple-300" />
                                        <h4 className="font-semibold">Quick Response</h4>
                                        <p className="text-blue-200 text-sm">
                                            Same-day consultation<br />
                                            24/7 WhatsApp support<br />
                                            Emergency assistance
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Services Mention */}
                <div className={`mt-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
                    <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-300/30">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Complete Business Support</h3>
                            <p className="text-lg text-blue-100 mb-6 max-w-4xl mx-auto leading-relaxed">
                                <strong>All types of criminal, civil & labour court cases</strong> under SARFAESI and NPA Act,
                                Bank Loan & Credit Card issues for improving civil scores in default cases.
                                <strong>Vehicle Challan, RC Transfer, Family Identity Card changes,
                                    Driving License, Registry, Property work, and all Tehsil office work.</strong>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-100 hover-lift" asChild>
                                    <Link href="tel:+919811139030">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call Now for Consultation
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 hover-lift" asChild>
                                    <Link href="https://wa.me/919811139030">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        WhatsApp Quick Chat
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Trust Indicators */}
                <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
                    {[
                        { icon: Award, label: '100% Success Rate', description: 'In project delivery' },
                        { icon: Users, label: '50+ Clients', description: 'Trust our services' },
                        { icon: Globe, label: '7 Service Areas', description: 'Complete coverage' },
                        { icon: Zap, label: '24/7 Support', description: 'Always available' }
                    ].map((indicator, index) => {
                        const IconComponent = indicator.icon
                        return (
                            <div key={index} className="text-center p-4 bg-white/5 rounded-xl hover-lift">
                                <IconComponent className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                                <div className="text-xl font-bold">{indicator.label}</div>
                                <div className="text-sm text-blue-200">{indicator.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
