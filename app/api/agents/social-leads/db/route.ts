import { NextRequest, NextResponse } from 'next/server';
import { getSocialLeads, updateSocialLeadStatus, ensureDbInitialized } from '@/lib/db/queries';
import { requireAdminApi, assertSameOrigin } from '@/lib/admin/guard';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  try {
    await ensureDbInitialized();
    const leads = await getSocialLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;

  const originCheck = assertSameOrigin(request);
  if (!originCheck.valid) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }
    
    await ensureDbInitialized();
    await updateSocialLeadStatus(id, status);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
