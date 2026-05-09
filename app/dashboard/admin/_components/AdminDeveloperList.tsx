'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { assignDeveloperAction } from '@/app/actions'
import { Link2, Code2 } from 'lucide-react'

export default function AdminDeveloperList({ developers, clients }: { developers: any[], clients: any[] }) {
    const [selectedDeveloper, setSelectedDeveloper] = useState<any>(null)
    const [isAssignOpen, setIsAssignOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const handleOpenAssign = (dev: any) => {
        setSelectedDeveloper(dev)
        setIsAssignOpen(true)
    }

    const handleAssign = async () => {
        if (!selectedClient || !selectedDeveloper) return
        setLoading(true)
        try {
            const res = await assignDeveloperAction(parseInt(selectedClient), selectedDeveloper.id)
            if (res.success) {
                alert(`Developer assigned successfully!`)
                setIsAssignOpen(false)
            } else {
                alert("Failed to assign developer")
            }
        } catch (e) {
            console.error(e)
            alert("Error assigning developer")
        } finally {
            setLoading(false)
        }
    }

    if (!developers || developers.length === 0) {
        return (
            <div className="p-8 text-center flex flex-col items-center justify-center bg-white dark:bg-[#292A2D]">
                <div className="w-12 h-12 rounded-full bg-[#F1F3F4] dark:bg-[#3C4043] flex items-center justify-center mb-3">
                    <Code2 className="w-6 h-6 text-[#5F6368] dark:text-[#9AA0A6]" />
                </div>
                <p className="text-sm text-[#3C4043] dark:text-[#E8EAED] font-medium">No developers found</p>
                <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] mt-1">Onboard developers to see them here.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-white dark:bg-[#292A2D]">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#DADCE0] dark:border-[#3C4043] text-xs font-medium text-[#5F6368] dark:text-[#9AA0A6] uppercase tracking-wider">
                <div className="col-span-6 md:col-span-5">Developer</div>
                <div className="col-span-3 hidden md:block">Status</div>
                <div className="col-span-6 md:col-span-4 text-right">Actions</div>
            </div>

            {/* List Items */}
            {developers.map((dev: any, idx: number) => (
                <div 
                    key={dev.id} 
                    className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-[#F8F9FA] dark:hover:bg-[#303134] ${
                        idx !== developers.length - 1 ? 'border-b border-[#DADCE0] dark:border-[#3C4043]' : ''
                    }`}
                >
                    <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FCE8E6] dark:bg-[#EA4335]/20 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-[#EA4335] dark:text-[#F28B82]">
                                {dev.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-[#202124] dark:text-[#E8EAED] truncate">{dev.name}</p>
                            <p className="text-xs text-[#5F6368] dark:text-[#9AA0A6] truncate">{dev.email}</p>
                        </div>
                    </div>
                    
                    <div className="col-span-3 hidden md:flex items-center">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3C4043] dark:text-[#E8EAED]">
                            <div className="w-2 h-2 rounded-full bg-[#34A853]" />
                            Available
                        </div>
                    </div>

                    <div className="col-span-6 md:col-span-4 flex justify-end">
                        <Button 
                            onClick={() => handleOpenAssign(dev)} 
                            variant="ghost"
                            size="sm"
                            className="text-[#1A73E8] dark:text-[#8AB4F8] hover:bg-[#E8F0FE] dark:hover:bg-[#1A73E8]/20 font-medium px-3"
                        >
                            <Link2 className="w-4 h-4 mr-2 hidden sm:block" /> Assign
                        </Button>
                    </div>
                </div>
            ))}

            <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#202124] border border-[#DADCE0] dark:border-[#3C4043]">
                    <DialogHeader>
                        <DialogTitle className="text-[#202124] dark:text-[#E8EAED]">Assign Project to {selectedDeveloper?.name}</DialogTitle>
                        <DialogDescription className="text-[#5F6368] dark:text-[#9AA0A6]">
                            Select a registered client to provision a new project workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="client" className="text-[#3C4043] dark:text-[#E8EAED]">Select Client</Label>
                             <Select onValueChange={setSelectedClient}>
                                <SelectTrigger className="border-[#DADCE0] dark:border-[#3C4043] focus:ring-[#1A73E8] bg-white dark:bg-[#202124]">
                                    <SelectValue placeholder="Choose a client..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-[#292A2D] border-[#DADCE0] dark:border-[#3C4043]">
                                    {clients.map((client: any) => (
                                        <SelectItem key={client.id} value={client.id.toString()} className="focus:bg-[#F1F3F4] dark:focus:bg-[#3C4043]">
                                            {client.name} ({client.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            variant="ghost" 
                            onClick={() => setIsAssignOpen(false)}
                            className="text-[#5F6368] dark:text-[#9AA0A6] hover:bg-[#F1F3F4] dark:hover:bg-[#3C4043]"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleAssign} 
                            disabled={loading || !selectedClient}
                            className="bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                        >
                            {loading ? 'Assigning...' : 'Assign Workspace'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
