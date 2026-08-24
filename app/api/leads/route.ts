import { NextResponse } from 'next/server';
import { saveSalesLead } from '@/lib/db/queries';
import { sendEmail } from '@/lib/zeptomail'; // Fallback to console if zeptomail not configured

// Simple in-memory rate limiter (For production, use Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    // Basic IP tracking for rate limit (fallback if x-forwarded-for is absent)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);
    
    // Max 5 requests per 15 minutes per IP
    if (rateLimit && now - rateLimit.timestamp < 15 * 60 * 1000) {
      if (rateLimit.count > 5) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
      rateLimitMap.set(ip, { count: rateLimit.count + 1, timestamp: rateLimit.timestamp });
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const data = await req.json();
    
    // Security: Honeypot Check
    if (data.honeypot && data.honeypot.length > 0) {
      // It's a bot, pretend it was successful to trick them
      return NextResponse.json({ success: true, lead: null }, { status: 200 });
    }

    // Input Validation (Basic sanity checks)
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }
    
    // Save to database
    const lead = await saveSalesLead(data);

    // Try to send email notification to admin (non-blocking)
    try {
      const emailContent = `
        New Lead Submission:
        Name: ${data.name}
        Email: ${data.email}
        Company Size: ${data.companySize}
        Tech Stack: ${data.techStack}
        Budget: ${data.budget}
        
        --- Tracking Data ---
        Source: ${data.utm_source || 'direct'}
        Medium: ${data.utm_medium || 'N/A'}
        Campaign: ${data.utm_campaign || 'N/A'}
      `;
      // Assuming sendEmail exists. If not, this is a placeholder.
      if (typeof sendEmail === 'function') {
        await sendEmail({
          to: 'hello@ajprworld.com',
          subject: 'New High-Ticket Lead - AJPR World',
          text: emailContent,
          html: `<pre>${emailContent}</pre>`
        });
      } else {
         console.log("Email service not initialized. Lead:", emailContent);
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    return NextResponse.json({ success: true, lead }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: error.message || 'Failed to save lead' }, { status: 500 });
  }
}
