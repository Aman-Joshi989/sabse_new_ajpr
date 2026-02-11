import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Rajesh Kumar',
        role: 'CEO',
        company: 'Tech Innovators',
        location: 'Delhi',
        content: 'AJPR World delivered an exceptional website for our startup. Their attention to detail and modern approach using Next.js was impressive. They truly understand what it means to be a technology partner.',
        rating: 5,
        initials: 'RK'
    },
    {
        name: 'Priya Sharma',
        role: 'Marketing Director',
        company: 'Digital Solutions Inc.',
        location: 'Mumbai',
        content: 'Professional team with excellent communication. They transformed our digital presence completely with their innovative solutions. The results exceeded our expectations.',
        rating: 5,
        initials: 'PS'
    },
    {
        name: 'Amit Singh',
        role: 'Business Owner',
        company: 'Local Commerce',
        location: 'Haldwani',
        content: 'Local expertise with global standards. AJPR World understood our requirements perfectly and delivered beyond expectations. Their ongoing support has been invaluable.',
        rating: 5,
        initials: 'AS'
    }
]

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold">What Our Clients Say</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our satisfied clients have to say about working with AJPR World.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-800">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center space-x-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <blockquote className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
                                    "{testimonial.content}"
                                </blockquote>

                                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-600 text-white font-semibold">
                                            {testimonial.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            {testimonial.role}, {testimonial.company}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">
                                            {testimonial.location}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

