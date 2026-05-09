import BlogForm from '@/app/dashboard/admin/blog/_components/BlogForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateBlogPage() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/dashboard/admin/blog">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Create New Blog Post</h1>
            </div>

            <BlogForm />
        </div>
    )
}
