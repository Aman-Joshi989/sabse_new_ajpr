import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Safely parse JSON in case ZeptoMail sends an empty body during "Verify"
        const rawBody = await req.text();
        const payload = rawBody ? JSON.parse(rawBody) : {};
        
        // Log the webhook payload for debugging
        console.log("ZeptoMail Webhook Received:", JSON.stringify(payload, null, 2));

        // You can add logic here later to update your database 
        // if an email bounced or was successfully delivered.
        // For example:
        // if (payload.event_name?.[0] === "hardbounce") {
        //     await markSubscriberAsBounced(payload.email_info.to[0].email_address.address);
        // }

        // ZeptoMail requires a 200 OK status to confirm receipt
        return NextResponse.json({ success: true, message: "Webhook received" }, { status: 200 });
    } catch (error) {
        console.error("Error processing ZeptoMail webhook:", error);
        // We MUST return 200 even on error so ZeptoMail accepts the verification
        return NextResponse.json({ success: true, message: "Error processed but ignored for verification" }, { status: 200 });
    }
}
