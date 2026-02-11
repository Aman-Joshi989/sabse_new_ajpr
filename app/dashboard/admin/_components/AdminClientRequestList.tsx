'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClientAccount } from '@/app/actions'
import { UserPlus } from 'lucide-react'

export default function AdminClientRequestList({ requests }: { requests: any[] }) {
    const [selectedRequest, setSelectedRequest] = useState<any>(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleOpenCreate = (req: any) => {
        const data = JSON.parse(req.content)
        setSelectedRequest(req)
        setFormData({
            name: data.name || '',
            email: data.email || '',
            password: Math.random().toString(36).slice(-8) // Generate random password
        })
        setIsCreateOpen(true)
    }

    const handleCreateAccount = async () => {
        setLoading(true)
        try {
            const res = await createClientAccount(formData)
            if (res.success) {
                alert(`Account created for ${formData.email}. Password: ${formData.password}`)
                setIsCreateOpen(false)
                // In a real app, we would refresh the data or optimistically update
                // For now, reload page to see changes (if we were filtering out processed ones)
            } else {
                alert("Failed to create account")
            }
        } catch (e) {
            console.error(e)
            alert("Error creating account")
        } finally {
            setLoading(false)
        }
    }

    if (!requests || requests.length === 0) {
        return <div className="text-center p-4 text-muted-foreground">No new requests</div>
    }

    return (
        <div className="space-y-4">
            {requests.map((req: any) => {
                const data = JSON.parse(req.content)
                // Assuming 'cart' is in data
                const cartTotal = data.total || 0
                
                return (
                    <Card key={req.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800">
                         <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                                    <UserPlus className="w-6 h-6" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 truncate">{data.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{data.email}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-200">Order Value: ₹{cartTotal.toLocaleString()}</p>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${data.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                                        {data.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                    </span>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(req.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <Button 
                                onClick={() => handleOpenCreate(req)} 
                                className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white h-10 shadow-sm"
                            >
                                <UserPlus className="w-4 h-4 mr-2" /> Create Account
                            </Button>
                         </CardContent>
                    </Card>
                )
            })}

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Client Account</DialogTitle>
                        <DialogDescription>
                            Review details and create a new account for this client.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">Password</Label>
                            <Input id="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreateAccount} disabled={loading}>
                            {loading ? 'Creating...' : 'Create Account'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
