import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/db/queries";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await saveSubscriber(email);
    
    // We send the email even if they are already subscribed, 
    // in case they lost the original PDF link and want it again.
    if (result.success || result.error === "Already subscribed") {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS
                }
            });

            const mailOptions = {
                from: `"AJPR World" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: "Here is your Ultimate 2026 Growth Checklist 🚀",
                html: `
                    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                        <h2 style="color: #0f172a;">Welcome to AJPR World!</h2>
                        <p>Hi there,</p>
                        <p>Thank you for requesting our <strong>Ultimate 2026 Growth Checklist</strong>. This is the exact 50-point framework we use to scale startups from $0 to $1M in ARR.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://ajprworld.com/startup-growth-kit.pdf" style="background-color: #f59e0b; color: #0f172a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Download the PDF Checklist</a>
                        </div>
                        
                        <h3 style="color: #0f172a; margin-top: 40px;">What's next?</h3>
                        <p>If you're serious about implementing this checklist and want to see how our custom software and AI SEO engines can put this on autopilot for you, let's chat.</p>
                        <p>We only work with a handful of startups at a time to ensure maximum growth.</p>
                        
                        <div style="margin: 30px 0;">
                            <a href="https://ajprworld.com/contact" style="color: #0d9488; font-weight: bold; text-decoration: none;">&rarr; Book your free 30-minute strategy call here</a>
                        </div>
                        
                        <p>To your success,<br><strong>Aman Joshi</strong><br>Founder, AJPR World</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Failed to send welcome email:", error);
            // We don't fail the request if email sending fails, 
            // since the subscription was successful.
        }

        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json(
            { error: result.error }, 
            { status: 500 }
        );
    }
}
