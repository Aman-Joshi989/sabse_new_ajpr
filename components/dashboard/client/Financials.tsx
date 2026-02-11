import React from "react";

export default function Financials({ total, pending }: { total: number, pending: number }) {
  const paid = total - pending;
  const paidPercent = Math.round((paid / total) * 100);
  const pendingPercent = 100 - paidPercent;

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-material-1 hover:shadow-material-2 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600 group-hover:h-1.5 transition-all duration-300"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Financial Status
        </h4>
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full text-emerald-600/70 group-hover:text-emerald-600 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
           <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Paid Amount (Main Focus for Client) */}
        <div>
           <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  Amount Paid
              </p>
              <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {paidPercent}%
              </span>
           </div>
           
           <div className="flex items-baseline gap-1">
             <span className="text-4xl font-black text-slate-900 dark:text-white">₹{paid.toLocaleString()}</span>
             <span className="text-xs font-bold text-slate-400">of ₹{total.toLocaleString()}</span>
           </div>
           
           <div className="mt-3 h-3 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
             <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                style={{ width: `${paidPercent}%` }}
             ></div>
           </div>
        </div>

        {/* Outstanding */}
        <div>
           <div className="flex justify-between items-end mb-2">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
               Outstanding Balance
             </p>
             <p className="text-xl font-bold text-slate-900 dark:text-white">
                ₹{pending.toLocaleString()}
             </p>
           </div>
           <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
             <div 
                className="h-full bg-slate-300 dark:bg-slate-700 rounded-full" 
                style={{ width: `${pendingPercent}%` }}
             ></div>
           </div>
        </div>
      </div>

      <button className="w-full mt-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-black rounded-xl hover:shadow-lg active:scale-[0.98] transition-all uppercase tracking-[0.15em] flex items-center justify-center gap-2 group/btn">
        <span>View Invoices</span>
        <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
      </button>
    </div>
  );
}
