import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
    try {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        
        const slug = 'ai-for-real-estate-automating-property-management';
        const res = await pool.query('SELECT * FROM blog_posts WHERE slug = $1 AND published = true;', [slug]);
        
        return NextResponse.json({ success: true, count: res.rows.length, data: res.rows });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message, stack: e.stack });
    }
}
