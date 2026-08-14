import { NextResponse } from 'next/server';
import { getRecentAgentLogs } from '@/lib/db/queries';

export async function GET(req: Request) {
  try {
    // Optionally add auth check here, assuming it's protected by dashboard middleware
    const logs = await getRecentAgentLogs();
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error fetching agent logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
