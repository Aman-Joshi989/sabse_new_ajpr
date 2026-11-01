'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Database, 
  FileText, 
  PhoneCall, 
  TrendingUp, 
  Users, 
  Lock, 
  AlertCircle, 
  ShoppingCart, 
  Play, 
  RefreshCw, 
  ChevronRight, 
  Building2, 
  Home, 
  GraduationCap, 
  Check, 
  Sliders, 
  Activity, 
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/providers/CartProvider';

interface PresetScenario {
  id: string;
  name: string;
  vertical: string;
  input: string;
  extracted: {
    name: string;
    requirement: string;
    location: string;
    budget: string;
    timeline: string;
    intentScore: number;
    intentLabel: 'HOT' | 'WARM' | 'COLD';
  };
  whatsappPreview: string;
  crmTags: string[];
}

const PRESETS: PresetScenario[] = [
  {
    id: 'roofing',
    name: 'Roofing Contractor Lead',
    vertical: 'Home Services',
    input: 'Hi, I need a complete commercial TPO roof replacement for our 22,000 sq ft distribution warehouse in Austin, TX. Budget is around $50,000 and we need it done before Q4 rains. Please call me at 512-882-9912. - Marcus Vance',
    extracted: {
      name: 'Marcus Vance',
      requirement: '22,000 sq ft Commercial TPO Roof Replacement',
      location: 'Austin, TX',
      budget: '$50,000',
      timeline: 'Before Q4 (High Urgency)',
      intentScore: 96,
      intentLabel: 'HOT'
    },
    whatsappPreview: 'Hi Marcus! 👋 Thanks for contacting Apex Roofing. I have recorded your 22,000 sq ft TPO replacement request in Austin ($50k budget). Our commercial estimator Dave has reserved a 15-minute scoping slot for you today at 3:30 PM. Does that work for you?',
    crmTags: ['Commercial', 'TPO_Roof', 'High_Budget', 'Austin_Metro', 'Urgent_Q4']
  },
  {
    id: 'real-estate',
    name: 'Luxury Real Estate Buyer',
    vertical: 'Real Estate',
    input: 'Hello, looking for a 4-bedroom waterfront home in South Beach / Miami. Pre-approved for $2.5M conventional loan. Looking to close in 45 days. My email is sarah.jenkins@techcorp.io. - Sarah Jenkins',
    extracted: {
      name: 'Sarah Jenkins',
      requirement: '4-Bed Waterfront Residential Property',
      location: 'South Beach / Miami, FL',
      budget: '$2,500,000 (Pre-Approved)',
      timeline: '45 Days (Closing Ready)',
      intentScore: 94,
      intentLabel: 'HOT'
    },
    whatsappPreview: 'Hello Sarah! ✨ Welcome to Premier Realty Miami. I have matched your 4-bed waterfront criteria ($2.5M budget) against 3 off-market listings in South Beach. Senior Agent Elena has been notified and sent a private tour portfolio to sarah.jenkins@techcorp.io.',
    crmTags: ['Buyer_Luxury', 'Waterfront', 'PreApproved_2.5M', 'Miami_Metro', 'Fast_Close']
  },
  {
    id: 'coaching',
    name: 'Corporate AI Training Cohort',
    vertical: 'EdTech & Coaching',
    input: 'We want to enroll 15 senior engineering directors from our fintech firm into your Executive AI Systems Cohort starting next month. Need corporate invoicing and curriculum outline. - Dr. Robert Chen (VP Engineering)',
    extracted: {
      name: 'Dr. Robert Chen (VP Engineering)',
      requirement: 'Corporate Group Enrollment (15 Senior Directors)',
      location: 'San Francisco, CA / Remote',
      budget: 'Enterprise Tier ($15,000+)',
      timeline: 'Next Month Cohort',
      intentScore: 98,
      intentLabel: 'HOT'
    },
    whatsappPreview: 'Greetings Dr. Chen! 🎓 Thank you for reaching out. We have reserved 15 corporate seats in the upcoming AI Systems Cohort. Your curriculum syllabus and enterprise invoice draft have been sent to your address. Would you like a brief 10-minute briefing call with our Lead Architect tomorrow?',
    crmTags: ['B2B_Corporate', '15_Seats', 'Executive_Cohort', 'Enterprise_Invoice']
  }
];

export default function AiSystemsClient() {
  const { addToCart, setIsCartOpen, formatPrice, currency } = useCart();

  // Simulator State
  const [selectedPreset, setSelectedPreset] = useState<PresetScenario>(PRESETS[0]);
  const [customInput, setCustomInput] = useState(PRESETS[0].input);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(4); // default finished view

  const handleSelectPreset = (preset: PresetScenario) => {
    setSelectedPreset(preset);
    setCustomInput(preset.input);
    setSimulationStep(4);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    setTimeout(() => setSimulationStep(2), 700);
    setTimeout(() => setSimulationStep(3), 1500);
    setTimeout(() => {
      setSimulationStep(4);
      setIsSimulating(false);
    }, 2300);
  };

  const handleOrderSystem = (title: string, priceUSD: number, description: string) => {
    addToCart({
      type: 'package',
      name: title,
      price: priceUSD,
      details: description,
      quantity: 1
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-600 selection:text-white pb-32">
      
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-[70%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg shadow-blue-500/5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Enterprise AI Systems Architecture • Not Commodity Freelancing
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            AI Automation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">AI Agent Systems</span> for Business
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Stop buying $50 disconnected Zapier workflows from commodity gig marketplaces. We architect <strong>production-grade AI Operating Systems</strong> that connect your ads, forms, WhatsApp, CRM, and documents into unified revenue engines with deterministic human guardrails.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#demo-simulator"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              Launch Live Pipeline Simulator
            </a>
            <a
              href="#pricing-tiers"
              className="px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base flex items-center gap-2 transition-all hover:border-slate-500"
            >
              Explore 4-Tier Systems & Pricing →
            </a>
          </div>

          {/* Trust Strip */}
          <div className="pt-10 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800">
              <Cpu className="w-4 h-4 text-blue-400" /> n8n Self-Hosted Engines
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800">
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Official WhatsApp API
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Human Approval Guardrails
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800">
              <Database className="w-4 h-4 text-amber-400" /> PostgreSQL & Custom APIs
            </div>
          </div>
        </div>

        {/* Section: Live Interactive Simulator */}
        <section id="demo-simulator" className="mt-28 pt-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Interactive Test Bench
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Experience the AI Sales Command Center Live
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Select a vertical scenario below or edit the input text. Click <strong>"Run Pipeline"</strong> to watch our autonomous agent ingest, reason, extract entities, calculate a 0–100 lead score, and fire instant WhatsApp bookings.
            </p>
          </div>

          {/* Simulator Box */}
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            {/* Scenario selector tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Preset Scenarios:</span>
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedPreset.id === preset.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {preset.vertical === 'Home Services' && <Home className="w-3.5 h-3.5" />}
                  {preset.vertical === 'Real Estate' && <Building2 className="w-3.5 h-3.5" />}
                  {preset.vertical === 'EdTech & Coaching' && <GraduationCap className="w-3.5 h-3.5" />}
                  {preset.name}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Col: Inbound Input & Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                      Inbound Customer Inquiry
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                      Channel: WhatsApp / Form
                    </span>
                  </div>

                  <textarea
                    rows={6}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />

                  <Button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        AI Agent Executing Multi-Step Pipeline...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-white" />
                        Run AI System Pipeline
                      </>
                    )}
                  </Button>
                </div>

                {/* Pipeline Flow Steps */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-xs space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Live Orchestration Pipeline:</div>
                  
                  <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${simulationStep >= 1 ? 'bg-blue-500/10 border border-blue-500/30 text-blue-300' : 'text-slate-600'}`}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500/20 text-xs font-bold shrink-0">1</span>
                    <span>Omni-Channel Ingestion & Webhook Trigger (n8n)</span>
                    {simulationStep >= 1 && <Check className="w-4 h-4 ml-auto text-blue-400" />}
                  </div>

                  <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${simulationStep >= 2 ? 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-300' : 'text-slate-600'}`}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-indigo-500/20 text-xs font-bold shrink-0">2</span>
                    <span>AI Reasoning & Named Entity Extraction (Claude / GPT-4o)</span>
                    {simulationStep >= 2 && <Check className="w-4 h-4 ml-auto text-indigo-400" />}
                  </div>

                  <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${simulationStep >= 3 ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300' : 'text-slate-600'}`}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-purple-500/20 text-xs font-bold shrink-0">3</span>
                    <span>Deterministic Scoring Engine & Guardrail Validation</span>
                    {simulationStep >= 3 && <Check className="w-4 h-4 ml-auto text-purple-400" />}
                  </div>

                  <div className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${simulationStep >= 4 ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'text-slate-600'}`}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/20 text-xs font-bold shrink-0">4</span>
                    <span>CRM Contact Sync & Instant WhatsApp Follow-up Dispatched</span>
                    {simulationStep >= 4 && <Check className="w-4 h-4 ml-auto text-emerald-400" />}
                  </div>
                </div>
              </div>

              {/* Right Col: Live Output Visualizer */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* AI Entity Extractor & Score Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-purple-400" />
                      Extracted Intelligence & Lead Score
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Score:</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {selectedPreset.extracted.intentScore}/100 • {selectedPreset.extracted.intentLabel}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Contact Name</span>
                      <span className="font-semibold text-white truncate block mt-0.5">{selectedPreset.extracted.name}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Location / Market</span>
                      <span className="font-semibold text-white truncate block mt-0.5">{selectedPreset.extracted.location}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Budget Detected</span>
                      <span className="font-semibold text-emerald-400 truncate block mt-0.5">{selectedPreset.extracted.budget}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 col-span-2">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Verified Requirement</span>
                      <span className="font-semibold text-slate-200 block mt-0.5">{selectedPreset.extracted.requirement}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Timeline</span>
                      <span className="font-semibold text-amber-400 truncate block mt-0.5">{selectedPreset.extracted.timeline}</span>
                    </div>
                  </div>

                  {/* CRM Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">CRM Tags:</span>
                    {selectedPreset.crmTags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instant WhatsApp Follow-up Simulator */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-[#0B1528] border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      Live WhatsApp Agent Auto-Response (Sub-60s Speed-to-Lead)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Meta Cloud API</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061B16] border border-emerald-900/40 text-slate-200 text-xs sm:text-sm leading-relaxed shadow-inner">
                    <p className="whitespace-pre-wrap">{selectedPreset.whatsappPreview}</p>
                    <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-emerald-500 font-mono">
                      <span>Delivered instantly</span>
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Section: The 3 Flagship OS Products */}
        <section className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Turnkey Productized Systems
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3">
              The 3 Flagship Business Operating Systems
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-3">
              We sell complete business infrastructure, not ad-hoc scripts. Each system is customized to your CRM, deployed securely, and includes monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Product 1: LeadOS */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xl">
                  01
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Revenue Operations</span>
                  <h3 className="text-2xl font-bold text-white mt-1">AJPR LeadOS™</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Omni-channel lead capture (Google Ads, Meta, WhatsApp, Web Forms) → AI Lead Qualification → Scoring (0–100) → CRM Auto-Sync → Instant WhatsApp calendar booking.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Speed-to-lead dropped to under 45 seconds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>HubSpot, GoHighLevel, or Salesforce Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp 2-way qualification agent</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Investment</span>
                  <span className="text-2xl font-black text-white">$1,500 – $3,500</span>
                </div>
                <Button
                  onClick={() => handleOrderSystem('AJPR LeadOS (AI Lead-to-Revenue System)', 3500, 'Omni-channel capture, qualification, CRM sync and instant WhatsApp booking')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Deploy LeadOS
                </Button>
              </div>
            </div>

            {/* Product 2: SupportOS */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-xl">
                  02
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Customer Experience</span>
                  <h3 className="text-2xl font-bold text-white mt-1">AJPR SupportOS™</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  24/7 Web & WhatsApp Concierge powered by RAG Knowledge Base. Answers technical questions with zero hallucinations, plus smart escalation to human staff with full transcripts.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>RAG vector search over your docs & FAQs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>80%+ routine tickets resolved autonomously</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Human escalation trigger on negative sentiment</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Investment</span>
                  <span className="text-2xl font-black text-white">$1,500 – $3,500</span>
                </div>
                <Button
                  onClick={() => handleOrderSystem('AJPR SupportOS (AI Concierge & WhatsApp)', 3500, '24/7 customer support, RAG documentation search and seamless human escalation')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
                >
                  Deploy SupportOS
                </Button>
              </div>
            </div>

            {/* Product 3: OpsOS */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-xl">
                  03
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Back-Office Automation</span>
                  <h3 className="text-2xl font-bold text-white mt-1">AJPR OpsOS™</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Autonomous document processing (Invoices, PDFs, Contracts), cross-tool data reconciliation, and morning executive intelligence briefings delivered on Slack/WhatsApp.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>OCR extraction from complex invoices & PDFs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>QuickBooks, Stripe, and Database reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Daily automated P&L & pipeline digest</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Investment</span>
                  <span className="text-2xl font-black text-white">$2,000 – $5,000</span>
                </div>
                <Button
                  onClick={() => handleOrderSystem('AJPR OpsOS (AI Document & Operations Engine)', 3500, 'OCR extraction, accounting reconciliation, and automated executive intelligence briefings')}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
                >
                  Deploy OpsOS
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* Section: The 4-Layer Architecture & Guardrails */}
        <section className="mt-32 p-8 sm:p-12 rounded-3xl bg-slate-900/50 border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Engineering Rigor
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              The 4-Layer Architecture: Why Enterprise Clients Hire AJPR
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Unlike amateur freelancers who deploy fragile single-prompt scripts, our systems combine low-code orchestration (n8n/Make) with deterministic code (FastAPI/Postgres) and human-in-the-loop approvals.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
              <span className="text-xs font-mono text-blue-400 font-bold">LAYER 1</span>
              <h4 className="text-lg font-bold text-white">Task Automation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects forms, webhooks, CRMs, and email tools via robust n8n and Make pipelines. Zero manual copy-pasting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
              <span className="text-xs font-mono text-indigo-400 font-bold">LAYER 2</span>
              <h4 className="text-lg font-bold text-white">Autonomous Agents</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI agents reason over unstructured input, score intent, research company domains, and draft custom contextual communications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
              <span className="text-xs font-mono text-purple-400 font-bold">LAYER 3</span>
              <h4 className="text-lg font-bold text-white">Business OS</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cross-department synchronization connecting Sales, Support, and Back-Office Operations into a centralized Postgres & analytics hub.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">LAYER 4</span>
              <h4 className="text-lg font-bold text-white">Managed AI Operations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ongoing monthly monitoring, prompt optimization, API maintenance, error recovery, and continuous automation enhancements.
              </p>
            </div>
          </div>

          {/* Guardrails Callout */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Deterministic Human-in-the-Loop Guardrails</h4>
              <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                We enforce strict guardrails: High-stakes operations (e.g. refunds &gt; $500, legal document signings, custom enterprise discount approvals) require a 1-click human verification checkpoint via WhatsApp or Slack before execution.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 3 Target Verticals */}
        <section className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Deep Industry Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Built for High-Ticket Service Verticals
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              We specialize in service businesses where speed-to-lead and instant qualification directly increase closed revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Roofing & Home Services</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Captures emergency repair and re-roof leads from Google Ads, extracts roof type and square footage, calculates estimate ranges, and alerts local estimators immediately.
              </p>
              <div className="text-xs text-blue-400 font-semibold">
                Average Speed to Lead: 42 seconds
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Real Estate Brokerages</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Screens luxury buyers and sellers, verifies pre-approval status, matches property criteria against MLS listings, and hands off to licensed agents with full dossiers.
              </p>
              <div className="text-xs text-indigo-400 font-semibold">
                85% qualification accuracy before human call
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Coaching & EdTech</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                24/7 AI WhatsApp admissions counsellor answers curriculum questions, checks prerequisite criteria, books discovery demos, and sends enrollment payment links.
              </p>
              <div className="text-xs text-purple-400 font-semibold">
                3.4x higher demo attendance with instant WhatsApp nurture
              </div>
            </div>
          </div>
        </section>

        {/* Section: 4-Tier Pricing Grid */}
        <section id="pricing-tiers" className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Transparent Investment
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3">
              Fixed Implementation Packages
            </h2>
            <p className="text-slate-400 text-base mt-2">
              No hidden fees. You own 100% of your workflows, code, and databases.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Tier 1: AI Starter */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Tier</span>
                <h3 className="text-xl font-bold text-white mt-1">AI Starter</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$499</span>
                  <span className="text-xs text-slate-500 block mt-1">One-time sprint</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>1 Core n8n/Make Automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Web Form → CRM Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Instant Slack/Email Alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Error Logging & Fallbacks</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleOrderSystem('AI Starter System ($499)', 499, '1 Core n8n workflow, CRM sync, instant notification routing')}
                className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl"
              >
                Order Starter ($499)
              </Button>
            </div>

            {/* Tier 2: AI Growth */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Most Popular SMB</span>
                <h3 className="text-xl font-bold text-white mt-1">AI Growth</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$1,500</span>
                  <span className="text-xs text-slate-500 block mt-1">Full delivery in 10 days</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Multi-Channel Lead Ingestion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>AI Lead Qualification Agent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>WhatsApp Follow-up Automation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>CRM Contact & Deal Structuring</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleOrderSystem('AI Growth Automation ($1,500)', 1500, 'Multi-channel ingestion, AI qualification agent, WhatsApp sync')}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
              >
                Order Growth ($1,500)
              </Button>
            </div>

            {/* Tier 3: AI Business System */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-950/60 to-slate-900 border-2 border-blue-500 flex flex-col justify-between relative shadow-xl shadow-blue-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                FLAGSHIP RECOMMENDATION
              </div>
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Complete Infrastructure</span>
                <h3 className="text-xl font-bold text-white mt-1">AI Business System</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$3,500</span>
                  <span className="text-xs text-slate-400 block mt-1">Complete LeadOS or SupportOS</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Complete LeadOS or SupportOS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Human-in-the-Loop Guardrails</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>RAG Knowledge Base Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Custom Analytics Dashboard</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleOrderSystem('AJPR AI Business System ($3,500)', 3500, 'Complete LeadOS/SupportOS, custom dashboard, human-in-the-loop guardrails')}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30"
              >
                Deploy Business System ($3,500)
              </Button>
            </div>

            {/* Tier 4: AI Enterprise OS */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Custom Enterprise</span>
                <h3 className="text-xl font-bold text-white mt-1">AI Enterprise OS</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-white">$7,500+</span>
                  <span className="text-xs text-slate-500 block mt-1">Bespoke Architecture</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Multi-Agent Swarm Orchestration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Private VPS / Cloud Database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>FastAPI Custom Backend Microservices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Dedicated Senior Architect Pod</span>
                  </li>
                </ul>
              </div>
              <Button
                asChild
                className="w-full mt-8 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
              >
                <Link href="/contact?type=enterprise-ai">
                  Request Enterprise Quote
                </Link>
              </Button>
            </div>

          </div>

          {/* Managed Retainer Strip */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Recurring Support & Evolution</span>
              <h3 className="text-2xl font-bold text-white mt-1">Managed AI Operations Retainers</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Keep your AI systems operating at 99.9% reliability. We monitor workflows, optimize model prompts, resolve API deprecations, and build new automations every month.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block">Maintenance</span>
                <span className="text-lg font-black text-white">$199<span className="text-xs font-normal text-slate-400">/mo</span></span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-blue-500/30 text-center">
                <span className="text-[10px] text-blue-400 block">Growth</span>
                <span className="text-lg font-black text-white">$499<span className="text-xs font-normal text-slate-400">/mo</span></span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-center">
                <span className="text-[10px] text-emerald-400 block">Full Ops</span>
                <span className="text-lg font-black text-white">$999<span className="text-xs font-normal text-slate-400">/mo</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-32 max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm mt-2">Everything you need to know about partnering with AJPR World.</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">Why shouldn't I just hire a $50 n8n freelancer on Fiverr?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                A $50 freelancer builds a single rigid script without error handling, logging, or guardrails. When an API changes or a lead provides unexpected input, the script silently breaks. AJPR builds resilient, production-grade business systems with confidence checks, fallback loops, human-in-the-loop approvals, and full CRM data integrity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">Who pays for the OpenAI, Claude, and WhatsApp API usage?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                You maintain direct ownership of your OpenAI, Anthropic, Twilio, and Meta accounts. We configure and connect the infrastructure. This guarantees you retain 100% data ownership, compliance control, and transparency with zero markup on token costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">How do human-in-the-loop guardrails work?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                For routine operations (lead scoring, FAQ responses, calendar booking), the AI executes autonomously. When the system detects high-value actions (such as high-value quotes, refunds, or complex contractual requests), it pauses and dispatches a Slack or WhatsApp confirmation card to your team before firing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">How fast can an AI Business System be deployed?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                AI Starter workflows are deployed in 3–5 business days. AI Growth and LeadOS implementations typically take 10–14 business days, including prompt tuning, testing, and team onboarding.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div className="mt-32 p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to Automate Your Business Infrastructure?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Schedule a 20-minute Technical Discovery Session. We will audit your current lead and operational workflows and demonstrate your custom AI architecture.
          </p>
          <div className="pt-2">
            <Button
              asChild
              className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-500/30"
            >
              <Link href="/book-call">
                Schedule Technical Discovery Call →
              </Link>
            </Button>
          </div>
        </div>

        {/* Cross-linking to Ecosystem */}
        <div className="mt-16 pt-10 border-t border-slate-800 text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Explore AI Architecture & Developer Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tools/ai-cost-estimator" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 text-slate-300 text-xs font-semibold transition-colors border border-slate-800">
              AI Architecture & Cost Estimator →
            </Link>
            <Link href="/tools/admin-cost-calculator" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 text-slate-300 text-xs font-semibold transition-colors border border-slate-800">
              Admin Labor Drag Calculator →
            </Link>
            <Link href="/chat-agents" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 text-slate-300 text-xs font-semibold transition-colors border border-slate-800">
              Interactive AI Agent Playground →
            </Link>
            <Link href="/demo-ruflo" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 text-slate-300 text-xs font-semibold transition-colors border border-slate-800">
              Swarm Orchestration Simulator →
            </Link>
            <Link href="/services/cloud-solutions" className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-900/30 text-slate-300 text-xs font-semibold transition-colors border border-slate-800">
              Cloud Infrastructure & DevOps →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
