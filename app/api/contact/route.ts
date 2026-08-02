import { NextResponse } from "next/server";
import { sql } from "@/lib/db/queries";

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

        // Ensure database schema is initialized (handles contact_submissions columns)
        const { ensureDbInitialized } = require("@/lib/db/queries");
        await ensureDbInitialized();

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

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
