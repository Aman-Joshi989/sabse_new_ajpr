import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

export async function POST(req: Request) {
    const sql = neon(process.env.DATABASE_URL!);
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!signature) {
            console.error("Razorpay webhook signature header is missing");
            return NextResponse.json({ error: "Signature header missing" }, { status: 400 });
        }

        // 🔒 Cryptographic Webhook Security Verification
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(rawBody)
            .digest("hex");

        if (expectedSignature !== signature) {
            console.error("Razorpay webhook verification failed: Signature mismatch");
            return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
        }

        // Parse verified payload safely
        const payload = JSON.parse(rawBody);
        const event = payload.event;

        console.log("Verified Razorpay Webhook Event Received:", event);

        if (event === "order.paid" || event === "payment.captured") {
            const payment = payload.payload.payment?.entity;
            const order = payload.payload.order?.entity;
            const notes = order?.notes || payment?.notes;
            const paymentId = payment?.id;

            if (!paymentId || !notes || !notes.bookingDate || !notes.bookingTime) {
                console.warn("Skipping webhook insert: Incomplete notes/payment payload:", { paymentId, notes });
                return NextResponse.json({ success: true, message: "Skipped: Missing metadata notes" });
            }

            // Check if the booking record is already stored in the database
            const existingBookings = await sql`
                SELECT id FROM bookings WHERE payment_id = ${paymentId}
            `;

            if (existingBookings.length > 0) {
                console.log(`Booking with payment ID ${paymentId} is already recorded. Skipping.`);
                return NextResponse.json({ success: true, message: "Duplicate booking skipped" });
            }

            // Create bookings table if missing
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
                    meet_link TEXT,
                    payment_id TEXT,
                    payment_status VARCHAR(20) DEFAULT 'Unpaid',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;

            await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id TEXT;`;
            await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'Unpaid';`;

            // Insert confirmed paid booking
            await sql`
                INSERT INTO bookings (
                    name, 
                    email, 
                    company_name, 
                    website_url, 
                    booking_date, 
                    booking_time, 
                    topic,
                    payment_id,
                    payment_status
                ) VALUES (
                    ${notes.name}, 
                    ${notes.email}, 
                    ${notes.companyName || ''}, 
                    ${notes.websiteUrl || ''}, 
                    ${notes.bookingDate}, 
                    ${notes.bookingTime}, 
                    ${notes.topic || ''},
                    ${paymentId},
                    'Paid'
                )
            `;

            console.log(`Successfully recorded booking via webhook for payment: ${paymentId}`);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: error.message || "Failed to process webhook" }, { status: 550 });
    }
}
