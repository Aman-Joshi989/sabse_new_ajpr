import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/db/queries";
import { dispatchGrowthChecklistEmail } from "@/lib/email/contact-mailer";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const cleanEmail = email.trim();
    const result = await saveSubscriber(cleanEmail);
    
    // We send the email even if they are already subscribed, 
    // in case they lost the original PDF link and want it again.
    if (result.success || result.error === "Already subscribed") {
        try {
            await dispatchGrowthChecklistEmail(cleanEmail);
        } catch (error) {
            console.error("Failed to send welcome checklist email:", error);
        }

        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json(
            { error: result.error }, 
            { status: 500 }
        );
    }
}
