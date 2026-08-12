'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Rocket, Loader2 } from 'lucide-react';

export default function IndexNowButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handlePing = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/indexnow');
            const data = await res.json();
            
            if (data.success) {
                toast.success(`Successfully pinged IndexNow with ${data.urlsSubmitted} URLs!`);
            } else {
                toast.error(data.error || 'Failed to submit to IndexNow');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while pinging IndexNow.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Manual Search Engine Ping</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Force Bing, Yandex, and other IndexNow-compliant search engines to crawl your sitemap immediately.
                    </p>
                </div>
                <Button 
                    onClick={handlePing} 
                    disabled={isLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Rocket className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Pinging...' : 'Ping IndexNow'}
                </Button>
            </div>
        </div>
    );
}
