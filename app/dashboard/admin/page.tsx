import { getClientRequests, getDevelopers, getUsers } from '@/lib/db/queries'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AdminClientRequestList from './_components/AdminClientRequestList'
import AdminDeveloperList from './_components/AdminDeveloperList'
import { 
  FileText, Users, UserCog, Database, 
  LayoutTemplate, Inbox, Search, Bell, Settings 
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
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#202124] text-[#202124] dark:text-[#E8EAED] font-sans pb-12">
      
      {/* Top App Bar (Google Style) */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043]">
        <div className="flex items-center gap-4">
          <div className="text-xl font-medium tracking-tight text-[#5F6368] dark:text-[#E8EAED]">
            Admin <span className="text-[#202124] dark:text-white font-normal">Console</span>
          </div>
        </div>
        
        {/* Fake Search Bar to mimic Google Cloud */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 bg-[#F1F3F4] dark:bg-[#303134] rounded-md px-4 py-2 border border-transparent focus-within:border-[#1A73E8] focus-within:bg-white dark:focus-within:bg-[#202124] transition-all">
          <Search className="w-5 h-5 text-[#5F6368] dark:text-[#9AA0A6] mr-3" />
          <input 
            type="text" 
            placeholder="Search resources, services, and docs" 
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-[#5F6368] dark:placeholder:text-[#9AA0A6]"
          />
        </div>

        <div className="flex items-center gap-4 text-[#5F6368] dark:text-[#9AA0A6]">
          <Bell className="w-5 h-5 cursor-pointer hover:text-[#202124] dark:hover:text-white" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-[#202124] dark:hover:text-white" />
          <div className="w-8 h-8 rounded-full bg-[#1A73E8] text-white flex items-center justify-center font-medium text-sm ml-2">
            A
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">Dashboard overview</h1>
          <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Monitor your platform activity and manage resources.</p>
        </div>

        {/* Quick Access (Google Cloud "Shortcuts" Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  )
}
