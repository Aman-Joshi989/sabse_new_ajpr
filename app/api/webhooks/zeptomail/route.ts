import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        
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
        // Even on error, we should probably return 200 so ZeptoMail doesn't retry indefinitely
        // if the payload is just malformed, but 500 is safer for debugging initially.
        return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
    }
}
