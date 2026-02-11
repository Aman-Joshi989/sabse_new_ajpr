import React from "react";

export default function TeamMember() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-md-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="size-14 rounded-2xl bg-center bg-cover shadow-sm"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJP8C2crw-apoYQJPPWluywOo9Aqkjn0liQCjX1RIIBRoRgKuLmCmhVwbUTD5Nlk5SfznSY3INIHx88DmBffSyqmpdjYbvGeshtOUr3NSiOH4r08oWjO17CJN8_7LFySfoeWjV_n4MZhAu2FsXZAPvy4Ek-nBsqQfhFJnp2H4ydGdVmFTdTVcFStKnvIKlfme6EVewWP8_1OsQ_5yKxQIOPTjX1lO63uCcEJu83wnu8gtINTNNkbRWyoJUMU5DhiJaLzMxGjY74g')",
              }}
            ></div>
            <div className="absolute -bottom-1 -right-1 size-4 bg-status-green border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div>
            <p className="text-base font-black">Alex Rivera</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Lead Full-Stack
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-status-green lowercase italic">
          working now
        </span>
      </div>
      <p className="text-xs text-slate-500 font-medium">
        Developer is currently online and active on your project tasks.
      </p>
    </div>
  );
}
