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
import { redirect } from "next/navigation";
import { Wrench, Calendar, MessageSquare, LogOut, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function ClientDashboard({ 
  searchParams 
}: { 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const session = await getSession();
  const userId = session?.user?.id;
  
  if (!userId || !session?.user) {
    redirect('/login');
  }

  const resolvedParams = searchParams ? await searchParams : {};
  const activeTab = (resolvedParams?.tab as string) || 'dashboard';

  let project = await getProjectDetails({ clientId: userId });
  let milestones = project ? await getMilestones(project.id) : [];
  const initialMessages = await getMessages().catch(() => []);

  // If no project is assigned, show an elegant waiting screen
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#030712] font-display p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-xl w-full text-center">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-2xl mx-auto mb-6">
            <Wrench className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Workspace Initialized
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
            Awaiting Sprint Assignment
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
            Welcome, <strong>{session.user.name || "Client"}</strong> ({session.user.email}). Your client portal has been provisioned. We are preparing your project sprint deliverables, repository access, and milestone timeline.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <Link
              href="/book-call"
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/20"
            >
              <Calendar className="w-4 h-4" /> Book Intake Call
            </Link>
            <a
              href="https://wa.me/919997205257?text=Hi%20Aman,%20I%20have%20signed%20up%20on%20the%20AJPR%20World%20client%20portal.%20My%20email%20is%20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>AJPR World Client Services</span>
            <form action={logout}>
              <button type="submit" className="text-red-500 hover:underline flex items-center gap-1 font-semibold">
                <LogOut className="w-3.5 h-3.5" /> Log Out
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
