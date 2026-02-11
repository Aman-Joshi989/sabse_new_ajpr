import Sidebar from "@/components/dashboard/developer/Sidebar";
import ActiveTaskHeader from "@/components/dashboard/developer/ActiveTaskHeader";
import ProjectProgress from "@/components/dashboard/developer/ProjectProgress";
import TaskKanban from "@/components/dashboard/developer/TaskKanban";
import FinancialSummary from "@/components/dashboard/developer/FinancialSummary";
import ClientCard from "@/components/dashboard/developer/ClientCard";
import ChatWidget from "@/components/dashboard/client/ChatWidget"; // Reusing efficient Widget with different props
import React from "react";
import { getProjectDetails, getTasks, getMessages } from "@/lib/db/queries";

export const dynamic = 'force-dynamic';

export default async function DeveloperDashboard() {
  const project = await getProjectDetails();
  const tasks = project ? await getTasks(project.id) : [];
  const initialMessages = await getMessages();

  const activeTask = tasks.find((t: any) => t.status === 'in_progress');

  if (!project) return <div>Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0f172a] dark:text-white transition-colors duration-200">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50 dark:bg-slate-950">
        <ActiveTaskHeader task={activeTask} />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <ProjectProgress 
              percent={project.progress_percent} 
              hoursUsed={project.hours_used} 
              totalHours={project.total_hours}
              deadline={new Date(project.deadline).toLocaleDateString()}
            />
            <TaskKanban tasks={tasks} />
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <FinancialSummary total={project.total_value} pending={project.pending_value} />
            <ClientCard />
          </div>
        </div>
      </main>
      <ChatWidget initialMessages={initialMessages} role="developer" senderName="Alex Rivera" />
    </div>
  );
}
