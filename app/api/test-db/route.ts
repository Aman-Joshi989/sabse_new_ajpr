import { NextResponse } from 'next/server';
import { getBlogBySlug } from '@/lib/db/queries';

export async function GET() {
    try {
        const post = await getBlogBySlug('ai-for-real-estate-automating-property-management');
        return NextResponse.json({ success: true, post: post || 'POST_NOT_FOUND', env_exists: !!process.env.DATABASE_URL });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message, stack: e.stack });
    }
}
