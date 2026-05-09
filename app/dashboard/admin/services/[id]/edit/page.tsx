import ServiceForm from '../../_components/ServiceForm'
import { getServiceById } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditServicePage({ params }: { params: { id: string } }) {
    const service = await getServiceById(parseInt(params.id))

    if (!service) {
        notFound()
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard/admin/services">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
                    <p className="text-slate-500">Update details for {service.sku}.</p>
                </div>
            </div>

            <ServiceForm initialData={service} />
        </div>
    )
}
