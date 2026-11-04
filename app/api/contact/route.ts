import { NextResponse } from "next/server";
import { sql, ensureDbInitialized } from "@/lib/db/queries";
import { dispatchContactEmails } from "@/lib/email/contact-mailer";

export async function POST(req: Request) {
    try {
        const { 
            name, 
            email, 
            phone, 
            companyName, 
            websiteUrl, 
            monthlyRevenue, 
            budgetRange, 
            buildingText, 
            blockersText,
            message 
        } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
        }

        // Generate a clean, human-readable reference number (e.g. AJPR-APP-8KJ2)
        const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        const referenceId = `AJPR-${timestamp}-${randomPart}`;

        // Ensure database schema is initialized
        await ensureDbInitialized();

        try {
            await sql`
                INSERT INTO contact_submissions (
                    name, 
                    email, 
                    phone, 
                    company_name, 
                    website_url, 
                    monthly_revenue, 
                    budget_range, 
                    building_text, 
                    blockers_text, 
                    message,
                    reference_id
                ) VALUES (
                    ${name}, 
                    ${email}, 
                    ${phone || ''}, 
                    ${companyName || ''}, 
                    ${websiteUrl || ''}, 
                    ${monthlyRevenue || ''}, 
                    ${budgetRange || ''}, 
                    ${buildingText || ''}, 
                    ${blockersText || ''}, 
                    ${message || ''},
                    ${referenceId}
                )
            `;
        } catch (dbErr: any) {
            console.warn("[Contact API] Insert with reference_id fallback:", dbErr?.message);
            // Fallback if column wasn't ready
            await sql`
                INSERT INTO contact_submissions (
                    name, 
                    email, 
                    phone, 
                    company_name, 
                    website_url, 
                    monthly_revenue, 
                    budget_range, 
                    building_text, 
                    blockers_text, 
                    message
                ) VALUES (
                    ${name}, 
                    ${email}, 
                    ${phone || ''}, 
                    ${companyName || ''}, 
                    ${websiteUrl || ''}, 
                    ${monthlyRevenue || ''}, 
                    ${budgetRange || ''}, 
                    ${buildingText || ''}, 
                    ${blockersText || ''}, 
                    ${message || ''}
                )
            `;
        }

        // Dispatch asynchronous notification to customer & admin
        let emailResult = { customerSent: false, adminSent: false };
        try {
            emailResult = await dispatchContactEmails({
                referenceId,
                name,
                email,
                phone,
                companyName,
                websiteUrl,
                monthlyRevenue,
                budgetRange,
                buildingText,
                blockersText,
                message
            });
        } catch (mailErr: any) {
            console.error("[Contact API] Outbound email error:", mailErr?.message || mailErr);
        }

        return NextResponse.json({ 
            success: true, 
            referenceId,
            name,
            email,
            customerSent: emailResult.customerSent,
            adminSent: emailResult.adminSent
        });
    } catch (error: any) {
        console.error("[Contact API] Submission fatal error:", error);
        return NextResponse.json({ error: error?.message || "Something went wrong" }, { status: 500 });
    }
}
