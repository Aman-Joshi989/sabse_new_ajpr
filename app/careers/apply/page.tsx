'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

function ApplicationForm() {
  const searchParams = useSearchParams()
  const role = searchParams?.get('role') || 'Open Application'
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    cover_letter: ''
  })
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const data = new FormData()
      data.append('role_applied_for', role)
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('linkedin_url', formData.linkedin_url)
      data.append('cover_letter', formData.cover_letter)
      
      if (file) {
        data.append('resume', file)
      }

      // Add UTM parameters if present
      if (searchParams) {
        data.append('utm_source', searchParams.get('utm_source') || '')
        data.append('utm_medium', searchParams.get('utm_medium') || '')
        data.append('utm_campaign', searchParams.get('utm_campaign') || '')
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: data
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Something went wrong')
      }

      setIsSuccess(true)
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center max-w-lg mx-auto shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Application Sent!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Thank you for applying for the <strong>{role}</strong> position. Our team will review your profile and get back to you soon.
          </p>
          <Button asChild className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
            <Link href="/careers">Back to Careers</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300 font-sans py-12 px-4 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/careers" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to open positions
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-100/60 dark:bg-blue-900/10 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-700 dark:text-blue-300">Application Form</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Apply for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-indigo-500">
              {role}
            </span>
          </h1>
        </div>

        <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
          <CardContent className="p-6 md:p-10">
            {errorMsg && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-8 font-medium text-sm">
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-bold">Full Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" 
                    placeholder="Alex Morgan" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-bold">Email Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" 
                    placeholder="alex@company.com" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-bold">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" 
                    placeholder="+1 (555) 000-0000" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-700 dark:text-slate-300 font-bold">LinkedIn Profile URL</Label>
                  <Input 
                    id="linkedin" 
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800" 
                    placeholder="https://linkedin.com/in/..." 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="text-slate-700 dark:text-slate-300 font-bold">Resume / CV (PDF)</Label>
                <div className="relative">
                  <Input 
                    id="resume" 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/30 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50" 
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Max file size: 5MB. PDF highly recommended.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover_letter" className="text-slate-700 dark:text-slate-300 font-bold">Cover Letter / Why you?</Label>
                <Textarea 
                  id="cover_letter" 
                  value={formData.cover_letter}
                  onChange={(e) => setFormData({...formData, cover_letter: e.target.value})}
                  className="min-h-[150px] rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 resize-y" 
                  placeholder="Tell us about a complex problem you solved recently..." 
                />
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting Application...</>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ApplicationForm />
    </Suspense>
  )
}
