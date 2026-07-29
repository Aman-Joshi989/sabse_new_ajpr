'use client'

import React, { useState } from 'react'
import { MessageSquare, X, Send, User, Bot, CheckCircle } from 'lucide-react'

type Message = {
  id: string
  text: string
  sender: 'bot' | 'user'
}

export default function FloatingLeadWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm AJPR's AI assistant. Are you looking to scale your startup or business?", sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userText = inputValue.trim()
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }])
    setInputValue('')
    
    // Simple state machine for lead qualification
    if (step === 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          text: "Great! We specialize in custom software and SEO. What is the best email to reach you at to schedule a free strategy call?", 
          sender: 'bot' 
        }])
        setStep(1)
      }, 1000)
    } else if (step === 1) {
      // Basic email validation
      if (userText.includes('@') && userText.includes('.')) {
        setStatus('loading')
        try {
          const res = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userText })
          })
          
          if (res.ok) {
            setStatus('success')
            setMessages(prev => [...prev, { 
              id: Date.now().toString(), 
              text: "Perfect, I've saved your email! Our team will reach out shortly. You can close this chat now.", 
              sender: 'bot' 
            }])
            setStep(2)
          } else {
            throw new Error('Failed')
          }
        } catch (err) {
          setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            text: "Oops, something went wrong saving your email. Please try again or use our contact form.", 
            sender: 'bot' 
          }])
          setStatus('idle')
        }
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            text: "That doesn't look like a valid email. Could you try again?", 
            sender: 'bot' 
          }])
        }, 500)
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-[350px] sm:w-[400px] h-[500px] mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">AJPR Growth Bot</h3>
                <p className="text-xs text-slate-300">Online usually replies instantly</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-amber-400 text-slate-900 rounded-br-none font-medium' 
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {status === 'loading' && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                placeholder={step === 2 ? "Chat closed." : "Type your message..."}
                className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 dark:text-white"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={step === 2 || status === 'loading'}
              />
              <button 
                type="submit" 
                disabled={step === 2 || status === 'loading' || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-400 text-slate-900 rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  )
}
