"use client";

import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Loader2, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Mail,
  User,
  Cpu,
  DollarSign,
  Receipt,
  Globe,
  MessageCircle,
  Phone,
  Clock,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRegion } from '@/components/providers/RegionProvider';
import Link from 'next/link';

export default function LeadForm() {
  const { isIndia } = useRegion();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [auditFocus, setAuditFocus] = useState<'speed' | 'security' | 'database' | 'ai'>('speed');
  const [showBudgetPlanning, setShowBudgetPlanning] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    phone: '',
    projectGoal: '',
    companySize: '2-10',
    budget: 'Free 48h Audit',
    techStack: '',
    honeypot: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const domain = urlParams.get('domain') || urlParams.get('website') || '';
      if (domain) {
        setFormData(prev => ({
          ...prev,
          website: domain,
          techStack: domain,
          utm_source: urlParams.get('utm_source') || 'quick_scan_hook',
          utm_medium: urlParams.get('utm_medium') || 'hero_scan',
          utm_campaign: urlParams.get('utm_campaign') || 'free_audit'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          utm_source: urlParams.get('utm_source') || 'free_audit_page',
          utm_medium: urlParams.get('utm_medium') || 'audit_form',
          utm_campaign: urlParams.get('utm_campaign') || 'free_audit'
        }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.website.trim()) {
      toast.error('Please enter your website or GitHub repository URL');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your work email to receive the video teardown');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please provide a valid email address (e.g., alex@company.com)');
      return;
    }

    setLoading(true);
    
    try {
      const focusLabels = {
        speed: 'Core Web Vitals & Speed Bottlenecks',
        security: 'Security, Headers & Vulnerabilities',
        database: 'Database Queries & Architecture Scaling',
        ai: 'Next.js & AI Integration Readiness'
      };

      const submissionPayload = {
        name: formData.name.trim() || formData.email.split('@')[0],
        email: formData.email.trim(),
        phone: formData.phone.trim() || '',
        company: formData.website.trim(),
        companySize: formData.companySize || '2-10',
        budget: 'Free 48h Audit',
        techStack: formData.website.trim(),
        projectGoal: `48-Hour Systems & Architecture Audit for: ${formData.website.trim()} [Focus: ${focusLabels[auditFocus]}] ${formData.projectGoal ? `Notes: ${formData.projectGoal}` : ''}`,
        honeypot: formData.honeypot,
        utm_source: formData.utm_source || 'free_audit_page',
        utm_medium: formData.utm_medium || 'audit_form',
        utm_campaign: formData.utm_campaign || 'free_audit'
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload)
      });
      
      const resData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new Error(resData.error || 'Submission failed');
      }
      
      if (resData.referenceId) {
        setReferenceId(resData.referenceId);
      }
      setIsSuccess(true);
      toast.success('Your audit request has been queued!');
      
      // Fire GTM / Analytics Event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          lead_type: 'free_audit',
          target_url: formData.website,
          focus: auditFocus
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please email hello@ajprworld.com directly.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div 
        className="text-center p-8 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Technical Scope Queued
            </span>
            {referenceId && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider font-mono">
                Ref: #{referenceId}
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Systems Audit Queued!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900 dark:text-white font-semibold">{formData.name}</strong>. Your audit for <strong className="text-blue-600 dark:text-blue-400 font-mono">{formData.website}</strong> has been received. Lead Systems Architect Aman Joshi is analyzing your architecture, Core Web Vitals, and backend queries.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="text-left bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">What Happens Next</h4>
          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span><strong>Code & Network Inspection:</strong> We analyze your main thread, TBT, TTFB, database query indices, and bundle bloat.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span><strong>Personalized 5-Min Loom Teardown:</strong> Aman records a private video walking through your top 3 highest-leverage fixes.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span><strong>Inbox Delivery:</strong> Sent directly to <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span> within 48 hours. 100% free with zero sales reps.</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button 
            onClick={() => window.location.href = '/book-call'} 
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 gap-2"
          >
            <Calendar className="w-4 h-4" />
            {isIndia ? 'Need Immediate Discussion? Book Architecture Call (IST)' : 'Prefer an Immediate Call? Book 30-Min Session'} 
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          {isIndia && (
            <a
              href="https://wa.me/919997205257?text=Hi%20Aman,%20I%20just%20submitted%20a%20project%20scope%20request%20on%20AJPR%20World%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp Now (+91 99972 05257)
            </a>
          )}

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                email: '',
                website: '',
                phone: '',
                projectGoal: '',
                companySize: '2-10',
                budget: '',
                techStack: '',
                honeypot: '',
                utm_source: '',
                utm_medium: '',
                utm_campaign: ''
              });
            }}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors underline pt-1 block mx-auto"
          >
            Submit another project inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Real Architect Persona Header */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-slate-200/80 dark:border-slate-800/80 mb-6">
        <div className="relative">
          <Image
            src="/images/aman-joshi-profile.png"
            alt="Aman Joshi"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-blue-500/20"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title="Online & Available"></span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Aman Joshi</span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold uppercase">Lead Architect</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            Direct scoping within 24 hours &bull; Zero sales reps
          </p>
        </div>
      </div>

      {/* Target Domain pill if scanned from hero */}
      {formData.website && (
        <div className="mb-5 p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 truncate mr-2">
            <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            Target URL / System: <strong className="text-slate-900 dark:text-white truncate">{formData.website}</strong>
          </span>
          <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold shrink-0">
            Ready for Audit
          </span>
        </div>
      )}

      {/* Single Streamlined High-Velocity Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Field 1: Target Website or Repo URL */}
        <div>
          <Label htmlFor="lead-website" className="text-slate-700 dark:text-slate-300 flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-500" /> Website or GitHub Repository to Audit *
            </span>
            <span className="text-[10px] font-normal text-slate-400 lowercase">staging, live, or repo URL</span>
          </Label>
          <Input 
            id="lead-website"
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            placeholder="https://yourcompany.com or github.com/org/repo" 
            required
            className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-11 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-xs sm:text-sm"
          />
        </div>

        {/* Row 2: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lead-email" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-500" /> Work Email (for Teardown) *
            </Label>
            <Input 
              id="lead-email"
              name="email" 
              type="email"
              value={formData.email} 
              onChange={handleChange} 
              placeholder="alex@company.com" 
              required
              className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-11 rounded-xl focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <Label htmlFor="lead-name" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" /> Your Name *
            </Label>
            <Input 
              id="lead-name"
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Alex Morgan" 
              required
              className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-11 rounded-xl focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Field 3: Audit Focus Pills */}
        <div>
          <Label className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-blue-500" /> Primary Teardown Focus
          </Label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'speed', label: '⚡ Speed & Core Web Vitals' },
              { id: 'security', label: '🔒 Security & Headers' },
              { id: 'database', label: '🏗️ Database & Scaling' },
              { id: 'ai', label: '🤖 Next.js & AI Systems' },
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setAuditFocus(pill.id as any)}
                className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                  auditFocus === pill.id
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Phone / WhatsApp (Optional but high intent) */}
        <div>
          <Label htmlFor="lead-phone" className="text-slate-700 dark:text-slate-300 flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5">
              {isIndia ? <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Phone className="w-3.5 h-3.5 text-blue-500" />}
              {isIndia ? 'WhatsApp / Phone Number' : 'Phone / WhatsApp'}
            </span>
            <span className="text-[10px] font-normal text-slate-400 lowercase">optional (for instant WhatsApp delivery link)</span>
          </Label>
          <Input 
            id="lead-phone"
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder={isIndia ? '+91 98765 43210' : '+1 (415) 800-2490'}
            className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-11 rounded-xl focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
          />
        </div>

        {/* Optional: Future Sprint Scope / Budget Planning */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowBudgetPlanning(!showBudgetPlanning)}
            className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showBudgetPlanning ? '− Hide sprint budget planning' : '+ Also estimating budget for a full engineering sprint? (Optional)'}
          </button>

          {showBudgetPlanning && (
            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Label htmlFor="lead-budget" className="text-slate-700 dark:text-slate-300 block text-xs font-bold uppercase tracking-wider mb-1.5">
                Estimated Sprint Budget (Optional)
              </Label>
              <select
                id="lead-budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-10 px-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              >
                <option value="Free 48h Audit">Free 48h Teardown (No Budget Required)</option>
                {isIndia ? (
                  <>
                    <option value="<1.5L">Under ₹1,50,000 (Rapid MVP / Starter Sprint)</option>
                    <option value="1.5L-4L">₹1,50,000 – ₹4,00,000 (Production Web App / AI System)</option>
                    <option value="4L-10L">₹4,00,000 – ₹10,00,000 (Custom Multi-Agent Architecture)</option>
                    <option value="10L+">₹10,00,000+ (Enterprise Scale & SLA)</option>
                  </>
                ) : (
                  <>
                    <option value="<5k">Under $5,000 (Rapid MVP / Starter Sprint)</option>
                    <option value="5k-15k">$5,000 – $15,000 (Production Web App / AI System)</option>
                    <option value="15k-35k">$15,00,000 – $35,000 (Custom Multi-Agent Architecture)</option>
                    <option value="35k+">$35,000+ (Enterprise Scale & SLA)</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>

        {/* Honeypot field (hidden from humans, filled by bots) */}
        <div className="absolute opacity-0 -z-10" aria-hidden="true">
          <Label htmlFor="lead-honeypot">Leave this empty</Label>
          <Input 
            id="lead-honeypot"
            name="honeypot" 
            value={formData.honeypot} 
            onChange={handleChange} 
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* 100% Free Guarantee Banner */}
        <div className="p-3.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            100% Free • No Sales Pitch • Video Teardown
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> 48h Delivery
          </span>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all text-sm gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Queuing 48h Systems Audit...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Claim Free 48-Hour Systems Teardown <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Alternative Fast-Track Strip (Zero-Friction Contacts) */}
      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 text-center mb-3">
          Or connect directly without forms:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {isIndia ? (
            <a
              href="https://wa.me/919997205257?text=Hi%20Aman,%20I'd%20like%20to%20discuss%20a%20project%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp: +91 99972 05257</span>
            </a>
          ) : (
            <a
              href="mailto:hello@ajprworld.com?subject=Project%20Inquiry%20via%20Website"
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-500" />
              <span>Email: hello@ajprworld.com</span>
            </a>
          )}

          <Link
            href="/book-call"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
          >
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Book 30-Min Strategy Call</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
