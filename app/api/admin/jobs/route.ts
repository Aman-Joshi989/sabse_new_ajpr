import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminApi, assertSameOrigin } from '@/lib/admin/guard';
import {
  getAllJobPostingsAdmin,
  createJobPosting,
} from '@/lib/db/queries';

export async function GET(req: NextRequest) {
  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  try {
    const jobs = await getAllJobPostingsAdmin();
    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    console.error('Error fetching admin jobs:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: originCheck.error || 'Forbidden' }, { status: 403 });
  }

  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  try {
    const body = await req.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ success: false, error: 'Job title is required' }, { status: 400 });
    }

    // Normalize array fields
    const toArray = (val: any) => {
      if (Array.isArray(val)) return val.map((s) => String(s).trim()).filter(Boolean);
      if (typeof val === 'string') return val.split('\n').map((s) => s.trim()).filter(Boolean);
      return [];
    };

    const newJob = await createJobPosting({
      title: body.title.trim(),
      department: body.department || 'Engineering',
      job_type: body.job_type || 'Full-time',
      location: body.location || 'Remote',
      experience: body.experience || '2+ years',
      compensation: body.compensation || 'Competitive',
      short_summary: body.short_summary || '',
      skills: toArray(body.skills),
      responsibilities: toArray(body.responsibilities),
      must_haves: toArray(body.must_haves),
      nice_to_haves: toArray(body.nice_to_haves),
      highlights: toArray(body.highlights),
      published: Boolean(body.published ?? true),
      display_order: Number(body.display_order || 0),
    });

    revalidatePath('/careers');
    return NextResponse.json({ success: true, job: newJob });
  } catch (error: any) {
    console.error('Error creating job posting:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
