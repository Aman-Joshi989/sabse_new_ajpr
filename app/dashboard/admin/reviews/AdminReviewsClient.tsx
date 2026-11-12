'use client';

import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  Copy,
  Check,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import type { AdminClientReview, ReviewStatus } from '@/lib/db/reviews';

interface PortfolioClientOption {
  id: number;
  title: string;
  category?: string;
}

interface AdminReviewsClientProps {
  initialReviews: AdminClientReview[];
  portfolioClients: PortfolioClientOption[];
}

export default function AdminReviewsClient({
  initialReviews,
  portfolioClients,
}: AdminReviewsClientProps) {
  const [reviews, setReviews] = useState<AdminClientReview[]>(initialReviews);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteCompany, setInviteCompany] = useState(portfolioClients[0]?.title || '');
  const [inviteProject, setInviteProject] = useState('Next.js Web Platform & Growth');
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteBanner, setInviteBanner] = useState<string | null>(null);
  const [copiedWa, setCopiedWa] = useState(false);

  const whatsappMessage = [
    `Hi ${inviteName || '[Name]'}! Hope business is scaling well${inviteCompany ? ` at ${inviteCompany}` : ''}.`,
    `If you have 60 seconds, could you share an honest review of our work together on ${inviteProject}?`,
    `- Google Review (fastest): https://www.google.com/search?q=AJPR+World+Haldwani+reviews`,
    `- Direct Verified Hub: https://ajprworld.com/reviews`,
    `- Clutch (B2B): https://clutch.co/profile/ajpr-world`,
    `Appreciate it! — Aman Joshi, AJPR World`,
  ].join('\n');

  const handleStatusUpdate = async (id: number, status: ReviewStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSendEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingInvite(true);
    setInviteBanner(null);

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: inviteEmail,
          clientName: inviteName,
          companyName: inviteCompany,
          projectType: inviteProject,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setInviteBanner(`Error: ${data.error || 'Failed to dispatch invite.'}`);
        return;
      }
      setInviteBanner(
        data.delivered
          ? `Invitation delivered via ${data.provider} (Ref: ${data.referenceId}).`
          : `Saved to outbox queue (${data.provider}, Ref: ${data.referenceId}).`
      );
      setInviteEmail('');
    } catch {
      setInviteBanner('Network error while dispatching email invitation.');
    } finally {
      setSendingInvite(false);
    }
  };

  const handleCopyWhatsApp = async () => {
    await navigator.clipboard.writeText(whatsappMessage);
    setCopiedWa(true);
    setTimeout(() => setCopiedWa(false), 2000);
  };

  const pendingCount = reviews.filter((r) => r.status === 'pending_verification').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;

  return (
    <div className="space-y-8">
      {/* Top Stats & Quick Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal text-[#202124] dark:text-white">
            Client Reviews & Verification Hub
          </h1>
          <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6] mt-1">
            Verify inbound submissions before publishing to{' '}
            <a
              href="https://ajprworld.com/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              ajprworld.com/reviews <ExternalLink className="w-3.5 h-3.5" />
            </a>{' '}
            and invite real clients via email or WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            {pendingCount} Pending Verification
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            {approvedCount} Approved Live
          </span>
        </div>
      </div>

      {/* Invite Real Client Panel */}
      <section className="rounded-xl border border-[#DADCE0] dark:border-[#3C4043] bg-white dark:bg-[#292A2D] p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-[#202124] dark:text-white">
              Invite Verified Past Client to Review
            </h2>
            <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-0.5">
              Quick-select shipped clients or enter details to send a direct review request email or WhatsApp ask.
            </p>
          </div>
          {portfolioClients.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {portfolioClients.slice(0, 6).map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => {
                    setInviteCompany(client.title);
                    setInviteProject(client.category || 'Custom Web Platform');
                  }}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {client.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSendEmailInvite} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            placeholder="Client Name *"
            required
            className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="Client Email *"
            required
            className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
          <input
            type="text"
            value={inviteCompany}
            onChange={(e) => setInviteCompany(e.target.value)}
            placeholder="Company / Project"
            className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
          <input
            type="text"
            value={inviteProject}
            onChange={(e) => setInviteProject(e.target.value)}
            placeholder="Engagement Scope"
            className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />

          <div className="md:col-span-4 flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={sendingInvite}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A73E8] hover:bg-blue-600 text-white text-xs font-semibold transition-colors disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5" />
              {sendingInvite ? 'Sending Invite...' : 'Send Email Invitation'}
            </button>
            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {copiedWa ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedWa ? 'Copied WhatsApp Text' : 'Copy WhatsApp Ask'}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Open in WhatsApp
            </a>
          </div>
        </form>

        {inviteBanner && (
          <div className="text-xs font-medium px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {inviteBanner}
          </div>
        )}
      </section>

      {/* Moderation Queue */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[#202124] dark:text-white">
          Submitted Client Reviews ({reviews.length})
        </h2>

        {reviews.length === 0 ? (
          <div className="rounded-xl border border-[#DADCE0] dark:border-[#3C4043] bg-white dark:bg-[#292A2D] p-10 text-center text-sm text-slate-500">
            No reviews submitted on `/reviews` yet. Send an invitation above to a completed client!
          </div>
        ) : (
          <div className="grid gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-xl border border-[#DADCE0] dark:border-[#3C4043] bg-white dark:bg-[#292A2D] p-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-semibold text-sm text-[#202124] dark:text-white">
                      {rev.client_name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {[rev.role_title, rev.company_name].filter(Boolean).join(' • ')}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{rev.reference_id}</span>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        rev.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : rev.status === 'rejected'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>&bull;</span>
                    <span>{rev.project_type}</span>
                    <span>&bull;</span>
                    <span>{rev.client_email}</span>
                    {rev.external_platform && (
                      <>
                        <span>&bull;</span>
                        <span>External: {rev.external_platform}</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    &ldquo;{rev.review_text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {rev.status !== 'approved' && (
                    <button
                      type="button"
                      disabled={updatingId === rev.id}
                      onClick={() => handleStatusUpdate(rev.id, 'approved')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                  {rev.status !== 'pending_verification' && (
                    <button
                      type="button"
                      disabled={updatingId === rev.id}
                      onClick={() => handleStatusUpdate(rev.id, 'pending_verification')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Pending
                    </button>
                  )}
                  {rev.status !== 'rejected' && (
                    <button
                      type="button"
                      disabled={updatingId === rev.id}
                      onClick={() => handleStatusUpdate(rev.id, 'rejected')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40 text-xs font-semibold"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

