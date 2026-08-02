import { NextResponse } from "next/server";
import { sql } from "@/lib/db/queries";
import { getSession } from "@/lib/auth";
import nodemailer from "nodemailer";
import crypto from "crypto";

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

        // 🔒 Cryptographic Token Payment Validation
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: "Payment verification details are required to book a session" }, { status: 400 });
        }

        const text = razorpay_order_id + "|" + razorpay_payment_id;
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(text)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ error: "Cryptographic signature validation failed. Payment is invalid." }, { status: 400 });
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
                meet_link TEXT,
                payment_id TEXT,
                payment_status VARCHAR(20) DEFAULT 'Unpaid',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Apply migrations for existing tables safely
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id TEXT;`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'Unpaid';`;

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
                ${name}, 
                ${email}, 
                ${companyName || ''}, 
                ${websiteUrl || ''}, 
                ${bookingDate}, 
                ${bookingTime}, 
                ${topic || ''},
                ${razorpay_payment_id},
                'Paid'
            )
        `;

        return NextResponse.json({ success: true });
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
                meet_link TEXT,
                payment_id TEXT,
                payment_status VARCHAR(20) DEFAULT 'Unpaid',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id TEXT;`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'Unpaid';`;

        const list = await sql`
            SELECT id, name, email, company_name, website_url, 
                   TO_CHAR(booking_date, 'YYYY-MM-DD') as booking_date, 
                   booking_time, topic, status, meet_link, payment_id, payment_status, created_at
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

        // Run safe migrations to add new columns if missing
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS meet_link TEXT;`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id TEXT;`;
        await sql`ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'Unpaid';`;

        let meetLink = '';
        if (status === 'Confirmed') {
            // Fetch current booking information
            const [booking] = await sql`
                SELECT name, email, TO_CHAR(booking_date, 'YYYY-MM-DD') as booking_date, booking_time, meet_link 
                FROM bookings 
                WHERE id = ${id}
            `;
            
            if (booking) {
                meetLink = booking.meet_link || generateGoogleMeetLink();
                
                // Update status and save meet link
                await sql`
                    UPDATE bookings 
                    SET status = ${status}, meet_link = ${meetLink}
                    WHERE id = ${id}
                `;

                // Create Nodemailer Transporter using SMTP settings
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS
                    }
                });

                // HTML Confirmation Email Template
                const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Strategy Session Confirmed</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
                            <tr>
                                <td align="center">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                                        <!-- Header banner -->
                                        <tr style="background-color: #2563eb;">
                                            <td style="padding: 30px 40px; text-align: center;">
                                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">AJPR World</h1>
                                            </td>
                                        </tr>
                                        <!-- Content -->
                                        <tr>
                                            <td style="padding: 40px; text-align: left;">
                                                <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 20px; font-size: 20px; font-weight: 700;">Strategy Session Confirmed!</h2>
                                                <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                                                    Hi ${booking.name},<br><br>
                                                    Your 30-Minute Strategy Session with Aman Joshi (AJPR World) has been successfully confirmed. We look forward to speaking with you.
                                                </p>
                                                
                                                <!-- Details Box -->
                                                <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
                                                    <h3 style="color: #0f172a; margin-top: 0; margin-bottom: 16px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Meeting Details</h3>
                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td style="color: #64748b; font-size: 14px; font-weight: 500; padding: 6px 0; width: 100px;">Date</td>
                                                            <td style="color: #0f172a; font-size: 14px; font-weight: 700; padding: 6px 0;">${booking.booking_date}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="color: #64748b; font-size: 14px; font-weight: 500; padding: 6px 0;">Time</td>
                                                            <td style="color: #0f172a; font-size: 14px; font-weight: 700; padding: 6px 0;">${booking.booking_time} (IST)</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="color: #64748b; font-size: 14px; font-weight: 500; padding: 6px 0;">Platform</td>
                                                            <td style="color: #0f172a; font-size: 14px; font-weight: 700; padding: 6px 0;">Google Meet</td>
                                                        </tr>
                                                    </table>
                                                </div>

                                                <!-- Call To Action Button -->
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td align="center" style="padding-bottom: 30px;">
                                                            <a href="${meetLink}" target="_blank" style="background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 16px 32px; border-radius: 8px; display: inline-block; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);">
                                                                Join Google Meet Call
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>

                                                <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-bottom: 0; text-align: center;">
                                                    Need to reschedule or cancel? Reply directly to this email or contact us at <a href="mailto:aman@ajprworld.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">aman@ajprworld.com</a>.
                                                </p>
                                            </td>
                                        </tr>
                                        <!-- Footer -->
                                        <tr style="background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                                            <td style="padding: 24px 40px; text-align: center; color: #94a3b8; font-size: 12px;">
                                                © ${new Date().getFullYear()} AJPR World. All rights reserved.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `;

                // Send confirmation to client
                await transporter.sendMail({
                    from: `"AJPR World Team" <${process.env.GMAIL_USER}>`,
                    to: booking.email,
                    subject: `Confirmed: 30-Minute Strategy Session - AJPR World`,
                    html: htmlContent
                });

                // Also notify admin
                await transporter.sendMail({
                    from: `"AJPR Booking System" <${process.env.GMAIL_USER}>`,
                    to: process.env.GMAIL_USER,
                    subject: `Strategy Session Confirmed: ${booking.name}`,
                    html: `
                        <h3>Meeting Confirmed!</h3>
                        <p><strong>Client:</strong> ${booking.name}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Date:</strong> ${booking.booking_date}</p>
                        <p><strong>Time:</strong> ${booking.booking_time} (IST)</p>
                        <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
                    `
                });
            }
        } else {
            // Update booking status
            await sql`
                UPDATE bookings 
                SET status = ${status} 
                WHERE id = ${id}
            `;

            if (status === 'Cancelled') {
                const [booking] = await sql`
                    SELECT name, email, TO_CHAR(booking_date, 'YYYY-MM-DD') as booking_date, booking_time 
                    FROM bookings 
                    WHERE id = ${id}
                `;

                if (booking) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.GMAIL_USER,
                            pass: process.env.GMAIL_PASS
                        }
                    });

                    // Send cancellation email to client
                    await transporter.sendMail({
                        from: `"AJPR World Team" <${process.env.GMAIL_USER}>`,
                        to: booking.email,
                        subject: `Cancelled: 30-Minute Strategy Session - AJPR World`,
                        html: `
                            <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #333;">
                                <h2>Meeting Cancelled</h2>
                                <p>Hi ${booking.name},</p>
                                <p>Your scheduled strategy session on <strong>${booking.booking_date}</strong> at <strong>${booking.booking_time}</strong> has been cancelled.</p>
                                <p>If you'd like to reschedule, please visit our booking page again at <a href="https://ajprworld.com/book-call">ajprworld.com/book-call</a>.</p>
                                <br>
                                <p>Best regards,<br>AJPR World Team</p>
                            </div>
                        `
                    });
                }
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
