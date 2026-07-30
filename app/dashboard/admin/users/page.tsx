import React from "react";
import { getUsers } from "@/lib/db/queries";
import UserManagementClient from "./_components/UserManagementClient";

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#0f172a] dark:text-white transition-colors duration-200">
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50 dark:bg-slate-950">
        <UserManagementClient users={users} />
      </main>
    </div>
  );
}
