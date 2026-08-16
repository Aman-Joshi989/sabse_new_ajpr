import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { sql } from '@/lib/db/queries';

export const maxDuration = 60; 

export async function GET(request: Request) {
    try {
        
        
        // Simulating checking security logs, auth attempts, WAF logs etc.
        const recentAuthErrors = await sql`SELECT count(*) FROM user_sessions WHERE created_at > NOW() - INTERVAL '24 hours' AND status = 'failed'`;
        
        // This agent evaluates threat levels and generates a security brief
        const prompt = `You are Agent Aegis, the Chief Cybersecurity Officer for AJPR World.
The system just detected ${recentAuthErrors[0]?.count || 0} failed authentication attempts in the last 24 hours.
Review standard web security postures. Generate a daily threat intelligence report for the company's Next.js application hosted on Vercel with Neon Postgres.
Recommend immediate actions if the threat level is elevated. Ensure your tone is highly professional, vigilant, and authoritative. Date: 2026.`;

        const { text: report } = await generateText({
            model: openai('gpt-4o'),
            prompt: prompt,
            system: 'You are Agent Aegis, a highly advanced autonomous cybersecurity AI responsible for protecting corporate infrastructure from chaos and cyber threats.',
        });

        // Store the security report in the agent logs table
        const actionPayload = `Daily Threat Assessment:\n\n${report}`;
        await sql`
            INSERT INTO agent_logs (agent_name, action, status)
            VALUES ('Aegis (Cybersecurity)', ${actionPayload}, 'success')
        `;

        return NextResponse.json({ success: true, agent: 'Aegis', status: 'Threat assessment complete', report });
    } catch (error) {
        console.error("Agent Aegis failed:", error);
        return NextResponse.json({ success: false, error: 'Aegis offline or error encountered' }, { status: 500 });
    }
}
