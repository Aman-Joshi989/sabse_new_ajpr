import React from 'react';
import { requireAdmin } from '@/lib/admin/guard';
import AdminLayoutClient from './AdminLayoutClient';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defense in Depth: verify admin session and email authorization server-side
  // Redirects unauthorized users to /login before rendering layout or children
  await requireAdmin();

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
