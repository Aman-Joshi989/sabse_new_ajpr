'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { assignDeveloperAction } from '@/app/actions'
import { UserCog, Link2 } from 'lucide-react'

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
        return <div className="text-center p-4 text-muted-foreground">No developers found</div>
    }

    return (
        <div className="space-y-4">
            {developers.map((dev: any) => (
                <Card key={dev.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900/50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800">
                        <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-lg">
                                {dev.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 truncate">{dev.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{dev.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status:</span>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-900 dark:text-slate-100">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-sm" />
                                Available
                            </div>
                        </div>

                        <Button 
                            onClick={() => handleOpenAssign(dev)} 
                            className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white h-10 shadow-sm"
                        >
                            <Link2 className="w-4 h-4 mr-2" /> Assign Project
                        </Button>
                        </CardContent>
                </Card>
            ))}

            <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Project to {selectedDeveloper?.name}</DialogTitle>
                        <DialogDescription>
                            Select a client to assign this developer to.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="client" className="text-right">Client</Label>
                             <Select onValueChange={setSelectedClient}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((client: any) => (
                                        <SelectItem key={client.id} value={client.id.toString()}>
                                            {client.name} ({client.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAssign} disabled={loading || !selectedClient}>
                            {loading ? 'Assigning...' : 'Assign Developer'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
