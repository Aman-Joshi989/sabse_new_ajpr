'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Search, MapPin, Save, ArrowLeft, Loader2, Navigation, Mail, User } from 'lucide-react';
import { updateSiteSettingsAction } from '@/app/actions';
import { toast } from 'sonner';
import Link from 'next/link';

export default function SeoSettingsForm({ initialSettings }: { initialSettings: any }) {
    const router = useRouter();
    const [form, setForm] = useState({
        seo_title: initialSettings?.seo_title || '',
        seo_description: initialSettings?.seo_description || '',
        seo_keywords: initialSettings?.seo_keywords || '',
        canonical_url: initialSettings?.canonical_url || '',
        geo_region: initialSettings?.geo_region || '',
        geo_placename: initialSettings?.geo_placename || '',
        geo_position: initialSettings?.geo_position || '',
        geo_icbm: initialSettings?.geo_icbm || '',
        contact_email: initialSettings?.contact_email || 'hello@ajprworld.com',
        contact_phone: initialSettings?.contact_phone || '+91 9997205257',
        founder_name: initialSettings?.founder_name || 'Aman Joshi',
        founder_title: initialSettings?.founder_title || 'Founder & Systems Architect',
        founder_bio: initialSettings?.founder_bio || 'I partner with high-growth startups and established brands to build robust digital infrastructures, automate complex backend workloads, and integrate secure enterprise-grade systems.',
        founder_badge: initialSettings?.founder_badge || 'Founder Profile',
        founder_linkedin: initialSettings?.founder_linkedin || 'https://www.linkedin.com/in/aman-joshi-/',
        founder_github: initialSettings?.founder_github || 'https://github.com/Aman-Joshi989',
        founder_exp1_title: initialSettings?.founder_exp1_title || 'Systems Architecting',
        founder_exp1_desc: initialSettings?.founder_exp1_desc || 'Designing scalable multi-tenant architectures, cloud database pipelines, and high-concurrency backend API interfaces built for scale.',
        founder_exp2_title: initialSettings?.founder_exp2_title || 'Business Automation',
        founder_exp2_desc: initialSettings?.founder_exp2_desc || 'Eliminating manual business overhead by scripting custom autonomous workflows, database triggers, and third-party API orchestrations.',
        founder_exp3_title: initialSettings?.founder_exp3_title || 'Execution Excellence',
        founder_exp3_desc: initialSettings?.founder_exp3_desc || 'Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.',
        global_price_multiplier: initialSettings?.global_price_multiplier || 1.3334
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await updateSiteSettingsAction(form);
            if (res.success) {
                toast.success('Site configurations updated successfully! Metadata caches revalidated.');
                router.refresh();
            } else {
                toast.error('Failed to update configurations. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#DADCE0] dark:border-[#3C4043]">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-[#5F6368] dark:text-[#9AA0A6]">
                        <Link href="/dashboard/admin" className="hover:text-blue-600 flex items-center gap-1">
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-2xl font-normal text-[#202124] dark:text-white">SEO & Geo Configurations</h1>
                    <p className="text-sm text-[#5F6368] dark:text-[#9AA0A6]">Define how search engines and regional crawlers parse your website metadata.</p>
                </div>
                <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md px-6 py-2 shadow-sm flex items-center gap-2">
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" /> Save Settings
                        </>
                    )}
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                
                {/* 1. SEO Metadata Settings Card */}
                <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none rounded-lg">
                    <CardHeader className="border-b border-[#DADCE0] dark:border-[#3C4043]">
                        <CardTitle className="text-lg font-medium text-[#202124] dark:text-white flex items-center gap-2">
                            <Search className="w-5 h-5 text-blue-600 dark:text-[#8AB4F8]" />
                            SEO Metadata Settings
                        </CardTitle>
                        <CardDescription className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                            Optimize indexing meta tags for search result visibility and click-through performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">SEO Default Title</label>
                            <Input 
                                name="seo_title" 
                                value={form.seo_title} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="AJPR World - Complete Business Solutions"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Displayed in browser tabs and search engine headlines. Keep under 60 characters.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">SEO Description</label>
                            <Textarea 
                                name="seo_description" 
                                value={form.seo_description} 
                                onChange={handleChange} 
                                required 
                                rows={4}
                                className="bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600 resize-none p-3 text-sm" 
                                placeholder="Enter detailed meta description summarizing website services..."
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Summarizes search results in snippet views. Keep between 120-160 characters.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">SEO Focus Keywords</label>
                            <Input 
                                name="seo_keywords" 
                                value={form.seo_keywords} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="e.g. web development, GST returns, company registration"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Comma-separated key phrases used by metadata index crawlers.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Canonical Website URL</label>
                            <Input 
                                name="canonical_url" 
                                type="url"
                                value={form.canonical_url} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="https://ajprworld.com"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Primary canonical url to prevent duplicate search engine indexation indexing issues.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. GEO Location Settings Card */}
                <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none rounded-lg">
                    <CardHeader className="border-b border-[#DADCE0] dark:border-[#3C4043]">
                        <CardTitle className="text-lg font-medium text-[#202124] dark:text-white flex items-center gap-2">
                            <Globe className="w-5 h-5 text-emerald-600 dark:text-[#81C995]" />
                            GEO Coordinates Mapping
                        </CardTitle>
                        <CardDescription className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                            Enable regional map ranking optimization (Local SEO) using standardized geocoding metadata headers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Geo region
                                </label>
                                <Input 
                                    name="geo_region" 
                                    value={form.geo_region} 
                                    onChange={handleChange} 
                                    required 
                                    className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                    placeholder="e.g. IN-DL"
                                />
                                <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">ISO-3166 country/sub-division region tag (e.g. `IN-DL` for India/Delhi).</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Geo Placename
                                </label>
                                <Input 
                                    name="geo_placename" 
                                    value={form.geo_placename} 
                                    onChange={handleChange} 
                                    required 
                                    className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                    placeholder="e.g. New Delhi"
                                />
                                <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Standard city/location placeholder name.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Navigation className="w-3.5 h-3.5 text-slate-400" /> Geo Position Coordinates
                            </label>
                            <Input 
                                name="geo_position" 
                                value={form.geo_position} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="e.g. 28.6139;77.2090"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Latitude and longitude separated by a semicolon (e.g. `28.6139;77.2090`).</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Navigation className="w-3.5 h-3.5 text-slate-400" /> ICBM Position Tag
                            </label>
                            <Input 
                                name="geo_icbm" 
                                value={form.geo_icbm} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="e.g. 28.6139, 77.2090"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">ICBM mapping coordinates separated by a comma (e.g. `28.6139, 77.2090`).</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Contact Channels Card */}
                <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none rounded-lg lg:col-span-2">
                    <CardHeader className="border-b border-[#DADCE0] dark:border-[#3C4043]">
                        <CardTitle className="text-lg font-medium text-[#202124] dark:text-white flex items-center gap-2">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-[#8AB4F8]" />
                            Contact Channels
                        </CardTitle>
                        <CardDescription className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                            Update contact channels dynamically across website header, footer, contact pages, and disclosures.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Primary Contact Email</label>
                            <Input 
                                name="contact_email" 
                                type="email"
                                value={form.contact_email} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="hello@ajprworld.com"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Displayed across all pages including Terms, Privacy, and Header/Footer elements.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Primary Contact Phone</label>
                            <Input 
                                name="contact_phone" 
                                value={form.contact_phone} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="+91 9997205257"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Primary telephone number for user call triggers and WhatsApp links.</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Founder Branding Card */}
                <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none rounded-lg lg:col-span-2">
                    <CardHeader className="border-b border-[#DADCE0] dark:border-[#3C4043]">
                        <CardTitle className="text-lg font-medium text-[#202124] dark:text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600 dark:text-[#8AB4F8]" />
                            Founder Branding & Leadership
                        </CardTitle>
                        <CardDescription className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                            Dynamically update the executive name, roles, and titles rendered across the About and Biography pages.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Founder / CEO Name</label>
                            <Input 
                                name="founder_name" 
                                value={form.founder_name} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="Aman Joshi"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Dynamic name displayed in About Page executive highlights and biography routes.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Founder Title / Capacity</label>
                            <Input 
                                name="founder_title" 
                                value={form.founder_title} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="Founder & Systems Architect"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Official description or role capacity (e.g. Founder & Systems Architect).</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Founder Badge Label</label>
                            <Input 
                                name="founder_badge" 
                                value={form.founder_badge} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="Founder Profile"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Brief uppercase badge rendered above name (e.g. Founder Profile).</p>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Founder Biography Introduction</label>
                            <Textarea 
                                name="founder_bio" 
                                value={form.founder_bio} 
                                onChange={handleChange} 
                                required 
                                rows={4}
                                className="bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600 resize-none p-3 text-sm" 
                                placeholder="Write dynamic founder biography summary..."
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Introductory bio block displayed on biography and about pages.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">LinkedIn URL</label>
                            <Input 
                                name="founder_linkedin" 
                                type="url"
                                value={form.founder_linkedin} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="https://www.linkedin.com/in/amanjoshi-"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Absolute URL to founder LinkedIn profile.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">GitHub URL</label>
                            <Input 
                                name="founder_github" 
                                type="url"
                                value={form.founder_github} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="https://github.com/amanjoshi"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Absolute URL to founder GitHub profile.</p>
                        </div>

                        {/* Card 1 Expertise */}
                        <div className="border-t border-[#DADCE0] dark:border-[#3C4043] pt-6 sm:col-span-2 space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Expertise Block 1</h4>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expertise 1 Title</label>
                                    <Input 
                                        name="founder_exp1_title" 
                                        value={form.founder_exp1_title} 
                                        onChange={handleChange} 
                                        required 
                                        className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                        placeholder="Systems Architecting"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expertise 1 Description</label>
                                    <Textarea 
                                        name="founder_exp1_desc" 
                                        value={form.founder_exp1_desc} 
                                        onChange={handleChange} 
                                        required 
                                        rows={2}
                                        className="bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600 resize-none p-3 text-sm" 
                                        placeholder="Describe systems expertise..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 2 Expertise */}
                        <div className="border-t border-[#DADCE0] dark:border-[#3C4043] pt-6 sm:col-span-2 space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Expertise Block 2</h4>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expertise 2 Title</label>
                                    <Input 
                                        name="founder_exp2_title" 
                                        value={form.founder_exp2_title} 
                                        onChange={handleChange} 
                                        required 
                                        className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                        placeholder="Business Automation"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expertise 2 Description</label>
                                    <Textarea 
                                        name="founder_exp2_desc" 
                                        value={form.founder_exp2_desc} 
                                        onChange={handleChange} 
                                        required 
                                        rows={2}
                                        className="bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600 resize-none p-3 text-sm" 
                                        placeholder="Describe automation expertise..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 3 Expertise */}
                        <div className="border-t border-[#DADCE0] dark:border-[#3C4043] pt-6 sm:col-span-2 space-y-4">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Expertise Block 3</h4>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expertise 3 Title</label>
                                    <Input 
                                        name="founder_exp3_title" 
                                        value={form.founder_exp3_title} 
                                        onChange={handleChange} 
                                        required 
                                        className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                        placeholder="Execution Excellence"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expertise 3 Description</label>
                                    <Textarea 
                                        name="founder_exp3_desc" 
                                        value={form.founder_exp3_desc} 
                                        onChange={handleChange} 
                                        required 
                                        rows={2}
                                        className="bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600 resize-none p-3 text-sm" 
                                        placeholder="Describe execution expertise..."
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Pricing Configuration Card */}
                <Card className="bg-white dark:bg-[#292A2D] border border-[#DADCE0] dark:border-[#3C4043] shadow-none rounded-lg lg:col-span-2">
                    <CardHeader className="border-b border-[#DADCE0] dark:border-[#3C4043]">
                        <CardTitle className="text-lg font-medium text-[#202124] dark:text-white flex items-center gap-2">
                            <Globe className="w-5 h-5 text-emerald-600 dark:text-[#81C995]" />
                            Global Pricing Configuration
                        </CardTitle>
                        <CardDescription className="text-xs text-[#5F6368] dark:text-[#9AA0A6]">
                            Dynamically scale all service prices across the platform. E.g., setting to 1.2 will automatically increase all base prices by 20%.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-2 max-w-sm">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Global Price Multiplier</label>
                            <Input 
                                name="global_price_multiplier" 
                                type="number"
                                step="0.0001"
                                value={form.global_price_multiplier} 
                                onChange={handleChange} 
                                required 
                                className="h-11 bg-slate-50 dark:bg-[#202124] border-[#DADCE0] dark:border-[#3C4043] focus-visible:ring-1 focus-visible:ring-blue-600" 
                                placeholder="1.0"
                            />
                            <p className="text-[11px] text-[#5F6368] dark:text-[#9AA0A6]">Default is 1.0 (Base Price). Increase this value to globally raise prices.</p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </form>
    );
}
