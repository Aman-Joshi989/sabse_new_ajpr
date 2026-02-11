import Sidebar from "@/components/dashboard/client/Sidebar";
import ProjectOverview from "@/components/dashboard/client/ProjectOverview";
import ProgressSection from "@/components/dashboard/client/ProgressSection";
import Milestones from "@/components/dashboard/client/Milestones";
import Financials from "@/components/dashboard/client/Financials";
import TeamMember from "@/components/dashboard/client/TeamMember";
import ChatWidget from "@/components/dashboard/client/ChatWidget";
import React from "react";
import { getProjectDetails, getMilestones, getMessages } from "@/lib/db/queries";

export const dynamic = 'force-dynamic';

export default async function ClientDashboard() {
  const project = await getProjectDetails();
  const milestones = project ? await getMilestones(project.id) : [];
  const initialMessages = await getMessages();

  if (!project) return <div>Loading...</div>;

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
