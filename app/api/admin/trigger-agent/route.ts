import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi, assertSameOrigin } from '@/lib/admin/guard';
import { insertAgentLog } from '@/lib/db/queries';

export async function POST(req: NextRequest) {
  // Defense in depth: Verify admin session
  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  // State-changing request: verify Origin matches site URL
  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { agentId, action } = await req.json();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: 'Internal configuration error' }, { status: 500 });
    }

    const cronSecret = process.env.CRON_SECRET || process.env.AGENT_SECRET;
    if (!cronSecret) {
      return NextResponse.json({ error: 'Internal configuration error' }, { status: 500 });
    }

    let targetEndpoint = '';

    switch (agentId) {
      case 'apollo':
        targetEndpoint = '/api/cron/autonomous-agent';
        break;
      case 'athena':
        targetEndpoint = action === 'blog' ? '/api/cron/generate-blog' : '/api/cron/generate-post';
        break;
      case 'hermes':
        targetEndpoint = '/api/cron/agent-hermes';
        break;
      case 'hephaestus':
        targetEndpoint = '/api/cron/agent-hephaestus';
        break;
      case 'hera':
        targetEndpoint = '/api/cron/agent-hera';
        break;
      case 'plutus':
        targetEndpoint = '/api/cron/agent-plutus';
        break;
      default:
        return NextResponse.json({ error: 'Unknown agent ID' }, { status: 400 });
    }

    if (targetEndpoint) {
      await insertAgentLog(agentId, `Manually triggered task: ${action || 'default process'}`);
      
      const targetUrl = new URL(targetEndpoint, baseUrl);
      const response = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cronSecret}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Agent execution failed with status ${response.status}`);
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
    console.error('Error triggering agent:', error?.message || 'Unknown error');
    return NextResponse.json({ error: 'Failed to trigger agent' }, { status: 500 });
  }
}
