"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, DollarSign, Users, Copy, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AffiliatesPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState('');

  const generateLink = () => {
    // In a real app, this would hit an API to generate/retrieve the tracking code
    // from the affiliate_links table. For now, we simulate it.
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ajprworld.com';
    const link = `${baseUrl}?ref=${user?.id || 'guest'}`;
    setAffiliateLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium mb-6">
            <DollarSign className="w-4 h-4 mr-2" />
            Partner Program
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Earn <span className="text-blue-500">20% Commission</span> on every sale.
          </motion.h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Refer clients to AJPR World for Custom MVP Engineering or SEO Audits and earn a flat 20% commission on the total project value. No cap on earnings.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">0</h3>
            <p className="text-slate-400 font-medium">Total Referrals</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">$0.00</h3>
            <p className="text-slate-400 font-medium">Pending Payout</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Share & Earn</h3>
            <p className="text-slate-400 text-sm mb-4">Generate your unique tracking link to get started.</p>
            
            {!affiliateLink ? (
              <Button onClick={generateLink} className="w-full bg-blue-600 hover:bg-blue-500">
                Generate My Link
              </Button>
            ) : (
              <div className="flex gap-2">
                <Input 
                  value={affiliateLink} 
                  readOnly 
                  className="bg-slate-950 border-slate-800 text-slate-300"
                />
                <Button onClick={copyToClipboard} variant="secondary" className="px-3 shrink-0">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            )}
          </motion.div>

        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
            <div>
              <div className="text-blue-500 font-bold text-xl mb-2">1. Share</div>
              <p className="text-slate-400">Share your unique affiliate link with your network or audience.</p>
            </div>
            <div>
              <div className="text-blue-500 font-bold text-xl mb-2">2. Convert</div>
              <p className="text-slate-400">When someone clicks your link and purchases a productized service, it is tracked.</p>
            </div>
            <div>
              <div className="text-blue-500 font-bold text-xl mb-2">3. Earn</div>
              <p className="text-slate-400">Get 20% of the project value paid directly to your bank account within 30 days.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
