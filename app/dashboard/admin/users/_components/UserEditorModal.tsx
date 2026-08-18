"use client";

import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateUserAction, deleteUserAction, registerUserAction } from "@/app/actions";

export default function UserEditorModal({ 
  user, 
  onClose 
}: { 
  user: any | null, 
  onClose: () => void 
}) {
  const isNew = !user;
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "client");
  const [hourlyRate, setHourlyRate] = useState(user?.hourly_rate || 0);
  const [skills, setSkills] = useState(user?.skills || "");
  const [approvedStatus, setApprovedStatus] = useState(user?.approved_status || "pending");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !email) {
      toast.error("Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      if (isNew) {
        if (!password) {
           toast.error("Password is required for new users");
           setLoading(false);
           return;
        }
        // Need to create the user
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        if (skills) formData.append("skills", skills);
        if (hourlyRate) formData.append("hourly_rate", hourlyRate.toString());

        const res = await registerUserAction(formData);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("User created successfully!");
            onClose();
        }
      } else {
        const res = await updateUserAction(user.id, {
            name,
            email,
            role,
            skills,
            hourly_rate: hourlyRate ? parseFloat(hourlyRate.toString()) : undefined,
            approved_status: approvedStatus
        });
        if (res.success) {
            toast.success("User updated successfully!");
            onClose();
        } else {
            toast.error(res.error || "Failed to update user");
        }
      }
    } catch(e: any) {
        toast.error(e.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user? This will also remove their assignments from projects.")) return;
    setLoading(true);
    const res = await deleteUserAction(user.id);
    if (res.success) {
        toast.success("User deleted successfully!");
        onClose();
    } else {
        toast.error(res.error || "Failed to delete user");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a1b1e] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        
        <div className="sticky top-0 bg-white dark:bg-[#1a1b1e] border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {isNew ? "Create New User" : `Edit User: ${user.name}`}
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
        </div>
        
        <div className="p-8 flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" />
            </div>

            {isNew && (
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Password</label>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter a temporary password..." className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" />
            </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                    <option value="client">Client</option>
                    <option value="developer">Developer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {role === 'developer' && (
                <>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Skills</label>
                        <input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. React, Node.js" className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Hourly Rate ($)</label>
                        <input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    {!isNew && (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold">Approved Status</label>
                        <select value={approvedStatus} onChange={e => setApprovedStatus(e.target.value)} className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>
                    )}
                </>
            )}

            <div className="flex gap-4 mt-4">
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                >
                  {loading ? "Saving..." : "Save User"}
                </button>
                
                {!isNew && (
                <button 
                  onClick={handleDelete} 
                  disabled={loading}
                  className="px-6 bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50 font-bold rounded-xl transition-all flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                )}
            </div>
            
        </div>
      </div>
    </div>
  );
}
