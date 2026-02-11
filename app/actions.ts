'use server'

import { sendMessage, getUserByEmail } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import nodemailer from 'nodemailer';

import Razorpay from 'razorpay';

export async function login(prevState: any, formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Please enter both email and password." };
        }

        const user = await getUserByEmail(email);

        // If no user found or password doesn't match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: "Invalid credentials." };
        }

        // Create Session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await encrypt({ user: { id: user.id, email: user.email, role: user.role, name: user.name }, expires });

        (await cookies()).set("session", session, { expires, httpOnly: true });

        // Redirect based on role
        if (user.role === 'client') {
            redirect('/dashboard/client');
        } else if (user.role === 'developer') {
            redirect('/dashboard/developer');
        } else {
            redirect('/'); // Fallback
        }
    } catch (error: any) {
        console.error("Login Error:", error);
        if (error.message === "NEXT_REDIRECT") throw error; // Re-throw redirect
        return { error: "Login failed: " + error.message };
    }
}

export async function logout() {
    (await cookies()).delete("session");
    redirect("/login");
}

export async function submitMessage(content: string, senderName: string, senderRole: 'client' | 'developer') {
    if (!content || !content.trim()) return;
    try {
        await sendMessage(content, senderName, senderRole);
        revalidatePath('/dashboard/client');
        revalidatePath('/dashboard/developer');
        return { success: true };
    } catch (e) {
        console.error("Failed to send message", e);
        return { success: false };
    }
}

// --- Developer Dashboard Actions ---

import { updateTaskStatus, updateProjectHours } from "@/lib/db/queries";

export async function updateTaskStatusAction(taskId: number, status: string) {
    try {
        await updateTaskStatus(taskId, status);
        revalidatePath('/dashboard/developer');
        revalidatePath('/dashboard/client'); // Client sees progress too
        return { success: true };
    } catch (e) {
        console.error("Failed to update task", e);
        return { success: false };
    }
}

export async function logHoursAction(projectId: number, hours: number) {
    try {
        await updateProjectHours(projectId, hours);
        revalidatePath('/dashboard/developer');
        return { success: true };
    } catch (e) {
        console.error("Failed to log hours", e);
        return { success: false };
    }
}
import { createClientRequest } from "@/lib/db/queries";

// --- Email Integration ---

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Exporting for backfill usage
export async function sendOrderEmail(data: any) {
    // added advanceAmount to data destructuring
    const { name, email, phone, cart, total, advanceAmount, paymentId } = data;

    const itemsList = cart.map((item: any) =>
        `<li>${item.name} (x${item.quantity}) - ₹${item.price}</li>`
    ).join('');

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 20px 0;">
                <tr>
                    <td align="center">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color: #2563EB; padding: 30px 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">AJPR World</h1>
                                    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">New Guest Order Received</p>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                                        Hello Admin,
                                    </p>
                                    <p style="color: #374151; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                                        A new order has been placed by a guest user. Please review the details below and contact the client to finalize their account setup.
                                    </p>

                                    <!-- Client Details Box -->
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb; margin-bottom: 30px;">
                                        <tr>
                                            <td style="padding: 20px;">
                                                <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">Client Information</h3>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td style="padding: 5px 0; color: #6b7280; width: 100px; font-weight: bold;">Name:</td>
                                                        <td style="padding: 5px 0; color: #111827;">${name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 5px 0; color: #6b7280; width: 100px; font-weight: bold;">Email:</td>
                                                        <td style="padding: 5px 0; color: #111827;">${email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 5px 0; color: #6b7280; width: 100px; font-weight: bold;">Phone:</td>
                                                        <td style="padding: 5px 0; color: #111827;">${phone}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Order Summary -->
                                    <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Summary</h3>
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                                        ${cart.map((item: any) => `
                                        <tr>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #374151;">
                                                <strong>${item.name}</strong> <span style="color: #6b7280;">(x${item.quantity})</span>
                                            </td>
                                            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; text-align: right; font-weight: bold;">
                                                ₹${item.price.toLocaleString()}
                                            </td>
                                        </tr>
                                        `).join('')}
                                    </table>

                                    <!-- Totals -->
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; text-align: right;">Total Project Value:</td>
                                            <td style="padding: 8px 0; color: #374151; text-align: right; width: 120px; font-weight: bold;">₹${total.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #2563EB; text-align: right; font-weight: bold;">Advance Paid Now:</td>
                                            <td style="padding: 8px 0; color: #2563EB; text-align: right; width: 120px; font-weight: bold; font-size: 18px;">
                                                ₹${advanceAmount ? advanceAmount.toLocaleString() : (total * 0.5).toLocaleString()}
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Footer Info -->
                                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
                                        <p style="margin: 0 0 5px 0;"><strong>Payment ID:</strong> ${paymentId}</p>
                                        <p style="margin: 0;">This is an automated notification. Please do not reply directly to this email.</p>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} AJPR World. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to Admin (same as sender for now, or configured admin email)
            subject: `New Guest Order - ${name}`,
            html: htmlContent
        });
        console.log("Email sent successfully to admin.");
    } catch (error) {
        console.error("Failed to send email:", error);
        // Don't block the order flow if email fails, but log it
    }
}




export async function submitOrderRequest(data: any) {
    try {
        // Save to DB
        await createClientRequest(data);

        // Send Email for ALL orders (Guest or Logged-in) if payment is successful
        // We assume submitOrderRequest is called after successful payment or for a valid request
        await sendOrderEmail(data);

        return { success: true };
    } catch (e) {
        console.error("Failed to submit order request", e);
        return { success: false };
    }
}



import { createClientProfile, assignDeveloper } from "@/lib/db/queries";

export async function createClientAccount(data: any) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await createClientProfile({ ...data, password: hashedPassword });
        // TODO: Email the client their credentials (mocked for now)
        console.log(`Email sent to ${data.email} with password: ${data.password}`);
        return { success: true };
    } catch (e) {
        console.error("Failed to create client account", e);
        return { success: false };
    }
}

export async function assignDeveloperAction(clientId: number, developerId: number) {
    try {
        await assignDeveloper(clientId, developerId);
        // TODO: Send notifications
        return { success: true };
    } catch (e) {
        console.error("Failed to assign developer", e);
        return { success: false };
    }
}

// --- Razorpay Payment Actions ---

export async function createRazorpayOrder(amount: number) {
    console.log("createRazorpayOrder called with amount:", amount, "Type:", typeof amount);
    console.log("Initializing Razorpay with:", {
        key_id_present: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret_present: !!process.env.RAZORPAY_KEY_SECRET
    });

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error("Razorpay Keys Missing!");
        throw new Error("Razorpay keys are not configured properly.");
    }

    const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    try {
        if (!amount || amount <= 0) {
            throw new Error("Invalid amount: " + amount);
        }

        const options = {
            amount: Math.round(amount * 100), // Ensure integer
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        console.log("Creating Razorpay order with options:", JSON.stringify(options));

        const order = await razorpay.orders.create(options);
        console.log("Razorpay order created successfully:", order.id);
        return JSON.parse(JSON.stringify(order)); // Serialization for client
    } catch (error: any) {
        console.error("Razorpay Order Creation Failed.");
        console.error("Error Object:", error);
        if (error.error && error.error.description) {
            console.error("Razorpay Error Description:", error.error.description);
        }
        const errorMessage = error.message || error.description || (error.error && error.error.description) || "Unknown Razorpay Error";
        throw new Error("Failed to create Razorpay order: " + errorMessage);
    }
}
