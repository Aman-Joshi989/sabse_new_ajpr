import Sidebar from "@/components/dashboard/client/Sidebar";
import ProjectOverview from "@/components/dashboard/client/ProjectOverview";
import ProgressSection from "@/components/dashboard/client/ProgressSection";
import Milestones from "@/components/dashboard/client/Milestones";
import Financials from "@/components/dashboard/client/Financials";
import TeamMember from "@/components/dashboard/client/TeamMember";
import ChatWidget from "@/components/dashboard/client/ChatWidget";
import React from "react";
import { getProjectDetails, getMilestones, getMessages } from "@/lib/db/queries";
import { getSession } from "@/lib/auth";
import { Wrench } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ClientDashboard({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await getSession();
  const userId = session?.user?.id;
  
  if (!userId) {
    return <div className="p-12 text-center text-slate-500">Authentication Required</div>;
  }

  let project = await getProjectDetails({ clientId: userId });
  let milestones = project ? await getMilestones(project.id) : [];
  const initialMessages = await getMessages();

  // If no project is assigned, show an elegant waiting screen
  if (!project) {
      return (
          <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-[#030712] font-display">
              <div className="text-center bg-white dark:bg-slate-900/40 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg">
                  <div className="w-20 h-20 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-full mx-auto mb-6">
                      <Wrench className="w-10 h-10" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Awaiting Assignment</h1>
                  <p className="text-slate-500">
                      Your workspace is ready. We are currently provisioning your project details. Please check back shortly once the admin assigns your project.
                  </p>
              </div>
          </div>
      );
  }

  const activeTab = searchParams?.tab || 'dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#030712] font-display text-[#0f172a] dark:text-white transition-colors duration-200">
      <Sidebar activeTab={activeTab as string} />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50/50 dark:bg-[#030712] pb-32">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ProjectOverview title={project.title} status={project.status} />
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                <ProgressSection 
                  percent={project.progress_percent} 
                  hoursUsed={project.hours_used} 
                  deadline={new Date(project.deadline).toLocaleDateString()} 
                  title={project.title}
                />
                <Milestones milestones={milestones} />
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                <Financials total={project.total_value} pending={project.pending_value} />
                <TeamMember />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
            <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Project Milestones</h2>
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex-1">
              <Milestones milestones={milestones} />
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
            <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Financials & Invoices</h2>
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex-1 flex items-center justify-center">
                <Financials total={project.total_value} pending={project.pending_value} />
            </div>
          </div>
        )}

        {['files', 'settings'].includes(activeTab as string) && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex items-center justify-center">
            <div className="text-center">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Wrench className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Module Provisioning</h3>
                <p className="text-slate-500 max-w-sm">This section is currently being provisioned for your workspace.</p>
            </div>
          </div>
        )}
      </main>

      <ChatWidget initialMessages={initialMessages} role="client" senderName={session.user.name || "Client"} />
    </div>
  );
}
