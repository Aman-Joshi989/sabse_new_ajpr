"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, TrendingUp, CheckCircle2, ArrowRight, RefreshCw, BarChart3, HelpCircle } from 'lucide-react';
import RelatedTools from '@/components/RelatedTools';
import ToolLeadCapture from '@/components/ToolLeadCapture';
import { trackBookCall } from '@/lib/analytics';

export default function AgencyPricingCalculatorClient() {
  const [monthlyTargetRev, setMonthlyTargetRev] = useState<number>(50000);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(2500);
  const [closeRate, setCloseRate] = useState<number>(20); // percentage
  const [primaryChannel, setPrimaryChannel] = useState<'seo' | 'ppc' | 'both'>('both');

  // Calculations
  const newCustomersNeeded = Math.ceil(monthlyTargetRev / (avgCustomerValue || 1));
  const qualifiedLeadsNeeded = Math.ceil(newCustomersNeeded / ((closeRate || 1) / 100));

  // Retainer estimation
  let recommendedRetainer = 2500;
  if (monthlyTargetRev > 200000) {
    recommendedRetainer = 8500;
  } else if (monthlyTargetRev > 100000) {
    recommendedRetainer = 5500;
  } else if (monthlyTargetRev > 40000) {
    recommendedRetainer = 3500;
  } else {
    recommendedRetainer = 2000;
  }

  if (primaryChannel === 'both') {
    recommendedRetainer = Math.round(recommendedRetainer * 1.5);
  }

  const annualAgencyCost = recommendedRetainer * 12;
  const annualTargetRev = monthlyTargetRev * 12;
  const projectedNetRoi = Math.round(((annualTargetRev - annualAgencyCost) / annualAgencyCost) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Agency Pricing Calculator</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" /> 2026 Agency ROI Modeling Tool
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Agency Pricing & ROI Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Estimate your realistic monthly digital marketing retainer, pipeline requirements, and projected 12-month return on investment.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          {/* Inputs Section */}
          <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Your Business Metrics
            </h2>

            {/* Target Monthly Inbound Revenue */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Target Monthly Inbound Revenue</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">${monthlyTargetRev.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={monthlyTargetRev}
                onChange={(e) => setMonthlyTargetRev(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$10k</span>
                <span>$150k</span>
                <span>$300k+</span>
              </div>
            </div>

            {/* Average Customer Value / LTV */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Average Customer Lifetime Value (LTV)</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">${avgCustomerValue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>$500</span>
                <span>$10,000</span>
                <span>$25,000+</span>
              </div>
            </div>

            {/* Sales Close Rate */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Lead to Customer Close Rate</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{closeRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5% (Cold)</span>
                <span>20% (Average)</span>
                <span>50% (High-intent)</span>
              </div>
            </div>

            {/* Primary Channel Focus */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Primary Growth Engine
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['seo', 'ppc', 'both'] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setPrimaryChannel(ch)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      primaryChannel === ch
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {ch === 'seo' ? 'SEO Only' : ch === 'ppc' ? 'PPC Only' : 'SEO + PPC (Full-Funnel)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output Section */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
                Recommended Investment
              </span>
              <div className="text-4xl font-extrabold mb-1">
                ${recommendedRetainer.toLocaleString()}
                <span className="text-base text-slate-400 font-normal"> / month</span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Estimated agency retainer needed to support your target volume without quality compromises.
              </p>

              <div className="space-y-4 border-t border-slate-800 pt-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">New Deals Needed:</span>
                  <span className="font-bold text-white">{newCustomersNeeded} deals / mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Qualified Leads Required:</span>
                  <span className="font-bold text-white">{qualifiedLeadsNeeded} leads / mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Projected Annual Pipeline:</span>
                  <span className="font-bold text-emerald-400">${(monthlyTargetRev * 12).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Projected 12-Month Net ROI:</span>
                  <span className="font-bold text-blue-400">+{projectedNetRoi}%</span>
                </div>
              </div>
            </div>

            <Link
              href="/book-call?topic=Agency%20Pricing%20Calculation"
              onClick={() => trackBookCall('tool_agency_pricing_calc')}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm text-center transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              Lock in Strategy & Book Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Frictionless Email Capture & Report Delivery */}
        <div className="mb-12">
          <ToolLeadCapture
            title="Email Me My Custom Agency ROI & Budget Breakdown"
            subtitle="Get this personalized breakdown with customer acquisition benchmarks, deal targets, and retainer recommendations delivered directly to your inbox."
            badge="Instant Custom PDF Breakdown"
            ctaText="Email My Agency ROI Report"
            toolSource="agency_pricing_calculator"
            reportSummary={{
              headline: `Target: $${monthlyTargetRev.toLocaleString()}/mo | Retainer: $${recommendedRetainer.toLocaleString()}/mo | Net ROI: +${projectedNetRoi}%`,
              metrics: {
                'Target Monthly Revenue': `$${monthlyTargetRev.toLocaleString()}`,
                'Average Customer Value': `$${avgCustomerValue.toLocaleString()}`,
                'Recommended Retainer': `$${recommendedRetainer.toLocaleString()}/mo`,
                'Deals Needed': `${newCustomersNeeded} deals/mo`,
                'Qualified Leads Required': `${qualifiedLeadsNeeded} leads/mo`,
                'Projected 12-Month Net ROI': `+${projectedNetRoi}%`
              }
            }}
          />
        </div>

        {/* Cross links */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mb-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Explore Dedicated Pricing & Research Data
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/pricing/seo-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              SEO Cost Guide (2026) →
            </Link>
            <Link href="/pricing/ppc-cost" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              PPC Management Cost Breakdown →
            </Link>
            <Link href="/research/agency-pricing-report" className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800">
              US Agency Pricing Benchmark Report (200+ Agencies) →
            </Link>
          </div>
        </div>

        <RelatedTools currentSlug="/tools/agency-pricing-calculator" />
      </div>
    </div>
  );
}
