import React from 'react';
import { sql } from '@/lib/db/queries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, Mail, Phone, ExternalLink, Calendar, Link as LinkIcon, BarChart
} from 'lucide-react';

// Revalidate this page dynamically
export const dynamic = 'force-dynamic';

export default async function CareersAdminPage() {
  
  // Fetch all applications
  const result = await sql`
    SELECT * FROM job_applications 
    ORDER BY created_at DESC
  `;
  
  const applications = result.rows || [];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Job Applications</h1>
        <p className="text-slate-500 mt-2 font-medium">Review candidates who have applied through the recruitment funnel.</p>
      </div>

      <div className="grid gap-6">
        {applications.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No applications yet</h3>
            <p className="text-slate-500 mt-2">When candidates apply, they will appear here.</p>
          </div>
        ) : (
          applications.map((app: any) => (
            <Card key={app.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">{app.name}</CardTitle>
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                    Applied for: <span className="text-blue-600 dark:text-blue-400 ml-1">{app.role_applied_for}</span>
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-medium flex items-center bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  {new Date(app.created_at).toLocaleDateString()} at {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Info</h4>
                    <div className="space-y-3">
                      <a href={`mailto:${app.email}`} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                          <Mail className="w-4 h-4 text-slate-500" />
                        </div>
                        {app.email}
                      </a>
                      {app.phone && (
                        <a href={`tel:${app.phone}`} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                            <Phone className="w-4 h-4 text-slate-500" />
                          </div>
                          {app.phone}
                        </a>
                      )}
                      {app.linkedin_url && (
                        <a href={app.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                            <LinkIcon className="w-4 h-4" />
                          </div>
                          LinkedIn Profile <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tracking & Resume */}
                  <div className="space-y-6">
                    <div>
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center"><BarChart className="w-3.5 h-3.5 mr-1" /> UTM Tracking</h4>
                       <div className="flex flex-wrap gap-2 text-xs font-medium">
                         <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                           Source: {app.utm_source || 'direct'}
                         </Badge>
                         <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                           Medium: {app.utm_medium || 'none'}
                         </Badge>
                         <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none">
                           Campaign: {app.utm_campaign || 'none'}
                         </Badge>
                       </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Resume / CV</h4>
                      {app.resume_url ? (
                        <a href={`/api/admin/download-resume?url=${encodeURIComponent(app.resume_url)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors">
                          View Resume Document <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      ) : (
                        <p className="text-sm text-slate-500 italic">No resume file uploaded</p>
                      )}
                    </div>
                  </div>
                </div>

                {app.cover_letter && (
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cover Letter</h4>
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-100 dark:border-slate-800 font-medium">
                      {app.cover_letter}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
