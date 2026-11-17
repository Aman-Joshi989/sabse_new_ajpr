'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  ShieldCheck, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  Video, 
  Lock, 
  Server, 
  Loader2, 
  MessageCircle,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRegion } from '@/components/providers/RegionProvider';
import Image from 'next/image';

interface ScanResult {
  domain: string;
  overallScore: number;
  metrics: {
    ttfb: number;
    ttfbRating: string;
    detectedStack: string;
    isHttps: boolean;
    hasHsts: boolean;
    hasCsp: boolean;
    hasXFrame: boolean;
    hasJsonLd: boolean;
    hasMetaDesc: boolean;
    hasOgImage: boolean;
    server: string;
  };
  categoryScores: {
    performance: number;
    security: number;
    seo: number;
    aiReadiness: number;
  };
  bottlenecks: Array<{
    title: string;
    severity: string;
    detail: string;
  }>;
}

export default function InstantAuditScanner() {
  const { isIndia } = useRegion();
  const [domainInput, setDomainInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);

  // Form states for video teardown capture
  const [leadEmail, setLeadEmail] = useState('');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [isLeadSuccess, setIsLeadSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Handle URL query parameters if passed from hero scan
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlDomain = params.get('domain') || params.get('website');
      if (urlDomain) {
        setDomainInput(urlDomain);
        handleScan(urlDomain);
      }
    }
  }, []);

  const scanSteps = [
    'Connecting to origin & measuring DNS latency...',
    'Analyzing TTFB & server response headers...',
    'Inspecting SSL, HSTS, CSP & security posture...',
    'Detecting CMS / framework & bundle footprint...',
    'Assessing JSON-LD schema & AI search citation...',
  ];

  const handleScan = async (targetDomain?: string) => {
    const raw = (targetDomain || domainInput).trim();
    if (!raw) {
      toast.error('Please enter a website domain (e.g. company.com)');
      return;
    }

    const clean = raw.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
    if (!clean.includes('.')) {
      toast.error('Please enter a valid domain name (e.g. acme.com)');
      return;
    }

    setIsScanning(true);
    setResult(null);
    setIsLeadSuccess(false);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 650);

    try {
      const res = await fetch('/api/audit/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: clean }),
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Diagnostic scan failed.');
      }

      setResult(data);
      toast.success(`Diagnostic complete for ${clean}!`);
    } catch (err: any) {
      clearInterval(stepInterval);
      toast.error(err.message || 'Could not reach server. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim()) {
      toast.error('Please enter your work email to receive the video teardown');
      return;
    }

    setIsSubmittingLead(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName.trim() || leadEmail.split('@')[0],
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          company: result?.domain || domainInput,
          companySize: '2-10',
          budget: 'Free 48h Audit',
          techStack: result ? `${result.metrics.detectedStack} (${result.metrics.server})` : domainInput,
          projectGoal: `Full 48-Hour Video Teardown for ${result?.domain || domainInput}. Score: ${result?.overallScore || 'N/A'}/100. TTFB: ${result?.metrics.ttfb || 'N/A'}ms.`,
          utm_source: 'instant_audit_scanner',
          utm_medium: 'scorecard_cta',
          utm_campaign: 'free_audit',
        }),
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(resData.error || 'Submission failed');
      }

      setReferenceId(resData.referenceId || '');
      setIsLeadSuccess(true);
      toast.success('Your personalized video teardown has been queued!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit. Please contact hello@ajprworld.com');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 65) return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-500 border-rose-500/30 bg-rose-500/10';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'High-Performance Architecture';
    if (score >= 65) return 'Moderate Optimization Required';
    return 'Critical Bottlenecks Detected';
  };

  return (
    <div className="w-full space-y-8">
      {/* Search & Domain Input Bar */}
      <div className="p-3 sm:p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScan();
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="Enter your website domain (e.g. yourcompany.com)"
              className="h-13 pl-12 pr-4 bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-mono text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
              disabled={isScanning}
            />
          </div>
          <Button
            type="submit"
            disabled={isScanning || !domainInput.trim()}
            className="h-13 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all gap-2 shrink-0 cursor-pointer"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Diagnostics...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Scan Website Free</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Quick Example Tryout Pills */}
        <div className="mt-3.5 px-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-600 dark:text-slate-400">Try live benchmark:</span>
          {['linear.app', 'stripe.com', 'kumaun.ac.in', 'shopify.com'].map((eg) => (
            <button
              key={eg}
              type="button"
              onClick={() => {
                setDomainInput(eg);
                handleScan(eg);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono transition-colors cursor-pointer"
            >
              {eg}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Scanning Progress Card */}
      {isScanning && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              <span>Deep Architecture Inspection in Progress</span>
            </div>
            <span className="text-xs font-mono text-slate-400">{Math.round(((scanStep + 1) / scanSteps.length) * 100)}%</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>

          <p className="text-sm sm:text-base font-medium text-slate-300 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {scanSteps[scanStep]}
          </p>
        </div>
      )}

      {/* Live Benchmark Result Card */}
      {result && !isScanning && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Top Score Summary Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Architecture Health Report</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {result.domain}
              </h3>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(result.overallScore)}`}>
                  {result.overallScore}/100 • {getScoreBadge(result.overallScore)}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  {result.metrics.detectedStack}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  {result.metrics.server}
                </span>
              </div>
            </div>

            {/* Overall Score Circle */}
            <div className="flex items-center gap-4 self-center md:self-auto">
              <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 ${getScoreColor(result.overallScore)} shadow-lg`}>
                <span className="text-3xl font-black leading-none">{result.overallScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Grade</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Speed Pillar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>Speed / TTFB</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{result.categoryScores.performance}/100</span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white">
                {result.metrics.ttfb} ms
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Rating: <strong className={result.metrics.ttfb < 250 ? 'text-emerald-500' : 'text-amber-500'}>{result.metrics.ttfbRating}</strong> (Target: &lt;150ms)
              </p>
            </div>

            {/* Security Pillar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>Security</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{result.categoryScores.security}/100</span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white">
                {result.metrics.isHttps ? 'HTTPS Active' : 'Insecure HTTP'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                HSTS: {result.metrics.hasHsts ? '✅ Protected' : '❌ Missing'}
              </p>
            </div>

            {/* SEO Pillar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>Search Hygiene</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{result.categoryScores.seo}/100</span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white">
                {result.metrics.hasMetaDesc ? 'Meta Found' : 'Missing Meta'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Social Card: {result.metrics.hasOgImage ? '✅ Present' : '❌ Missing'}
              </p>
            </div>

            {/* AI Citation / GEO Pillar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>AI / GEO Citation</span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{result.categoryScores.aiReadiness}/100</span>
              </div>
              <div className="text-xl font-black text-slate-900 dark:text-white">
                {result.metrics.hasJsonLd ? 'Schema Active' : 'No Schema'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                AI Readiness: {result.metrics.hasJsonLd ? '✅ Citable' : '⚠️ Invisible'}
              </p>
            </div>

          </div>

          {/* Actionable Bottlenecks Card */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Identified Architectural Bottlenecks on {result.domain}:
            </h4>
            <div className="grid gap-3">
              {result.bottlenecks.map((b, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">{b.title}</h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{b.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Converting Next Step Form (Video Teardown Capture) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white border border-blue-800/60 shadow-xl space-y-6">
            
            {isLeadSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black">Video Teardown Queued!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Aman Joshi is preparing a personalized 5-minute video analyzing your exact code and query bottlenecks for <strong>{result.domain}</strong>.
                </p>
                {referenceId && (
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono">
                    Ref: #{referenceId}
                  </span>
                )}
                <div className="pt-2">
                  <a
                    href="https://wa.me/919997205257?text=Hi%20Aman,%20I%20just%20scanned%20my%20domain%20and%20would%20like%20to%20discuss%20fixes."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp Directly
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Free 5-Minute Video Teardown Deliverable</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  Want Aman Joshi to walk through the exact code fixes for {result.domain}?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Enter your work email. You will receive a private 5-minute Loom video breaking down your slowest database queries, hydration delays, and bundle bloat within 48 hours. Zero sales reps.
                </p>

                <form onSubmit={handleLeadSubmit} className="mt-5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Your Work Email (alex@company.com) *"
                      required
                      className="h-12 bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-400"
                    />
                    <Input
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Your Name *"
                      required
                      className="h-12 bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="text"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder={isIndia ? "WhatsApp Number (for instant video link)" : "Phone / WhatsApp (optional)"}
                      className="h-12 bg-slate-900/90 border-slate-700 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 flex-1"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="h-12 px-8 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all gap-2 shrink-0 cursor-pointer shadow-lg"
                    >
                      {isSubmittingLead ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Queueing...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Video Teardown</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Instant Connect Alternative */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <span>Need answers today?</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://wa.me/919997205257?text=Hi%20Aman,%20I%20just%20ran%20an%20audit%20on%20${result.domain}%20(Score:%20${result.overallScore})%20and%20would%20like%20to%20connect.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Aman (+91 99972 05257)
                    </a>
                    <span>•</span>
                    <a href="/book-call" className="text-blue-400 hover:underline flex items-center gap-1 font-bold">
                      <Calendar className="w-3.5 h-3.5" /> Book 30-Min Strategy Call
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
