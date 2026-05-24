import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

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

        // Run safe check migrations locally to make sure destination fields exist
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS company_name TEXT;`;
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS website_url TEXT;`;
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;`;
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS budget_range TEXT;`;
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS building_text TEXT;`;
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS blockers_text TEXT;`;
        await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;`;

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
