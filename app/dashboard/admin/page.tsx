import { getClientRequests, getDevelopers, getUsers, getPayments, getContactSubmissions, getAllProjects, getSalesLeads } from '@/lib/db/queries'
import { Card, CardContent } from '@/components/ui/card'
import AdminClientRequestList from './_components/AdminClientRequestList'
import AdminDeveloperList from './_components/AdminDeveloperList'
import DashboardClient from './DashboardClient'
import { 
  FileText, Users, Database, 
  LayoutTemplate, Inbox, Globe, Activity,
  Zap, CreditCard, ArrowRight, DollarSign, Briefcase, TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default async function AdminDashboard() {
  const [requests, developers, allUsers, payments, submissions, projects, salesLeads] = await Promise.all([
    getClientRequests(),
    getDevelopers(),
    getUsers(),
    getPayments(),
    getContactSubmissions(),
    getAllProjects(),
    getSalesLeads()
  ])

  const clients = allUsers.filter((u: any) => u.role === 'client')
  
  // Calculate total revenue from completed payments
  const totalRevenue = payments
    .filter((p: any) => p.payment_status?.toLowerCase() === 'completed' || p.payment_status?.toLowerCase() === 'paid' || p.payment_status?.toLowerCase() === 'successful')
    .reduce((sum: number, p: any) => sum + parseFloat(p.amount || 0), 0)

  // Calculate active projects
  const activeProjects = projects.filter((p: any) => p.status !== 'Completed' && p.status !== 'Finished')

  // Combine inquiries for the request list
  const combinedInquiries = [
    ...requests.map((r: any) => ({ ...r, type: 'cart_request' })),
    ...submissions.map((s: any) => ({ ...s, type: 'contact_submission' }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Elite Stats for DashboardClient
  const closedLeads = salesLeads.filter((l: any) => l.status === 'closed').length;
  const qualifiedLeads = salesLeads.filter((l: any) => l.status === 'qualified').length;
  const estimatedPipeline = closedLeads * 5000 + qualifiedLeads * 1000; // rough estimates
  
  const sourcesMap = salesLeads.reduce((acc: any, lead: any) => {
    const s = lead.utm_source || 'direct';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  
  const sources = Object.entries(sourcesMap).map(([source, count]) => ({ source, count }));

  return (
    <div className="space-y-8 bg-black min-h-screen -m-6 p-6">
        
        <DashboardClient stats={{
          totalLeads: salesLeads.length,
          closedLeads,
          qualifiedLeads,
          estimatedPipeline,
          sources
        }} />

        {/* Master Control Grid */}
        <div>
            <h2 className="text-lg font-bold text-[#202124] dark:text-white mb-4">Command Center</h2>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <Link href="/dashboard/admin/growth" className="group">
                <Card className="h-full border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-blue-900 dark:text-blue-100">Growth Engine</span>
                </CardContent>
                </Card>
            </Link>

            <Link href="/dashboard/admin/payments" className="group">
                <Card className="h-full border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-900/10 hover:shadow-md hover:border-green-300 dark:hover:border-green-800 transition-all rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-600/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-bold text-green-900 dark:text-green-100">Transactions</span>
                </CardContent>
                </Card>
            </Link>

            <Link href="/dashboard/admin/services" className="group">
                <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-md transition-all rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E8F0FE] dark:bg-[#1A73E8]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Database className="w-6 h-6 text-[#1A73E8] dark:text-[#8AB4F8]" />
                    </div>
                    <span className="text-sm font-bold text-[#3C4043] dark:text-[#E8EAED]">Services Catalog</span>
                </CardContent>
                </Card>
            </Link>

            <Link href="/dashboard/admin/blog" className="group">
                <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-md transition-all rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FCE8E6] dark:bg-[#EA4335]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-[#EA4335] dark:text-[#F28B82]" />
                    </div>
                    <span className="text-sm font-bold text-[#3C4043] dark:text-[#E8EAED]">Blog CMS</span>
                </CardContent>
                </Card>
            </Link>

            <Link href="/dashboard/admin/seo" className="group">
                <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-md transition-all rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#F3E8FF] dark:bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-bold text-[#3C4043] dark:text-[#E8EAED]">SEO Core</span>
                </CardContent>
                </Card>
            </Link>

            <Link href="/dashboard/admin/seo-tracker" className="group">
                <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-md transition-all rounded-xl overflow-hidden">
                <CardContent className="p-5 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-bold text-[#3C4043] dark:text-[#E8EAED]">SEO Radar</span>
                </CardContent>
                </Card>
            </Link>
            </div>
        </div>


        {/* Live Feeds Section */}
        <div className="grid gap-6 md:grid-cols-2 items-start">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#202124] dark:text-white">Recent Transactions</h2>
                <Link href="/dashboard/admin/payments" className="text-sm text-[#1A73E8] hover:underline font-medium flex items-center">
                    View all <ArrowRight className="w-4 h-4 ml-1"/>
                </Link>
            </div>
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl overflow-hidden flex flex-col">
              {payments.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">No transactions yet.</div>
              ) : (
                  payments.slice(0, 5).map((payment: any, idx: number) => (
                      <div key={payment.id} className={`p-4 flex items-center justify-between ${idx !== 0 ? 'border-t border-[#DADCE0] dark:border-[#3C4043]' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}>
                          <div>
                              <p className="font-bold text-[#202124] dark:text-white text-sm">{payment.client_name}</p>
                              <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">{payment.client_email}</p>
                          </div>
                          <div className="text-right">
                              <p className="font-bold text-[#202124] dark:text-white">₹{parseFloat(payment.amount).toLocaleString()}</p>
                              <p className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded inline-block mt-1">{payment.payment_status}</p>
                          </div>
                      </div>
                  ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#202124] dark:text-white">Client Requests</h2>
                <Link href="/dashboard/admin/contact-submissions" className="text-sm text-[#1A73E8] hover:underline font-medium flex items-center">
                    View all <ArrowRight className="w-4 h-4 ml-1"/>
                </Link>
            </div>
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl overflow-hidden">
              <AdminClientRequestList requests={combinedInquiries} />
            </div>
          </div>

        </div>
    </div>
  )
}
