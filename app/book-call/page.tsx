'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, Clock, Shield, Zap, Star, Sparkles, 
  MessageSquare, ArrowRight, Calendar as CalendarIcon, User, 
  Globe, ChevronLeft, ChevronRight, Video, ArrowLeft, ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Script from 'next/script'
import { createRazorpayOrder } from '@/app/actions'


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
    const [activeTimeSlot, setActiveTimeSlot] = useState<string | null>(null)
    const [step, setStep] = useState<'datetime' | 'form' | 'success'>('datetime')
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
                    phone: '',
                    companyName: form.companyName,
                    websiteUrl: form.websiteUrl,
                    monthlyRevenue: 'Discovery Call Booking',
                    budgetRange: '',
                    buildingText: form.topic || 'Strategy Session',
                    blockersText: `Scheduled for ${formattedDate} at ${activeTimeSlot}`,
                    message: `Strategy Call Scheduled: ${form.fullName} (${form.workEmail}) from ${form.companyName || 'N/A'}. Date: ${formattedDate} at ${activeTimeSlot}. Topic: ${form.topic || 'General Strategy'}`
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
        setActiveTimeSlot(null) // Reset time slot when date changes
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
                                : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/40'
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

            {/* Subtle Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-5xl w-full rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#090f1f] overflow-hidden flex flex-col md:flex-row min-h-[660px]">
                
                {/* LEFT PANE: Meeting Details (Exactly like Calendly) */}
                <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-slate-250 dark:border-white/10 p-6 md:p-8 flex flex-col justify-between space-y-8 bg-slate-50/50 dark:bg-[#060a13]">
                    <div className="space-y-6">
                        {/* Profile pic / Company Logo */}
                        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-850 border border-slate-300 dark:border-white/10 flex items-center justify-center overflow-hidden font-black text-blue-600 text-xl shadow-inner">
                            AJ
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aman Joshi</p>
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">30-Minute Strategy Session</h1>
                        </div>

                        <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <div className="flex items-center gap-2.5">
                                <Clock className="w-4.5 h-4.5 text-slate-400" />
                                <span>30 min</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Video className="w-4.5 h-4.5 text-slate-400" />
                                <span>Web conferencing details provided upon confirmation.</span>
                            </div>
                            {selectedDate && activeTimeSlot && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="flex items-start gap-2.5 text-blue-600 dark:text-blue-400 font-semibold"
                                >
                                    <CalendarIcon className="w-4.5 h-4.5 mt-0.5 shrink-0" />
                                    <span>
                                        {activeTimeSlot}, {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        <p className="text-xs md:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Book a direct 1-on-1 strategy call with senior systems architect Aman Joshi to map your software MVP, AI automation, or high-converting web architecture.
                        </p>

                        {/* Competitor Contrast Trust Points */}
                        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>Direct with senior engineer &bull; No sales reps</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>Guaranteed 2–4 week MVP sprint delivery</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>100% code & IP ownership &bull; Zero lock-in</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>Month-to-month or flat sprints &bull; No lock-in</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span>Trusted by Founders</span>
                        <a href="mailto:aman@ajprworld.com" className="hover:underline flex items-center gap-1">Contact Support <ArrowUpRight className="w-3 h-3" /></a>
                    </div>
                </div>

                {/* RIGHT PANE: Flow steps */}
                <div className="w-full md:w-[65%] flex flex-col justify-center min-h-[500px]">
                    <AnimatePresence mode="wait" initial={false}>
                        
                        {/* STEP 1: Date & Time Picker */}
                        {step === 'datetime' && (
                            <motion.div 
                                key="step-datetime"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8 flex flex-col h-full justify-between"
                            >
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-4">Select a Date & Time</h3>
                                
                                <div className={`flex flex-col ${selectedDate ? 'lg:flex-row' : ''} gap-8 items-start w-full transition-all duration-300`}>
                                    
                                    {/* Monthly Calendar */}
                                    <div className={`w-full ${selectedDate ? 'lg:w-[55%]' : 'w-full'} space-y-4`}>
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

                                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase">
                                            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 justify-items-center">
                                            {renderCalendarDays()}
                                        </div>
                                    </div>

                                    {/* Time Slots Right Panel (Slides in like Calendly) */}
                                    {selectedDate && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="w-full lg:w-[45%] space-y-3.5 max-h-[300px] overflow-y-auto pr-1"
                                        >
                                            <p className="text-xs font-bold text-slate-400 tracking-wider">
                                                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                            </p>
                                            
                                            <div className="space-y-2">
                                                {timeSlots.map(slot => {
                                                    const isSelected = activeTimeSlot === slot
                                                    return (
                                                        <div key={slot} className="flex gap-2 w-full">
                                                            <button
                                                                type="button"
                                                                onClick={() => setActiveTimeSlot(slot)}
                                                                className={`h-11 rounded-lg flex-1 text-sm font-semibold transition-all border flex items-center justify-center
                                                                    ${isSelected 
                                                                        ? 'bg-slate-600 border-slate-600 text-white dark:bg-slate-700 dark:border-slate-700' 
                                                                        : 'bg-white dark:bg-[#0c1222] border-blue-500/20 text-blue-600 dark:text-blue-400 hover:border-blue-500'
                                                                    }
                                                                `}
                                                            >
                                                                {slot}
                                                            </button>
                                                            {isSelected && (
                                                                <motion.button
                                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                                    animate={{ scale: 1, opacity: 1 }}
                                                                    type="button"
                                                                    onClick={() => setStep('form')}
                                                                    className="h-11 px-4 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-500 flex items-center justify-center"
                                                                >
                                                                    Next
                                                                </motion.button>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Detail Form */}
                        {step === 'form' && (
                            <motion.div 
                                key="step-form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-6 md:p-8 flex flex-col h-full justify-between"
                            >
                                <div className="space-y-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setStep('datetime')} 
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider mb-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to calendar
                                    </button>
                                    
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Enter Details</h3>
                                        <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">Please fill in these fields to schedule your session.</p>
                                    </div>

                                    <form onSubmit={handleBooking} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="fullName" className="text-xs uppercase tracking-wide font-bold text-slate-400">Full Name *</Label>
                                                <Input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className="h-11 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-lg focus:ring-blue-500" placeholder="e.g. Aman Joshi" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="workEmail" className="text-xs uppercase tracking-wide font-bold text-slate-400">Work Email *</Label>
                                                <Input id="workEmail" name="workEmail" type="email" required value={form.workEmail} onChange={handleChange} className="h-11 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-lg focus:ring-blue-500" placeholder="e.g. you@company.com" />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="companyName" className="text-xs uppercase tracking-wide font-bold text-slate-400">Company Name</Label>
                                                <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="h-11 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-lg focus:ring-blue-500" placeholder="Your Company Name" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="websiteUrl" className="text-xs uppercase tracking-wide font-bold text-slate-400">Website URL</Label>
                                                <Input id="websiteUrl" name="websiteUrl" type="url" value={form.websiteUrl} onChange={handleChange} className="h-11 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-lg focus:ring-blue-500" placeholder="https://yourwebsite.com" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="topic" className="text-xs uppercase tracking-wide font-bold text-slate-400">What are we building / SEO targets?</Label>
                                            <Textarea id="topic" name="topic" value={form.topic} onChange={handleChange} rows={3} className="bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 rounded-lg focus:ring-blue-500 p-3" placeholder="Briefly describe what you'd like to address..." />
                                        </div>

                                        <div className="pt-2">
                                            <Button type="submit" disabled={submitting} className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                                                {submitting ? 'Booking...' : 'Book Discovery Call'}
                                            </Button>
                                        </div>

                                        {status === 'error' && (
                                            <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 font-semibold text-center text-xs">
                                                {feedbackMsg}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: Success View */}
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

                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Confirmed</h2>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
                                        You are scheduled with Aman Joshi. A calendar invitation has been sent to your email address.
                                    </p>
                                </div>

                                <div className="p-5 bg-slate-50 dark:bg-[#0c1222]/80 border border-slate-200/50 dark:border-white/5 rounded-xl max-w-sm w-full text-left space-y-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">30-Minute Strategy Session</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>
                                            {activeTimeSlot}, {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} (IST)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                                        <Video className="w-4 h-4" />
                                        <span>Web conferencing details sent via email.</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <Button 
                                        onClick={() => {
                                            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AJPR+World+Strategy+Session&dates=${selectedDate?.toISOString().replace(/[-:]/g, '').split('.')[0]}T093000Z/${selectedDate?.toISOString().replace(/[-:]/g, '').split('.')[0]}T100000Z&details=Strategy+discovery+call+with+Aman+Joshi+to+review+MVP+architecture+and+SEO+positioning.&location=Google+Meet`
                                            window.open(url, '_blank')
                                        }}
                                        variant="outline" 
                                        className="h-11 px-5 rounded-lg font-bold border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                                    >
                                        Add to Google Calendar
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            setStep('datetime')
                                            setSelectedDate(null)
                                            setActiveTimeSlot(null)
                                        }}
                                        className="h-11 px-5 rounded-lg font-bold bg-blue-600 hover:bg-blue-500 text-white"
                                    >
                                        Schedule Another Event <ArrowRight className="w-4 h-4 ml-1.5" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                        
                    </AnimatePresence>
                </div>

            </div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        </div>
    )
}
