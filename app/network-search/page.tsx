'use client';

import React, { useState } from 'react';
import { Search, MapPin, Building, Briefcase, Mail, Linkedin, Clock } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
    name: string;
    email: string;
    company: string;
    job_title: string;
    linkedin_url: string;
    summary: string;
    interaction: string;
    source: string;
    similarity: number;
}

export default function NetworkSearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setError('');

        try {
            const res = await fetch('/api/network-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            if (!res.ok) throw new Error('Search failed');

            const data = await res.json();
            setResults(data.results);
        } catch (err: any) {
            setError(err.message || 'An error occurred during search.');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Relationship Intelligence
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Search your network using natural language. We analyze your Gmail and LinkedIn history to find the perfect warm intro.
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. Find someone I know who works at a healthcare startup..."
                        className="w-full pl-14 pr-32 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSearching || !query.trim()}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 transition-all"
                    >
                        {isSearching ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {/* Error */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50">
                        {error}
                    </div>
                )}

                {/* Results */}
                <div className="space-y-6">
                    {results.map((result, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        {result.name}
                                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                            Warm Connection
                                        </span>
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={16} /> {result.job_title}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Building size={16} /> {result.company}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={"mailto:" + result.email} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Mail size={20} />
                                    </Link>
                                    <Link href={result.linkedin_url || '#'} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Linkedin size={20} />
                                    </Link>
                                </div>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 mb-6">
                                {result.summary}
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
                                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2 mb-2">
                                    <Clock size={16} /> How you know them
                                </h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200/80">
                                    {result.interaction}
                                </p>
                                <p className="text-xs text-blue-600/70 dark:text-blue-400/50 mt-2 capitalize font-medium">
                                    Source: {result.source}
                                </p>
                            </div>

                        </div>
                    ))}

                    {results.length === 0 && !isSearching && query && !error && (
                        <div className="text-center py-12 text-slate-500">
                            No connections found in your network for this query.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
