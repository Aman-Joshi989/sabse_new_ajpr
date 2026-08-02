import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
