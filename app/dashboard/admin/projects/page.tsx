import { getAllProjects, getUsers } from '@/lib/db/queries';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
    const projects = await getAllProjects();
    const users = await getUsers();
    
    // Create a map of user_id -> user name for fast lookup
    const userMap: Record<number, string> = {};
    users.forEach((u: any) => {
        userMap[u.id] = u.name;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">Project Management</h1>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Assign projects to clients and track overall progress.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F8F9FA] dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043] text-[#5F6368] dark:text-[#9AA0A6] uppercase text-[11px] font-medium tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Project ID</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Assigned Client</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] dark:divide-[#3C4043]">
                        {projects.map((project: any) => (
                            <tr key={project.id} className="hover:bg-[#F1F3F4] dark:hover:bg-[#3C4043]/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-[#5F6368] dark:text-[#9AA0A6]">{project.id}</td>
                                <td className="px-6 py-4 font-medium text-[#202124] dark:text-white">{project.title}</td>
                                <td className="px-6 py-4 text-[#3C4043] dark:text-[#E8EAED]">
                                    {project.client_id ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] dark:bg-[#1A73E8]/20 dark:text-[#8AB4F8] flex items-center justify-center font-bold text-[10px]">
                                                {userMap[project.client_id]?.charAt(0).toUpperCase()}
                                            </div>
                                            {userMap[project.client_id] || `User #${project.client_id}`}
                                        </span>
                                    ) : (
                                        <span className="text-[#5F6368] dark:text-[#9AA0A6] italic">Unassigned</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium uppercase tracking-wider bg-[#F3F2F1] text-[#202124] dark:bg-[#3C4043] dark:text-[#E8EAED] border border-[#DADCE0] dark:border-[#4C5053]">
                                        {project.status || 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-[#1A73E8] hover:text-[#174EA6] dark:text-[#8AB4F8] dark:hover:text-[#A8C7FA] cursor-not-allowed opacity-50 text-xs font-medium">
                                        Edit Assignment
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[#5F6368] dark:text-[#9AA0A6]">
                                    No active projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
