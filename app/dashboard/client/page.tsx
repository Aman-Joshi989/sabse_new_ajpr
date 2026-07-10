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
import { Briefcase } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ClientDashboard() {
  const session = await getSession();
  const userId = session?.user?.id;
  
  if (!userId) {
    return <div className="p-12 text-center text-slate-500">Authentication Required</div>;
  }

  const project = await getProjectDetails(userId);
  const milestones = project ? await getMilestones(project.id) : [];
  const initialMessages = await getMessages();

  if (!project) {
    return (
      <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0f172a] dark:text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center max-w-lg shadow-sm">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Welcome to your Workspace</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              We are currently provisioning your dedicated project environment. Once your account manager assigns a project, your full dashboard will appear here.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0f172a] dark:text-white transition-colors duration-200">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50 dark:bg-slate-950 pb-32">
        <ProjectOverview title={project.title} status={project.status} />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <ProgressSection 
              percent={project.progress_percent} 
              hoursUsed={project.hours_used} 
              deadline={new Date(project.deadline).toLocaleDateString()} 
            />
            <Milestones milestones={milestones} />
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <Financials total={project.total_value} pending={project.pending_value} />
            <TeamMember />
          </div>
        </div>
      </main>
      <ChatWidget initialMessages={initialMessages} role="client" senderName="Mark Thompson" />
    </div>
  );
}
