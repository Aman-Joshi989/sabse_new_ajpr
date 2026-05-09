'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createServiceAction, updateServiceAction } from '@/app/actions'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash2 } from 'lucide-react'

export default function ServiceForm({ initialData }: { initialData?: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [features, setFeatures] = useState<string[]>(initialData?.features || [''])

    const addFeature = () => setFeatures([...features, ''])
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index))
    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features]
        newFeatures[index] = value
        setFeatures(newFeatures)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            sku: formData.get('sku') as string,
            title: formData.get('title') as string,
            slug: formData.get('slug') as string,
            category: formData.get('category') as string,
            description: formData.get('description') as string,
            price: parseFloat(formData.get('price') as string) || 0,
            price_type: formData.get('price_type') as string,
            delivery_time: formData.get('delivery_time') as string,
            icon_name: formData.get('icon_name') as string,
            gradient: formData.get('gradient') as string,
            published: formData.get('published') === 'on',
            features: features.filter(f => f.trim() !== '') // Remove empty features
        }

        let res;
        if (initialData?.id) {
            res = await updateServiceAction(initialData.id, data)
        } else {
            res = await createServiceAction(data)
        }

        if (res.success) {
            router.push('/dashboard/admin/services')
            router.refresh()
        } else {
            alert('Operation failed')
            setLoading(false)
        }
    }

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!initialData) {
            const title = e.target.value
            const slugInput = document.getElementById('slug') as HTMLInputElement
            if (slugInput) {
                slugInput.value = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="border-slate-200 dark:border-white/10 shadow-sm bg-white dark:bg-slate-900/50">
                <CardHeader>
                    <CardTitle className="text-xl">{initialData ? 'Edit Service' : 'Add New Service'}</CardTitle>
                    <CardDescription>Fill in the product/service details below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Switch id="published" name="published" defaultChecked={initialData?.published ?? true} />
                        <Label htmlFor="published" className="font-semibold cursor-pointer">Published (Visible to public)</Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="sku">SKU (Stock Keeping Unit) *</Label>
                            <Input id="sku" name="sku" defaultValue={initialData?.sku} required placeholder="e.g. WEB-DEV-01" className="bg-slate-50 dark:bg-black/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Input id="category" name="category" defaultValue={initialData?.category} required placeholder="e.g. Development" className="bg-slate-50 dark:bg-black/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Service Title *</Label>
                            <Input id="title" name="title" defaultValue={initialData?.title} required onChange={handleTitleChange} placeholder="e.g. Custom Web Development" className="bg-slate-50 dark:bg-black/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL) *</Label>
                            <Input id="slug" name="slug" defaultValue={initialData?.slug} required placeholder="e.g. custom-web-development" className="bg-slate-50 dark:bg-black/50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹) *</Label>
                            <Input id="price" name="price" type="number" step="0.01" defaultValue={initialData?.price} required placeholder="34999.00" className="bg-slate-50 dark:bg-black/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price_type">Price Type</Label>
                            <select id="price_type" name="price_type" defaultValue={initialData?.price_type || 'fixed'} className="flex h-10 w-full rounded-md border border-input bg-slate-50 dark:bg-black/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-slate-100">
                                <option value="fixed">Fixed Price</option>
                                <option value="starting_at">Starting At (+)</option>
                                <option value="custom">Custom Quote</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="delivery_time">Delivery Time / Duration</Label>
                            <Input id="delivery_time" name="delivery_time" defaultValue={initialData?.delivery_time} placeholder="e.g. 2-4 weeks or Monthly" className="bg-slate-50 dark:bg-black/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="icon_name">Icon Name (Lucide React)</Label>
                            <Input id="icon_name" name="icon_name" defaultValue={initialData?.icon_name || 'Code2'} placeholder="e.g. Code2, Globe, Shield" className="bg-slate-50 dark:bg-black/50" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="gradient">Card Gradient (Tailwind classes)</Label>
                            <Input id="gradient" name="gradient" defaultValue={initialData?.gradient || 'from-blue-500 to-cyan-500'} placeholder="e.g. from-blue-500 to-cyan-500" className="bg-slate-50 dark:bg-black/50" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Full Description *</Label>
                            <Textarea id="description" name="description" defaultValue={initialData?.description} required rows={4} placeholder="Detailed description of the service..." className="bg-slate-50 dark:bg-black/50" />
                        </div>

                        <div className="space-y-4 md:col-span-2 bg-slate-50 dark:bg-white/[0.02] p-4 rounded-xl border border-slate-200 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-bold">Features & Benefits</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input 
                                            value={feature} 
                                            onChange={(e) => updateFeature(index, e.target.value)} 
                                            placeholder="e.g. SEO Optimization" 
                                            className="bg-white dark:bg-black/50"
                                        />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {features.length === 0 && <p className="text-sm text-slate-500 italic">No features added yet.</p>}
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (initialData ? 'Update Service' : 'Create Service')}
                </Button>
            </div>
        </form>
    )
}
