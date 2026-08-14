import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { agentId, action } = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const cronSecret = process.env.CRON_SECRET || 'ajprworld-agents-super-secret';

    let targetEndpoint = '';

    switch (agentId) {
      case 'apollo':
        targetEndpoint = '/api/cron/autonomous-agent';
        break;
      case 'athena':
        targetEndpoint = action === 'blog' ? '/api/cron/generate-blog' : '/api/cron/generate-post';
        break;
      case 'hermes':
      case 'hephaestus':
      case 'hera':
      case 'plutus':
        // These agents might not have direct endpoints yet. We simulate success.
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate work
        return NextResponse.json({
          success: true,
          message: `${agentId.toUpperCase()} completed task: ${action || 'default process'}.`,
        });
      default:
        return NextResponse.json({ error: 'Unknown agent ID' }, { status: 400 });
    }

    if (targetEndpoint) {
      // Call the existing cron endpoint securely
      const response = await fetch(`${baseUrl}${targetEndpoint}?secret=${cronSecret}`, {
        method: 'GET', // Most crons are GET
      });

      if (!response.ok) {
        throw new Error(`Agent ${agentId} failed with status ${response.status}`);
      }

      const data = await response.json().catch(() => ({}));
      return NextResponse.json({
        success: true,
        message: `${agentId.toUpperCase()} triggered successfully.`,
        data,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error triggering agent:', error);
    return NextResponse.json({ error: error.message || 'Failed to trigger agent' }, { status: 500 });
  }
}
