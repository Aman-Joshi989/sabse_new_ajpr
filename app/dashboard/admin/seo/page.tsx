import { getSiteSettings } from '@/lib/db/queries';
import SeoSettingsForm from './_components/SeoSettingsForm';

export default async function AdminSeoSettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#202124] text-[#202124] dark:text-[#E8EAED] font-sans pb-12">
            {/* Top App Bar to maintain consistent admin layout */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-white dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043] mb-8">
                <div className="flex items-center gap-4">
                    <div className="text-xl font-medium tracking-tight text-[#5F6368] dark:text-[#E8EAED]">
                        Admin <span className="text-[#202124] dark:text-white font-normal">Console</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-semibold text-[#5F6368] dark:text-[#9AA0A6] bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-transparent dark:border-slate-700">
                    SEO Manager Active
                </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
                <SeoSettingsForm initialSettings={settings} />
            </div>
        </div>
    );
}
