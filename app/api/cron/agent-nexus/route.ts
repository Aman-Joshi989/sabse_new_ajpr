import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getDbConnection } from '@/lib/db';

export const maxDuration = 60; 

export async function GET(request: Request) {
    try {
        const sql = await getDbConnection();
        
        // Fetch the recent activity of all agents to pass to Nexus for management review
        const recentLogs = await sql`
            SELECT agent_name, action, timestamp 
            FROM agent_logs 
            ORDER BY timestamp DESC 
            LIMIT 50
        `;
        
        const logsStr = recentLogs.map(l => `[${l.timestamp.toISOString()}] ${l.agent_name}: ${l.action}`).join('\n');

        const prompt = `You are Agent Nexus, the Chief Operations AI Manager.
Your job is to oversee all autonomous agents running on the system (Hermes, Daedalus, Aegis, Artemis, etc.).
Review the following recent system logs of their activities:
${logsStr || "No recent activity found."}

Identify any anomalies, bottlenecks, or failures in the autonomous workforce. Provide a concise management briefing on the overall health of the AI agent ecosystem and recommend any operational adjustments. Date: 2026.`;

        const { text: report } = await generateText({
            model: openai('gpt-4o'),
            prompt: prompt,
            system: 'You are Agent Nexus, an overseer meta-agent. You manage and optimize other AI agents to ensure smooth company operations.',
        });

        // Store the management report in the agent logs table
        const actionPayload = `System Overseer Report:\n\n${report}`;
        await sql`
            INSERT INTO agent_logs (agent_name, action, status)
            VALUES ('Nexus (Manager)', ${actionPayload}, 'success')
        `;

        return NextResponse.json({ success: true, agent: 'Nexus', status: 'Management review complete', report });
    } catch (error) {
        console.error("Agent Nexus failed:", error);
        return NextResponse.json({ success: false, error: 'Nexus offline or error encountered' }, { status: 500 });
    }
}
