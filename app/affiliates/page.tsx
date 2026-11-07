"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  DollarSign, 
  Users, 
  Copy, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Zap, 
  Gift, 
  TrendingUp, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AffiliatesPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState('');
  
  // Commission Simulator State
  const [referralsCount, setReferralsCount] = useState(2);
  const [avgDealSize, setAvgDealSize] = useState(4000);

  const estimatedMonthly = Math.round(referralsCount * avgDealSize * 0.20);
  const estimatedAnnual = estimatedMonthly * 12;

  const generateLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ajprworld.com';
    const link = `${baseUrl}?ref=${user?.id || 'partner_' + Math.random().toString(36).substring(7)}`;
    setAffiliateLink(link);
    return link;
  };

  const copyToClipboard = () => {
    let link = affiliateLink;
    if (!link) {
      link = generateLink();
    }
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const link = affiliateLink || 'https://ajprworld.com';
    const text = encodeURIComponent("Building an AI MVP or need custom automation? Use my link for $500 off your engineering build with AJPR World:");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(link)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const link = affiliateLink || 'https://ajprworld.com';
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-24 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Top Program Badge & Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6">
            <Gift className="w-4 h-4" />
            Double-Sided Partner Program &bull; Give $500, Earn 20%
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
          >
            Refer Clients. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Earn 20% Flat Cash.</span>
          </motion.h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Introduce startup founders, agencies, or US businesses who need Custom AI MVPs, Workflow Automation, or Technical SEO. You pocket 20% of the contract value, and your referee receives a <strong className="text-slate-900 dark:text-white">$500 engineering credit</strong>.
          </p>
        </div>

        {/* Double-Sided Incentive Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:via-slate-900 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-6 sm:p-8 mb-16 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Why referrals love buying through you:</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Your custom link gives them an instant <strong>$500 discount</strong> on their first 4-week build.</p>
            </div>
          </div>
          <Button 
            onClick={copyToClipboard}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl shrink-0"
          >
            {copied ? 'Link Copied!' : 'Get Your Referral Link'}
          </Button>
        </div>

        {/* Interactive Earnings Simulator */}
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 mb-16 shadow-xl dark:shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Sliders Side */}
            <div className="w-full lg:w-3/5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                  <TrendingUp className="w-4 h-4" /> Calculator
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Simulate Your Referral Commission</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">See how much you can earn every month simply by connecting founders in your network.</p>
              </div>

              {/* Slider 1: Referrals per month */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Referred Clients Per Month</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-base bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-800/40">
                    {referralsCount} {referralsCount === 1 ? 'client' : 'clients'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={referralsCount} 
                  onChange={(e) => setReferralsCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Slider 2: Average project size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Average Project Value</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-base bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-800/40">
                    ${avgDealSize.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="2000" 
                  max="15000" 
                  step="500"
                  value={avgDealSize} 
                  onChange={(e) => setAvgDealSize(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>$2k (Quick MVP)</span>
                  <span>$5k (Full SaaS Build)</span>
                  <span>$15k (Enterprise AI System)</span>
                </div>
              </div>
            </div>

            {/* Readout Side */}
            <div className="w-full lg:w-2/5 bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center flex flex-col justify-center items-center shadow-inner">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Estimated Monthly Payout</span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-400 font-mono mb-2">
                ${estimatedMonthly.toLocaleString()}
                <span className="text-lg font-normal text-slate-500 dark:text-slate-400">/mo</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Equals <strong className="text-slate-900 dark:text-white">${estimatedAnnual.toLocaleString()}/year</strong> in zero-overhead commissions.
              </p>

              <div className="w-full pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2">
                <Button 
                  onClick={generateLink} 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-11"
                >
                  Start Earning Today
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Real-time Tracking & Link Generator */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">0</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">Active Referrals Tracked</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm"
          >
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$0.00</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">Pending Payout (Paid net-30 via Wire/PayPal)</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm"
          >
            <div className="w-12 h-12 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Share & Track</h3>
            
            {!affiliateLink ? (
              <Button onClick={generateLink} className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">
                Generate My Link
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    value={affiliateLink} 
                    readOnly 
                    className="bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300"
                  />
                  <Button onClick={copyToClipboard} variant="secondary" className="px-3 shrink-0">
                    {copied ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex gap-2 text-xs">
                  <button onClick={shareOnTwitter} className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-medium transition-colors">
                    Post on X
                  </button>
                  <button onClick={shareOnLinkedIn} className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-medium transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>

        {/* Service Commission Breakdown Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">What Your Referrals Buy (And What You Earn)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 shadow-sm">
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded text-xs font-bold">Fast Turnaround</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">4-Week AI MVP Build</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Full-stack Next.js, AI API integrations, and auth built from scratch for founders.</p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Typical Size: $3k - $6k</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono font-lg">You Earn: $600 - $1,200</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 shadow-sm">
              <span className="px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded text-xs font-bold">Recurring High-Ticket</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Autonomous AI Pipelines</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Voice agents, automated data pipelines, and internal company automation systems.</p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Typical Size: $4k - $10k</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono font-lg">You Earn: $800 - $2,000</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 shadow-sm">
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded text-xs font-bold">High Close Rate</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technical SEO & GEO Audit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Generative Engine Optimization to get startups cited inside ChatGPT, Perplexity, and Google AI.</p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Typical Size: $1.5k - $3.5k</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono font-lg">You Earn: $300 - $700</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3-Step Process */}
        <div className="bg-gradient-to-r from-blue-50/60 via-slate-50 to-indigo-50/60 dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-500/20 rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">How It Works in 3 Simple Steps</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto">No contracts or complex commitments. Transparent, automated tracking from first click to payout.</p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg mb-4">1</div>
              <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">Share Your Link</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Send your partner link to founders in your network, or share our free calculators on Twitter/LinkedIn.</p>
            </div>
            <div className="bg-white dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg mb-4">2</div>
              <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">We Close & Build</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Our sales team (and Hermes Agent) closes the discovery call and engineers the solution in 4 weeks.</p>
            </div>
            <div className="bg-white dark:bg-slate-950/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg mb-4">3</div>
              <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">Get Paid Flat 20%</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Receive 20% direct wire, ACH, or PayPal payment within 30 days of client milestone settlement.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
