import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone,
  Cpu, Database, Code2, ShieldAlert, Award, FileText, CheckCircle2,
  Briefcase, GraduationCap, Sparkles, Zap, ShieldCheck
} from 'lucide-react'
import { getPortfolioItems, getSiteSettings } from '@/lib/db/queries'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Aman Joshi - Systems Architect, Full-Stack Developer & Founder',
    description: 'Aman Joshi is a systems architect, full-stack engineer, and founder of AJPR World. Alumnus of IIT Guwahati in Data Science, specializing in scalable automation and backend infrastructure.',
    alternates: {
      canonical: 'https://ajprworld.com/aman-joshi',
    }
  }
}

export default async function AmanJoshiPage() {
  let projects: any[] = []
  let settings: any = null
  try {
    const [fetchedProjects, fetchedSettings] = await Promise.all([
      getPortfolioItems(),
      getSiteSettings()
    ])
    projects = fetchedProjects || []
    settings = fetchedSettings || null
  } catch (e) {
    console.error("Failed to load projects/settings for Aman Joshi profile:", e)
  }

  const contactEmail = settings?.contact_email || 'amanjoshi254@gmail.com'
  const contactPhone = settings?.contact_phone || '+91 9997205257'
  const founderName = settings?.founder_name || 'Aman Joshi'
  const founderTitle = settings?.founder_title || 'Founder & Systems Architect'

  // Schema for Aman Joshi
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: founderName,
    image: 'https://ajprworld.com/images/aman-joshi.jpg',
    url: 'https://ajprworld.com/aman-joshi',
    jobTitle: founderTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Haldwani',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN'
    },
    email: contactEmail,
    telephone: contactPhone,
    worksFor: {
      '@type': 'Organization',
      name: 'AJPR World',
      url: 'https://ajprworld.com'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Indian Institute of Technology, Guwahati'
    },
    description: 'Aman Joshi is a systems architect and founder of AJPR World, specializing in enterprise automation, backend scalability, and AI-driven data pipelines.',
    sameAs: [
      'https://www.linkedin.com/in/aman-joshi-/',
      'https://github.com/Aman-Joshi989'
    ]
  }

  const accomplishments = [
    { value: "10M+", label: "Monthly API Calls Processed" },
    { value: "60-70%", label: "Operational Cost Reduction via Automation" },
    { value: "$50M+", label: "Aggregate Operational Savings Delivered" },
    { value: "99.9%", label: "System Uptime Maintained" }
  ]

  const experiences = [
    {
      role: "Software Engineer / Founder",
      company: "AJPR World",
      period: "June 2025 - Present",
      bullets: [
        "Architect and lead enterprise automation solutions driving measurable ROI for B2B companies ($5M-$500M+).",
        "Design distributed backend systems handling 100K+ API transactions daily.",
        "Orchestrate real-time data pipelines to eliminate manual workflows and optimize cloud infrastructure."
      ]
    },
    {
      role: "Software Engineer",
      company: "Outlier",
      period: "October 2024 - June 2025",
      location: "San Francisco, US (Remote)",
      bullets: [
        "Collaborated on complex backend logic, scaling web applications, and model pipeline optimization.",
        "Refactored codebases for maximum performance and reduced memory footprints."
      ]
    },
    {
      role: "Virtual Experience Intern",
      company: "JPMorgan Chase",
      period: "June 2024 - July 2024",
      bullets: [
        "Configured local developer environments and resolved broken system dependency files.",
        "Utilized JP Morgan's open-source Perspective tool to build real-time financial tracking graphs."
      ]
    },
    {
      role: "Web Development Intern",
      company: "Tula's Institute (CIRE)",
      period: "September 2023 - February 2024",
      bullets: [
        "Developed responsive web layouts to enhance end-user usability and conversion interfaces.",
        "Collaborated with cross-functional teams to debug, troubleshoot, and deploy web features."
      ]
    }
  ]

  const educations = [
    {
      institution: "Indian Institute of Technology, Guwahati",
      degree: "Data Science Specialization",
      period: "Completed May 2025"
    },
    {
      institution: "Kumaun University",
      degree: "Bachelor of Computer Applications (BCA) - Computer Science",
      period: "November 2020 - November 2023"
    }
  ]

  const skills = [
    { category: "Backend", items: ["Python", "Django", "Flask", "FastAPI", "REST APIs", "Microservices"] },
    { category: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "JavaScript", "Tailwind CSS"] },
    { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
    { category: "DevOps & Cloud", items: ["AWS", "Docker", "Git", "CI/CD Pipelines", "SOC 2 Protocols"] }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="w-[80%] mx-auto min-h-screen pt-32 pb-24">
        
        {/* Profile Card Header */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-16 shadow-xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="space-y-6 text-center lg:text-left">
              <Badge className="bg-blue-600 text-white border-none font-black tracking-widest px-4 py-1.5 uppercase text-xs">
                {founderTitle}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.05]">
                {founderName}
              </h1>
              <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                Specializing in Enterprise Automation & High-Concurrency Systems
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-500 font-medium">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-blue-500" /> Haldwani, Uttarakhand, India</span>
                <span className="flex items-center"><Mail className="w-4 h-4 mr-2 text-blue-500" /> {contactEmail}</span>
                <span className="flex items-center"><Phone className="w-4 h-4 mr-2 text-blue-500" /> {contactPhone}</span>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <Button size="lg" className="rounded-full bg-blue-600 text-white hover:bg-blue-500 font-bold" asChild>
                  <Link href="/contact">Book Strategy Session</Link>
                </Button>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/aman-joshi-/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </a>
                  <a href="https://github.com/Aman-Joshi989" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-56 h-56 md:w-64 md:h-64 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 p-1 flex items-center justify-center shadow-2xl shrink-0 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#0B0F19] m-0.5 rounded-[1.9rem] flex items-center justify-center overflow-hidden">
                <Image 
                  src="/images/aman-joshi.jpg" 
                  alt="Aman Joshi" 
                  width={256} 
                  height={256} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {accomplishments.map((metric, idx) => (
              <Card key={idx} className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-500 mb-2">{metric.value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Grid */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            Technical Stack Command
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <Badge key={sIdx} variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 font-semibold py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section className="grid lg:grid-cols-12 gap-16 mb-24">
          
          {/* Experience */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" /> Professional Experience
            </h2>
            <div className="relative border-l border-slate-200 dark:border-slate-850 pl-6 ml-3 space-y-12">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-50 dark:border-[#030712]" />
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <span className="text-sm text-slate-500 font-semibold">{exp.period}</span>
                    </div>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{exp.company} {exp.location && `· ${exp.location}`}</p>
                    <ul className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-500" /> Education
              </h2>
              <div className="space-y-6">
                {educations.map((edu, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-bold text-slate-900 dark:text-white leading-snug">{edu.institution}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{edu.degree}</p>
                    <p className="text-xs text-slate-500 font-medium">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" /> Certifications
              </h2>
              <ul className="space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> AWS Certified Cloud Practitioner</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> J.P. Morgan Software Engineering Simulation</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> JavaScript Algorithms and Data Structures</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Data Visualization Specialization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Selected Portfolio */}
        {projects && projects.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              Featured Infrastructure Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project: any) => (
                <div key={project.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <Badge variant="outline" className="mb-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-none">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-6">
                      {project.description}
                    </p>
                  </div>
                  <Button variant="link" className="p-0 text-blue-600 dark:text-blue-400 font-bold self-start" asChild>
                    <Link href="/portfolio">
                      View Architecture details <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
