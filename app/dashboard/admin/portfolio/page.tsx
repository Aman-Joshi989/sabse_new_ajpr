import { getPortfolioItems } from '@/lib/db/queries'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import PortfolioAdminClient from './_components/PortfolioAdminClient'
import Link from 'next/link'

export const dynamic = 'force-dynamic';

export default async function AdminPortfolio() {
    const projects = await getPortfolioItems();

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Manage Portfolio</h1>
                <Button asChild>
                    <Link href="/dashboard/admin/portfolio/new">
                        <Plus className="w-4 h-4 mr-2" /> Add Project
                    </Link>
                </Button>
            </div>

            <PortfolioAdminClient initialProjects={projects} />
        </div>
    )
}
