'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { deletePortfolioItemAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function PortfolioAdminClient({ initialProjects }: { initialProjects: any[] }) {
    const router = useRouter();
    const [projects, setProjects] = useState(initialProjects);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        const res = await deletePortfolioItemAction(id);
        if (res.success) {
            setProjects(projects.filter(p => p.id !== id));
            toast.success('Project deleted successfully');
            router.refresh();
        } else {
            toast.error('Failed to delete project');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <Card key={project.id} className="relative group overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{project.title}</h3>
                                <span className="text-sm text-slate-500">{project.category}</span>
                            </div>
                            {project.featured && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Featured</Badge>
                            )}
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {(project.tags || []).slice(0, 3).map((tag: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/dashboard/admin/portfolio/edit/${project.id}`}>
                                        <Edit2 className="w-4 h-4 text-blue-500" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
