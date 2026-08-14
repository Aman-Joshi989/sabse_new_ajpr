'use client'

import { useState } from 'react'
import { ArrowRight, Globe, Linkedin, CheckCircle2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import EmailLink from '@/components/EmailLink';




export default function ApplicationPage() {
    const [form, setForm] = useState({
        fullName: '',
        workEmail: '',
        companyName: '',
        websiteUrl: '',
        monthlyRevenue: '',
        budgetRange: '',
        buildingText: '',
        blockersText: ''
    })

    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setStatus('idle')

        const structuredMessage = `
COMPANY DETAILS:
- Company: ${form.companyName || 'Not provided'}
- Website/URL: ${form.websiteUrl || 'Not provided'}
- Monthly Revenue: ${form.monthlyRevenue || 'Not selected'}
- Budget Range: ${form.budgetRange || 'Not selected'}

WHAT THEY ARE BUILDING: 
${form.buildingText}

CURRENT BLOCKERS:
${form.blockersText}
        `.trim()

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.fullName,
                    email: form.workEmail,
                    phone: "", // Keeping schema happy
                    companyName: form.companyName,
                    websiteUrl: form.websiteUrl,
                    monthlyRevenue: form.monthlyRevenue,
                    budgetRange: form.budgetRange,
                    buildingText: form.buildingText,
                    blockersText: form.blockersText,
                    message: structuredMessage
                }),
            })

            if (res.ok) {
                setStatus('success')
                setFeedbackMsg("Application submitted successfully. We will review and reach out within 48 hours.")
                setForm({ fullName: '', workEmail: '', companyName: '', websiteUrl: '', monthlyRevenue: '', budgetRange: '', buildingText: '', blockersText: '' })
            } else {
                const data = await res.json()
                setStatus('error')
                setFeedbackMsg("Failed to submit: " + (data.error || "Please try again later."))
            }
        } catch (err) {
            console.error(err)
            setStatus('error')
            setFeedbackMsg("Network error. Please try again.")
        }

        setSubmitting(false)
    }

    const scrollToForm = () => {
        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-300 font-sans selection:bg-blue-600/30">
            <div className="w-[80%] mx-auto min-h-screen">

                {/* Background Ambience (Optimized for Performance) */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
                    <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(79,70,229,0.05)_0%,transparent_70%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
                </div>

                <div className="container mx-auto px-4 lg:px-8 py-24 md:py-32 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                        {/* LEFT COLUMN: Content & Copy */}
                        <div className="lg:w-5/12 space-y-24">

                            {/* 1. Hero Section */}
                            <div className="space-y-8 animate-fade-up">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05] animate-fade-up">
                                    Let's Engineer <br />What's Next.
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg animate-fade-up">
                                    We partner with ambitious founders and growth-focused businesses to build scalable digital systems and product-driven infrastructure.
                                </p>
                                <div className="animate-fade-up">
                                    <Button onClick={scrollToForm} size="lg" className="h-12 px-8 text-base rounded-none bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] border border-blue-500/50 hover:scale-[1.02]">
                                        Apply for Partnership <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* 2. Exclusivity Section */}
                            <div className="space-y-6 max-w-lg relative pl-8 border-l-2 border-blue-500/30 dark:border-blue-900/50 animate-fade-up">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight animate-fade-up">We're Selective by Design.</h2>
                                <div className="space-y-4 text-slate-700 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed animate-fade-up">
                                    <p>AJPR WORLD works with a limited number of partners at a time.</p>
                                    <p>We focus on long-term execution, scalable architecture, and measurable impact.</p>
                                    <p className="text-blue-600 dark:text-blue-400/80 font-bold">If you're looking for quick fixes or low-cost builds — we're probably not the right fit.</p>
                                </div>
                            </div>

                            {/* 3. Ideal Partner Section */}
                            <div className="space-y-6 max-w-lg animate-fade-up">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight animate-fade-up">Who We Work Best With</h2>
                                <ul className="space-y-4 animate-fade-up">
                                    {[
                                        "Funded or Revenue-Generating Startups",
                                        "Scaling Ecommerce Brands",
                                        "Agencies needing long-term tech partner",
                                        "Businesses ready to invest in scalable systems"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-blue-600 dark:text-blue-500 shrink-0 opacity-80" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>



                        </div>

                        {/* RIGHT COLUMN: The Application Form */}
                        <div className="lg:w-7/12" id="application-form">
                            <div className="p-8 md:p-12 lg:p-16 rounded-none bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-xl relative animate-fade-up"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Apply to Work With Us</h2>
                                <p className="text-slate-600 dark:text-slate-400 font-medium mb-12">All fields are required to help us prepare for our discussion.</p>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">Full Name</Label>
                                            <Input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required className="h-14 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors" placeholder="e.g. Aman Joshi" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="workEmail" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">Work Email</Label>
                                            <Input id="workEmail" name="workEmail" type="email" value={form.workEmail} onChange={handleChange} required className="h-14 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors" placeholder="e.g. you@ajprworld.com" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="companyName" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">Company Name</Label>
                                            <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} required className="h-14 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors" placeholder="e.g. AJPR World" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="websiteUrl" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">Website / Product URL</Label>
                                            <Input id="websiteUrl" name="websiteUrl" type="url" value={form.websiteUrl} onChange={handleChange} required className="h-14 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors" placeholder="e.g. https://ajprworld.com" />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3 flex flex-col">
                                            <Label htmlFor="monthlyRevenue" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">Current Monthly Revenue</Label>
                                            <select id="monthlyRevenue" name="monthlyRevenue" value={form.monthlyRevenue} onChange={handleChange} required className="h-14 px-3 bg-slate-50 dark:bg-[#0B0F19]/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none">
                                                <option value="" disabled>Select Revenue Level</option>
                                                <option value="Pre-revenue">Pre-revenue / Seed</option>
                                                <option value="₹0 - ₹10k">₹0 - ₹10k / mo</option>
                                                <option value="₹10k - ₹50k">₹10k - ₹50k / mo</option>
                                                <option value="₹50k - ₹100k">₹50k - ₹100k / mo</option>
                                                <option value="₹100k+">₹100k+ / mo</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3 flex flex-col">
                                            <Label htmlFor="budgetRange" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">Project Budget Range</Label>
                                            <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} required className="h-14 px-3 bg-slate-50 dark:bg-[#0B0F19]/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none">
                                                <option value="" disabled>Select Budget Range</option>
                                                <option value="1L - 3L">₹1L – ₹3L INR</option>
                                                <option value="3L - 10L">₹3L – ₹10L INR</option>
                                                <option value="10L - 25L">₹10L – ₹25L INR</option>
                                                <option value="25L+">₹25L+ INR</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3 flex flex-col">
                                        <Label htmlFor="buildingText" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">What are you building?</Label>
                                        <Textarea id="buildingText" name="buildingText" value={form.buildingText} onChange={handleChange} required placeholder="e.g. We want to design an AI-powered SaaS automation portal and connect it to AJPR World's custom API infrastructure..." rows={4} className="resize-none bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors p-4" />
                                    </div>

                                    <div className="space-y-3 flex flex-col">
                                        <Label htmlFor="blockersText" className="text-slate-700 dark:text-slate-300 font-medium text-sm tracking-wide uppercase">What's blocking your growth right now?</Label>
                                        <Textarea id="blockersText" name="blockersText" value={form.blockersText} onChange={handleChange} required placeholder="e.g. Tech debt and outdated legacy databases are bottlenecking checkout transactions, and we need to scale our system using AJPR World's engineering services." rows={4} className="resize-none bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors p-4" />
                                    </div>

                                    <div className="pt-6">
                                        <Button type="submit" size="lg" disabled={submitting} className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-none transition-colors border border-blue-500/50">
                                            {submitting ? 'Submitting Application...' : 'Submit Application'}
                                        </Button>
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-500 text-center mt-4">Applications are reviewed within 48 hours.</p>
                                    </div>

                                    {status === 'success' && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 font-bold text-center">
                                            {feedbackMsg}
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-bold text-center">
                                            {feedbackMsg}
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>

                    </div>

                    {/* 5. What Happens Next Section (Centered Full Width) */}
                    <div className="mt-32 max-w-6xl mx-auto text-center border-t border-slate-200 dark:border-slate-800/50 pt-24 animate-fade-up">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-16 animate-fade-up">What Happens After You Apply</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { step: 1, title: "Review", desc: "We review your business constraints." },
                                { step: 2, title: "Strategy", desc: "Deep technical discovery call." },
                                { step: 3, title: "Architecture", desc: "Design your system blueprint." },
                                { step: 4, title: "Execution", desc: "We build and deploy to scale." }
                            ].map((s, i) => (
                                <div key={i} className="animate-fade-up flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none backdrop-blur-sm gap-4 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F19] text-blue-600 dark:text-blue-400 font-black text-2xl shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)] mb-2">
                                        0{s.step}
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white tracking-wide text-lg">{s.title}</h3>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. Authority Strip */}
                    <div className="mt-32 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-500 dark:text-slate-500 font-bold text-sm tracking-widest uppercase gap-4">
                        <div className="flex items-center gap-2">
                            Built in India. <Globe className="w-4 h-4 ml-2 mr-2 opacity-50 text-blue-600 dark:text-blue-500" /> Partnering Globally.
                        </div>
                        <div className="flex items-center gap-6">
                            <EmailLink className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-slate-600 dark:text-slate-500 font-bold" />
                            <a href="https://www.linkedin.com/company/ajpr-world" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 text-slate-600 dark:text-slate-500"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
