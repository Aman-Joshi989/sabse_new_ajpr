"use server";

import { updateProduct, createProduct } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function saveProduct(data: any) {
  try {
    if (data.id) {
      await updateProduct(data.id, data);
    } else {
      await createProduct(data);
    }
    revalidatePath('/dashboard/admin/products');
    revalidatePath('/pricing'); // Revalidate public pricing page
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save product:", error);
    return { success: false, error: error.message };
  }
}
