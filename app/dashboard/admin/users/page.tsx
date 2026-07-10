import { getUsers } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-normal text-[#202124] dark:text-white mb-2">User Management</h1>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Manage system access, roles, and client identities.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F8F9FA] dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043] text-[#5F6368] dark:text-[#9AA0A6] uppercase text-[11px] font-medium tracking-wider">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] dark:divide-[#3C4043]">
                        {users.map((user: any) => (
                            <tr key={user.id} className="hover:bg-[#F1F3F4] dark:hover:bg-[#3C4043]/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-[#5F6368] dark:text-[#9AA0A6]">{user.id}</td>
                                <td className="px-6 py-4 font-medium text-[#202124] dark:text-white">{user.name}</td>
                                <td className="px-6 py-4 text-[#1A73E8] dark:text-[#8AB4F8]">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium uppercase tracking-wider ${
                                        user.role === 'admin' ? 'bg-[#FCE8E6] text-[#C5221F] dark:bg-[#C5221F]/20 dark:text-[#F28B82]' : 
                                        user.role === 'developer' ? 'bg-[#FEF7E0] text-[#B06000] dark:bg-[#F9AB00]/20 dark:text-[#FDE293]' :
                                        'bg-[#E6F4EA] text-[#137333] dark:bg-[#137333]/20 dark:text-[#81C995]'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[#5F6368] dark:text-[#9AA0A6]">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[#5F6368] dark:text-[#9AA0A6]">
                                    No users found in the system.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
