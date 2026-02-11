'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'

const openings = [
    {
        title: 'Full Stack Developer',
        department: 'Technology',
        type: 'Full-time',
        location: 'Ballabgarh, Faridabad',
        experience: '2-4 years',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    {
        title: 'Legal Associate',
        department: 'Legal',
        type: 'Full-time',
        location: 'Ballabgarh, Faridabad',
        experience: '1-3 years',
        skills: ['LLB', 'Court Practice', 'Documentation', 'Research']
    }
]

export default function CareersPage() {
    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Careers at AJPR World
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Be part of a dynamic startup delivering cutting-edge services across tech, legal, and finance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {openings.map((job, idx) => (
                        <Card key={idx} className="hover-lift border-0 shadow-lg hover:shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    {job.title}
                                    <Badge variant="outline">{job.type}</Badge>
                                </CardTitle>
                                <div className="flex items-center space-x-4 text-sm text-slate-500 mt-2">
                                    <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {job.location}
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {job.experience}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold mb-2">Required Skills:</h4>
                                <ul className="flex flex-wrap gap-2 mb-4">
                                    {job.skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary">{skill}</Badge>
                                    ))}
                                </ul>
                                <Button asChild className="w-full">
                                    <Link href="/contact">
                                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
                        Don’t see your role? Send us your resume!
                    </p>
                    <Button asChild variant="outline">
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
