import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdminApi, assertSameOrigin } from '@/lib/admin/guard';
import {
  getJobPostingById,
  updateJobPosting,
  toggleJobPostingPublish,
  deleteJobPosting,
} from '@/lib/db/queries';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const { id } = await params;
  try {
    const job = await getJobPostingById(id);
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: originCheck.error || 'Forbidden' }, { status: 403 });
  }

  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const { id } = await params;
  try {
    const body = await req.json();

    const toArray = (val: any) => {
      if (Array.isArray(val)) return val.map((s) => String(s).trim()).filter(Boolean);
      if (typeof val === 'string') return val.split('\n').map((s) => s.trim()).filter(Boolean);
      return [];
    };

    const updatedJob = await updateJobPosting(id, {
      title: body.title?.trim(),
      department: body.department,
      job_type: body.job_type,
      location: body.location,
      experience: body.experience,
      compensation: body.compensation,
      short_summary: body.short_summary,
      skills: body.skills !== undefined ? toArray(body.skills) : undefined,
      responsibilities: body.responsibilities !== undefined ? toArray(body.responsibilities) : undefined,
      must_haves: body.must_haves !== undefined ? toArray(body.must_haves) : undefined,
      nice_to_haves: body.nice_to_haves !== undefined ? toArray(body.nice_to_haves) : undefined,
      highlights: body.highlights !== undefined ? toArray(body.highlights) : undefined,
      published: body.published !== undefined ? Boolean(body.published) : undefined,
      display_order: body.display_order !== undefined ? Number(body.display_order) : undefined,
    });

    revalidatePath('/careers');
    return NextResponse.json({ success: true, job: updatedJob });
  } catch (error: any) {
    console.error('Error updating job posting:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: originCheck.error || 'Forbidden' }, { status: 403 });
  }

  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const published = Boolean(body.published);
    const result = await toggleJobPostingPublish(id, published);

    revalidatePath('/careers');
    return NextResponse.json({ success: true, job: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const originCheck = assertSameOrigin(req);
  if (!originCheck.valid) {
    return NextResponse.json({ error: originCheck.error || 'Forbidden' }, { status: 403 });
  }

  const adminCheck = await requireAdminApi(req);
  if (!adminCheck.authorized) {
    return adminCheck.response;
  }

  const { id } = await params;
  try {
    const result = await deleteJobPosting(id);
    revalidatePath('/careers');
    return NextResponse.json({ success: true, deleted: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
