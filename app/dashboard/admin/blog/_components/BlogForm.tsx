'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { createBlogPostAction, updateBlogPostAction } from '@/app/actions'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'

export default function BlogForm({ initialData }: { initialData?: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [published, setPublished] = useState(initialData?.published ?? true)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        
        const data = {
            title: formData.get('title'),
            slug: formData.get('slug'),
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            category: formData.get('category') || 'Uncategorized',
            author: formData.get('author') || 'Admin',
            cover_image: formData.get('cover_image'),
            published: published
        }

        try {
            let res;
            if (initialData?.id) {
                res = await updateBlogPostAction(initialData.id, data)
            } else {
                res = await createBlogPostAction(data)
            }

            if (res.success) {
                toast.success(initialData ? 'Blog post updated' : 'Blog post created')
                router.push('/dashboard/admin/blog')
            } else {
                toast.error('Failed to save blog post')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-card p-6 rounded-xl border shadow-sm">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={initialData?.title} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL friendly)</Label>
                    <Input id="slug" name="slug" defaultValue={initialData?.slug} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
                <Textarea id="excerpt" name="excerpt" defaultValue={initialData?.excerpt} required className="h-20" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content (HTML or plain text)</Label>
                <Textarea id="content" name="content" defaultValue={initialData?.content} required className="h-64 font-mono text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input id="author" name="author" defaultValue={initialData?.author || 'AJPR World'} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" defaultValue={initialData?.category || 'Technology'} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="cover_image">Cover Image URL</Label>
                <Input id="cover_image" name="cover_image" defaultValue={initialData?.cover_image} />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="published" 
                    checked={published} 
                    onCheckedChange={(c) => setPublished(c as boolean)} 
                />
                <Label htmlFor="published">Published</Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : (initialData ? 'Update Blog Post' : 'Create Blog Post')}
            </Button>
        </form>
    )
}
