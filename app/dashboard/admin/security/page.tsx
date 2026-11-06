import React from 'react';
import { requireAdmin } from '@/lib/admin/guard';
import { getAdminTwoFactorState, getAdminAuditLogs, listAdminUsers } from '@/lib/db/admin-queries';
import AdminSecurityClient from './AdminSecurityClient';

export const metadata = {
  title: 'Security & Two-Factor Authentication | Admin Console',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminSecurityPage() {
  const admin = await requireAdmin();

  let initialTwoFactorEnabled = false;
  let initialBackupCodesCount = 0;

  if (admin.id && typeof admin.id === 'string' && admin.id.includes('-')) {
    const twoFactorState = await getAdminTwoFactorState(admin.id);
    if (twoFactorState) {
      initialTwoFactorEnabled = twoFactorState.enabled;
      initialBackupCodesCount = twoFactorState.backupCodes.length;
    }
  }

  const [auditLogs, adminUsers] = await Promise.all([
    getAdminAuditLogs(25),
    listAdminUsers(),
  ]);

  return (
    <div className="p-6 md:p-10">
      <AdminSecurityClient
        initialTwoFactorEnabled={initialTwoFactorEnabled}
        initialBackupCodesCount={initialBackupCodesCount}
        adminEmail={admin.email}
        actorTier={admin.hierarchyTier ?? 0}
        auditLogs={auditLogs}
        initialAdminUsers={adminUsers}
      />
    </div>
  );
}

