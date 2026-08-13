"use server";

import { updateLeadStatus } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function changeLeadStatus(leadId: number, newStatus: string) {
  try {
    await updateLeadStatus(leadId, newStatus);
    revalidatePath('/dashboard/admin/leads');
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update lead:", error);
    return { success: false, error: error.message };
  }
}
