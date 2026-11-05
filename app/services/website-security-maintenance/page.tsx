import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Activity, RefreshCw, AlertTriangle, ArrowRight, CheckCircle2, Zap, Server, DollarSign, Clock, HelpCircle, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';
import { TopicalClusterWidget } from '@/components/seo/TopicalClusterWidget';

export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Website Maintenance Services & 24/7 Security Engineering | AJPR World',
  description: 'Enterprise website maintenance services and proactive security engineering: zero-day vulnerability patching, 24/7 uptime monitoring, automated backups, and guaranteed SLAs. Explore transparent monthly maintenance costs.',
  keywords: [
    'website maintenance services',
    'website maintenance cost',
    'website maintenance packages',
    'monthly website maintenance',
    'web application maintenance services',
    'website security and maintenance',
    'Next.js website maintenance services',
    'how much does website maintenance cost'
  ],
  alternates: {
    canonical: 'https://ajprworld.com/services/website-security-maintenance',
  },
  openGraph: {
    title: 'Website Maintenance Services & 24/7 Security Engineering | AJPR World',
    description: 'Enterprise website maintenance services and proactive security engineering: zero-day vulnerability patching, 24/7 uptime monitoring, automated backups, and guaranteed SLAs.',
    url: 'https://ajprworld.com/services/website-security-maintenance',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Website Maintenance Services & Cost - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Maintenance Services & Cost Breakdown | AJPR World',
    description: '24/7 uptime monitoring, zero-day patching, automated backups, and guaranteed SLAs for web applications.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'What is included in AJPR World’s website maintenance services?',
    answer: 'Our website maintenance services include 24/7 automated uptime and latency monitoring, dependency and package vulnerability patching, SSL/TLS certificate lifecycle management, daily encrypted automated cloud backups with tested restore rollbacks, web application firewall (WAF) rule tuning, Core Web Vitals speed optimization, and guaranteed SLA incident response.'
  },
  {
    question: 'How much does website maintenance cost per month?',
    answer: 'Website maintenance costs generally range from $149 to $899+ per month depending on application complexity. For standard business platforms, our Essential package is $149/mo. For custom web applications requiring active code updates and performance tuning, our Professional package is $349/mo. Mission-critical enterprise platforms with 15-minute emergency SLAs are $899/mo.'
  },
  {
    question: 'Why is a monthly website maintenance retainer cheaper than emergency ad-hoc fixes?',
    answer: 'Emergency downtime, database corruption, or malware infections typically cost thousands of dollars in emergency freelancer rates ($150-$250/hr) plus direct revenue and brand reputation loss. A predictable monthly website maintenance retainer prevents issues before they happen with proactive health checks, zero-day CVE patching, and continuous backups.'
  },
  {
    question: 'How quickly do you respond when a critical downtime incident occurs?',
    answer: 'Our dedicated incident response pods operate with a guaranteed under-15-minute response SLA for critical outages and P0 security vulnerabilities, backed by automated health checks across 12 worldwide server nodes.'
  },
  {
    question: 'Do you support custom Next.js, Node.js, and cloud backends?',
    answer: 'Yes. Unlike typical agencies that only handle basic WordPress sites, our engineering team specializes in modern headless Next.js applications, serverless functions, PostgreSQL databases (Neon, Supabase, RDS), Docker containers, and Cloudflare enterprise edge caching.'
  },
  {
    question: 'How do you prevent breaking production during dependency and security updates?',
    answer: 'All security updates, package upgrades, and patches undergo automated end-to-end integration tests in an isolated staging environment before being deployed through zero-downtime pipelines.'
  }
];

export default function WebsiteSecurityMaintenancePage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Services', item: 'https://ajprworld.com/services' },
    { name: 'Website Maintenance Services', item: 'https://ajprworld.com/services/website-security-maintenance' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ServiceSchema
        name="Website Maintenance Services & 24/7 Security Engineering"
        description="Comprehensive 24/7 website maintenance services, zero-day patch management, automated encrypted backups, Core Web Vitals speed tuning, and guaranteed SLA incident recovery."
        providerName="AJPR World"
        url="https://ajprworld.com/services/website-security-maintenance"
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden text-white border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full">
            Zero-Downtime Reliability & Proactive Maintenance
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Proactive Website Maintenance Services <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              & 24/7 Enterprise Security Engineering
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Eliminate server crashes, surprise downtime, and vulnerability exploits. We monitor, patch, backup, and optimize your web application 24/7 with guaranteed SLAs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/book-call">Schedule Free Security Audit</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 font-semibold text-sm" asChild>
              <a href="#maintenance-cost">View Maintenance Costs & Retainers</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Maintenance Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase">
              Full-Scope Reliability
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              What’s Included in Our Website Maintenance Services
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
              Proactive protection, speed optimization, and performance engineering designed specifically for production web applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">24/7 Global Uptime Monitoring</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Global synthetic ping and HTTP response monitors test your application every 60 seconds across 12 worldwide edge nodes, instantly routing alerts to on-call engineers.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Latency & SSL expiration tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> DNS, API & edge cache health checks</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Zero-Day CVE Patch Management</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We proactively audit npm, Docker, framework, and database dependencies for security advisories, patching vulnerabilities before malicious bots can exploit your surface.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Automated staging regression testing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Weekly automated dependency updates</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Encrypted Automated Backups</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily automated snapshots of PostgreSQL databases, user uploads, and application code stored across redundant geo-distributed cloud tiers with tested 1-click restore workflows.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Point-in-time recovery capabilities</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Off-site encrypted cloud retention</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Website Maintenance Cost Section */}
      <section id="maintenance-cost" className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              Transparent Pricing & Retainers
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
              Website Maintenance Cost in 2026: Pricing Guide
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              How much does website maintenance cost? Explore our flat-rate monthly website maintenance packages with zero hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Starter Plan */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Essential SLA</span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Starter Maintenance</h3>
                <p className="text-xs text-slate-500 mt-2">Ideal for content sites and growing business websites.</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">$149</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="text-xs space-y-3 text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> 24/7 Global Uptime Monitoring (60s checks)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Daily Automated Cloud Backups</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Monthly Dependency & Security Patching</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> SSL / DNS Health & Expiry Protection</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> 4-Hour Emergency Response SLA</li>
                </ul>
              </div>
              <Button className="w-full mt-8 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold" asChild>
                <Link href="/book-call">Get Started</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-[#0a0f1c] border-2 border-blue-600 dark:border-blue-500 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Growth & Full-Stack</span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Professional SLA</h3>
                <p className="text-xs text-slate-500 mt-2">For custom Next.js, React, SaaS, and e-commerce platforms.</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-black text-blue-600 dark:text-blue-400 font-mono">$349</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="text-xs space-y-3 text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Check className="w-4 h-4 text-blue-600" /> Everything in Starter SLA</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> <strong>3 Hours</strong> Senior Engineering Support / Mo</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Core Web Vitals Speed & Cache Optimization</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Zero-Day CVE Vulnerability Remediation</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Automated Staging Pipeline Testing</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> <strong>1-Hour Guaranteed Emergency SLA</strong></li>
                </ul>
              </div>
              <Button className="w-full mt-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-black shadow-lg shadow-blue-500/25" asChild>
                <Link href="/book-call">Choose Professional SLA</Link>
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mission Critical</span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Enterprise Pod</h3>
                <p className="text-xs text-slate-500 mt-2">High-traffic platforms, fintech, healthcare & multi-tenant SaaS.</p>
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">$899</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <ul className="text-xs space-y-3 text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <li className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Check className="w-4 h-4 text-blue-600" /> Everything in Professional SLA</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> <strong>10 Hours</strong> Senior Dev Support Included</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Dedicated DevOps & Cloud Architect Pod</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> PostgreSQL Query & Index Performance Tuning</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> <strong>Under 15-Minute Critical Incident SLA</strong></li>
                </ul>
              </div>
              <Button variant="outline" className="w-full mt-8 rounded-xl border-slate-300 dark:border-slate-700 font-bold" asChild>
                <Link href="/book-call">Contact Engineering</Link>
              </Button>
            </div>
          </div>

          {/* Cost Comparison vs Hiring In-House */}
          <div className="p-8 md:p-10 rounded-3xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
              Website Maintenance Cost Comparison: In-House vs. Freelancers vs. AJPR World
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-8">
              Why leading companies outsource website maintenance services to a dedicated engineering pod instead of hiring expensive full-time staff.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
                    <th className="py-3 px-4 font-bold">Model</th>
                    <th className="py-3 px-4 font-bold">Average Monthly Cost</th>
                    <th className="py-3 px-4 font-bold">Response Time</th>
                    <th className="py-3 px-4 font-bold">Reliability & Code Quality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Full-Time In-House Engineer</td>
                    <td className="py-4 px-4 font-mono font-bold">$7,500 – $12,000 / mo + Benefits</td>
                    <td className="py-4 px-4">Business hours only</td>
                    <td className="py-4 px-4">High, but high overhead and single point of failure</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Ad-Hoc Freelancer</td>
                    <td className="py-4 px-4 font-mono font-bold">$75 – $150 / hr ($1,000+ per outage)</td>
                    <td className="py-4 px-4">Unpredictable (12–48 hours)</td>
                    <td className="py-4 px-4">Variable; no staging testing or proactive patching</td>
                  </tr>
                  <tr className="bg-blue-50/50 dark:bg-blue-950/30">
                    <td className="py-4 px-4 font-bold text-blue-600 dark:text-blue-400">AJPR World Dedicated Pod</td>
                    <td className="py-4 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">$149 – $899 / mo flat rate</td>
                    <td className="py-4 px-4 font-bold text-blue-600 dark:text-blue-400">&lt; 15 min to 1 hour SLA (24/7)</td>
                    <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Senior engineering pod, staging QA, daily backups</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Emergency & Security Hubs */}
      <div className="container mx-auto px-4 max-w-5xl pt-16">
        <TopicalClusterWidget
          currentSiloTitle="Security Engineering & High-Availability Infrastructure Hub"
          pillarHref="/services/website-security-maintenance"
          pillarAnchor="Enterprise Website Maintenance Services & Cost Guide"
          relatedLinks={[
            {
              badge: "Cost Breakdown",
              title: "Website Maintenance Cost (2026 Guide)",
              href: "/services/website-maintenance-cost",
              description: "In-depth guide to budgeting website maintenance costs across custom Next.js and web platforms."
            },
            {
              badge: "Web Dev Agency",
              title: "Full-Stack Web Dev Agency Services",
              href: "/services/web-development",
              description: "Custom web applications, MVP engineering, and performance development in 14-30 day sprints."
            },
            {
              badge: "Free Diagnostic",
              title: "Free Security & Speed Audit",
              href: "/free-audit",
              description: "Audit SSL certificates, security headers, malware risks, and Core Web Vitals in 60s."
            }
          ]}
        />
      </div>

      {/* FAQ Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            Clear Answers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Website Maintenance Services & Cost FAQs
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Frequently asked questions regarding website maintenance pricing, contracts, and service scopes.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Conversion Box */}
      <section className="container mx-auto px-4 max-w-4xl pt-6">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white border border-slate-800 shadow-2xl text-center space-y-6">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1">
            Immediate Website Protection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Protect Your Web Application With Guaranteed Maintenance SLAs
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Stop worrying about midnight crashes, malware breaches, or expired certs. Secure your tech stack with a predictable monthly maintenance pod.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/book-call">Schedule 30-Min Strategy Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 font-semibold text-sm" asChild>
              <Link href="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
