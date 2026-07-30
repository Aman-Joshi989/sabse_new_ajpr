import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    try {
        // Ensure the table exists before attempting to insert
        await sql`
            CREATE TABLE IF NOT EXISTS subscribers (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await sql`INSERT INTO subscribers (email) VALUES (${email})`;
        return NextResponse.json({ success: true });
    } catch (error: any) {
        if (error.message.includes("duplicate key")) {
            return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
        }
        console.error("DB Error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
