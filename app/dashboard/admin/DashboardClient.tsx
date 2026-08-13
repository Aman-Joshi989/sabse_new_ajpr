"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, DollarSign, Users, Activity } from "lucide-react";

export default function DashboardClient({ stats }: { stats: any }) {
  // Dummy historical data for visual flair (in a real app, query group by month)
  const revenueData = [
    { name: 'Jan', total: 4000 },
    { name: 'Feb', total: 3000 },
    { name: 'Mar', total: 5000 },
    { name: 'Apr', total: 8780 },
    { name: 'May', total: 12900 },
    { name: 'Jun', total: 18400 },
    { name: 'Jul', total: stats.estimatedPipeline },
  ];

  const sourceData = stats.sources.map((s: any) => ({
    name: s.source,
    leads: s.count
  }));

  const metrics = [
    { title: "Total Revenue Pipeline", value: `$${stats.estimatedPipeline.toLocaleString()}`, icon: DollarSign, trend: "+12.5%" },
    { title: "Total Leads", value: stats.totalLeads, icon: Users, trend: "+8.2%" },
    { title: "Qualified / Closed", value: `${stats.qualifiedLeads} / ${stats.closedLeads}`, icon: Activity, trend: "+24%" },
  ];

  return (
    <div className="p-6 h-full flex flex-col space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Elite Command Center</h1>
        <p className="text-slate-400">Your AI-powered revenue operations overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={m.title} 
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <m.icon className="w-16 h-16 text-blue-500" />
            </div>
            <p className="text-slate-400 font-medium mb-1">{m.title}</p>
            <h2 className="text-4xl font-bold text-white mb-4">{m.value}</h2>
            <div className="flex items-center text-emerald-400 text-sm font-semibold">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              {m.trend} from last month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl"
        >
          <h3 className="text-lg font-bold text-white mb-6">Revenue Growth (Pipeline)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl"
        >
          <h3 className="text-lg font-bold text-white mb-6">Leads by Source</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Bar dataKey="leads" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
