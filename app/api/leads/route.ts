import { NextResponse } from 'next/server';
import { saveSalesLead } from '@/lib/db/queries';
import { dispatchContactEmails, generateReferenceId } from '@/lib/email/contact-mailer';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    // Basic IP tracking for rate limit
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);
    
    // Max 10 requests per 15 minutes per IP
    if (rateLimit && now - rateLimit.timestamp < 15 * 60 * 1000) {
      if (rateLimit.count > 10) {
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
      return NextResponse.json({ success: true, lead: null, referenceId: 'AJPR-BOT' }, { status: 200 });
    }

    // Input Validation
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    const isToolReport = data.utm_medium === 'interactive_tool_lead_capture';
    const referenceId = generateReferenceId(isToolReport ? 'AJPR-TOOL' : 'AJPR-AUD');

    // Save to database
    let lead: any = null;
    try {
      lead = await saveSalesLead({
        ...data,
        reference_id: referenceId,
      });
    } catch (dbErr: any) {
      console.warn('[Leads API] Database insert notice:', dbErr?.message || dbErr);
    }

    // Dispatch asynchronous notification to Customer & Admin
    let emailResult = { customerSent: false, adminSent: false };
    try {
      emailResult = await dispatchContactEmails({
        referenceId,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || '',
        companyName: data.company?.trim() || data.companySize?.trim() || '',
        companySize: data.companySize?.trim() || '',
        budgetRange: data.budget?.trim() || '',
        techStack: data.techStack?.trim() || '',
        buildingText: data.techStack || 'Free Technical & SEO Audit Request',
        type: isToolReport ? 'tool_report' : 'audit',
        utmSource: data.utm_source || 'direct',
        utmMedium: data.utm_medium || 'lead_form',
        utmCampaign: data.utm_campaign || 'website',
      });
    } catch (mailErr: any) {
      console.error('[Leads API] Outbound email error:', mailErr?.message || mailErr);
    }

    return NextResponse.json({
      success: true,
      lead,
      referenceId,
      clientEmailSent: emailResult.customerSent,
      adminEmailSent: emailResult.adminSent,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: error.message || 'Failed to process lead' }, { status: 500 });
  }
}
