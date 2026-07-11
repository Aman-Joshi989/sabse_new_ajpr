'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createManualPaymentAction } from '@/app/dashboard/admin/payments/actions'
import { PlusCircle } from 'lucide-react'

export function ManualPaymentModal() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        
        const formData = new FormData(e.currentTarget)
        const data = {
            client_name: formData.get('client_name'),
            client_email: formData.get('client_email'),
            client_phone: formData.get('client_phone'),
            amount: formData.get('amount'),
            payment_method: formData.get('payment_method'),
            payment_type: formData.get('payment_type'),
            payment_id: formData.get('payment_id'),
        }

        try {
            await createManualPaymentAction(data)
            setOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create payment:', error)
            alert('Failed to log payment.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Log Offline Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Log Offline Payment</DialogTitle>
                    <DialogDescription>
                        Manually record payments received via Cash, Bank Transfer, or Crypto.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="client_name">Client Name</Label>
                        <Input id="client_name" name="client_name" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="client_email">Client Email</Label>
                        <Input id="client_email" name="client_email" type="email" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="client_phone">Client Phone</Label>
                        <Input id="client_phone" name="client_phone" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount (₹)</Label>
                            <Input id="amount" name="amount" type="number" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="payment_type">Type</Label>
                            <select id="payment_type" name="payment_type" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300">
                                <option value="advance">Advance (50%)</option>
                                <option value="full">Full (100%)</option>
                                <option value="milestone">Milestone</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="payment_method">Method</Label>
                        <select id="payment_method" name="payment_method" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300">
                            <option value="cash">Cash</option>
                            <option value="bank_transfer">Bank Transfer (NEFT/IMPS)</option>
                            <option value="upi">UPI directly</option>
                            <option value="crypto">Crypto</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="payment_id">Transaction/Receipt ID</Label>
                        <Input id="payment_id" name="payment_id" placeholder="Optional" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Log Payment'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
