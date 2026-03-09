import { getContactSubmissions } from '@/lib/db/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Mail, Phone, Calendar, User } from 'lucide-react'

export default async function ContactSubmissionsPage() {
    const submissions = await getContactSubmissions()

    return (
        <div className="p-8 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Contact Submissions</h1>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-sm">
                    <Mail className="w-4 h-4" />
                    {submissions.length} Total Submissions
                </div>
            </div>

            <div className="grid gap-6">
                {submissions.length === 0 ? (
                    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <CardContent className="h-40 flex items-center justify-center text-slate-500">
                            No new contact submissions found.
                        </CardContent>
                    </Card>
                ) : (
                    submissions.map((sub: any) => (
                        <Card key={sub.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-colors">
                            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                            <User className="w-4 h-4 text-slate-500" />
                                            {sub.name}
                                        </CardTitle>
                                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-3.5 h-3.5" />
                                                <a href={`mailto:${sub.email}`} className="hover:text-blue-500 transition-colors">{sub.email}</a>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(sub.created_at).toLocaleString()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-800 text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap leading-relaxed">
                                    {sub.message}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
