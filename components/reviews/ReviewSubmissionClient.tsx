'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, ShieldCheck, ExternalLink, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PROJECT_TYPES = [
  'Custom Software / AI MVP',
  'Next.js Website & Technical SEO',
  'Website Maintenance & Security SLA',
  'B2B Growth Marketing & PPC',
  'System Integration & Automation',
];

const EXTERNAL_PLATFORMS = [
  { label: 'Also reviewed on Google', value: 'Google Business Profile' },
  { label: 'Also reviewed on Clutch', value: 'Clutch' },
  { label: 'Also reviewed on GoodFirms', value: 'GoodFirms' },
  { label: 'Direct site review only', value: '' },
];

export default function ReviewSubmissionClient() {
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [externalPlatform, setExternalPlatform] = useState('');
  const [reviewText, setReviewText] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          email,
          companyName,
          roleTitle,
          projectType,
          rating,
          reviewText,
          externalPlatform,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not submit review. Please check required fields.');
        setSubmitting(false);
        return;
      }

      setSubmittedRef(data.referenceId || 'AJPR-REV');
      setClientName('');
      setEmail('');
      setCompanyName('');
      setRoleTitle('');
      setReviewText('');
      setExternalPlatform('');
    } catch {
      setErrorMsg('Network error submitting your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Thank You — Review Queued for Verification
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-4">
          Reference <span className="font-mono font-bold text-slate-900 dark:text-white">{submittedRef}</span> has been recorded. We verify client work email domains before publishing publicly so prospects only read real feedback.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href="https://www.google.com/search?q=AJPR+World+Haldwani+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Also Share on Google <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://clutch.co/profile/ajpr-world"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Clutch Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setSubmittedRef(null)}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Overall Experience Rating *
        </Label>
        <div className="flex items-center gap-2 mt-2" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoveredRating || rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                aria-label={`${star} out of 5 stars`}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${
                    active ? 'text-amber-500 fill-amber-500' : 'text-slate-300 dark:text-slate-700'
                  }`}
                />
              </button>
            );
          })}
          <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            {rating} / 5 Stars
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="review-client-name">Your Full Name *</Label>
          <Input
            id="review-client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Rohan Mehta"
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="review-email">Work Email (Never Displayed Publicly) *</Label>
          <Input
            id="review-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rohan@company.com"
            required
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="review-company">Company / Organization</Label>
          <Input
            id="review-company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Acme SaaS Pvt Ltd"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="review-role">Your Role / Title</Label>
          <Input
            id="review-role"
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
            placeholder="e.g. Co-Founder & CTO"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="review-project">Service / Sprint Engaged *</Label>
          <select
            id="review-project"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="mt-1.5 w-full h-10 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100"
          >
            {PROJECT_TYPES.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="review-platform">Cross-Posted Platform (Optional)</Label>
          <select
            id="review-platform"
            value={externalPlatform}
            onChange={(e) => setExternalPlatform(e.target.value)}
            className="mt-1.5 w-full h-10 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 text-sm text-slate-900 dark:text-slate-100"
          >
            {EXTERNAL_PLATFORMS.map((ep) => (
              <option key={ep.label} value={ep.value}>
                {ep.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="review-text">Your Honest Feedback *</Label>
        <Textarea
          id="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          minLength={20}
          maxLength={2000}
          required
          placeholder="What problem were we hired to solve, how did communication and delivery go, and what measurable results did you see?"
          className="mt-1.5"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          Minimum 20 characters. Every submission undergoes manual client email verification before appearing publicly.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Verified against real client engagements</span>
        </div>
        <Button type="submit" disabled={submitting} className="rounded-full px-7 font-bold gap-2">
          <Send className="w-4 h-4" />
          {submitting ? 'Submitting Review...' : 'Submit Verified Review'}
        </Button>
      </div>
    </form>
  );
}
