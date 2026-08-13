import { getSalesLeads } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export default async function AffiliatesAdminPage() {
  const leads = await getSalesLeads();
  
  // Aggregate leads by utm_source (acting as Affiliate ID)
  const affiliateStats = leads.reduce((acc: any, lead: any) => {
    const source = lead.utm_source || 'Direct / SEO';
    if (!acc[source]) {
      acc[source] = {
        name: source,
        totalLeads: 0,
        qualified: 0,
        closed: 0,
        estimatedPipeline: 0
      };
    }
    
    acc[source].totalLeads++;
    
    if (lead.status === 'qualified') {
      acc[source].qualified++;
    }
    
    if (lead.status === 'closed') {
      acc[source].closed++;
      // Rough estimation based on budget string if possible
      acc[source].estimatedPipeline += 5000; // Placeholder average deal size
    }

    return acc;
  }, {});

  const data = Object.values(affiliateStats).sort((a: any, b: any) => b.totalLeads - a.totalLeads);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Partner & Affiliate Manager</h1>
        <p className="text-slate-400">Track which partners (via utm_source) are driving the most qualified leads and closed deals.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-950 border-b border-slate-800">
            <tr>
              <th className="p-4 text-slate-300 font-medium">Partner / Source</th>
              <th className="p-4 text-slate-300 font-medium">Total Leads</th>
              <th className="p-4 text-slate-300 font-medium">Qualified Leads</th>
              <th className="p-4 text-slate-300 font-medium">Closed Won</th>
              <th className="p-4 text-slate-300 font-medium">Est. Revenue Generated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {data.map((row: any, i) => (
              <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 text-white font-medium">{row.name}</td>
                <td className="p-4 text-slate-300">{row.totalLeads}</td>
                <td className="p-4 text-purple-400 font-medium">{row.qualified}</td>
                <td className="p-4 text-green-400 font-medium">{row.closed}</td>
                <td className="p-4 text-emerald-400 font-medium">${row.estimatedPipeline.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
