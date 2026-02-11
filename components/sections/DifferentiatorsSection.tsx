import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Target, Award, Clock } from 'lucide-react'

const differentiators = [
    {
        icon: Users,
        title: 'Unmatched Technical Expertise',
        description: 'Our team of seasoned developers, architects, and designers are experts in their domains, equipped with the latest technologies like Next.js, TypeScript, and cloud-native solutions.'
    },
    {
        icon: Target,
        title: 'Tailored Solutions for Unique Challenges',
        description: 'Every business is unique. We provide bespoke software solutions designed specifically for your requirements, ensuring perfect alignment with your business objectives.'
    },
    {
        icon: Award,
        title: 'Quality-Driven Development Process',
        description: 'We follow industry best practices and maintain high coding standards, ensuring robust, scalable, and maintainable solutions for long-term success.'
    },
    {
        icon: Clock,
        title: 'Agile & Transparent Delivery',
        description: 'Our agile methodology ensures faster time-to-market with complete transparency throughout the development lifecycle, keeping you informed at every step.'
    }
]

export default function DifferentiatorsSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-6 mb-20">
                    <Badge variant="outline" className="bg-white border-gray-200 dark:border-gray-800">
                        Our Competitive Edge
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl font-bold">
                        What Sets AJPR World <span className="text-blue-600">A Class Apart</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Experience a distinctive blend of innovation, expertise, and customer-centric approach
                        that makes us your ideal technology partner.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {differentiators.map((item, index) => {
                        const IconComponent = item.icon
                        return (
                            <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-800 shadow-sm">
                                <CardContent className="p-8">
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                            <IconComponent className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold">{item.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

