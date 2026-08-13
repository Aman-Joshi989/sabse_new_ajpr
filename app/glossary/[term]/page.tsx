import { getGlossaryTermBySlug, getGlossaryTerms } from '@/lib/db/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react'

export const revalidate = 60; // ISR Caching

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term: termSlug } = await params
  const termData = await getGlossaryTermBySlug(termSlug)
  
  if (!termData) return {
    alternates: { canonical: `/glossary/${term}` }, title: 'Term Not Found' }

  // Ensure title is < 60 chars for SEO
  const baseTitle = `What is ${termData.term}?`
  const title = baseTitle.length + 7 <= 60 ? `${baseTitle} | AJPR` : baseTitle

  return {
    title,
    description: termData.definition,
    openGraph: {
      title,
      description: termData.definition,
      url: `https://ajprworld.com/glossary/${termSlug}`,
      siteName: 'AJPR World',
      type: 'article',
    }
  }
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ term: string }> }) {
  const { term: termSlug } = await params
  const termData = await getGlossaryTermBySlug(termSlug)
  
  if (!termData) notFound()

  // Generate DefinedTerm schema for Google Featured Snippets
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": termData.term,
    "description": termData.definition,
    "inDefinedTermSet": "https://ajprworld.com/glossary"
  }

  // Fetch a few random terms for "Keep Reading"
  const allTerms = await getGlossaryTerms() || []
  const otherTerms = allTerms.filter((t: any) => t.slug !== termSlug).slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
          <Link href="/glossary" className="hover:text-blue-400 transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Glossary Index
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-300">{termData.term}</span>
        </nav>

        <article className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-10 mb-12 shadow-xl shadow-black/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {termData.term}
            </h1>
          </div>

          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-a:text-blue-400 hover:prose-a:text-blue-300">
            <p className="text-xl text-slate-300 font-medium leading-relaxed border-l-4 border-blue-500 pl-4 mb-8">
              {termData.definition}
            </p>
            
            {/* Render Markdown Explanation */}
            <div dangerouslySetInnerHTML={{ 
              __html: termData.detailed_explanation
                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6 border-b border-slate-800 pb-2">$1</h2>')
                .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 my-6 text-slate-300 italic">$1</blockquote>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\n/gi, "<br />")
            }} />
          </div>
        </article>

        {/* SEO Silo: Link to Services */}
        <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-800/30 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Leverage {termData.term} in Your Startup</h3>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            AJPR World specializes in implementing advanced technologies like {termData.term} for fast-growing startups and enterprises.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/book-call" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-full transition-colors w-full sm:w-auto">
              Book a Strategy Call
            </Link>
            <Link href="/services" className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-full transition-colors w-full sm:w-auto border border-slate-700">
              View Our Services
            </Link>
          </div>
        </div>

        {/* Keep Reading */}
        {otherTerms.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-800 pb-2">Keep Exploring</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherTerms.map((t: any) => (
                <Link 
                  key={t.slug}
                  href={`/glossary/${t.slug}`}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors"
                >
                  <h4 className="font-medium text-slate-200 group-hover:text-blue-400 truncate">{t.term}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
