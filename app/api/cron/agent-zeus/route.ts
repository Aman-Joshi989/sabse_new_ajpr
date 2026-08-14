import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { insertAgentLog, getRecentAgentLogs } from '@/lib/db/queries';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new Response('Unauthorized', { status: 401 });
        }
    }

    const agentId = 'zeus';
    try {
        await insertAgentLog(agentId, 'Zeus initializing system oversight protocol...');
    } catch (e) {
        console.error("Failed to insert wake log", e);
    }

    try {
        await insertAgentLog(agentId, 'Fetching recent autonomous activity logs from all sub-agents...');
        
        const logs = await getRecentAgentLogs();
        if (!logs || logs.length === 0) {
            await insertAgentLog(agentId, 'No recent agent activity to review.');
            return NextResponse.json({ success: true, message: 'No activity found' });
        }

        const logSummaries = logs.map((l: any) => `[${l.created_at}] ${l.agent_name.toUpperCase()}: ${l.action} (Status: ${l.status})`).join('\n');

        const prompt = `
            You are Zeus, the Overseer AI Agent for an autonomous software agency.
            Your job is to read the raw activity logs of all your sub-agents (Daedalus, Thoth, Artemis, Midas, Apollo, Hermes, etc.)
            and generate a concise, professional 2-3 sentence Executive Summary of what they have been doing.
            If any agent is logging errors or failing repeatedly, call it out immediately.

            Recent Agent Logs:
            ${logSummaries}

            Return ONLY the summary string (no formatting, no JSON).
        `;

        await insertAgentLog(agentId, `Analyzing ${logs.length} log entries for anomalies and productivity metrics...`);

        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            prompt: prompt,
            temperature: 0.2,
        });

        const logMessage = `Executive Overview: ${text.trim()}`;
        
        await insertAgentLog(agentId, logMessage);

        return NextResponse.json({ success: true, summary: text.trim() });

    } catch (error: any) {
        console.error('Zeus Error:', error);
        await insertAgentLog(agentId, `Fatal error during oversight analysis: ${error.message}`, 'error');
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
