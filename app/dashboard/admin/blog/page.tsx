import { getAllBlogs } from '@/lib/db/queries'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import DeleteBlogButton from './_components/DeleteBlogButton'

export const dynamic = 'force-dynamic';

export default async function AdminBlog() {
    const blogs = await getAllBlogs();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">Manage Blog</h1>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Create, edit, and publish blog articles.</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/admin/blog/create">
                        <Plus className="w-4 h-4 mr-2" /> New Post
                    </Link>
                </Button>
            </div>

            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F8F9FA] dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043] text-[#5F6368] dark:text-[#9AA0A6] uppercase text-[11px] font-medium tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Slug</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] dark:divide-[#3C4043]">
                        {blogs.map((blog: any) => (
                            <tr key={blog.id} className="hover:bg-[#F1F3F4] dark:hover:bg-[#3C4043]/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-[#202124] dark:text-white">{blog.title}</td>
                                <td className="px-6 py-4 text-[#5F6368] dark:text-[#9AA0A6]">{blog.slug}</td>
                                <td className="px-6 py-4 text-[#3C4043] dark:text-[#E8EAED]">{blog.author}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${blog.published ? 'bg-[#E6F4EA] text-[#137333] dark:bg-[#137333]/20 dark:text-[#81C995]' : 'bg-[#FEF7E0] text-[#B06000] dark:bg-[#F9AB00]/20 dark:text-[#FDE293]'}`}>
                                        {blog.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-end gap-3">
                                    <Link href={`/dashboard/admin/blog/${blog.id}/edit`} className="text-[#1A73E8] hover:text-[#174EA6] dark:text-[#8AB4F8] dark:hover:text-[#A8C7FA] transition-colors p-2 hover:bg-[#E8F0FE] dark:hover:bg-[#1A73E8]/20 rounded-full">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <DeleteBlogButton id={blog.id} />
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[#5F6368] dark:text-[#9AA0A6]">
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
