import React from "react";

export default function FinancialSummary({ total, pending }: { total: number, pending: number }) {
  const paid = total - pending;
  const paidPercent = Math.round((paid / total) * 100);
  const pendingPercent = 100 - paidPercent;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-material-1 hover:shadow-material-2 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:h-1.5 transition-all duration-300"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Financial Summary
        </h4>
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
            <span className="material-symbols-outlined text-xl">payments</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Total Value */}
        <div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
              Total Project Value
           </p>
           <div className="flex items-baseline gap-1">
             <span className="text-3xl font-black text-slate-900 dark:text-white">₹{total.toLocaleString()}</span>
           </div>
           <div className="mt-3 h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full w-full opacity-30"></div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            {/* Paid */}
            <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Received
                 </p>
                 <p className="text-xl font-bold text-emerald-600 dark:text-emerald-500">
                    ₹{paid.toLocaleString()}
                 </p>
                 <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${paidPercent}%` }}></div>
                 </div>
            </div>

            {/* Pending */}
            <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Pending
                 </p>
                 <p className="text-xl font-bold text-amber-600 dark:text-amber-500">
                    ₹{pending.toLocaleString()}
                 </p>
                 <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pendingPercent}%` }}></div>
                 </div>
            </div>
        </div>
      </div>

      <button className="w-full mt-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-black rounded-xl hover:shadow-lg active:scale-[0.98] transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2 group/btn">
        <span>Manage Payments</span>
        <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
      </button>
    </div>
  );
}
