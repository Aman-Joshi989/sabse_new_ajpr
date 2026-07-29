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
    const [autoPublishSocial, setAutoPublishSocial] = useState(true)

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
            amazon_asin: formData.get('amazon_asin'),
            affiliate_product_slug: formData.get('affiliate_product_slug'),
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

                // Auto-publish to social media via Ayrshare
                if (autoPublishSocial && published) {
                    try {
                        const postText = `New Blog Post: ${data.title}\n\n${data.excerpt}\n\nRead more: https://ajprworld.com/blog/${data.slug}`
                        const ayrRes = await fetch('/api/ayrshare/post', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                post: postText,
                                platforms: ['facebook', 'twitter', 'linkedin']
                            })
                        })
                        if (ayrRes.ok) {
                            toast.success('Successfully auto-published to social media!')
                        } else {
                            toast.error('Failed to auto-publish to social media')
                        }
                    } catch (err) {
                        console.error('Social publish error:', err)
                        toast.error('Network error while posting to social media')
                    }
                }

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

            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800 space-y-4">
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Automated Affiliate Engine (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="amazon_asin">Amazon ASIN (e.g., B08N5WRWNW)</Label>
                        <Input id="amazon_asin" name="amazon_asin" defaultValue={initialData?.amazon_asin} placeholder="Leave blank if none" />
                        <p className="text-xs text-slate-500">Auto-generates an Amazon product card.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="affiliate_product_slug">Custom Affiliate Slug</Label>
                        <Input id="affiliate_product_slug" name="affiliate_product_slug" defaultValue={initialData?.affiliate_product_slug} placeholder="Leave blank if none" />
                        <p className="text-xs text-slate-500">Links to a custom product in the DB.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <Checkbox 
                        id="published" 
                        checked={published} 
                        onCheckedChange={(c) => setPublished(c as boolean)} 
                    />
                    <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox 
                        id="autoPublishSocial" 
                        checked={autoPublishSocial} 
                        onCheckedChange={(c) => setAutoPublishSocial(c as boolean)} 
                        disabled={!published}
                    />
                    <Label htmlFor="autoPublishSocial" className={!published ? "text-slate-400" : "text-amber-600 font-bold"}>
                        Auto-publish to Facebook/Twitter/LinkedIn
                    </Label>
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : (initialData ? 'Update Blog Post' : 'Create Blog Post')}
            </Button>
        </form>
    )
}
