'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Clock, Shield, Zap, Star, Sparkles, 
  MessageSquare, ArrowRight, ArrowUpRight, Calendar as CalendarIcon, User, 
  Globe, ChevronLeft, ChevronRight, HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const fadeInUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

const stagger: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const benefits = [
    { icon: Zap, label: 'Free 30-Min Call', desc: 'No sales pitch or pressure — just pure strategy on how to hit your technical and growth milestones.' },
    { icon: Shield, label: 'No Commitment', desc: "We'll let you know honestly if we aren't the right fit. No persistent follow-ups or spam." },
    { icon: Clock, label: 'Instant Booking', desc: 'Secure your slot instantly in our calendar and receive direct email and calendar invites.' },
    { icon: Star, label: 'Direct Consulting', desc: 'Talk directly with AJPR World founders who actively engineer MVPs and run SEO setups.' },
]

const agenda = [
    { num: '01', title: 'Technical Assessment', desc: 'Analyze your current tech stack, system architecture, database performance, or marketing bottlenecks.' },
    { num: '02', title: 'Target Objectives', desc: 'Define what success looks like for your product development, branding, or traffic growth in the next 90 days.' },
    { num: '03', title: 'Actionable Solutions', desc: 'Map out concrete architectures, automation pipelines, or GEO strategies recommended for your business.' },
    { num: '04', title: 'Scope & Collaboration', desc: 'If there is a mutual fit, we outline a detailed, low-friction path to get your project moving.' },
]

const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM'
]

export default function BookCallPage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    const [form, setForm] = useState({
        fullName: '',
        workEmail: '',
        companyName: '',
        websiteUrl: '',
        topic: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedDate || !selectedTimeSlot) return

        setSubmitting(true)
        setStatus('idle')

        const formattedDate = selectedDate.toISOString().split('T')[0]

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.fullName,
                    email: form.workEmail,
                    companyName: form.companyName,
                    websiteUrl: form.websiteUrl,
                    bookingDate: formattedDate,
                    bookingTime: selectedTimeSlot,
                    topic: form.topic
                }),
            })

            const data = await res.json()

            if (res.ok && data.success) {
                setStatus('success')
                setFormSubmitted(true)
            } else {
                setStatus('error')
                setFeedbackMsg(data.error || "Booking failed. Please select another slot or try again.")
            }
        } catch (err) {
            console.error("Booking error:", err)
            setStatus('error')
            setFeedbackMsg("Network error. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    // Calendar Generation logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month, 1).getDay()
    }

    const handleMonthChange = (direction: 'next' | 'prev') => {
        const newDate = new Date(currentDate)
        if (direction === 'next') {
            newDate.setMonth(newDate.getMonth() + 1)
        } else {
            newDate.setMonth(newDate.getMonth() - 1)
        }
        setCurrentDate(newDate)
    }

    const handleDateSelect = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        // Prevent selecting weekends or past dates
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (clickedDate < today) return
        if (clickedDate.getDay() === 0 || clickedDate.getDay() === 6) return // Weekend check

        setSelectedDate(clickedDate)
        setSelectedTimeSlot(null) // Reset slot when date changes
    }

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDayIndex = getFirstDayOfMonth(currentDate)
        const days = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Pad start days
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`pad-${i}`} className="h-10 w-10 sm:h-12 sm:w-12" />)
        }

        // Render month days
        for (let day = 1; day <= daysInMonth; day++) {
            const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const isPast = thisDate < today
            const isWeekend = thisDate.getDay() === 0 || thisDate.getDay() === 6
            const isSelected = selectedDate && 
                              selectedDate.getDate() === day && 
                              selectedDate.getMonth() === currentDate.getMonth() && 
                              selectedDate.getFullYear() === currentDate.getFullYear()
            
            const isDisabled = isPast || isWeekend

            days.push(
                <button
                    key={day}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(day)}
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all relative
                        ${isSelected 
                            ? 'bg-blue-600 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.6)] font-bold scale-105 z-10' 
                            : isDisabled 
                                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' 
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }
                    `}
                >
                    {day}
                    {thisDate.toDateString() === today.toDateString() && !isSelected && (
                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                </button>
            )
        }

        return days
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-200 transition-colors duration-500 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] mix-blend-screen" />
            </div>

            {/* Subtle Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_30%,transparent_100%)] pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                
                {/* Hero Header */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold">
                        <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
                        Ready to Build, Scale, & Dominate search?
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                        Schedule Your Free<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:to-indigo-400">Strategy Session</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        Speak directly with our technical founders. We will map out a custom system architecture, automation flow, or search strategy tailored to your growth goals.
                    </motion.p>
                </motion.div>

                {/* Benefits Section */}
                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {benefits.map((b, i) => (
                        <motion.div key={i} variants={fadeInUp} className="p-6 rounded-2xl bg-white/70 dark:bg-[#090f1e]/40 border border-slate-200/60 dark:border-white/5 backdrop-blur-md shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 flex items-center justify-center mb-4">
                                <b.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">{b.label}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Interactive Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left: Agenda & Trust */}
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-5 w-full space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <motion.div variants={fadeInUp}>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Our 30-Minute Agenda</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mt-2">Zero fluff. Every strategy session is optimized to give you quick, actionable value.</p>
                            </motion.div>

                            <div className="space-y-4">
                                {agenda.map((item, i) => (
                                    <motion.div key={i} variants={fadeInUp} className="flex gap-4 p-5 rounded-2xl bg-white/70 dark:bg-[#090f1e]/40 border border-slate-200/60 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 shadow-sm">
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 text-sm">
                                            {item.num}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{item.title}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Founder profile / Trust block */}
                        <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-500/5 dark:to-indigo-500/5 border border-blue-500/20 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
                            <div className="flex gap-4 items-start relative z-10">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 border overflow-hidden flex items-center justify-center font-black text-blue-600 text-lg">
                                    AJ
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base">Direct & Personalized Strategy</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                                        We don't hand you off to salesmen. Your call is scheduled directly with AJPR World’s leadership and core engineering team so you can talk architecture and scaling without filters.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Message CTA */}
                        <motion.div variants={fadeInUp} className="p-6 rounded-2xl bg-white/70 dark:bg-[#090f1e]/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white text-sm">Have a quick question?</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Reach out via mail for rapid support.</p>
                                </div>
                            </div>
                            <a href="mailto:aman@ajprworld.com" className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white">
                                <ArrowUpRight className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Custom Interactive Booking Console */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-7 w-full rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-2xl dark:shadow-indigo-500/5 bg-white dark:bg-[#080d19] order-1 lg:order-2 self-stretch flex flex-col min-h-[750px] relative z-10 p-6 md:p-8"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500" />
                        
                        <AnimatePresence mode="wait">
                            {!formSubmitted ? (
                                <motion.div 
                                    key="scheduler-view"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col h-full space-y-6"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            Select Date & Time
                                        </h2>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Available timings are displayed in India Standard Time (IST).</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 items-start">
                                        {/* Calendar Grid */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-slate-900 dark:text-white text-sm">
                                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <button type="button" onClick={() => handleMonthChange('prev')} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    <button type="button" onClick={() => handleMonthChange('next')} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Days name row */}
                                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 dark:text-slate-600">
                                                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                            </div>

                                            {/* Days grid */}
                                            <div className="grid grid-cols-7 gap-1 justify-items-center">
                                                {renderCalendarDays()}
                                            </div>
                                        </div>

                                        {/* Time slots */}
                                        <div className="space-y-4">
                                            <span className="font-bold text-slate-950 dark:text-white text-sm block">
                                                {selectedDate 
                                                    ? `Available slots for ${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`
                                                    : 'Please select a date first'
                                                }
                                            </span>

                                            {selectedDate ? (
                                                <div className="grid grid-cols-2 gap-3">
                                                    {timeSlots.map(slot => {
                                                        const isSelected = selectedTimeSlot === slot
                                                        return (
                                                            <button
                                                                key={slot}
                                                                type="button"
                                                                onClick={() => setSelectedTimeSlot(slot)}
                                                                className={`h-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all border
                                                                    ${isSelected 
                                                                        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)] font-bold scale-[1.02]' 
                                                                        : 'bg-slate-50 dark:bg-[#0c1222] border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                                                                    }
                                                                `}
                                                            >
                                                                {slot}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="h-44 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-xs sm:text-sm gap-2">
                                                    <Clock className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                                                    Select a date to unlock available timings.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Selected Details & Booking Form Form */}
                                    {selectedDate && selectedTimeSlot && (
                                        <motion.form 
                                            initial={{ opacity: 0, y: 15 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            onSubmit={handleBooking} 
                                            className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-5"
                                        >
                                            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                <span className="text-sm font-semibold text-slate-850 dark:text-slate-200">
                                                    Selected Call: {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTimeSlot} IST
                                                </span>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName" className="text-xs uppercase tracking-wide font-bold text-slate-400">Your Name</Label>
                                                    <Input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className="h-12 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-xl focus:ring-blue-500" placeholder="e.g. Aman Joshi" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="workEmail" className="text-xs uppercase tracking-wide font-bold text-slate-400">Work Email</Label>
                                                    <Input id="workEmail" name="workEmail" type="email" required value={form.workEmail} onChange={handleChange} className="h-12 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-xl focus:ring-blue-500" placeholder="e.g. you@company.com" />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="companyName" className="text-xs uppercase tracking-wide font-bold text-slate-400">Company Name</Label>
                                                    <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="h-12 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-xl focus:ring-blue-500" placeholder="e.g. Acme Corp" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="websiteUrl" className="text-xs uppercase tracking-wide font-bold text-slate-400">Website URL</Label>
                                                    <Input id="websiteUrl" name="websiteUrl" type="url" value={form.websiteUrl} onChange={handleChange} className="h-12 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-xl focus:ring-blue-500" placeholder="e.g. https://acme.com" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="topic" className="text-xs uppercase tracking-wide font-bold text-slate-400">Primary Objective / What are we building?</Label>
                                                <Textarea id="topic" name="topic" value={form.topic} onChange={handleChange} rows={3} className="bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-xl focus:ring-blue-500 p-4" placeholder="Briefly describe what you'd like to address during the call..." />
                                            </div>

                                            <Button type="submit" disabled={submitting} className="w-full h-14 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]">
                                                {submitting ? 'Confirming Appointment...' : 'Schedule Strategy Call'}
                                            </Button>

                                            {status === 'error' && (
                                                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-semibold text-center text-xs">
                                                    {feedbackMsg}
                                                </div>
                                            )}
                                        </motion.form>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="success-view"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center flex-grow text-center py-12 px-4 space-y-6"
                                >
                                    <div className="w-20 h-20 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Strategy Call Scheduled!</h2>
                                        <p className="text-slate-550 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
                                            Your partnership request has been confirmed. A calendar invitation with Google Meet links has been sent to your email.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-slate-50 dark:bg-[#0c1222]/80 border border-slate-200/50 dark:border-white/5 rounded-2xl max-w-sm w-full space-y-4">
                                        <div className="flex items-center gap-3 border-b border-slate-200/40 dark:border-white/5 pb-3">
                                            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <div className="text-left">
                                                <p className="text-xs text-slate-400">Host</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Aman Joshi (AJPR World)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 border-b border-slate-200/40 dark:border-white/5 pb-3">
                                            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <div className="text-left">
                                                <p className="text-xs text-slate-400">Scheduled Date</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <div className="text-left">
                                                <p className="text-xs text-slate-400">Scheduled Time</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedTimeSlot} IST</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button 
                                            onClick={() => {
                                                const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AJPR+World+Strategy+Session&dates=${selectedDate?.toISOString().replace(/[-:]/g, '').split('.')[0]}T093000Z/${selectedDate?.toISOString().replace(/[-:]/g, '').split('.')[0]}T100000Z&details=Strategy+discovery+call+with+Aman+Joshi+to+review+MVP+architecture+and+SEO+positioning.&location=Google+Meet`
                                                window.open(url, '_blank')
                                            }}
                                            variant="outline" 
                                            className="h-12 px-6 rounded-xl font-bold border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                                        >
                                            Add to Google Calendar
                                        </Button>
                                        <Button 
                                            onClick={() => {
                                                setFormSubmitted(false)
                                                setSelectedDate(null)
                                                setSelectedTimeSlot(null)
                                            }}
                                            className="h-12 px-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-505 text-white"
                                        >
                                            Schedule Another Call <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
