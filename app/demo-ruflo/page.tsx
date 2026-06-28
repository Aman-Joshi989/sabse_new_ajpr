import { Metadata } from 'next'
import SwarmSimulator from './SwarmSimulator'

export const metadata: Metadata = {
  title: 'RuFlo V3 Swarm Simulator – AI Agent Orchestration | AJPR World',
  description: 'Visualize and interact with the RuFlo V3 multi-agent swarm in real-time. Witness Raft consensus, collaborative code writing, and security auditing live.',
  keywords: 'RuFlo, AI agents, agent swarm, swarm simulator, multi-agent system, AI coding assistant, AJPR World',
  openGraph: {
    title: 'RuFlo V3 Swarm Simulator – AI Agent Orchestration | AJPR World',
    description: 'Visualize and interact with the RuFlo V3 multi-agent swarm in real-time.',
    url: 'https://ajprworld.com/demo-ruflo',
    type: 'website'
  }
}

export default function Page() {
  return <SwarmSimulator />
}
