'use server'

import { sendMessage, getUserByEmail } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import nodemailer from 'nodemailer';

import { getSession } from "@/lib/auth";
import { requireAdminForAction } from "@/lib/admin/guard";

export async function getSessionAction() {
    try {
        const session = await getSession();
        return session;
    } catch (e) {
        return null;
    }
}

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
        } else if (user.role === 'admin') {
            redirect('/dashboard/admin');
        } else {
            redirect('/'); // Fallback
        }
    } catch (error: any) {
        console.error("Login Error:", error);
        if (error?.message === "NEXT_REDIRECT" || error?.digest?.startsWith?.("NEXT_REDIRECT")) throw error; // Re-throw redirect
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

import { updateTaskStatus, updateProjectHours, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/lib/db/queries";

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
    // added advanceAmount and currency to data destructuring
    const { name, email, phone, cart, total, advanceAmount, paymentId, currency = 'USD', paymentMethod = 'skydo' } = data;
    const sym = currency === 'INR' ? '₹' : (currency === 'EUR' ? '€' : (currency === 'GBP' ? '£' : '$'));

    const itemsList = cart.map((item: any) =>
        `<li>${item.name} (x${item.quantity}) - ${sym}${item.price}</li>`
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
                                    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">New Order Placed (${paymentMethod.toUpperCase()})</p>
                                </td>
                            </tr>

                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                                        Hello Admin,
                                    </p>
                                    <p style="color: #374151; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
                                        A new client order has been registered on AJPR World via <strong>${paymentMethod === 'skydo' ? 'Skydo (International)' : 'Razorpay (Domestic)'}</strong>.
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
                                                    <tr>
                                                        <td style="padding: 5px 0; color: #6b7280; width: 100px; font-weight: bold;">Currency:</td>
                                                        <td style="padding: 5px 0; color: #111827;">${currency}</td>
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
                                                ${sym}${item.price.toLocaleString()}
                                            </td>
                                        </tr>
                                        `).join('')}
                                    </table>

                                    <!-- Totals -->
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="padding: 8px 0; color: #6b7280; text-align: right;">Total Value:</td>
                                            <td style="padding: 8px 0; color: #374151; text-align: right; width: 120px; font-weight: bold;">${sym}${total.toLocaleString()} ${currency}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; color: #2563EB; text-align: right; font-weight: bold;">Amount Due/Paid:</td>
                                            <td style="padding: 8px 0; color: #2563EB; text-align: right; width: 120px; font-weight: bold; font-size: 18px;">
                                                ${sym}${advanceAmount ? advanceAmount.toLocaleString() : (total * 0.5).toLocaleString()} ${currency}
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Footer Info -->
                                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
                                        <p style="margin: 0 0 5px 0;"><strong>Payment / Reference ID:</strong> ${paymentId}</p>
                                        <p style="margin: 0 0 5px 0;"><strong>Payment Gateway:</strong> ${paymentMethod.toUpperCase()}</p>
                                        <p style="margin: 0;">This is an automated notification from AJPR World.</p>
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
            subject: `New ${currency} Order (${paymentMethod.toUpperCase()}) - ${name}`,
            html: htmlContent
        });
        console.log("Email sent successfully to admin.");
    } catch (error) {
        console.error("Failed to send email:", error);
        // Don't block the order flow if email fails, but log it
    }
}




import { createClientRequest, createPayment } from "@/lib/db/queries";

export async function submitOrderRequest(data: any) {
    try {
        // Save to DB
        await createClientRequest(data);

        // Also save to payments table
        await createPayment({
            client_name: data.name,
            client_email: data.email,
            client_phone: data.phone,
            amount: data.advanceAmount || data.total,
            currency: data.currency || 'USD',
            payment_status: data.paymentStatus || 'completed',
            payment_method: data.paymentMethod || data.gateway || 'skydo',
            payment_id: data.paymentId || 'N/A',
            payment_type: data.paymentType || 'advance',
            order_details: data.cart
        });

        // Send Email for ALL orders (Guest or Logged-in) if payment is successful
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

export async function createRazorpayOrder(amount: number, notes?: any) {
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
            notes: notes || {},
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

// --- Portfolio Actions ---

export async function createPortfolioItemAction(data: any) {
    try {
        await createPortfolioItem(data);
        revalidatePath('/portfolio');
        revalidatePath('/dashboard/admin/portfolio');
        return { success: true };
    } catch (e) {
        console.error("Failed to create portfolio item", e);
        return { success: false };
    }
}

export async function updatePortfolioItemAction(id: number, data: any) {
    try {
        await updatePortfolioItem(id, data);
        revalidatePath('/portfolio');
        revalidatePath('/dashboard/admin/portfolio');
        return { success: true };
    } catch (e) {
        console.error("Failed to update portfolio item", e);
        return { success: false };
    }
}

export async function deletePortfolioItemAction(id: number) {
    try {
        await deletePortfolioItem(id);
        revalidatePath('/portfolio');
        revalidatePath('/dashboard/admin/portfolio');
        return { success: true };
    } catch (e) {
        console.error("Failed to delete portfolio item", e);
        return { success: false };
    }
}

// --- Blog Actions ---
import { createBlog, updateBlog, deleteBlog } from "@/lib/db/queries";
import { syndicateBlogToSocials } from "@/lib/social/auto-publish";

export async function createBlogPostAction(data: any) {
    try {
        const result = await createBlog(data);
        
        // Auto-post to Social Media in the background (fire and forget)
        if (result.success && data.published !== false) {
            syndicateBlogToSocials({
                title: data.title,
                slug: data.slug || result.slug,
                excerpt: data.excerpt,
                coverImage: data.cover_image,
                source: 'manual'
            }).catch(console.error);
        }

        revalidatePath('/blog');
        revalidatePath('/dashboard/admin/blog');
        return { success: true };
    } catch (e) {
        console.error("Failed to create blog post", e);
        return { success: false };
    }
}

export async function updateBlogPostAction(id: number, data: any) {
    try {
        await updateBlog(id, data);
        revalidatePath('/blog');
        revalidatePath(`/blog/${data.slug}`);
        revalidatePath('/dashboard/admin/blog');
        return { success: true };
    } catch (e) {
        console.error("Failed to update blog post", e);
        return { success: false };
    }
}

export async function deleteBlogPostAction(id: number) {
    try {
        await deleteBlog(id);
        revalidatePath('/blog');
        revalidatePath('/dashboard/admin/blog');
        return { success: true };
    } catch (e) {
        console.error("Failed to delete blog post", e);
        return { success: false };
    }
}

// --- Service Actions ---
import { createService, updateService, deleteService } from "@/lib/db/queries";

export async function createServiceAction(data: any) {
    try {
        await createService(data);
        revalidatePath('/services');
        revalidatePath('/dashboard/admin/services');
        return { success: true };
    } catch (e) {
        console.error("Failed to create service", e);
        return { success: false };
    }
}

export async function updateServiceAction(id: number, data: any) {
    try {
        await updateService(id, data);
        revalidatePath('/services');
        revalidatePath(`/services/${data.slug}`);
        revalidatePath('/dashboard/admin/services');
        return { success: true };
    } catch (e) {
        console.error("Failed to update service", e);
        return { success: false };
    }
}

export async function deleteServiceAction(id: number) {
    try {
        await deleteService(id);
        revalidatePath('/services');
        revalidatePath('/dashboard/admin/services');
        return { success: true };
    } catch (e) {
        console.error("Failed to delete service", e);
        return { success: false };
    }
}

import { updateSiteSettings, getSiteSettings } from "@/lib/db/queries";

export async function updateSiteSettingsAction(data: any) {
    try {
        await updateSiteSettings(data);
        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/aman-joshi');
        revalidatePath('/dashboard/admin/seo');
        return { success: true };
    } catch (e) {
        console.error("Failed to update site settings", e);
        return { success: false };
    }
}

export async function getSiteSettingsAction() {
    try {
        const settings = await getSiteSettings();
        return { success: true, settings };
    } catch (e) {
        console.error("Failed to get site settings", e);
        return { success: false, settings: null };
    }
}

// --- Admin CRM Actions ---
import { createProject, updateProject, assignProjectToClient, assignProjectToDeveloper, createMilestone, updateMilestone, deleteMilestone } from "@/lib/db/queries";

export async function createProjectAction(data: { title: string, client_id?: number, developer_id?: number }) {
    try {
        const project = await createProject(data);
        revalidatePath('/dashboard/admin/projects');
        return { success: true, project };
    } catch (e: any) {
        console.error("Failed to create project", e);
        return { success: false, error: e.message };
    }
}

export async function updateProjectAction(projectId: number, data: { title: string, status: string, progress_percent: number, hours_used: number, total_hours: number, total_value: number, pending_value: number, client_id?: number, developer_id?: number }) {
    try {
        const project = await updateProject(projectId, data);
        if (data.client_id !== undefined) {
            await assignProjectToClient(projectId, data.client_id);
        }
        if (data.developer_id !== undefined) {
            await assignProjectToDeveloper(projectId, data.developer_id);
        }
        revalidatePath('/dashboard/admin/projects');
        revalidatePath('/dashboard/client');
        return { success: true, project };
    } catch (e: any) {
        console.error("Failed to update project", e);
        return { success: false, error: e.message };
    }
}

export async function createMilestoneAction(projectId: number, name: string, status: string = 'pending') {
    try {
        const milestone = await createMilestone(projectId, name, status);
        revalidatePath('/dashboard/admin/projects');
        revalidatePath('/dashboard/client');
        return { success: true, milestone };
    } catch (e: any) {
        console.error("Failed to create milestone", e);
        return { success: false, error: e.message };
    }
}

export async function updateMilestoneAction(milestoneId: number, name: string, status: string) {
    try {
        const milestone = await updateMilestone(milestoneId, name, status);
        revalidatePath('/dashboard/admin/projects');
        revalidatePath('/dashboard/client');
        return { success: true, milestone };
    } catch (e: any) {
        console.error("Failed to update milestone", e);
        return { success: false, error: e.message };
    }
}

export async function deleteMilestoneAction(milestoneId: number) {
    try {
        await deleteMilestone(milestoneId);
        revalidatePath('/dashboard/admin/projects');
        revalidatePath('/dashboard/client');
        return { success: true };
    } catch (e: any) {
        console.error("Failed to delete milestone", e);
        return { success: false, error: e.message };
    }
}

import { registerUser } from "@/lib/db/queries";

export async function registerUserAction(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const rawEmail = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        const skills = formData.get("skills") as string;
        const portfolio_url = formData.get("portfolio_url") as string;
        const hourly_rate = formData.get("hourly_rate") ? parseInt(formData.get("hourly_rate") as string) : undefined;

        if (!name || !rawEmail || !password) {
            return { error: "Missing required fields." };
        }

        const email = rawEmail.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { error: "Invalid email address format." };
        }

        // Hardcode role to 'client' - public registration can never assign admin/developer roles
        const role = 'client';

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return { error: "User with this email already exists." };
        }

        const passwordHash = await bcrypt.hash(password, 10);
        
        const user = await registerUser({
            name,
            email,
            passwordHash,
            role,
            skills,
            portfolio_url,
            hourly_rate
        });

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
            redirect('/'); 
        }
    } catch (error: any) {
        console.error("Registration Error:", error);
        if (error?.message === "NEXT_REDIRECT" || error?.digest?.startsWith?.("NEXT_REDIRECT")) throw error;
        return { error: "Registration failed: " + error.message };
    }
}

// --- Admin CRUD Extensions ---
import { updateUser, deleteUser, deleteProject } from "@/lib/db/queries";

export async function updateUserAction(userId: number, data: any) {
    try {
        const admin = await requireAdminForAction();
        
        const targetId = Number(userId);
        if (!targetId || isNaN(targetId) || targetId <= 0) {
            return { success: false, error: "Invalid user ID" };
        }

        // Prevent modifying own administrative role
        if (String(admin.id) === String(targetId) && data.role && data.role !== admin.role) {
            return { success: false, error: "Cannot modify your own administrative role." };
        }

        const safeData: any = {};
        if (typeof data.name === 'string') safeData.name = data.name.trim();
        if (typeof data.email === 'string') safeData.email = data.email.trim().toLowerCase();
        if (typeof data.role === 'string') {
            if (!['client', 'developer', 'admin'].includes(data.role)) {
                return { success: false, error: "Invalid role specified." };
            }
            safeData.role = data.role;
        }
        if (typeof data.status === 'string') safeData.status = data.status;

        const result = await updateUser(targetId, safeData);
        revalidatePath('/dashboard/admin/users');
        return { success: true, user: result };
    } catch (e: any) {
        console.error("Failed to update user", e);
        return { success: false, error: e.message || "Failed to update user" };
    }
}

export async function deleteUserAction(userId: number) {
    try {
        const admin = await requireAdminForAction();

        const targetId = Number(userId);
        if (!targetId || isNaN(targetId) || targetId <= 0) {
            return { success: false, error: "Invalid user ID" };
        }

        // Prevent deleting own administrative account
        if (String(admin.id) === String(targetId)) {
            return { success: false, error: "Cannot delete your own administrative account." };
        }

        await deleteUser(targetId);
        revalidatePath('/dashboard/admin/users');
        return { success: true };
    } catch (e: any) {
        console.error("Failed to delete user", e);
        return { success: false, error: e.message || "Failed to delete user" };
    }
}

export async function deleteProjectAction(projectId: number) {
    try {
        await deleteProject(projectId);
        revalidatePath('/dashboard/admin/projects');
        return { success: true };
    } catch (e: any) {
        console.error("Failed to delete project", e);
        return { success: false, error: e.message };
    }
}
