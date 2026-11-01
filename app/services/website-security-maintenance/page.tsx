import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Activity, RefreshCw, AlertTriangle, ArrowRight, CheckCircle2, Zap, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceSchema } from '@/components/schema/ServiceSchema';
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';
import { FAQSchema } from '@/components/schema/FAQSchema';

export const revalidate = 86400;

export const metadata: Metadata = {
  metadataBase: new URL('https://ajprworld.com'),
  title: 'Website Security & Maintenance Services | 24/7 Monitoring & SLA | AJPR World',
  description: 'Enterprise website maintenance and proactive security engineering: zero-day vulnerability patching, 24/7 uptime monitoring, automated encrypted backups, and DDoS mitigation.',
  alternates: {
    canonical: 'https://ajprworld.com/services/website-security-maintenance',
  },
  openGraph: {
    title: 'Website Security & Maintenance Services | 24/7 Monitoring & SLA | AJPR World',
    description: 'Enterprise website maintenance and proactive security engineering: zero-day vulnerability patching, 24/7 uptime monitoring, automated encrypted backups, and DDoS mitigation.',
    url: 'https://ajprworld.com/services/website-security-maintenance',
    siteName: 'AJPR World',
    type: 'website',
    images: [
      {
        url: 'https://ajprworld.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Website Security & Maintenance - AJPR World',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Security & Maintenance Services | AJPR World',
    description: '24/7 uptime monitoring, zero-day patching, automated backups, and guaranteed SLAs for web applications.',
    images: ['https://ajprworld.com/og-image.jpg'],
    creator: '@ajprworld',
    site: '@ajprworld',
  },
};

const faqs = [
  {
    question: 'What is included in AJPR World’s Website Security & Maintenance service?',
    answer: 'Our service includes 24/7 automated uptime and latency monitoring, dependency vulnerability patching, SSL/TLS certificate lifecycle management, automated daily encrypted backups with tested rollbacks, web application firewall (WAF) rule tuning, and guaranteed SLA incident response.'
  },
  {
    question: 'How quickly do you respond when a critical security incident or downtime occurs?',
    answer: 'Our dedicated incident response pods operate with a guaranteed under-15-minute response SLA for critical outages and P0 security vulnerabilities, backed by automated health checks across 12 worldwide server nodes.'
  },
  {
    question: 'Do you support custom Next.js, Node.js, and cloud backends?',
    answer: 'Yes. Unlike typical agencies that only handle basic WordPress sites, our engineering team specializes in headless Next.js applications, serverless functions, PostgreSQL databases (Neon, Supabase, RDS), Docker containers, and Cloudflare enterprise edge caching.'
  },
  {
    question: 'How do you prevent breaking production during dependency and security updates?',
    answer: 'All security updates, package updates, and patches undergo automated end-to-end integration tests in an isolated staging environment before being deployed through blue-green zero-downtime pipelines.'
  }
];

export default function WebsiteSecurityMaintenancePage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://ajprworld.com' },
    { name: 'Services', item: 'https://ajprworld.com/services' },
    { name: 'Website Security & Maintenance', item: 'https://ajprworld.com/services/website-security-maintenance' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ServiceSchema
        name="Website Security & Maintenance Services"
        description="Comprehensive 24/7 website security hardening, zero-day patch management, automated encrypted backups, Core Web Vitals tuning, and guaranteed SLA incident recovery."
        providerName="AJPR World"
        url="https://ajprworld.com/services/website-security-maintenance"
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden text-white border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full">
            Zero-Downtime Reliability & Defense
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Enterprise Website Security <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              & Proactive Maintenance Pod
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Eliminate server vulnerabilities, surprise outages, and sluggish load times. We monitor, patch, backup, and defend your web infrastructure 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/book-call">Schedule Security Audit</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 font-semibold text-sm" asChild>
              <Link href="/pricing">View Maintenance Sprints</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Defense Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              What’s Included in Your Engineering Security SLA
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
              Proactive protection and performance engineering designed specifically for production web systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">24/7 Real-Time Monitoring</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Global synthetic ping and transaction monitors run every 60 seconds across 12 worldwide edge nodes, instantly alerting our on-call engineers.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Latency & SSL degradation tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> DNS & edge cache health checks</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Zero-Day Patch Management</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We proactively audit npm, Docker, and system dependencies for CVE alerts, patching security holes before malicious exploits can probe your surface.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Isolated staging regression tests</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Continuous vulnerability scanning</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Encrypted Automated Backups</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily automated snapshots of your databases, media assets, and codebase stored across redundant cloud storage tiers with one-click restore tests.
              </p>
              <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300 pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Point-in-time recovery capabilities</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Off-site geo-redundant storage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Conversion Box */}
      <section className="container mx-auto px-4 max-w-4xl pt-6">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl text-center space-y-6">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1">
            Immediate Security Coverage
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Protect Your Web Application With Dedicated Senior Engineers
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Stop worrying about midnight crashes, malware breaches, or expired certs. Secure your tech stack with a fixed monthly pod.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30" asChild>
              <Link href="/book-call">Book Strategy Call</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 font-semibold text-sm" asChild>
              <Link href="/pricing">Explore Pricing & Sprints</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

