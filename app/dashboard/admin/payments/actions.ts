'use server'

import { createPayment } from "@/lib/db/queries"
import { revalidatePath } from "next/cache"

export async function createManualPaymentAction(data: any) {
    try {
        await createPayment({
            client_name: data.client_name,
            client_email: data.client_email,
            client_phone: data.client_phone,
            amount: data.amount,
            payment_status: 'completed', // manual entries are considered completed by admin
            payment_method: data.payment_method,
            payment_id: data.payment_id || 'manual_' + Date.now(),
            payment_type: data.payment_type,
            order_details: [{ name: 'Manual Offline Entry', type: 'manual', quantity: 1 }]
        })
        
        revalidatePath('/dashboard/admin/payments')
        return { success: true }
    } catch (error) {
        console.error("Failed to create manual payment:", error)
        throw new Error("Failed to create manual payment")
    }
}
