import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from '@/lib/auth';
import { SESSION_COOKIE_NAME, isEmailAuthorizedAdmin } from '@/lib/admin/guard';
import AdminLoginForm from './AdminLoginForm';

export const metadata = {
  title: 'Central Command Login | AJPR World',
  description: 'Authoritative authentication gateway for AJPR World central operations and systems management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    try {
      const payload = await decrypt(sessionToken);
      if (payload?.user?.role === 'admin' && isEmailAuthorizedAdmin(payload.user.email)) {
        redirect('/dashboard/admin');
      }
    } catch {
      // Invalid or expired session, render login form
    }
  }

  return <AdminLoginForm />;
}
