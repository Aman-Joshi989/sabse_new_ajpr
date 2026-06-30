'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mail, Calendar, User, Globe, Briefcase, ExternalLink, 
  Clock, CheckCircle, XCircle, AlertCircle, Trash2, ArrowUpRight 
} from 'lucide-react'

export default function BookingsAdminPage() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState<number | null>(null)

    const fetchBookings = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/bookings')
            const data = await res.json()
            if (data.success) {
                setBookings(data.bookings || [])
            }
        } catch (err) {
            console.error('Failed to load bookings:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [])

    const handleStatusChange = async (id: number, newStatus: string) => {
        setUpdatingId(id)
        try {
            const res = await fetch('/api/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            })
            const data = await res.json()
            if (data.success) {
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b))
            }
        } catch (err) {
            console.error('Failed to update status:', err)
        } finally {
            setUpdatingId(null)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this booking entry?')) return;
        try {
            const res = await fetch('/api/bookings', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            const data = await res.json()
            if (data.success) {
                setBookings(prev => prev.filter(b => b.id !== id))
            }
        } catch (err) {
            console.error('Failed to delete booking:', err)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />
            case 'Cancelled':
                return <XCircle className="w-4 h-4 text-rose-500" />
            default:
                return <AlertCircle className="w-4 h-4 text-amber-500" />
        }
    }

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
            case 'Cancelled':
                return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
            default:
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
        }
    }

    return (
        <div className="space-y-8 bg-[#F8F9FA] dark:bg-[#202124] min-h-screen text-[#202124] dark:text-[#E8EAED] transition-colors duration-300">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#DADCE0] dark:border-[#3C4043]">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Strategy Call Bookings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review, confirm, or reschedule requested custom consulting calls.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm">
                    <Calendar className="w-4 h-4" />
                    {bookings.length} Total Bookings
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-slate-500">Loading call bookings...</p>
                </div>
            ) : bookings.length === 0 ? (
                <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none">
                    <CardContent className="h-48 flex flex-col items-center justify-center text-slate-500 gap-2">
                        <Calendar className="w-8 h-8 text-slate-400 opacity-60" />
                        <span className="font-medium text-sm">No strategy call bookings found.</span>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((b: any) => (
                        <Card key={b.id} className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none hover:shadow-sm transition-shadow rounded-lg overflow-hidden">
                            <CardHeader className="pb-4 bg-slate-50/50 dark:bg-[#2F3033]/30 border-b border-[#DADCE0] dark:border-[#3C4043] p-6">
                                <div className="flex flex-col lg:flex-row justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                <User className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                {b.name}
                                            </CardTitle>
                                            {b.company_name && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                    {b.company_name}
                                                </span>
                                            )}
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 ${getStatusBadgeStyles(b.status)}`}>
                                                {getStatusIcon(b.status)}
                                                {b.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                                <a href={`mailto:${b.email}`} className="hover:underline hover:text-blue-500">{b.email}</a>
                                            </span>
                                            {b.website_url && (
                                                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline">
                                                    <Globe className="w-4 h-4" />
                                                    <a href={b.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                        {b.website_url.replace(/https?:\/\/(www\.)?/, '')}
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Booking Date and Slot */}
                                    <div className="flex flex-wrap items-center gap-4 shrink-0 lg:text-right">
                                        <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-lg flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <div>
                                                <p className="text-xs text-slate-400">Booking Date</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">{b.booking_date}</p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-lg flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                            <div>
                                                <p className="text-xs text-slate-400">Time Slot</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">{b.booking_time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
                                {/* Topic / Vision details */}
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        Primary Topic / Message
                                    </h3>
                                    <div className="bg-slate-50/50 dark:bg-[#303134]/30 border border-slate-200/50 dark:border-slate-800/50 p-4 rounded-lg text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                                        {b.topic || 'No topic details provided.'}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="shrink-0 flex md:flex-col items-center justify-end gap-3 self-end">
                                    {b.status !== 'Confirmed' && (
                                        <button 
                                            disabled={updatingId === b.id}
                                            onClick={() => handleStatusChange(b.id, 'Confirmed')}
                                            className="px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-500/10 rounded border border-emerald-500/20 bg-emerald-500/5 transition-colors duration-200"
                                        >
                                            Confirm
                                        </button>
                                    )}
                                    {b.status !== 'Cancelled' && (
                                        <button 
                                            disabled={updatingId === b.id}
                                            onClick={() => handleStatusChange(b.id, 'Cancelled')}
                                            className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-500/10 rounded border border-rose-500/20 bg-rose-500/5 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handleDelete(b.id)}
                                        className="p-2 text-slate-400 hover:text-rose-500 rounded border border-transparent hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
                                        title="Delete Submission"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
