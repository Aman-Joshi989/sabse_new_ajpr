import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/db/queries";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await saveSubscriber(email);
    
    if (result.success) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json(
            { error: result.error }, 
            { status: result.error === "Already subscribed" ? 400 : 500 }
        );
    }
}
