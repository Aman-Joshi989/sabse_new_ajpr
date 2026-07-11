import { getPayments } from '@/lib/db/queries'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ManualPaymentModal } from './_components/ManualPaymentModal'
import { format } from 'date-fns'

export default async function AdminPaymentsPage() {
    const payments = await getPayments() || []

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Payments Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-1">Track all direct Razorpay transactions and manual offline entries.</p>
                </div>
                <ManualPaymentModal />
            </div>

            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-lg">Transaction History</CardTitle>
                    <CardDescription>All captured transactions are listed below.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Client</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Type</th>
                                    <th className="px-6 py-4 font-semibold">Method</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            No payments recorded yet.
                                        </td>
                                    </tr>
                                ) : payments.map((p: any) => (
                                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                                            {format(new Date(p.created_at), 'MMM d, yyyy h:mm a')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900 dark:text-white">{p.client_name}</div>
                                            <div className="text-xs text-slate-500">{p.client_email}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                            {p.currency === 'INR' ? '₹' : p.currency} {Number(p.amount).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="capitalize text-xs font-semibold">
                                                {p.payment_type}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={p.payment_method === 'razorpay' ? 'default' : 'secondary'} className="capitalize">
                                                {p.payment_method}
                                            </Badge>
                                            <div className="text-[10px] text-slate-500 mt-1 max-w-[150px] truncate" title={p.payment_id}>
                                                {p.payment_id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
                                                {p.payment_status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
