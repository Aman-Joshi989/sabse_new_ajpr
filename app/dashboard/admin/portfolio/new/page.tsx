'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { createPortfolioItemAction } from '@/app/actions';
import { toast } from 'sonner';

export default function NewPortfolioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        category: '',
        tags: '',
        description: '',
        gradient: 'from-blue-400 via-indigo-500 to-purple-600',
        accent: 'text-blue-500',
        year: '2024',
        featured: false,
        stats: '{}'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const tagsArray = formData.tags.split(',').map(tag => tag.trim());
        let statsObj = {};
        try {
            statsObj = JSON.parse(formData.stats);
        } catch (e) {
            console.error("Invalid JSON for stats", e);
            // Fallback or show error
        }

        const payload = {
            ...formData,
            tags: tagsArray,
            stats: statsObj
        };

        const res = await createPortfolioItemAction(payload);

        if (res.success) {
            toast.success('Project created successfully');
            router.push('/dashboard/admin/portfolio');
        } else {
            toast.error('Failed to create project');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input id="title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>

                <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>

                <div>
                    <Label htmlFor="url">Project URL</Label>
                    <Input id="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                </div>

                <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                        <Checkbox id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })} />
                        <Label htmlFor="featured">Featured Project</Label>
                    </div>
                </div>

                <div>
                    <Label htmlFor="stats">Stats (JSON Format)</Label>
                    <Textarea id="stats" value={formData.stats} onChange={(e) => setFormData({ ...formData, stats: e.target.value })} placeholder='{"users": "10K+", "rating": "4.8"}' />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Creating...' : 'Create Project'}
                </Button>
            </form>
        </div>
    );
}
