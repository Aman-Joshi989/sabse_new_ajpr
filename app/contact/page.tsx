"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import React from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setMessage("✅ Message sent successfully!");
                setForm({ name: "", email: "", phone: "", message: "" });
            } else {
                const data = await res.json();
                setMessage("❌ " + (data.error || "Failed to send message"));
            }
        } catch (err) {
            console.error(err);
            setMessage("⚠️ Network error");
        }

        setSubmitting(false);
    };

    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-600 mb-4">
                        <Mail className="w-5 h-5 mr-2" /> Get In Touch
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Contact Us</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Have a project or query? Fill out the form or use one of the quick contact options below.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Quick Contact Options */}
                    <div className="space-y-6">
                        {[
                            { icon: Phone, title: "Call Us", value: "+91 82737 92119", link: "tel:+919811139030" },
                            { icon: Mail, title: "Email Us", value: "ajprworld@gmail.com", link: "mailto:ajprworld@gmail.com" },
                            { icon: MessageCircle, title: "WhatsApp", value: "Chat on WhatsApp", link: "https://wa.me/919811139030" },
                            { icon: MapPin, title: "Visit Us", value: "Nainital, Uttarakhand", link: "#" }
                        ].map((c, i) => (
                            <Card key={i} className="p-6 hover-lift group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300">
                                            {React.createElement(c.icon, { className: "w-6 h-6" })}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{c.title}</h4>
                                            <Link href={c.link} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                {c.value}
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 border-0 shadow-2xl hover-lift">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold">Send Us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} required />
                                </div>

                                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors" disabled={submitting}>
                                    {submitting ? "Sending..." : "Send Message"} <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>

                                {message && <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">{message}</p>}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
