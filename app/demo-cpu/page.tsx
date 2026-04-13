"use client";

import { CpuArchitecture } from "@/components/ui/cpu-architecture"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-4 rounded-xl bg-accent/20 max-w-2xl w-full">
        <CpuArchitecture />
      </div>
    </div>
  );
}
