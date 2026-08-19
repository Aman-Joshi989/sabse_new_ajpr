// @ts-nocheck
'use client';

import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AICostEstimator() {
    // @ts-ignore
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat/estimator',
        initialMessages: [
            {
                id: '1',
                role: 'assistant',
                content: 'Hi! I am the AJPR World AI Estimator. Describe the Custom AI MVP you want to build, and I will generate a technical architecture, timeline, and cost estimate for you.'
            }
        ]
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 text-blue-600" />
                        AI MVP Cost Estimator
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Describe your custom AI software idea. Our AI will instantly calculate a premium cost estimate and timeline.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[600px]">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map(m => (
                            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {m.role === 'assistant' && (
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl p-5 ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'}`}>
                                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                                        <ReactMarkdown components={{ h1: 'h2' }}>{m.content}</ReactMarkdown>
                                    </div>
                                </div>
                                {m.role === 'user' && (
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                        <User className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4 justify-start">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-5 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75" />
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150" />
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                        <div className="relative flex items-center">
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="e.g., I want an AI chatbot that reads my company PDFs and answers customer questions..."
                                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input?.trim()}
                                className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
