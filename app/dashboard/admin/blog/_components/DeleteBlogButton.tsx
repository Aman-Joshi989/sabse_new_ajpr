'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteBlogPostAction } from '@/app/actions'
import { toast } from 'sonner'
import { useState } from 'react'

export default function DeleteBlogButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        setLoading(true)
        try {
            const res = await deleteBlogPostAction(id)
            if (res.success) {
                toast.success('Blog post deleted')
            } else {
                toast.error('Failed to delete')
            }
        } catch (e) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button 
            onClick={handleDelete} 
            disabled={loading}
            className="text-[#EA4335] hover:text-[#C5221F] dark:text-[#F28B82] dark:hover:text-[#F6AEA9] transition-colors p-2 hover:bg-[#FCE8E6] dark:hover:bg-[#EA4335]/20 rounded-full disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    )
}
