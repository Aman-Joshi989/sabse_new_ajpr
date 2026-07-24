'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Search, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AiSeoTable({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [loadingRoute, setLoadingRoute] = useState<string | null>(null);

  const filteredData = data.filter(item => 
    item.route.toLowerCase().includes(search.toLowerCase()) ||
    (item.title && item.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleTriggerAgent = async (route: string) => {
    setLoadingRoute(route);
    toast.info(`Triggering AI SEO Agent for ${route}...`);

    try {
      const res = await fetch('/api/agents/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `Optimize SEO for ${route}`,
          targetRoute: route,
          secret: process.env.NEXT_PUBLIC_AGENT_SECRET_UI || 'ajprworld-agents-super-secret' 
        })
      });

      if (!res.ok) {
        throw new Error('Failed to run agent. Check your AGENT_SECRET.');
      }

      const result = await res.json();
      
      setData(prev => prev.map(item => 
        item.route === route 
          ? { 
              ...item, 
              title: result.data.newMetaTitle, 
              description: result.data.newMetaDescription 
            } 
          : item
      ));

      toast.success(`Successfully optimized ${route}!`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to optimize route.');
    } finally {
      setLoadingRoute(null);
    }
  };

  return (
    <div className="bg-white dark:bg-[#292A2D] rounded-xl border border-[#DADCE0] dark:border-[#3C4043] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#DADCE0] dark:border-[#3C4043] flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search routes..." 
            className="pl-9 bg-gray-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {filteredData.length} indexed routes
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#202124] border-b border-[#DADCE0] dark:border-[#3C4043]">
            <tr>
              <th className="px-6 py-3 font-medium">Route</th>
              <th className="px-6 py-3 font-medium">Meta Title</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index} className="bg-white border-b dark:bg-[#292A2D] dark:border-[#3C4043]">
                  <td className="px-6 py-4 font-mono text-[#1A73E8] dark:text-[#8AB4F8] whitespace-nowrap">
                    {row.route}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                        {row.title || 'Missing Title'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {row.description || 'Missing Description'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      disabled={loadingRoute === row.route}
                      onClick={() => handleTriggerAgent(row.route)}
                      className="bg-[#E8F0FE] text-[#1A73E8] hover:bg-[#D2E3FC] dark:bg-[#1A73E8]/20 dark:hover:bg-[#1A73E8]/30 dark:text-[#8AB4F8]"
                    >
                      {loadingRoute === row.route ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Zap className="h-4 w-4 mr-2" />
                      )}
                      Optimize
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  No routes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
