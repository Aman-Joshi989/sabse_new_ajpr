'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Search, MapPin, Save, ArrowLeft, Loader2, Navigation, Mail } from 'lucide-react';
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
        contact_email: initialSettings?.contact_email || 'ajprworld@gmail.com',
        contact_phone: initialSettings?.contact_phone || '+91 9997205257'
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
                                placeholder="ajprworld@gmail.com"
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

            </div>
        </form>
    );
}
