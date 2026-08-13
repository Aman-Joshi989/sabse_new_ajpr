import { getSalesLeads } from '@/lib/db/queries';
import LeadClient from './LeadClient';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await getSalesLeads();
  
  // Format dates for client
  const formattedLeads = leads.map(l => ({
    ...l,
    created_at: l.created_at?.toISOString() || new Date().toISOString()
  }));

  return <LeadClient initialLeads={formattedLeads} />;
}
