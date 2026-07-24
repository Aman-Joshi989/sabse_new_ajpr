import { NextResponse } from 'next/server';
import { getSocialLeads, updateSocialLeadStatus, ensureDbInitialized } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await ensureDbInitialized();
    const leads = await getSocialLeads();
    return NextResponse.json({ leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    
    await ensureDbInitialized();
    await updateSocialLeadStatus(id, status);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
