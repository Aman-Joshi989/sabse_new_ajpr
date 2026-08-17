import { getGlossaryTerms } from '@/lib/db/queries'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60; // Cache for 60 seconds (ISR)

export const metadata: Metadata = {
  title: 'Startup AI & Technology Glossary | AJPR World',
  description: 'Comprehensive glossary and dictionary of artificial intelligence, software development, and B2B SaaS startup terminology. Learn industry standards.',
  openGraph: {
    title: 'Tech & AI Glossary | AJPR World',
    description: 'Explore our comprehensive glossary of AI and startup terms.',
    url: 'https://ajprworld.com/glossary',
    siteName: 'AJPR World',
    locale: 'en_US',
    type: 'website',
            images: [
                {
                    url: 'https://ajprworld.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'AJPR World',
                }
            ],
  },
}

export default async function GlossaryIndexPage() {
  const terms = await getGlossaryTerms() || []

  // Group terms by first letter
  const groupedTerms = terms.reduce((acc: any, term: any) => {
    const firstLetter = term.term.charAt(0).toUpperCase()
    if (!acc[firstLetter]) acc[firstLetter] = []
    acc[firstLetter].push(term)
    return acc
  }, {})

  const sortedLetters = Object.keys(groupedTerms).sort()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
            Tech & AI Glossary
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive dictionary defining the modern stack: Artificial Intelligence, Serverless Architecture, Programmatic SEO, and Startup Growth strategies.
          </p>
        </header>

        <div className="space-y-12">
          {sortedLetters.length === 0 ? (
            <div className="text-center text-slate-500 py-12">Building the glossary... Check back soon.</div>
          ) : (
            sortedLetters.map(letter => (
              <section key={letter} className="scroll-mt-24" id={letter}>
                <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-2">{letter}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedTerms[letter].map((term: any) => (
                    <Link 
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="group flex items-center p-4 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:bg-slate-800 hover:border-slate-700 transition-all duration-300"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                          {term.term}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
