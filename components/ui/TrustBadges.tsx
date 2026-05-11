import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center gap-6 py-6 border-t border-b border-slate-200 dark:border-slate-800 my-8">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">100% Secure & Confidential</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Verified Experts</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-indigo-500" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Guaranteed Delivery</span>
      </div>
    </div>
  );
};
