import React from "react";

export default function ClientCard() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="size-14 rounded-2xl bg-center bg-cover shadow-lg border border-slate-100"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_yJGRZvo9rmp4eug-5VT1zpdkoHQqhsn2msQZQKTOwEDQdPSZbJgERulJavO_1Gn16Yn7spfk14kxzOXNmSUzo5boHStdLoFXBWKXn9B5gNmJqAaKejJJXVnVi10uIfdSyqm70tFHCSA-mYfPW3a7cr13i5zZnEFwXHIGy9KlMtT6ZFvgjHUyK5EUIrZWwy2VDG1ZDnmJOGgyKMCRsotF-JtZ19_GWN7JNjRuquu9RQjgPD8dLBCuTPd39RYMGAcBoIaSiLTY5w')",
              }}
            ></div>
            <div className="absolute -bottom-1 -right-1 size-4 bg-status-green border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div>
            <p className="text-base font-black">Mark Thompson</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Client Representative
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="w-full py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200 dark:border-slate-700">
          View Client Brief
        </button>
      </div>
    </div>
  );
}
