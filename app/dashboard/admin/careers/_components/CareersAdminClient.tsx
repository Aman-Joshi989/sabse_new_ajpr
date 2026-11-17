'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Briefcase, Mail, Phone, ExternalLink, Calendar,
  BarChart, Plus, Pencil, Trash2, CheckCircle2,
  AlertCircle, Loader2, Globe, Eye, EyeOff, Search,
  SlidersHorizontal, Sparkles, Building2, Layers
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DbJobPosting } from '@/lib/db/queries'

interface CareersAdminClientProps {
  initialJobs: DbJobPosting[]
  initialApplications: any[]
}

interface JobFormData {
  id?: string
  title: string
  department: string
  job_type: string
  location: string
  experience: string
  compensation: string
  short_summary: string
  skills: string
  responsibilities: string
  must_haves: string
  highlights: string
  published: boolean
  display_order: number
}

const DEFAULT_FORM: JobFormData = {
  title: '',
  department: 'Engineering',
  job_type: 'Full-time / High-Yield Sprint',
  location: 'Remote (India / Global) • Hybrid (Haldwani / Delhi NCR)',
  experience: '2–5+ years',
  compensation: 'Competitive (Market Rate + Sprint Bonus)',
  short_summary: '',
  skills: 'Next.js 16, React 19, TypeScript, PostgreSQL',
  responsibilities: 'Architect and ship sub-200ms edge web platforms and MVPs.\nParticipate in high-speed code reviews with 100% type safety.',
  must_haves: 'Demonstrated experience shipping Next.js App Router applications.\nHigh proficiency in TypeScript and relational database schemas.',
  highlights: 'Direct collaboration with Lead Architect Aman Joshi\n100% remote flexibility with modern tooling',
  published: true,
  display_order: 0
}

export default function CareersAdminClient({
  initialJobs,
  initialApplications
}: CareersAdminClientProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs')
  const [jobs, setJobs] = useState<DbJobPosting[]>(initialJobs || [])
  const [applications, setApplications] = useState<any[]>(initialApplications || [])

  // Search & Filter state
  const [jobSearch, setJobSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [appSearch, setAppSearch] = useState('')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<JobFormData>(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false)
    setFormData({
      ...DEFAULT_FORM,
      display_order: jobs.length + 1
    })
    setErrorMsg('')
    setSuccessMsg('')
    setIsModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEdit = (job: DbJobPosting) => {
    setIsEditing(true)
    setFormData({
      id: job.id,
      title: job.title || '',
      department: job.department || 'Engineering',
      job_type: job.job_type || 'Full-time',
      location: job.location || 'Remote',
      experience: job.experience || '2+ years',
      compensation: job.compensation || 'Competitive',
      short_summary: job.short_summary || '',
      skills: (job.skills || []).join(', '),
      responsibilities: (job.responsibilities || []).join('\n'),
      must_haves: (job.must_haves || []).join('\n'),
      highlights: (job.highlights || []).join('\n'),
      published: Boolean(job.published),
      display_order: Number(job.display_order || 0)
    })
    setErrorMsg('')
    setSuccessMsg('')
    setIsModalOpen(true)
  }

  // Submit Create or Edit Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      const payload = {
        title: formData.title,
        department: formData.department,
        job_type: formData.job_type,
        location: formData.location,
        experience: formData.experience,
        compensation: formData.compensation,
        short_summary: formData.short_summary,
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
        responsibilities: formData.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
        must_haves: formData.must_haves.split('\n').map((s) => s.trim()).filter(Boolean),
        highlights: formData.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
        published: formData.published,
        display_order: formData.display_order
      }

      if (isEditing && formData.id) {
        // PUT update
        const res = await fetch(`/api/admin/jobs/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to update job posting')
        }
        setJobs(jobs.map((j) => (j.id === formData.id ? data.job : j)))
        setSuccessMsg('Job posting updated successfully!')
      } else {
        // POST create
        const res = await fetch('/api/admin/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to create job posting')
        }
        setJobs([data.job, ...jobs])
        setSuccessMsg('New job posting created and published!')
      }

      setTimeout(() => {
        setIsModalOpen(false)
        setSuccessMsg('')
      }, 1000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Toggle Publish / Draft
  const handleTogglePublish = async (job: DbJobPosting) => {
    const nextState = !job.published
    // Optimistic UI update
    setJobs(jobs.map((j) => (j.id === job.id ? { ...j, published: nextState } : j)))

    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: nextState })
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        // Revert on failure
        setJobs(jobs.map((j) => (j.id === job.id ? { ...j, published: job.published } : j)))
      }
    } catch {
      setJobs(jobs.map((j) => (j.id === job.id ? { ...j, published: job.published } : j)))
    }
  }

  // Delete Job
  const handleDeleteJob = async (id: string) => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setJobs(jobs.filter((j) => j.id !== id))
        setDeletingId(null)
      } else {
        alert(data.error || 'Failed to delete job')
      }
    } catch {
      alert('Network error while deleting')
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
      (job.location || '').toLowerCase().includes(jobSearch.toLowerCase())
    const matchesDept = deptFilter === 'All' || job.department === deptFilter
    return matchesSearch && matchesDept
  })

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    return (
      (app.name || '').toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.role_applied_for || '').toLowerCase().includes(appSearch.toLowerCase())
    )
  })

  const publishedCount = jobs.filter((j) => j.published).length
  const draftCount = jobs.filter((j) => !j.published).length

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2 border border-blue-200 dark:border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Recruitment & Careers Center
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Careers CMS & Candidates
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage live open job postings and review candidate resumes from one unified hub.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="rounded-xl border-slate-300 dark:border-slate-700 text-xs font-bold">
            <Link href="/careers" target="_blank" className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> View Live /careers <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>
          </Button>
          <Button
            onClick={handleOpenCreate}
            size="sm"
            className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Job
          </Button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'jobs'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Postings CMS</span>
          <Badge variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800 font-bold">
            {jobs.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Candidate Applications</span>
          <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold">
            {applications.length}
          </Badge>
        </button>
      </div>

      {/* TAB 1: JOB POSTINGS CMS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-1 items-center gap-3 max-w-md">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <Input
                placeholder="Search postings by title, department, or location..."
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                className="h-10 border-none bg-transparent focus-visible:ring-0 text-xs"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>{publishedCount} Published</span>
                <span className="mx-1">•</span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                <span>{draftCount} Drafts</span>
              </div>

              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="AI Systems">AI Systems</option>
                <option value="Growth & SEO">Growth & SEO</option>
                <option value="Developer Network">Developer Network</option>
                <option value="Product & Design">Product & Design</option>
              </select>
            </div>
          </div>

          {/* Job Postings List */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No job postings found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No openings match your search. Click "+ Add New Job" to post an opening to the live careers page.
              </p>
              <Button onClick={handleOpenCreate} size="sm" className="rounded-xl bg-blue-600 text-white font-bold text-xs">
                <Plus className="w-4 h-4 mr-1.5" /> Create Position
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        {job.title}
                      </h3>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 border-slate-200 dark:border-slate-700">
                        {job.department}
                      </Badge>
                      <Badge className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-[10px] font-semibold">
                        {job.job_type}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 max-w-2xl">
                      {job.short_summary || 'No summary provided.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
                      <span>📍 {job.location}</span>
                      <span>⏱️ {job.experience}</span>
                      <span className="font-bold text-slate-900 dark:text-slate-200">💰 {job.compensation}</span>
                    </div>

                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions & Live Toggle */}
                  <div className="flex flex-wrap items-center gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    
                    {/* Live Status Switch */}
                    <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className={`text-xs font-bold ${job.published ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {job.published ? 'Published' : 'Draft'}
                      </span>
                      <Switch
                        checked={job.published}
                        onCheckedChange={() => handleTogglePublish(job)}
                        className="cursor-pointer"
                      />
                    </div>

                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(job)}
                      className="rounded-xl h-9 text-xs font-bold border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingId(job.id)}
                      className="rounded-xl h-9 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: CANDIDATE APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          
          {/* Search bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <Input
              placeholder="Search applications by applicant name, email, or role..."
              value={appSearch}
              onChange={(e) => setAppSearch(e.target.value)}
              className="h-10 border-none bg-transparent focus-visible:ring-0 text-xs"
            />
          </div>

          {filteredApps.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No applications yet</h3>
              <p className="text-slate-500 mt-2 text-xs">When candidates submit their CV through /careers/apply, their profiles will appear here.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredApps.map((app: any) => (
                <Card key={app.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all rounded-3xl overflow-hidden">
                  <CardHeader className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <CardTitle className="text-xl font-black text-slate-900 dark:text-white">{app.name}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 text-[10px] font-bold uppercase">
                          {app.status || 'pending'}
                        </Badge>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        Applied for: <span className="text-blue-600 dark:text-blue-400 ml-1 font-bold">{app.role_applied_for}</span>
                      </p>
                    </div>

                    <div className="text-xs text-slate-500 font-medium flex items-center bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {new Date(app.created_at).toLocaleDateString()} at {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Contact</h4>
                        <div className="space-y-3">
                          <a href={`mailto:${app.email}`} className="flex items-center text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 shrink-0">
                              <Mail className="w-4 h-4 text-slate-500" />
                            </div>
                            <span className="truncate">{app.email}</span>
                          </a>

                          {app.phone && (
                            <a href={`tel:${app.phone}`} className="flex items-center text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">
                              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 shrink-0">
                                <Phone className="w-4 h-4 text-slate-500" />
                              </div>
                              {app.phone}
                            </a>
                          )}

                          {app.linkedin_url && (
                            <a href={app.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3 shrink-0">
                                <Globe className="w-4 h-4" />
                              </div>
                              LinkedIn Profile <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Resume & Tracking */}
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Resume / CV Document</h4>
                          {app.resume_url ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={`/api/careers/resume/view?id=${app.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                              >
                                View Resume Online <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                              </a>
                              <a
                                href={`/api/careers/resume/view?id=${app.id}&download=1`}
                                className="inline-flex items-center justify-center px-3.5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                              >
                                Direct Download
                              </a>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 italic">No resume file attached</p>
                          )}
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center">
                            <BarChart className="w-3.5 h-3.5 mr-1" /> Attribution Source
                          </h4>
                          <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                              Source: {app.utm_source || 'direct'}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                              Medium: {app.utm_medium || 'none'}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                              Campaign: {app.utm_campaign || 'none'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {app.cover_letter && (
                      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cover Letter & Message</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-100 dark:border-slate-800">
                          {app.cover_letter}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

        </div>
      )}

      {/* CREATE / EDIT JOB DIALOG */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans">
          <DialogHeader className="space-y-1 pb-4 border-b border-slate-200 dark:border-slate-800">
            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white">
              {isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {isEditing
                ? 'Update the responsibilities, stack, or publishing status for this role.'
                : 'Fill in the position specifications to publish an opening to your careers page.'}
            </DialogDescription>
          </DialogHeader>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitForm} className="space-y-5 pt-2">
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="title" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  required
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Department
                </Label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="AI Systems">AI Systems</option>
                  <option value="Growth & SEO">Growth & SEO</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Developer Network">Developer Network</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="job_type" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Job Type
                </Label>
                <Input
                  id="job_type"
                  placeholder="e.g. Full-time / High-Yield Sprint"
                  value={formData.job_type}
                  onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Remote (India / Global)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="experience" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Experience Required
                </Label>
                <Input
                  id="experience"
                  placeholder="e.g. 2–5+ years"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="compensation" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Compensation Package
                </Label>
                <Input
                  id="compensation"
                  placeholder="e.g. ₹10,00,000 – ₹20,00,000 / $24k – $48k + Sprint Bonuses"
                  value={formData.compensation}
                  onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="short_summary" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Short Summary (Card Preview)
                </Label>
                <Input
                  id="short_summary"
                  placeholder="1-2 sentences summarizing what this role will build..."
                  value={formData.short_summary}
                  onChange={(e) => setFormData({ ...formData, short_summary: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="skills" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Core Skills & Stack (comma-separated)
                </Label>
                <Input
                  id="skills"
                  placeholder="Next.js 16, React 19, TypeScript, PostgreSQL, Tailwind CSS"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="responsibilities" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Responsibilities (one per line)
                </Label>
                <Textarea
                  id="responsibilities"
                  rows={3}
                  placeholder="Architect and deploy sub-200ms edge web platforms&#10;Design clean relational database schemas"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  className="rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="must_haves" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Must-Have Foundations (one per line)
                </Label>
                <Textarea
                  id="must_haves"
                  rows={2}
                  placeholder="Practical experience shipping Next.js App Router&#10;High proficiency in TypeScript"
                  value={formData.must_haves}
                  onChange={(e) => setFormData({ ...formData, must_haves: e.target.value })}
                  className="rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="highlights" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Role Highlights & Perks (one per line)
                </Label>
                <Textarea
                  id="highlights"
                  rows={2}
                  placeholder="Direct collaboration with Lead Architect Aman Joshi&#10;100% remote flexibility"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Publish Immediately</div>
                <div className="text-[11px] text-slate-500">When enabled, this opening will appear publicly on /careers right away.</div>
              </div>
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                className="cursor-pointer"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl px-6 h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isEditing ? 'Save Changes' : 'Publish Job Opening'}
              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <DialogContent className="max-w-md rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-sans">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
              Delete Job Posting?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete this job opening? It will be permanently removed from the public careers page. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeletingId(null)}
              className="text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              disabled={isDeleting}
              onClick={() => deletingId && handleDeleteJob(deletingId)}
              className="rounded-xl px-5 h-10 bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
            >
              {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Delete Permanently
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
