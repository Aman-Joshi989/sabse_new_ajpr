import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    try {
        const { 
            name, 
            email, 
            companyName, 
            websiteUrl, 
            bookingDate, 
            bookingTime, 
            topic 
        } = await req.json();

        if (!name || !email || !bookingDate || !bookingTime) {
            return NextResponse.json({ error: "Name, email, date, and time slot are required" }, { status: 400 });
        }

        // Run safe check migrations to create bookings table if not exists
        await sql`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company_name TEXT,
                website_url TEXT,
                booking_date DATE NOT NULL,
                booking_time VARCHAR(50) NOT NULL,
                topic TEXT,
                status VARCHAR(20) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await sql`
            INSERT INTO bookings (
                name, 
                email, 
                company_name, 
                website_url, 
                booking_date, 
                booking_time, 
                topic
            ) VALUES (
                ${name}, 
                ${email}, 
                ${companyName || ''}, 
                ${websiteUrl || ''}, 
                ${bookingDate}, 
                ${bookingTime}, 
                ${topic || ''}
            )
        `;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Booking creation error:", error);
        return NextResponse.json({ error: error.message || "Failed to book strategy call" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    try {
        // Run safe migration
        await sql`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                company_name TEXT,
                website_url TEXT,
                booking_date DATE NOT NULL,
                booking_time VARCHAR(50) NOT NULL,
                topic TEXT,
                status VARCHAR(20) DEFAULT 'Pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const list = await sql`
            SELECT id, name, email, company_name, website_url, 
                   TO_CHAR(booking_date, 'YYYY-MM-DD') as booking_date, 
                   booking_time, topic, status, created_at
            FROM bookings 
            ORDER BY booking_date DESC, booking_time ASC
        `;

        return NextResponse.json({ success: true, bookings: list });
    } catch (error: any) {
        console.error("Booking retrieval error:", error);
        return NextResponse.json({ error: error.message || "Failed to retrieve bookings" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Booking ID and new status are required" }, { status: 400 });
        }

        await sql`
            UPDATE bookings 
            SET status = ${status} 
            WHERE id = ${id}
        `;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Booking update error:", error);
        return NextResponse.json({ error: error.message || "Failed to update booking status" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
        }

        await sql`
            DELETE FROM bookings 
            WHERE id = ${id}
        `;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Booking deletion error:", error);
        return NextResponse.json({ error: error.message || "Failed to delete booking" }, { status: 500 });
    }
}
