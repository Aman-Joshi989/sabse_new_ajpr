import { getAllBlogs } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import DeleteBlogButton from './_components/DeleteBlogButton'

export const dynamic = 'force-dynamic';

export default async function AdminBlog() {
    const blogs = await getAllBlogs();

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Manage Blog</h1>
                <Button asChild>
                    <Link href="/dashboard/admin/blog/create">
                        <Plus className="w-4 h-4 mr-2" /> New Post
                    </Link>
                </Button>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">Title</th>
                            <th className="px-6 py-4 font-medium">Slug</th>
                            <th className="px-6 py-4 font-medium">Author</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {blogs.map((blog: any) => (
                            <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-medium">{blog.title}</td>
                                <td className="px-6 py-4 text-muted-foreground">{blog.slug}</td>
                                <td className="px-6 py-4">{blog.author}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${blog.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                        {blog.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-end gap-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/dashboard/admin/blog/${blog.id}/edit`}>
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <DeleteBlogButton id={blog.id} />
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    No blog posts found. Create your first post!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
