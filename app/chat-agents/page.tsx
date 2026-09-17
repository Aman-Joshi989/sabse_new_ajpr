import { Metadata } from 'next'
import ChatPlayground from './ChatPlayground'

export const metadata: Metadata = {
  title: 'RuFlo AI Chat Playground – Talk to Agent Swarms | AJPR World',
  description: 'Interact with specialized AI agents (Coder, Tester, Architect, Security Analyst) in our live chat playground. Experience collaborative swarm intelligence.',
  keywords: 'AI agent chat, multi-agent chat, RuFlo playground, agent collaboration, interactive AI assistant, AJPR World',
  alternates: {
    canonical: 'https://ajprworld.com/chat-agents',
  },
  openGraph: {
    title: 'RuFlo AI Chat Playground – Talk to Agent Swarms | AJPR World',
    description: 'Interact with specialized AI agents (Coder, Tester, Architect, Security Analyst) in our live chat playground.',
    url: 'https://ajprworld.com/chat-agents',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RuFlo AI Chat Playground | AJPR World',
    description: 'Interact with specialized AI agents in our live chat playground.',
    creator: '@ajprworld',
    images: ['https://ajprworld.com/og-image.jpg']
  }
}

export default function Page() {
  return <ChatPlayground />
}
