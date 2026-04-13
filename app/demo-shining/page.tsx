"use client";

import { ShiningText } from "@/components/ui/shining-text";

export default function DemoShiningPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="rounded-xl border border-white/10 bg-black/50 px-8 py-6 shadow-2xl backdrop-blur-sm">
                <ShiningText text="HextaAI is thinking..." />
            </div>
        </div>
    );
}
