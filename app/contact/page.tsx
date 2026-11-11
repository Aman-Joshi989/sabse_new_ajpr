'use client'

import { useState } from 'react'
import { ArrowRight, Globe, Linkedin, CheckCircle2, Calendar, MessageCircle, RotateCcw, Clock, ShieldCheck, Mail, Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import EmailLink from '@/components/EmailLink';
import { useRegion } from '@/components/providers/RegionProvider';

interface SubmittedInfo {
    name: string;
    email: string;
    companyName: string;
    websiteUrl: string;
    monthlyRevenue: string;
    budgetRange: string;
    buildingText: string;
    referenceId: string;
}

export default function ApplicationPage() {
    const { isIndia } = useRegion()
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
    const [submittedInfo, setSubmittedInfo] = useState<SubmittedInfo | null>(null)

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

            const data = await res.json().catch(() => ({}))

            if (res.ok) {
                setSubmittedInfo({
                    name: form.fullName,
                    email: form.workEmail,
                    companyName: form.companyName,
                    websiteUrl: form.websiteUrl,
                    monthlyRevenue: form.monthlyRevenue,
                    budgetRange: form.budgetRange,
                    buildingText: form.buildingText,
                    referenceId: data.referenceId || `AJPR-APP-${Date.now().toString(36).toUpperCase()}`
                })
                setStatus('success')
                setFeedbackMsg("Application submitted successfully. We have dispatched a confirmation email to your address.")
                setForm({ fullName: '', workEmail: '', companyName: '', websiteUrl: '', monthlyRevenue: '', budgetRange: '', buildingText: '', blockersText: '' })
                document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
            } else {
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 font-sans selection:bg-blue-500/30 transition-colors duration-300">
            <div className="w-full min-h-screen relative">

                {/* Premium Dark Hero Background */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[80%] h-[150%] bg-[radial-gradient(circle_at_70%_0%,rgba(59,130,246,0.15)_0%,transparent_50%)] pointer-events-none"></div>
                    <div className="absolute top-40 -left-20 w-[60%] h-[120%] bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.1)_0%,transparent_50%)] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djp3uolnn/image/upload/v1723528256/grid-pattern_qayf0d.png')] opacity-20 bg-[length:32px_32px] pointer-events-none mix-blend-overlay"></div>
                </div>

                <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-16 md:py-24 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

                        {/* LEFT COLUMN: Content & Copy */}
                        <div className="lg:w-5/12 space-y-16">

                            {/* 1. Hero Section */}
                            <div className="space-y-8 animate-fade-up">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] animate-fade-up text-transparent bg-clip-text bg-gradient-to-r from-slate-900 dark:from-white via-slate-800 dark:via-white to-slate-600 dark:to-white/60">
                                    Let's Engineer <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">What's Next.</span>
                                </h1>
                                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-lg animate-fade-up">
                                    {isIndia
                                        ? 'We partner with Indian founders and ambitious companies to engineer scalable Next.js platforms, AI systems, and custom software. Fast sprint delivery with GST invoicing.'
                                        : 'We partner with ambitious founders and growth-focused businesses to engineer scalable digital systems, Next.js web applications, and custom AI infrastructure.'}
                                </p>
                                <div className="animate-fade-up">
                                    <Button onClick={scrollToForm} size="lg" className="h-12 px-8 text-sm md:text-base rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold transition-all shadow-md">
                                        Apply for Partnership <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* 2. Direct Senior Engineering Section */}
                            <div className="space-y-6 max-w-lg relative pl-8 border-l-2 border-blue-500/30 animate-fade-up">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight animate-fade-up">Direct Senior Pod. Zero Middlemen.</h2>
                                <div className="space-y-4 text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed animate-fade-up">
                                    <p>At AJPR World, you collaborate directly with senior software architects and systems engineers—never junior account managers.</p>
                                    <p>We architect your platform, commit to transparent sprint roadmaps, and transfer 100% code and IP ownership upon delivery.</p>
                                    <p className="text-emerald-500 font-bold">Direct response within 24 hours &bull; Mutual NDA protected.</p>
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
                                        <li key={i} className="flex items-start text-base md:text-lg font-medium text-slate-600 dark:text-slate-300">
                                            <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-blue-500 shrink-0 opacity-80" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: The Application Form or Confirmation Card */}
                        <div className="lg:w-7/12" id="application-form">
                            <div className="p-8 md:p-12 lg:p-16 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl relative animate-fade-up">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl" />

                                {status === 'success' && submittedInfo ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full w-fit text-xs font-bold uppercase tracking-wider">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            Application Received • Ref #{submittedInfo.referenceId}
                                        </div>

                                        <div className="space-y-3">
                                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                                Application Received!
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                                                Thank you, <strong className="text-slate-900 dark:text-white">{submittedInfo.name}</strong>. An official confirmation email with your project overview and next steps has been dispatched to:
                                            </p>
                                            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-xl flex items-center gap-3 text-sm font-semibold text-blue-700 dark:text-blue-300">
                                                <Mail className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400" />
                                                <span className="truncate">{submittedInfo.email}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                                                * If you do not see the confirmation in your inbox within a few minutes, please check your promotions or spam folder.
                                            </p>
                                        </div>

                                        {/* Submission Snapshot */}
                                        <div className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Logged Project Details
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3 text-xs">
                                                <div>
                                                    <span className="text-slate-500 block">Company:</span>
                                                    <span className="font-bold text-slate-900 dark:text-white truncate block">{submittedInfo.companyName || 'Not specified'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Target Budget:</span>
                                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{submittedInfo.budgetRange || 'Flexible'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Revenue Tier:</span>
                                                    <span className="font-bold text-slate-900 dark:text-white block">{submittedInfo.monthlyRevenue || 'Pre-revenue'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Review SLA:</span>
                                                    <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" /> 24–48 Hours
                                                    </span>
                                                </div>
                                            </div>
                                            {submittedInfo.buildingText && (
                                                <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800">
                                                    <span className="text-slate-500 text-xs block mb-1">Project Focus:</span>
                                                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 italic">
                                                        &ldquo;{submittedInfo.buildingText}&rdquo;
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Fast-Track Actions */}
                                        <div className="p-6 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-800/80 rounded-2xl space-y-4">
                                            <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-300">
                                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                                Need Immediate Answers or Urgent Delivery?
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                                Founder & Lead Systems Architect Aman Joshi personally reviews applications. To bypass email queue latency or lock in your sprint immediately:
                                            </p>
                                            <div className="space-y-2.5 pt-1">
                                                <a
                                                    href="/book-call"
                                                    className="flex items-center justify-between w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-[0.99]"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {isIndia ? 'Schedule 15-Minute Scoping Call (IST)' : 'Schedule 15-Minute Scoping Call (US Hours)'}
                                                    </span>
                                                    <span className="text-xs bg-blue-700/60 px-2 py-0.5 rounded font-normal">Calendar</span>
                                                </a>

                                                {isIndia ? (
                                                    <a
                                                        href={`https://wa.me/919997205257?text=${encodeURIComponent(
                                                            `Hi Aman, I just submitted an application on AJPR World (Ref: ${submittedInfo.referenceId}) for ${submittedInfo.companyName || submittedInfo.name} and would like to connect directly.`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-[0.99]"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <MessageCircle className="w-4 h-4" />
                                                            Chat Directly on WhatsApp
                                                        </span>
                                                        <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded font-normal">+91 99972 05257</span>
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={`mailto:hello@ajprworld.com?subject=Application%20Ref:%20${submittedInfo.referenceId}%20-%20${encodeURIComponent(submittedInfo.companyName || submittedInfo.name)}`}
                                                        className="flex items-center justify-between w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-[0.99]"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Send className="w-4 h-4 text-blue-400" />
                                                            Email Lead Architect Directly
                                                        </span>
                                                        <span className="text-xs bg-slate-700 px-2 py-0.5 rounded font-mono text-slate-300">hello@ajprworld.com</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-2 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setStatus('idle')
                                                    setSubmittedInfo(null)
                                                }}
                                                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 transition-colors"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                                Submit another application or edit details
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Let's Discuss Your Project</h2>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 text-sm">Tell us about your roadmap, timeline, and goals. We review every inquiry and respond within 24 hours.</p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Full Name *</Label>
                                                    <Input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} required className="h-12 bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors" placeholder="e.g. Alex Morgan" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="workEmail" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Work Email *</Label>
                                                    <Input id="workEmail" name="workEmail" type="email" value={form.workEmail} onChange={handleChange} required className="h-12 bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors" placeholder="e.g. alex@company.com" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="companyName" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Company / Project Name</Label>
                                                    <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="h-12 bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors" placeholder="e.g. Acme Labs or Stealth" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="websiteUrl" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Website URL (Optional)</Label>
                                                    <Input id="websiteUrl" name="websiteUrl" type="url" value={form.websiteUrl} onChange={handleChange} className="h-12 bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors" placeholder="https://yourwebsite.com (or leave empty)" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2 flex flex-col">
                                                    <Label htmlFor="monthlyRevenue" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Stage / Revenue (Optional)</Label>
                                                    <select id="monthlyRevenue" name="monthlyRevenue" value={form.monthlyRevenue} onChange={handleChange} className="h-12 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-xs sm:text-sm">
                                                        <option value="">Select Stage (Optional)</option>
                                                        <option value="Pre-revenue">Pre-revenue / Idea / MVP</option>
                                                        {isIndia ? (
                                                            <>
                                                                <option value="₹0 - ₹5 Lakhs">₹0 – ₹5 Lakhs / mo</option>
                                                                <option value="₹5L - ₹20 Lakhs">₹5 Lakhs – ₹20 Lakhs / mo</option>
                                                                <option value="₹20L - ₹50 Lakhs">₹20 Lakhs – ₹50 Lakhs / mo</option>
                                                                <option value="₹50 Lakhs+">₹50 Lakhs+ / mo</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="$0 - $10k">$0 – $10k / mo</option>
                                                                <option value="$10k - $50k">$10k – $50k / mo</option>
                                                                <option value="$50k - $100k">$50k – $100k / mo</option>
                                                                <option value="$100k+">$100k+ / mo</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="space-y-2 flex flex-col">
                                                    <Label htmlFor="budgetRange" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Estimated Budget Range</Label>
                                                    <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} className="h-12 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-xs sm:text-sm">
                                                        <option value="">Select budget range...</option>
                                                        {isIndia ? (
                                                            <>
                                                                <option value="₹1.5L - ₹3L">₹1,49,000 – ₹2,99,000 (Sprint MVP)</option>
                                                                <option value="₹3L - ₹6L">₹2,99,000 – ₹5,99,000 (Full Web App / AI)</option>
                                                                <option value="₹6L - ₹15L">₹5,99,000 – ₹15,00,000 (Custom Architecture)</option>
                                                                <option value="₹15L+">₹15,00,000+ (Enterprise Multi-Tenant)</option>
                                                                <option value="Flexible">Flexible / Need technical recommendation</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="$4.5k - $7.5k">$4,500 – $7,500 (Sprint MVP)</option>
                                                                <option value="$7.5k - $15k">$7,500 – $15,000 (Full Web App / AI)</option>
                                                                <option value="$15k - $35k">$15,000 – $35,000 (Custom Architecture)</option>
                                                                <option value="$35k+">$35,000+ (Enterprise SLA)</option>
                                                                <option value="Flexible">Flexible / Need technical recommendation</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2 flex flex-col">
                                                <Label htmlFor="buildingText" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">What are you looking to build or solve? *</Label>
                                                <Textarea id="buildingText" name="buildingText" value={form.buildingText} onChange={handleChange} required placeholder="e.g. We are building a Next.js SaaS MVP with AI workflows and need production architecture and delivery in 30 days..." rows={3} className="resize-none bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors p-3.5 text-sm" />
                                            </div>

                                            <div className="space-y-2 flex flex-col">
                                                <Label htmlFor="blockersText" className="text-slate-600 dark:text-slate-300 font-semibold text-xs tracking-wide uppercase">Timeline or Special Requirements (Optional)</Label>
                                                <Textarea id="blockersText" name="blockersText" value={form.blockersText} onChange={handleChange} placeholder="e.g. Target launch in 4 weeks, requires Stripe billing and Supabase Postgres integration..." rows={2} className="resize-none bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors p-3.5 text-sm" />
                                            </div>

                                            <div className="pt-2">
                                                <Button type="submit" size="lg" disabled={submitting} className="w-full h-14 text-base bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
                                                    {submitting ? 'Sending Inquiry...' : 'Send Project Inquiry'}
                                                </Button>
                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 text-center mt-3">
                                                    🔒 Confidential under mutual NDA &bull; Reviewed within 24 hours directly by Lead Architect Aman Joshi.
                                                </p>
                                            </div>

                                            {status === 'error' && (
                                                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-center rounded-xl">
                                                    {feedbackMsg}
                                                </div>
                                            )}
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* 5. What Happens Next Section (Centered Full Width) */}
                    <div className="mt-32 max-w-6xl mx-auto text-center border-t border-slate-200 dark:border-white/10 pt-24 animate-fade-up">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-16 animate-fade-up">What Happens After You Apply</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { step: 1, title: "Review", desc: "We review your business constraints." },
                                { step: 2, title: "Strategy", desc: "Deep technical discovery call." },
                                { step: 3, title: "Architecture", desc: "Design your system blueprint." },
                                { step: 4, title: "Execution", desc: "We build and deploy to scale." }
                            ].map((s, i) => (
                                <div key={i} className="animate-fade-up flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm gap-4 hover:bg-slate-100 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-blue-400 font-black text-2xl shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)] mb-2">
                                        0{s.step}
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white tracking-wide text-lg">{s.title}</h3>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. Authority Strip */}
                    <div className="mt-32 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between text-slate-500 font-bold text-sm tracking-widest uppercase gap-4">
                        <div className="flex items-center gap-2">
                            {isIndia ? (
                                <>Pan-India Delivery <Globe className="w-4 h-4 ml-2 mr-2 opacity-50 text-blue-500" /> Haldwani, Nainital &amp; Delhi NCR &bull; GST Invoicing</>
                            ) : (
                                <>Senior US Engineering Pods <Globe className="w-4 h-4 ml-2 mr-2 opacity-50 text-blue-500" /> Delaware-Friendly Contracts &bull; Wire &amp; Cards</>
                            )}
                        </div>
                        <div className="flex items-center gap-6">
                            <EmailLink className="hover:text-blue-400 transition-colors text-slate-500 font-bold" />
                            <a href="https://www.linkedin.com/company/ajpr-world" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-blue-400 transition-colors flex items-center gap-2 text-slate-500"><Linkedin className="w-4 h-4" /> LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
