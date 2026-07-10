import { getAllServices } from '@/lib/db/queries'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Tag, Package, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function getServiceGradient(gradient: string) {
    const map: Record<string, string> = {
        'from-violet-500 to-indigo-600': 'from-violet-500 to-indigo-600',
        'from-blue-500 to-cyan-500': 'from-blue-500 to-cyan-500',
        'from-blue-400 to-indigo-500': 'from-blue-400 to-indigo-500',
        'from-blue-600 to-indigo-800': 'from-blue-600 to-indigo-800',
        'from-purple-600 to-blue-600': 'from-purple-600 to-blue-600',
        'from-green-500 to-emerald-500': 'from-green-500 to-emerald-500',
        'from-purple-500 to-pink-500': 'from-purple-500 to-pink-500',
        'from-orange-500 to-red-500': 'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500': 'from-indigo-500 to-purple-500',
        'from-red-500 to-pink-500': 'from-red-500 to-pink-500'
    };
    return map[gradient] || 'from-slate-500 to-slate-800';
}

export default async function AdminServicesPage() {
    const services = await getAllServices()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">Manage Services / Products</h1>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Manage your catalog, SKUs, and pricing.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/admin/services/create">
                        <Plus className="w-4 h-4 mr-2" /> Add Service
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {services.map((service: any) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${getServiceGradient(service.gradient)} text-white`}>
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{service.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800">
                                        {service.sku}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        {service.category}
                                    </Badge>
                                    <span className="text-xs text-slate-500 ml-2">
                                        {service.price_type === 'custom' ? 'Custom Quote' : `₹${parseFloat(service.price).toLocaleString()}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant={service.published ? "default" : "destructive"} className="mr-2">
                                {service.published ? 'Published' : 'Draft'}
                            </Badge>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/services/${service.slug}`} target="_blank">
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/admin/services/${service.id}/edit`}>
                                    <Pencil className="w-4 h-4 mr-2" /> Edit
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}

                {services.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-white/20">
                        <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No services found</h3>
                        <p className="text-slate-500 mb-4 mt-1">Get started by creating your first product or service.</p>
                        <Button asChild>
                            <Link href="/dashboard/admin/services/create">
                                <Plus className="w-4 h-4 mr-2" /> Add Service
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
