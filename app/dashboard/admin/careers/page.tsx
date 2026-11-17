import React from 'react';
import { sql, getAllJobPostingsAdmin } from '@/lib/db/queries';
import CareersAdminClient from './_components/CareersAdminClient';

export const dynamic = 'force-dynamic';

export default async function CareersAdminPage() {
  const [jobs, appResult] = await Promise.all([
    getAllJobPostingsAdmin().catch(() => []),
    sql`SELECT * FROM job_applications ORDER BY created_at DESC;`.catch(() => [])
  ]);

  const applications = Array.isArray(appResult) ? appResult : (appResult as any)?.rows || [];

  return (
    <CareersAdminClient
      initialJobs={jobs}
      initialApplications={applications}
    />
  );
}
