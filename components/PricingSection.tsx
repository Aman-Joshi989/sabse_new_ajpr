'use client'

import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

interface PricingTier {
  name: string
  description: string
  features: string[]
  timeline: string
  isPopular?: boolean
  notIncluded?: string[]
}

const pricingTiers: PricingTier[] = [
  {
    name: 'STARTUP PRESENCE',
    description: 'Static / Frontend Website',
    features: [
      'Modern Frontend Design',
      'Mobile-responsive layout',
      'High-conversion landing page',
      'Standard Contact form integration',
      'Basic On-Page SEO setup',
    ],
    timeline: '2-3 Weeks'
  },
  {
    name: 'BUSINESS SCALE',
    description: 'Dynamic Web Application',
    isPopular: true,
    features: [
      'Everything in Startup Presence',
      'Database Architecture & Integration',
      'Custom API Development',
      'CMS Integration (Headless)',
      'Performance Optimization',
      'Advanced Technical SEO'
    ],
    notIncluded: ['Custom Admin Panel'],
    timeline: '4-6 Weeks'
  },
  {
    name: 'ENTERPRISE SOLUTION',
    description: 'Full Stack + Custom Admin',
    features: [
      'Complex Full Stack Architecture',
      'Custom Internal Admin Dashboard',
      'Advanced Database Management',
      'Scalable Cloud Infrastructure',
      'Enterprise-grade Security',
      'Priority SLASupport',
    ],
    timeline: '8-12 Weeks'
  }
]

export default function PricingSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Engineering Tiers</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Choose the technical foundation that best applies to your current growth stage. We provide custom proposals and dedicated teams based on your exact specifications.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                ${tier.isPopular ? 'border-blue-600 shadow-lg scale-105 z-10 ring-1 ring-blue-600' : 'border-slate-200 dark:border-slate-800'}`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <CardHeader>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">{tier.name}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Custom Proposal</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{tier.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {tier.notIncluded?.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-slate-400 dark:text-slate-500 line-through">
                      <XCircle className="w-4 h-4 text-slate-300 dark:text-slate-600 mr-2 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Typical Timeline:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{tier.timeline}</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${tier.isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                  size="lg"
                  asChild
                >
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
