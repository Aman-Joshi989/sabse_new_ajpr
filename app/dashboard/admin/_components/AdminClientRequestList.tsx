'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClientAccount } from '@/app/actions'
import { UserPlus, MoreVertical, CreditCard } from 'lucide-react'

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
        return (
            <div className="p-8 text-center flex flex-col items-center justify-center bg-white dark:bg-[#292A2D]">
                <div className="w-12 h-12 rounded-full bg-[#F1F3F4] dark:bg-[#3C4043] flex items-center justify-center mb-3">
                    <UserPlus className="w-6 h-6 text-[#5F6368] dark:text-[#9AA0A6]" />
                </div>
                <p className="text-sm text-[#3C4043] dark:text-[#E8EAED] font-medium">No pending requests</p>
                <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-1">You're all caught up.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-white dark:bg-[#292A2D]">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#DADCE0] dark:border-[#3C4043] text-xs font-medium text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">
                <div className="col-span-5 md:col-span-4">Client</div>
                <div className="col-span-3 hidden md:block">Order Value</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-4 md:col-span-2 text-right">Actions</div>
            </div>

            {/* List Items */}
            {requests.map((req: any, idx: number) => {
                const data = JSON.parse(req.content)
                const cartTotal = data.total || 0
                const isPaid = data.paymentStatus === 'paid'
                
                return (
                    <div 
                        key={req.id} 
                        className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-[#F8F9FA] dark:hover:bg-[#303134] ${
                            idx !== requests.length - 1 ? 'border-b border-[#DADCE0] dark:border-[#3C4043]' : ''
                        }`}
                    >
                        <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#E8F0FE] dark:bg-[#1A73E8]/20 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-[#1A73E8] dark:text-[#8AB4F8]">
                                    {data.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-[#202124] dark:text-[#E8EAED] truncate">{data.name}</p>
                                <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] truncate">{data.email}</p>
                            </div>
                        </div>
                        
                        <div className="col-span-3 hidden md:flex flex-col">
                            <span className="text-sm text-[#3C4043] dark:text-[#E8EAED]">₹{cartTotal.toLocaleString()}</span>
                            <span className="text-[10px] text-[#5F6368] dark:text-[#9AA0A6]">
                                {new Date(req.created_at).toISOString().split('T')[0]}
                            </span>
                        </div>

                        <div className="col-span-3 flex items-center">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                isPaid 
                                ? 'bg-[#E6F4EA] text-[#137333] dark:bg-[#34A853]/20 dark:text-[#81C995]' 
                                : 'bg-[#FEF7E0] text-[#B06000] dark:bg-[#FBBC04]/20 dark:text-[#FDE293]'
                            }`}>
                                {isPaid ? <CreditCard className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                {isPaid ? 'Paid' : 'Pending'}
                            </div>
                        </div>

                        <div className="col-span-4 md:col-span-2 flex justify-end">
                            <Button 
                                onClick={() => handleOpenCreate(req)} 
                                variant="ghost"
                                size="sm"
                                className="text-[#1A73E8] dark:text-[#8AB4F8] hover:bg-[#E8F0FE] dark:hover:bg-[#1A73E8]/20 font-medium px-3"
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                )
            })}

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043]">
                    <DialogHeader>
                        <DialogTitle className="text-[#202124] dark:text-[#E8EAED]">Create Client Account</DialogTitle>
                        <DialogDescription className="text-[#5F6368] dark:text-[#9AA0A6]">
                            Review details and provision a secure account for this client.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[#3C4043] dark:text-[#E8EAED]">Full Name</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                className="border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-[#1A73E8]" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#3C4043] dark:text-[#E8EAED]">Email Address</Label>
                            <Input 
                                id="email" 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                className="border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-[#1A73E8]" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[#3C4043] dark:text-[#E8EAED]">Temporary Password</Label>
                            <Input 
                                id="password" 
                                value={formData.password} 
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                className="border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-[#1A73E8]" 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsCreateOpen(false)}
                            className="text-[#5F6368] dark:text-[#9AA0A6] hover:bg-[#F1F3F4] dark:hover:bg-[#3C4043]"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleCreateAccount} 
                            disabled={loading}
                            className="bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                        >
                            {loading ? 'Provisioning...' : 'Create Account'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
