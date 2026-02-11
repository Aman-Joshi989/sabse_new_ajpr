import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Palette, Code2, Cloud, Zap, Shield,
    ArrowRight, CheckCircle
} from 'lucide-react'
import Link from 'next/link'

const services = [
    {
        icon: Palette,
        title: 'Digital Strategy & Design',
        description: 'Transform your ideas into compelling digital experiences with our strategic design approach.',
        features: ['UI/UX Design', 'Brand Strategy', 'User Research', 'Prototyping'],
        color: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800'
    },
    {
        icon: Code2,
        title: 'Product Engineering',
        description: 'Build scalable, robust applications using cutting-edge technologies and best practices.',
        features: ['Web Development', 'Mobile Apps', 'API Development', 'Quality Assurance'],
        color: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800'
    },
    {
        icon: Cloud,
        title: 'Cloud & Infrastructure',
        description: 'Modernize your infrastructure with cloud-native solutions and DevOps practices.',
        features: ['Cloud Migration', 'DevOps Setup', 'Infrastructure Management', 'Monitoring'],
        color: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
    },
    {
        icon: Zap,
        title: 'Intelligent Automation',
        description: 'Streamline your processes with AI-powered automation and workflow optimization.',
        features: ['Process Automation', 'AI Integration', 'Workflow Design', 'Efficiency Optimization'],
        color: 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800'
    },
    {
        icon: Shield,
        title: 'Application Security',
        description: 'Secure your digital assets with comprehensive security testing and compliance.',
        features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection'],
        color: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800'
    }
]

export default function ServiceOfferingsSection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-6 mb-20">
                    <h2 className="text-4xl lg:text-5xl font-bold">Service Offerings</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Get the full spectrum of software development services all in one place,
                        with flexible engagement models to suit your every need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {services.slice(0, 5).map((service, index) => {
                        const IconComponent = service.icon
                        return (
                            <Card key={index} className={`group hover:shadow-xl transition-all duration-300 ${service.color}`}>
                                <CardHeader className="pb-4">
                                    <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-xl w-fit shadow-sm">
                                        <IconComponent className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {service.description}
                                    </p>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-slate-700 dark:text-slate-300">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors border-gray-200 dark:border-gray-800" asChild>
                                        <Link href="/services">
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}

                    {/* CTA Card */}
                    <Card className="bg-slate-50 dark:bg-slate-800/50 border-gray-200 dark:border-gray-800 flex items-center justify-center">
                        <CardContent className="text-center p-8">
                            <h3 className="text-2xl font-bold mb-4">Have a software product vision in mind?</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-6">
                                Request a no-obligation consulting session with our technology experts.
                            </p>
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                                <Link href="/contact">
                                    Get Free Consultation
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
