import { NextResponse } from "next/server";
import { sql } from "@/lib/db/queries";
import { getSession } from "@/lib/auth";
import crypto from "crypto";
import { dispatchBookingEmails, generateReferenceId } from "@/lib/email/contact-mailer";

function generateGoogleMeetLink() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const part1 = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * 26)]).join("");
    const part2 = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * 26)]).join("");
    const part3 = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * 26)]).join("");
    return `https://meet.google.com/${part1}-${part2}-${part3}`;
}

export async function POST(req: Request) {
    try {
        const { 
            name, 
            email, 
            companyName, 
            websiteUrl, 
            bookingDate, 
            bookingTime, 
            topic,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = await req.json();

        if (!name || !email || !bookingDate || !bookingTime) {
            return NextResponse.json({ error: "Name, email, date, and time slot are required" }, { status: 400 });
        }

        // 🔒 Cryptographic Token Payment Validation (if Razorpay credentials are present)
        if (process.env.RAZORPAY_KEY_SECRET) {
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                return NextResponse.json({ error: "Payment verification details are required to book a session" }, { status: 400 });
            }

            const text = razorpay_order_id + "|" + razorpay_payment_id;
            const generatedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(text)
                .digest("hex");

            if (generatedSignature !== razorpay_signature) {
                return NextResponse.json({ error: "Cryptographic signature validation failed. Payment is invalid." }, { status: 400 });
            }
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
                status VARCHAR(20) DEFAULT 'Confirmed',
                meet_link TEXT,
                payment_id TEXT,
                payment_status VARCHAR(20) DEFAULT 'Paid',
                reference_id VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Apply migrations for existing tables safely
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS meet_link TEXT;`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id TEXT;`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'Paid';`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS reference_id VARCHAR(100);`;

        const meetLink = generateGoogleMeetLink();
        const referenceId = generateReferenceId('AJPR-BOOK');

        await sql`
            INSERT INTO bookings (
                name, 
                email, 
                company_name, 
                website_url, 
                booking_date, 
                booking_time, 
                topic,
                meet_link,
                payment_id,
                payment_status,
                status,
                reference_id
            ) VALUES (
                ${name}, 
                ${email}, 
                ${companyName || ''}, 
                ${websiteUrl || ''}, 
                ${bookingDate}, 
                ${bookingTime}, 
                ${topic || 'Technical Strategy Session'},
                ${meetLink},
                ${razorpay_payment_id || 'direct_booking'},
                'Paid',
                'Confirmed',
                ${referenceId}
            )
        `;

        // Dispatch immediate booking confirmations to client and admin
        try {
            await dispatchBookingEmails({
                referenceId,
                name,
                email,
                companyName,
                websiteUrl,
                bookingDate,
                bookingTime,
                topic,
                meetLink,
            });
        } catch (mailErr) {
            console.error("[Bookings API] Notification dispatch error:", mailErr);
        }

        return NextResponse.json({ success: true, meetLink, referenceId });
    } catch (error: any) {
        console.error("Booking creation error:", error);
        return NextResponse.json({ error: error.message || "Failed to book strategy call" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    // 🔒 SECURITY CHECK: Ensure user is authenticated as admin
    const session = await getSession();
    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
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
                reference_id VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const list = await sql`
            SELECT id, name, email, company_name, website_url, 
                   TO_CHAR(booking_date, 'YYYY-MM-DD') as booking_date, 
                   booking_time, topic, status, meet_link, payment_id, payment_status, reference_id, created_at
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
    // 🔒 SECURITY CHECK: Ensure user is authenticated as admin
    const session = await getSession();
    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Booking ID and new status are required" }, { status: 400 });
        }

        // Fetch current booking information
        const [booking] = await sql`
            SELECT id, name, email, company_name, website_url, 
                   TO_CHAR(booking_date, 'YYYY-MM-DD') as booking_date, 
                   booking_time, topic, meet_link, reference_id
            FROM bookings 
            WHERE id = ${id}
        `;

        let meetLink = booking?.meet_link || generateGoogleMeetLink();

        // Update status and ensure meet link exists
        await sql`
            UPDATE bookings 
            SET status = ${status}, meet_link = ${meetLink}
            WHERE id = ${id}
        `;

        // If updated to Confirmed, send confirmation email via unified mailer
        if (booking && status === 'Confirmed') {
            try {
                await dispatchBookingEmails({
                    referenceId: booking.reference_id || `AJPR-BOOK-${booking.id}`,
                    name: booking.name,
                    email: booking.email,
                    companyName: booking.company_name,
                    websiteUrl: booking.website_url,
                    bookingDate: booking.booking_date,
                    bookingTime: booking.booking_time,
                    topic: booking.topic,
                    meetLink,
                });
            } catch (mailErr) {
                console.error("[Bookings API] Status update email error:", mailErr);
            }
        }

        return NextResponse.json({ success: true, meetLink });
    } catch (error: any) {
        console.error("Booking update error:", error);
        return NextResponse.json({ error: error.message || "Failed to update booking status" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    // 🔒 SECURITY CHECK: Ensure user is authenticated as admin
    const session = await getSession();
    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

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
