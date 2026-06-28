import { Metadata } from 'next'
import ChatPlayground from './ChatPlayground'

export const metadata: Metadata = {
  title: 'RuFlo AI Chat Playground – Talk to Agent Swarms | AJPR World',
  description: 'Interact with specialized AI agents (Coder, Tester, Architect, Security Analyst) in our live chat playground. Experience collaborative swarm intelligence.',
  keywords: 'AI agent chat, multi-agent chat, RuFlo playground, agent collaboration, interactive AI assistant, AJPR World',
  openGraph: {
    title: 'RuFlo AI Chat Playground – Talk to Agent Swarms | AJPR World',
    description: 'Interact with specialized AI agents (Coder, Tester, Architect, Security Analyst) in our live chat playground.',
    url: 'https://ajprworld.com/chat-agents',
    type: 'website'
  }
}

export default function Page() {
  return <ChatPlayground />
}
