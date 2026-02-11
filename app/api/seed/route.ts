import { NextResponse } from 'next/server';
import { neon } from "@neondatabase/serverless";
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Check if admin exists
        const existing = await sql`SELECT * FROM users WHERE email = 'admin@ajpr.com'`;
        if (existing.length > 0) {
            return NextResponse.json({ message: 'Admin already exists' });
        }

        await sql`
      INSERT INTO users (name, email, password, role)
      VALUES ('Admin User', 'admin@ajpr.com', ${hashedPassword}, 'admin');
    `;

        // Also seed a developer
        const devHash = await bcrypt.hash('dev123', 10);
        const existingDev = await sql`SELECT * FROM users WHERE email = 'dev@ajpr.com'`;
        if (existingDev.length === 0) {
            await sql`
            INSERT INTO users (name, email, password, role)
            VALUES ('John Developer', 'dev@ajpr.com', ${devHash}, 'developer');
        `;
        }

        return NextResponse.json({ message: 'Admin and Developer seeded' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
