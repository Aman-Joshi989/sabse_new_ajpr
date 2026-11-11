'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Clock, Shield, Zap, Sparkles, 
  MessageSquare, ArrowRight, Calendar as CalendarIcon, User, 
  Globe, ChevronLeft, ChevronRight, Video, ArrowLeft, ArrowUpRight,
  MessageCircle, Receipt, Mail, Phone, Lock, ShieldCheck, Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRegion } from '@/components/providers/RegionProvider'

const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM'
]

function getNextBusinessDay() {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    if (d.getDay() === 6) d.setDate(d.getDate() + 2) // Saturday -> Monday
    if (d.getDay() === 0) d.setDate(d.getDate() + 1) // Sunday -> Monday
    d.setHours(0, 0, 0, 0)
    return d
}

export default function BookCallPage() {
    const { isIndia } = useRegion()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [activeTimeSlot, setActiveTimeSlot] = useState<string | null>('11:00 AM')
    const [step, setStep] = useState<'datetime' | 'form' | 'success'>('datetime')
    const [submitting, setSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [feedbackMsg, setFeedbackMsg] = useState('')

    const [form, setForm] = useState({
        fullName: '',
        workEmail: '',
        phone: '',
        companyName: '',
        websiteUrl: '',
        topic: ''
    })

    useEffect(() => {
        const nextDay = getNextBusinessDay()
        setSelectedDate(nextDay)
        setCurrentDate(new Date(nextDay.getFullYear(), nextDay.getMonth(), 1))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedDate || !activeTimeSlot) return

        setSubmitting(true)
        setStatus('idle')

        const formattedDate = selectedDate.toISOString().split('T')[0]

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.fullName,
                    email: form.workEmail,
                    phone: form.phone || '',
                    companyName: form.companyName || 'Not specified',
                    websiteUrl: form.websiteUrl || 'Not specified',
                    monthlyRevenue: 'Discovery Call Booking',
                    budgetRange: '',
                    buildingText: form.topic || 'Strategy & MVP Architecture Session',
                    blockersText: `Scheduled for ${formattedDate} at ${activeTimeSlot}`,
                    message: `Strategy Call Scheduled: ${form.fullName} (${form.workEmail}, phone: ${form.phone || 'N/A'}) from ${form.companyName || 'N/A'}. Date: ${formattedDate} at ${activeTimeSlot}. Topic: ${form.topic || 'Architecture & Scoping'}`
                })
            })

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}))
                throw new Error(errData.error || "Failed to schedule session.")
            }
            
            setStatus('success')
            setStep('success')

        } catch (err: any) {
            console.error("Booking initialization error:", err)
            setStatus('error')
            setFeedbackMsg(err.message || "Failed to initiate booking. Please try again.")
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
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (clickedDate < today) return
        if (clickedDate.getDay() === 0 || clickedDate.getDay() === 6) return // Weekend check

        setSelectedDate(clickedDate)
        if (!activeTimeSlot) {
            setActiveTimeSlot('11:00 AM')
        }
    }

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDayIndex = getFirstDayOfMonth(currentDate)
        const days = []
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        // Pad start days
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`pad-${i}`} className="h-10 w-10 sm:h-11 sm:w-11" />)
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
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center text-sm font-semibold transition-all relative
                        ${isSelected 
                            ? 'bg-blue-600 text-white shadow-md font-bold scale-105 z-10' 
                            : isDisabled 
                                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' 
                                : 'text-slate-700 dark:text-slate-300 bg-slate-100/70 dark:bg-slate-800/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400'
                        }
                    `}
                >
                    {day}
                    {thisDate.toDateString() === today.toDateString() && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
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
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-200 transition-colors duration-500 relative flex items-center justify-center p-4 py-20 md:py-28 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-blue-600/5 dark:bg-blue-600/3 blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/5 dark:bg-indigo-600/3 blur-[120px] mix-blend-screen" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-5xl w-full rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#090f1f] overflow-hidden flex flex-col md:flex-row min-h-[660px]">
                
                {/* LEFT PANE: Architect Persona & Real-Human Trust */}
                <div className="w-full md:w-[38%] border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-slate-50/70 dark:bg-[#060a13]">
                    <div className="space-y-6">
                        {/* Profile Persona */}
                        <div className="flex items-center gap-3.5">
                            <div className="relative">
                                <Image
                                    src="/images/aman-joshi-profile.png"
                                    alt="Aman Joshi"
                                    width={56}
                                    height={56}
                                    className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-blue-500/20"
                                    priority
                                />
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Active"></span>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white">Aman Joshi</h2>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Founder & Lead Systems Architect</p>
                                <p className="text-[11px] text-slate-400">Direct 1-on-1 Scoping &bull; No Sales Middlemen</p>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                {isIndia ? '30-Minute Architecture & Scoping Call (IST)' : '30-Minute Architecture & Scoping Session'}
                            </h1>
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {isIndia
                                    ? 'Schedule a direct technical session to review your custom software, MVP sprint, or AI automation. We discuss architecture, timeline, and fixed INR pricing.'
                                    : 'Schedule a direct technical session to review your product roadmap, system architecture, and 14–30 day delivery sprint with 100% code ownership.'}
                            </p>
                        </div>

                        {/* Meeting Spec Pills */}
                        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
                                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                                <span>30 Minutes &bull; {isIndia ? 'Indian Standard Time (IST)' : 'US EST / PST Compatible'}</span>
                            </div>
                            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
                                <Video className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>Google Meet details delivered to your email instantly.</span>
                            </div>
                            {selectedDate && activeTimeSlot && (
                                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold">
                                    <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                    <span>
                                        {activeTimeSlot} {isIndia ? '(IST)' : '(EST / PST)'} &bull; {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Zero Friction Fast Track Alternatives */}
                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                Prefer an instant answer?
                            </div>

                            {isIndia ? (
                                <a
                                    href="https://wa.me/919997205257?text=Hi%20Aman,%20I'd%20like%20to%20discuss%20a%20software%20project%20for%20my%20business."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
                                >
                                    <span className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        <span>Chat on WhatsApp (+91 99972 05257)</span>
                                    </span>
                                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Fast</span>
                                </a>
                            ) : (
                                <a
                                    href="mailto:hello@ajprworld.com?subject=Direct%20Scoping%20Inquiry%20via%20Book%20Call"
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-blue-500" />
                                        <span>Email Lead Architect Directly</span>
                                    </span>
                                    <span className="text-[10px] bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 px-2 py-0.5 rounded font-mono">hello@ajprworld.com</span>
                                </a>
                            )}
                        </div>

                        {/* Studio Guarantees */}
                        <div className="space-y-1.5 pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-500" /> 100% Code & IP Ownership &bull; GitHub Transfer
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-500" /> 14–30 Day Delivery MVP Roadmaps
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-500" /> {isIndia ? 'GST Invoicing & Pan-India Bank Support' : 'Fixed Sprint Pricing & Zero Hourly Creep'}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Mutual NDA Covered</span>
                        <a href="mailto:hello@ajprworld.com" className="hover:underline flex items-center gap-1">Direct Help <ArrowUpRight className="w-3 h-3" /></a>
                    </div>
                </div>

                {/* RIGHT PANE: Interactive Booking Calendar & Streamlined Form */}
                <div className="w-full md:w-[62%] flex flex-col justify-center min-h-[500px]">
                    <AnimatePresence mode="wait" initial={false}>
                        
                        {/* STEP 1: Interactive Date & Time Picker */}
                        {step === 'datetime' && (
                            <motion.div 
                                key="step-datetime"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8 flex flex-col h-full justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Select Date & Time</h3>
                                        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/60">
                                            Step 1 of 2
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
                                        
                                        {/* Calendar Grid */}
                                        <div className="w-full lg:w-[55%] space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-slate-900 dark:text-white text-sm">
                                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <button type="button" onClick={() => handleMonthChange('prev')} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>
                                                    <button type="button" onClick={() => handleMonthChange('next')} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase">
                                                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 justify-items-center">
                                                {renderCalendarDays()}
                                            </div>
                                        </div>

                                        {/* Available Slots Panel (Auto-visible immediately!) */}
                                        <div className="w-full lg:w-[45%] space-y-3 pt-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Available Slots'}
                                                </p>
                                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                                                {timeSlots.map(slot => {
                                                    const isSelected = activeTimeSlot === slot
                                                    return (
                                                        <button
                                                            key={slot}
                                                            type="button"
                                                            onClick={() => setActiveTimeSlot(slot)}
                                                            className={`w-full h-10 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between px-3.5
                                                                ${isSelected 
                                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-bold' 
                                                                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-500'
                                                                }
                                                            `}
                                                        >
                                                            <span>{slot}</span>
                                                            {isSelected && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">Selected</span>}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Step Button */}
                                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between">
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        Selected: <strong className="text-slate-900 dark:text-white">{activeTimeSlot}</strong>, {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </div>
                                    <Button 
                                        type="button" 
                                        onClick={() => setStep('form')} 
                                        disabled={!selectedDate || !activeTimeSlot}
                                        className="h-11 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md gap-1.5"
                                    >
                                        Next: Enter Details <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Streamlined Details Form */}
                        {step === 'form' && (
                            <motion.div 
                                key="step-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8 flex flex-col h-full justify-between"
                            >
                                <div>
                                    <button 
                                        type="button" 
                                        onClick={() => setStep('datetime')} 
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider mb-3"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" /> Back to calendar
                                    </button>
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Enter Your Details</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                Locked slot: <strong className="text-blue-600 dark:text-blue-400">{activeTimeSlot}</strong> on {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/60 shrink-0">
                                            Step 2 of 2
                                        </span>
                                    </div>

                                    <form onSubmit={handleBooking} className="space-y-3.5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div className="space-y-1">
                                                <Label htmlFor="fullName" className="text-xs uppercase tracking-wide font-bold text-slate-500 dark:text-slate-400">Full Name *</Label>
                                                <Input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className="h-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm" placeholder="e.g. Alex Morgan" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="workEmail" className="text-xs uppercase tracking-wide font-bold text-slate-500 dark:text-slate-400">Work Email *</Label>
                                                <Input id="workEmail" name="workEmail" type="email" required value={form.workEmail} onChange={handleChange} className="h-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm" placeholder="e.g. alex@company.com" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            <div className="space-y-1">
                                                <Label htmlFor="phone" className="text-xs uppercase tracking-wide font-bold text-slate-500 dark:text-slate-400">
                                                    {isIndia ? 'WhatsApp / Phone Number' : 'Phone Number (Optional)'}
                                                </Label>
                                                <Input id="phone" name="phone" value={form.phone} onChange={handleChange} className="h-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm" placeholder={isIndia ? '+91 98765 43210' : '+1 (415) 800-2490'} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="companyName" className="text-xs uppercase tracking-wide font-bold text-slate-500 dark:text-slate-400">Company or Website</Label>
                                                <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="h-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm" placeholder="e.g. Acme Corp or acme.com" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="topic" className="text-xs uppercase tracking-wide font-bold text-slate-500 dark:text-slate-400">What are we building or reviewing?</Label>
                                            <Textarea id="topic" name="topic" value={form.topic} onChange={handleChange} rows={2} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm resize-none" placeholder={isIndia ? "e.g. Next.js SaaS MVP, AI customer agent, or SEO platform..." : "e.g. Custom web application, multi-agent AI workflow, or platform rebuild..."} />
                                        </div>

                                        <Button type="submit" disabled={submitting} className="w-full h-11 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md">
                                            {submitting ? 'Confirming Reservation...' : 'Confirm 30-Minute Architecture Session'}
                                        </Button>

                                        {status === 'error' && (
                                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-semibold text-center text-xs">
                                                {feedbackMsg}
                                            </div>
                                        )}
                                    </form>
                                </div>

                                <p className="text-[11px] text-slate-400 text-center pt-3 border-t border-slate-200 dark:border-slate-800">
                                    🔒 Zero sales spam. You meet directly with Lead Architect Aman Joshi.
                                </p>
                            </motion.div>
                        )}

                        {/* STEP 3: Success Confirmation */}
                        {step === 'success' && (
                            <motion.div 
                                key="step-success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-6 flex-grow"
                            >
                                <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>

                                <div className="space-y-1.5">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Call Confirmed!</h2>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-xs sm:text-sm leading-relaxed">
                                        You are scheduled with Aman Joshi. A calendar invite and Google Meet link have been sent to <span className="text-blue-600 dark:text-blue-400 font-semibold">{form.workEmail}</span>.
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full text-left space-y-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">30-Minute Architecture Call</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                                        <CalendarIcon className="w-4 h-4 text-blue-500" />
                                        <span>
                                            {activeTimeSlot}, {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                                        <Video className="w-4 h-4 text-emerald-500" />
                                        <span>Google Meet link included in invitation.</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2.5 pt-2 w-full max-w-sm">
                                    <Button 
                                        onClick={() => {
                                            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AJPR+World+Strategy+Session&dates=${selectedDate?.toISOString().replace(/[-:]/g, '').split('.')[0]}T093000Z/${selectedDate?.toISOString().replace(/[-:]/g, '').split('.')[0]}T100000Z&details=Strategy+discovery+call+with+Aman+Joshi+to+review+MVP+architecture+and+technical+scope.&location=Google+Meet`
                                            window.open(url, '_blank')
                                        }}
                                        variant="outline" 
                                        className="h-10 flex-1 rounded-xl font-bold border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                                    >
                                        Add to Google Calendar
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            setStep('datetime')
                                        }}
                                        className="h-10 flex-1 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white text-xs"
                                    >
                                        Book Another Session
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                        
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}
