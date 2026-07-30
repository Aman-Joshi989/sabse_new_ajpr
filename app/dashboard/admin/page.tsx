import { getClientRequests, getDevelopers, getUsers, getPayments, getContactSubmissions, getAllProjects } from '@/lib/db/queries'
import { Card, CardContent } from '@/components/ui/card'
import AdminClientRequestList from './_components/AdminClientRequestList'
import AdminDeveloperList from './_components/AdminDeveloperList'
import { 
  FileText, Users, Database, 
  LayoutTemplate, Inbox, Globe, Activity,
  Zap, CreditCard, ArrowRight, DollarSign, Briefcase, TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default async function AdminDashboard() {
  const [requests, developers, allUsers, payments, submissions, projects] = await Promise.all([
    getClientRequests(),
    getDevelopers(),
    getUsers(),
    getPayments(),
    getContactSubmissions(),
    getAllProjects()
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

  return (
    <div className="space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[#202124] dark:text-white tracking-tight mb-2">Master Control Room</h1>
            <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Real-time command center for marketing, sales, and operations.</p>
          </div>
          <Link href="/dashboard/admin/growth">
            <button className="flex items-center gap-2 bg-[#1A73E8] hover:bg-[#1557b0] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Zap className="w-4 h-4" />
                Launch Growth Engine
            </button>
          </Link>
        </div>

        {/* Financial & Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">Total Revenue</span>
                <div className="p-2 bg-green-50 dark:bg-green-500/20 rounded-lg text-green-600 dark:text-green-400"><DollarSign className="w-5 h-5"/></div>
            </div>
            <span className="text-4xl font-black text-[#202124] dark:text-white">₹{totalRevenue.toLocaleString()}</span>
            <span className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> {payments.length} transactions</span>
          </div>

          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">Active Projects</span>
                <div className="p-2 bg-blue-50 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400"><Briefcase className="w-5 h-5"/></div>
            </div>
            <span className="text-4xl font-black text-[#202124] dark:text-white">{activeProjects.length}</span>
            <span className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">In progress</span>
          </div>
          
          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">Client Inquiries</span>
                <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400"><Inbox className="w-5 h-5"/></div>
            </div>
            <span className="text-4xl font-black text-[#202124] dark:text-white">{submissions.length + requests.length}</span>
            <span className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">Action required</span>
          </div>

          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">Total Clients</span>
                <div className="p-2 bg-purple-50 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400"><Users className="w-5 h-5"/></div>
            </div>
            <span className="text-4xl font-black text-[#202124] dark:text-white">{clients.length}</span>
            <span className="text-xs text-purple-600 font-medium mt-2 flex items-center gap-1">Registered</span>
          </div>
        </div>

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
