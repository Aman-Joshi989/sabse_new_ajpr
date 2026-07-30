"use client";

import React, { useState } from "react";
import { Users, Code2, Briefcase, CheckCircle, Clock, Plus, Pencil } from "lucide-react";
import Link from "next/link";
import UserEditorModal from "./UserEditorModal";

export default function UserManagementClient({ users }: { users: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);

    const clients = users.filter((u: any) => u.role === "client");
    const developers = users.filter((u: any) => u.role === "developer");

    const handleCreateNew = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">
                        User Management
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Oversee all registered clients and engineering talent in your ecosystem.
                    </p>
                </div>
                <button 
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Add User
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Developers Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black">Developers</h2>
                        <span className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                            {developers.length}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {developers.map((dev: any) => (
                            <div key={dev.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-3 group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{dev.name}</h3>
                                        <p className="text-sm text-slate-500">{dev.email}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {dev.approved_status === 'approved' ? (
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                                <CheckCircle className="w-3 h-3" /> Approved
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">
                                                <Clock className="w-3 h-3" /> Pending
                                            </span>
                                        )}
                                        <button 
                                            onClick={() => handleEdit(dev)}
                                            className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Skills</p>
                                        <p className="text-sm font-semibold truncate">{dev.skills || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Rate</p>
                                        <p className="text-sm font-semibold">₹{dev.hourly_rate || '0'}/hr</p>
                                    </div>
                                </div>
                                {dev.portfolio_url && (
                                    <Link href={dev.portfolio_url} target="_blank" className="text-sm text-blue-600 font-bold hover:underline">
                                        View Portfolio &rarr;
                                    </Link>
                                )}
                            </div>
                        ))}
                        {developers.length === 0 && (
                            <p className="text-slate-500 text-sm font-medium">No developers registered yet.</p>
                        )}
                    </div>
                </div>

                {/* Clients Section */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black">Clients</h2>
                        <span className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
                            {clients.length}
                        </span>
                    </div>

                    <div className="space-y-4">
                        {clients.map((client: any) => (
                            <div key={client.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center group">
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-bold text-lg">{client.name}</h3>
                                    <p className="text-sm text-slate-500">{client.email}</p>
                                </div>
                                <button 
                                    onClick={() => handleEdit(client)}
                                    className="text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 p-2 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {clients.length === 0 && (
                            <p className="text-slate-500 text-sm font-medium">No clients registered yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <UserEditorModal 
                    user={editingUser} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
}
