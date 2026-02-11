import { getClientRequests, getDevelopers, getUsers } from '@/lib/db/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import AdminClientRequestList from './_components/AdminClientRequestList'
import AdminDeveloperList from './_components/AdminDeveloperList'
import { FileText, Users, UserCog } from 'lucide-react'

export default async function AdminDashboard() {
  const requests = await getClientRequests()
  const developers = await getDevelopers()
  const allUsers = await getUsers()

  const clients = allUsers.filter((u: any) => u.role === 'client')

  return (
    <div className="p-8 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Admin Dashboard</h1>
         <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white rounded-full text-sm font-medium shadow-sm">
                <FileText className="w-4 h-4" />
                {requests.length} New Requests
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] text-white rounded-full text-sm font-medium shadow-sm">
                <Users className="w-4 h-4" />
                {clients.length} Clients
            </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white rounded-full text-sm font-medium shadow-sm">
                <UserCog className="w-4 h-4" />
                {developers.length} Developers
            </div>
         </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-200">New Client Requests</h2>
            <AdminClientRequestList requests={requests} />
        </div>

        <div className="space-y-4">
           <h2 className="text-xl font-bold text-slate-900 dark:text-slate-200">Developer Management</h2>
           <AdminDeveloperList developers={developers} clients={clients} />
        </div>
      </div>
    </div>
  )
}
