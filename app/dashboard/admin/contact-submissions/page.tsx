import { getContactSubmissions } from '@/lib/db/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Calendar, User, Globe, AlertTriangle, Briefcase, ExternalLink } from 'lucide-react'

export default async function ContactSubmissionsPage() {
    const submissions = await getContactSubmissions()

    // Helper for budget range color coding
    const getBudgetBadgeStyles = (range: string) => {
        if (!range) return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        if (range.includes('25L+')) {
            return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30';
        }
        if (range.includes('10L - 25L') || range.includes('25L')) {
            return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30';
        }
        if (range.includes('3L - 10L')) {
            return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30';
        }
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">Contact Submissions</h1>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Review granular inbound inquiries and selective partnership applications.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-500 transition-colors">
                    <Mail className="w-4 h-4" />
                    {submissions.length} Total Submissions
                </div>
            </div>

            <div className="grid gap-8">
                {submissions.length === 0 ? (
                    <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none">
                        <CardContent className="h-48 flex flex-col items-center justify-center text-slate-500 gap-2">
                            <Briefcase className="w-8 h-8 text-slate-400 opacity-60" />
                            <span className="font-medium text-sm">No new selective partnership applications found.</span>
                        </CardContent>
                    </Card>
                ) : (
                    submissions.map((sub: any) => {
                        // Check if it is a new granular submission or a legacy fallback message
                        const isGranular = !!(sub.company_name || sub.building_text || sub.blockers_text);

                        return (
                            <Card key={sub.id} className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden">
                                <CardHeader className="pb-4 bg-slate-50/50 dark:bg-[#2F3033]/30 border-b border-[#DADCE0] dark:border-[#3C4043] p-6">
                                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                                        
                                        {/* User & Company Information */}
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                                                    {sub.name}
                                                </CardTitle>
                                                {sub.company_name && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                        {sub.company_name}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                                <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                                    <Mail className="w-4 h-4 text-slate-400" />
                                                    <a href={`mailto:${sub.email}`}>{sub.email}</a>
                                                </span>
                                                
                                                {sub.phone && (
                                                    <span className="flex items-center gap-1.5">
                                                        <Phone className="w-4 h-4 text-slate-400" />
                                                        <a href={`tel:${sub.phone}`} className="hover:text-blue-500 transition-colors">{sub.phone}</a>
                                                    </span>
                                                )}

                                                {sub.website_url && (
                                                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline">
                                                        <Globe className="w-4 h-4" />
                                                        <a href={sub.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                            {sub.website_url.replace(/https?:\/\/(www\.)?/, '')}
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status / Financial Badges & Timestamp */}
                                        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-100 dark:bg-[#3C4043] px-3 py-1.5 rounded border border-[#DADCE0] dark:border-[#4C5053]">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(sub.created_at).toLocaleString()}
                                            </div>

                                            {isGranular && (
                                                <div className="flex flex-wrap gap-2">
                                                    {sub.budget_range && (
                                                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${getBudgetBadgeStyles(sub.budget_range)}`}>
                                                            Budget: {sub.budget_range}
                                                        </span>
                                                    )}
                                                    {sub.monthly_revenue && (
                                                        <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                                                            Rev: {sub.monthly_revenue}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 space-y-6">
                                    {isGranular ? (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {/* What are they building Section */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                    Vision / What They Are Building
                                                </h3>
                                                <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 p-5 rounded-lg text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                                                    {sub.building_text}
                                                </div>
                                            </div>

                                            {/* Growth Blockers Section */}
                                            <div className="space-y-2">
                                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                                                    Critical Growth Blockers
                                                </h3>
                                                <div className="bg-rose-50/30 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 p-5 rounded-lg text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                                                    {sub.blockers_text}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Legacy Fallback message format */
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                Submission Message
                                            </h3>
                                            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-100 dark:border-slate-800 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">
                                                {sub.message}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    )
}
