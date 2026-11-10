"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
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
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRegion } from '@/components/providers/RegionProvider';

export default function LeadForm() {
  const { isIndia } = useRegion();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [targetDomain, setTargetDomain] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    budget: '',
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
        setTargetDomain(domain);
        setFormData(prev => ({
          ...prev,
          techStack: prev.techStack ? `${prev.techStack} | Target: ${domain}` : `Target Website: ${domain}`,
          utm_source: urlParams.get('utm_source') || 'quick_scan_hook',
          utm_medium: urlParams.get('utm_medium') || 'hero_scan',
          utm_campaign: urlParams.get('utm_campaign') || 'free_audit'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          utm_source: urlParams.get('utm_source') || '',
          utm_medium: urlParams.get('utm_medium') || '',
          utm_campaign: urlParams.get('utm_campaign') || ''
        }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your work email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please provide a valid email address (e.g., alex@company.com)');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (step === 1) {
      if (validateStep1()) nextStep();
      return;
    }
    if (step === 2) {
      nextStep();
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const resData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new Error(resData.error || 'Submission failed');
      }
      
      if (resData.referenceId) {
        setReferenceId(resData.referenceId);
      }
      setIsSuccess(true);
      toast.success('Your audit request has been received!');
      
      // Fire GTM Event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          lead_type: 'free_audit',
          budget: formData.budget,
          company_size: formData.companySize
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 sm:p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl space-y-6"
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider">
                Ref: #{referenceId}
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Audit Request Received!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900 dark:text-white font-semibold">{formData.name}</strong>. A confirmation email has been dispatched to <span className="text-blue-600 dark:text-blue-400 font-medium">{formData.email}</span>. Our senior engineering pod is preparing your tailored Technical & SEO review.
          </p>
        </div>

        {/* 3 Step Timeline of what happens next */}
        <div className="text-left bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">What Happens Next</h4>
          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span><strong>Deep Scan:</strong> We analyze your Core Web Vitals, API latency, and search footprint.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span><strong>Actionable Plan:</strong> Senior architect authors a 3-page roadmap with sprint estimates.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span><strong>Direct Delivery:</strong> Delivered to your inbox within 24 hours (zero sales spam).</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button 
            onClick={() => window.location.href = '/book-call'} 
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30"
          >
            {isIndia ? 'Want Immediate Review? Book Architecture Call (IST)' : 'Want Immediate Review? Book Strategy Call'} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setStep(1);
              setFormData({
                name: '',
                email: '',
                companySize: '',
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
            Submit another project audit
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Client-Friendly Step Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between text-xs font-semibold mb-3">
          <span className={step >= 1 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"}>
            01 Contact
          </span>
          <span className={step >= 2 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"}>
            02 Tech & Team
          </span>
          <span className={step >= 3 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"}>
            03 Budget & Scope
          </span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                step >= num 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-500 shadow-sm shadow-blue-500/30' 
                  : 'bg-slate-200 dark:bg-slate-800'
              }`} 
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <div className="space-y-4">
                {targetDomain && (
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 truncate mr-2">
                      <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      Target: <strong className="text-slate-900 dark:text-white truncate">{targetDomain}</strong>
                    </span>
                    <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold shrink-0">
                      Triage Queued
                    </span>
                  </div>
                )}
                <div>
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <User className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Full Name
                  </Label>
                  <Input 
                    id="name"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Alex Morgan" 
                    autoFocus
                    className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Work Email
                  </Label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="alex@company.com" 
                    className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    🔒 We deliver your confidential audit report directly to this email.
                  </p>
                </div>

                {/* Honeypot field (hidden from humans, filled by bots) */}
                <div className="absolute opacity-0 -z-10" aria-hidden="true">
                  <Label htmlFor="honeypot">Leave this empty</Label>
                  <Input 
                    id="honeypot"
                    name="honeypot" 
                    value={formData.honeypot} 
                    onChange={handleChange} 
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button 
                  type="button" 
                  onClick={nextStep} 
                  className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-4 shadow-lg shadow-blue-600/20"
                >
                  Continue to Tech Architecture <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            )}

            {/* Step 2: Architecture & Company Context */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companySize" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Company / Team Size
                  </Label>
                  <select 
                    id="companySize"
                    name="companySize" 
                    value={formData.companySize} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-12 rounded-xl px-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select company size...</option>
                    <option value="1">Solo Founder (1)</option>
                    <option value="2-10">Early Stage Team (2–10)</option>
                    <option value="11-50">Growing Business (11–50)</option>
                    <option value="51-200">Scaleup / Mid-Market (51–200)</option>
                    <option value="200+">Enterprise (200+)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="techStack" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Current Tech Stack or Website URL
                  </Label>
                  <Input 
                    id="techStack"
                    name="techStack" 
                    value={formData.techStack} 
                    onChange={handleChange} 
                    placeholder="e.g. Next.js, Postgres, or yoursite.com" 
                    className="bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    Sharing your URL helps our architects perform live Lighthouse & TTFB audits.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep} 
                    className="h-12 px-4 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20"
                  >
                    Continue to Scope & Budget <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Scope & Budget Tier */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget" className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1.5">
                    {isIndia ? <Receipt className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> : <DollarSign className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />} Estimated Project Budget
                  </Label>
                  <select 
                    id="budget"
                    name="budget" 
                    value={formData.budget} 
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white h-12 rounded-xl px-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select budget range...</option>
                    {isIndia ? (
                      <>
                        <option value="<1.5L">Under ₹1,50,000 (Rapid MVP / Starter Sprint)</option>
                        <option value="1.5L-4L">₹1,50,000 – ₹4,00,000 (Production Web App / AI Workflow)</option>
                        <option value="4L-10L">₹4,00,000 – ₹10,00,000 (Custom Multi-Agent Architecture)</option>
                        <option value="10L+">₹10,00,000+ (Enterprise Scale & Infrastructure)</option>
                        <option value="flexible">Flexible / Need Technical Scope First</option>
                      </>
                    ) : (
                      <>
                        <option value="<5k">Under $5,000 (Rapid MVP / Starter Sprint)</option>
                        <option value="5k-15k">$5,000 – $15,000 (Production Web App / AI Workflow)</option>
                        <option value="15k-35k">$15,000 – $35,000 (Custom Multi-Agent Architecture)</option>
                        <option value="35k+">$35,000+ (Enterprise Scale & Infrastructure)</option>
                        <option value="flexible">Flexible / Need Technical Scope First</option>
                      </>
                    )}
                  </select>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                    We tailor our sprint recommendations directly to your financial constraints.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>100% Free • No Obligation • Mutual NDA</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Receive an unvarnished technical assessment detailing hidden performance bottlenecks and exact next steps.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep} 
                    disabled={loading}
                    className="h-12 px-4 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Request Free Technical Audit <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </form>

      {/* Trust Subtext */}
      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
        <span className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Confidential & Secure
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> ~24h Turnaround
        </span>
      </div>

    </div>
  );
}
