import { SendMailClient } from 'zeptomail';

const ZEPTO_URL = process.env.ZEPTOMAIL_URL || "https://api.zeptomail.in/v1.1/email";
const ZEPTO_TOKEN = process.env.ZEPTOMAIL_TOKEN || "";

let client: any = null;
if (ZEPTO_TOKEN) {
    client = new SendMailClient({ url: ZEPTO_URL, token: ZEPTO_TOKEN });
}

export async function sendEmail({ to, subject, text, html }: { to: string, subject: string, text: string, html?: string }) {
    if (!client) {
        console.log("ZeptoMail not configured. Would have sent:", { to, subject });
        return;
    }
    
    try {
        await client.sendMail({
            bounce_address: "noreply@ajprworld.com",
            from: {
                address: "noreply@ajprworld.com",
                name: "AJPR World"
            },
            to: [
                {
                    email_address: {
                        address: to,
                        name: to.split('@')[0]
                    }
                }
            ],
            subject: subject,
            textbody: text,
            htmlbody: html || `<p>${text}</p>`
        });
    } catch (error) {
        console.error("Zeptomail error:", error);
    }
}
