import React from "react";
import { getUsers } from "@/lib/db/queries";
import { Users, Code2, Briefcase, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await getUsers();

  const clients = users.filter((u: any) => u.role === "client");
  const developers = users.filter((u: any) => u.role === "developer");

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0f172a] dark:text-white transition-colors duration-200">
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto space-y-12">
            
          <div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">
              User Management
            </h1>
            <p className="text-slate-500 font-medium">
              Oversee all registered clients and engineering talent in your ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Developers Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                        <Code2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black">Developers</h2>
                    <span className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                        {developers.length}
                    </span>
                </div>

                <div className="space-y-4">
                    {developers.map((dev: any) => (
                        <div key={dev.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{dev.name}</h3>
                                    <p className="text-sm text-slate-500">{dev.email}</p>
                                </div>
                                {dev.approved_status === 'approved' ? (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                        <CheckCircle className="w-3 h-3" /> Approved
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">
                                        <Clock className="w-3 h-3" /> Pending
                                    </span>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Skills</p>
                                    <p className="text-sm font-semibold truncate">{dev.skills || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Rate</p>
                                    <p className="text-sm font-semibold">₹{dev.hourly_rate || '0'}/hr</p>
                                </div>
                            </div>
                            {dev.portfolio_url && (
                                <Link href={dev.portfolio_url} target="_blank" className="text-sm text-blue-600 font-bold hover:underline">
                                    View Portfolio &rarr;
                                </Link>
                            )}
                        </div>
                    ))}
                    {developers.length === 0 && (
                        <p className="text-slate-500 text-sm font-medium">No developers registered yet.</p>
                    )}
                </div>
            </div>

            {/* Clients Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black">Clients</h2>
                    <span className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                        {clients.length}
                    </span>
                </div>

                <div className="space-y-4">
                    {clients.map((client: any) => (
                        <div key={client.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-1">
                            <h3 className="font-bold text-lg">{client.name}</h3>
                            <p className="text-sm text-slate-500">{client.email}</p>
                        </div>
                    ))}
                    {clients.length === 0 && (
                        <p className="text-slate-500 text-sm font-medium">No clients registered yet.</p>
                    )}
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
