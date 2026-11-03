import Sidebar from "@/components/dashboard/developer/Sidebar";
import ActiveTaskHeader from "@/components/dashboard/developer/ActiveTaskHeader";
import ProjectProgress from "@/components/dashboard/developer/ProjectProgress";
import TaskKanban from "@/components/dashboard/developer/TaskKanban";
import FinancialSummary from "@/components/dashboard/developer/FinancialSummary";
import ClientCard from "@/components/dashboard/developer/ClientCard";
import ChatWidget from "@/components/dashboard/client/ChatWidget";
import { getProjectDetails, getTasks, getMessages } from "@/lib/db/queries";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  ShieldCheck, 
  Clock, 
  GitPullRequest, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Code2, 
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DeveloperDashboard({ 
  searchParams 
}: { 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const session = await getSession();
  
  if (!session?.user) {
    redirect('/login');
  }

  const resolvedParams = searchParams ? await searchParams : {};
  const activeTab = (resolvedParams?.tab as string) || 'dashboard';

  const developerId = session.user.id;
  const project = await getProjectDetails({ developerId });
  const tasks = project ? await getTasks(project.id) : [];
  const initialMessages = await getMessages().catch(() => []);

  const activeTask = tasks.find((t: any) => t.status === 'in_progress');

  // If no project has been assigned yet to this developer
  if (!project) {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#030712] font-display text-[#0f172a] dark:text-white transition-colors duration-200">
        <Sidebar user={session.user} activeTab={activeTab} />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Top Status Header */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-3 border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5 animate-pulse" /> Profile Under Verification
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                    Welcome, {session.user.name || "Engineer"}
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Your developer profile is registered with AJPR World. Our engineering leads are verifying your stack credentials.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/919997205257?text=Hi%20Aman,%20I%20have%20registered%20as%20a%20developer%20on%20AJPR%20World.%20My%20email%20is%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/20"
                  >
                    <MessageSquare className="w-4 h-4" /> Message Lead Architect
                  </a>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="grid sm:grid-cols-3 gap-4 pt-6">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                    <CheckCircle2 className="w-4 h-4" /> Step 1: Registered
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Account and credentials recorded in talent pipeline.</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs mb-1">
                    <Clock className="w-4 h-4 animate-spin" /> Step 2: Code Review
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Reviewing GitHub repositories, code samples, and rates.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs mb-1">
                    <GitPullRequest className="w-4 h-4" /> Step 3: Sprint Assignment
                  </div>
                  <p className="text-xs text-slate-500">Live repository access and client task allocation.</p>
                </div>
              </div>
            </div>

            {/* Developer Details & Standards */}
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Your Developer Profile</h3>
                </div>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Registered Name</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{session.user.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Registered Email</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{session.user.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500">Account Type</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">Verified Developer</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Current Sprint Status</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">Standby for Client Assignment</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Engineering Standards</h3>
                </div>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span><strong>Stack:</strong> Next.js 15/16 App Router, TypeScript, Tailwind CSS, PostgreSQL / Supabase, Docker.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span><strong>Workflow:</strong> GitHub feature branches, linear commits, and strict semantic PR reviews.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span><strong>Compensation:</strong> Guaranteed milestone and hourly payouts released via Wire / Net Banking.</span>
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link 
                    href="/solutions" 
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    Explore Architecture Systems <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0f172a] dark:text-white transition-colors duration-200">
      <Sidebar user={session.user} activeTab={activeTab} />
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
      <ChatWidget initialMessages={initialMessages} role="developer" senderName={session.user.name || "Developer"} />
    </div>
  );
}
