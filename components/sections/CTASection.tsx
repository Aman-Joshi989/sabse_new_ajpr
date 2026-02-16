import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, Mail, Phone } from 'lucide-react'

export default function CTASection() {
    return (
        <section className="py-24 bg-blue-50 dark:bg-blue-950/20">
            <div className="container mx-auto px-4">
                <Card className="bg-blue-600 text-white overflow-hidden relative border-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700" />
                    <CardContent className="relative p-12 lg:p-16">
                        <div className="text-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl lg:text-5xl font-bold">
                                    Ready to Transform Your Business?
                                </h2>
                                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                                    Let's discuss how AJPR World can help you achieve your digital goals.
                                    Get in touch today for a free consultation and quote.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" variant="secondary" asChild className="group bg-white text-blue-600 hover:bg-gray-100">
                                    <Link href="/contact">
                                        Get Started Now
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-blue-600">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Us Now
                                </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-blue-500/30">
                                <div className="flex items-center space-x-3 text-blue-100">
                                    <Mail className="h-5 w-5" />
                                    <span>ajprworld@gmail.com</span>
                                </div>
                                <div className="flex items-center space-x-3 text-blue-100">
                                    <Phone className="h-5 w-5" />
                                    <span>+91 99972 05257</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

