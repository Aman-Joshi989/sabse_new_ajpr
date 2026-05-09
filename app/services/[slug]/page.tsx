import { getServiceBySlug } from '@/lib/db/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, Star, Shield, Clock, Zap, Target } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ServiceDetailsPage({ params }: { params: { slug: string } }) {
    const service = await getServiceBySlug(params.slug)

    if (!service) {
        notFound()
    }

    const featuresList = typeof service.features === 'string' ? JSON.parse(service.features) : (service.features || [])

    let displayPrice = '';
    if (service.price_type === 'custom') {
        displayPrice = 'Custom Quote';
    } else if (service.price_type === 'starting_at') {
        displayPrice = `Starting at ₹${parseFloat(service.price).toLocaleString()}`;
    } else {
        displayPrice = `₹${parseFloat(service.price).toLocaleString()}`;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 font-sans pb-24">
            {/* Hero Section */}
            <div className={`w-full bg-gradient-to-br ${service.gradient || 'from-blue-600 to-indigo-800'} pt-32 pb-20 px-4 text-white`}>
                <div className="w-[80%] mx-auto">
                    <Button variant="ghost" className="text-white hover:bg-white/20 mb-8" asChild>
                        <Link href="/services">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                        </Link>
                    </Button>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-6">
                                {service.category} • SKU: {service.sku}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-medium mb-8 max-w-xl leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-base h-14 px-8" asChild>
                                    <Link href="/contact">Get Started Today</Link>
                                </Button>
                                <div className="text-white/80 font-medium text-sm flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Secure & Confidential
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center">
                            {/* Abstract visual representation of the service */}
                            <div className="relative w-72 h-72">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-full animate-pulse"></div>
                                <div className="absolute inset-4 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center">
                                    <Target className="w-32 h-32 text-white/80" strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-[80%] mx-auto mt-16">
                <div className="grid md:grid-cols-3 gap-12">
                    
                    {/* Left: Features & Details */}
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">What's Included</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {featuresList.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex gap-4 p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{feature}</span>
                                    </div>
                                ))}
                                {featuresList.length === 0 && (
                                    <p className="text-slate-500 italic">No features listed yet.</p>
                                )}
                            </div>
                        </section>

                        <section className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800/50">
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Why Choose AJPR World?</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <Star className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Expert Team</h4>
                                        <p className="text-slate-600 dark:text-slate-400">Our professionals have decades of combined experience in delivering top-tier solutions.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <Zap className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Fast Execution</h4>
                                        <p className="text-slate-600 dark:text-slate-400">We prioritize speed without compromising on the exceptional quality you expect.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Sticky Pricing Card */}
                    <div className="relative">
                        <div className="sticky top-32 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Investment</h3>
                            <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-6">
                                {displayPrice}
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium">Estimated Delivery: <strong className="text-slate-900 dark:text-white">{service.delivery_time || 'TBD'}</strong></span>
                                </div>
                            </div>

                            <Button className="w-full h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" asChild>
                                <Link href="/contact">Request a Quote</Link>
                            </Button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                No credit card required. We will discuss your exact needs before proceeding.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
