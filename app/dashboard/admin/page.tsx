import { getClientRequests, getDevelopers, getUsers } from '@/lib/db/queries'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AdminClientRequestList from './_components/AdminClientRequestList'
import AdminDeveloperList from './_components/AdminDeveloperList'
import { 
  FileText, Users, UserCog, Database, 
  LayoutTemplate, Inbox, Search, Bell, Settings, Globe, Activity
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const requests = await getClientRequests()
  const developers = await getDevelopers()
  const allUsers = await getUsers()

  const clients = allUsers.filter((u: any) => u.role === 'client')

  // Google Colors
  // Blue: #1A73E8
  // Red: #EA4335
  // Yellow: #FBBC04
  // Green: #34A853

  return (
    <div className="space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">Dashboard overview</h1>
          <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Monitor your platform activity and manage resources.</p>
        </div>

        {/* Quick Access (Google Cloud "Shortcuts" Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Link href="/dashboard/admin/services" className="group">
            <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-sm transition-all rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F0FE] dark:bg-[#1A73E8]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5 text-[#1A73E8] dark:text-[#8AB4F8]" />
                </div>
                <span className="text-sm font-medium text-[#3C4043] dark:text-[#E8EAED]">Manage Services</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/admin/blog" className="group">
            <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-sm transition-all rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FCE8E6] dark:bg-[#EA4335]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-[#EA4335] dark:text-[#F28B82]" />
                </div>
                <span className="text-sm font-medium text-[#3C4043] dark:text-[#E8EAED]">Manage Blog</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/admin/portfolio" className="group">
            <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-sm transition-all rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F4EA] dark:bg-[#34A853]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="w-5 h-5 text-[#34A853] dark:text-[#81C995]" />
                </div>
                <span className="text-sm font-medium text-[#3C4043] dark:text-[#E8EAED]">Portfolio Items</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/admin/contact-submissions" className="group">
            <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-sm transition-all rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF7E0] dark:bg-[#FBBC04]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Inbox className="w-5 h-5 text-[#F9AB00] dark:text-[#FDE293]" />
                </div>
                <span className="text-sm font-medium text-[#3C4043] dark:text-[#E8EAED]">Contact Inbox</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/admin/seo" className="group">
            <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-sm transition-all rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F3E8FF] dark:bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-sm font-medium text-[#3C4043] dark:text-[#E8EAED]">SEO & Geo Settings</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/admin/seo-tracker" className="group">
            <Card className="h-full border border-[#DADCE0] dark:border-[#3C4043] shadow-none bg-white dark:bg-[#292A2D] hover:shadow-sm transition-all rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-[#3C4043] dark:text-[#E8EAED]">SEO & GEO Tracker</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Metrics Section (Google style summary cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-5 flex flex-col">
            <span className="text-sm font-medium text-[#5F6368] dark:text-[#9AA0A6] mb-4 uppercase tracking-wider">Pending Requests</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-normal text-[#202124] dark:text-white">{requests.length}</span>
              <span className="text-sm text-[#1A73E8]">actions required</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-5 flex flex-col">
            <span className="text-sm font-medium text-[#5F6368] dark:text-[#9AA0A6] mb-4 uppercase tracking-wider">Active Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-normal text-[#202124] dark:text-white">{clients.length}</span>
              <span className="text-sm text-[#34A853]">registered</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg p-5 flex flex-col">
            <span className="text-sm font-medium text-[#5F6368] dark:text-[#9AA0A6] mb-4 uppercase tracking-wider">Developers</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-normal text-[#202124] dark:text-white">{developers.length}</span>
              <span className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">onboarded</span>
            </div>
          </div>
        </div>

        {/* Lists Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-medium text-[#202124] dark:text-white">Client Requests</h2>
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg overflow-hidden">
              <AdminClientRequestList requests={requests} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-[#202124] dark:text-white">Developers</h2>
            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg overflow-hidden">
              <AdminDeveloperList developers={developers} clients={clients} />
            </div>
          </div>

        </div>
    </div>
  )
}
