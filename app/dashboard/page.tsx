import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function DashboardRootPage() {
    const session = await getSession();
    const role = session?.user?.role;

    if (role === 'admin') {
        redirect('/dashboard/admin');
    } else if (role === 'client') {
        redirect('/dashboard/client');
    } else if (role === 'developer') {
        redirect('/dashboard/developer');
    }

    redirect('/login');
}
