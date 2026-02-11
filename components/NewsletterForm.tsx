"use client";
import { useState } from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("✅ You’re subscribed!");
                setEmail("");
            } else {
                setMessage("❌ " + data.error);
            }
        } catch (error) {
            setMessage("⚠️ Network error.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Stay Connected</h2>
            <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Subscribe
                </button>
            </form>
            {message && <p className="mt-3 text-sm">{message}</p>}
        </div>
    );
}
