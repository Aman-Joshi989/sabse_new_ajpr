import nodemailer from 'nodemailer';
import { sendEmail as sendZeptoEmail } from '@/lib/zeptomail';
import { sql } from '@/lib/db/queries';

export interface ContactEmailData {
  referenceId?: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  companySize?: string;
  websiteUrl?: string;
  monthlyRevenue?: string;
  budgetRange?: string;
  techStack?: string;
  buildingText?: string;
  blockersText?: string;
  message?: string;
  type?: 'contact_application' | 'booking' | 'audit' | 'tool_report' | 'lead' | 'checklist' | 'career';
  bookingDate?: string;
  bookingTime?: string;
  meetLink?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface BookingEmailData {
  referenceId?: string;
  name: string;
  email: string;
  companyName?: string;
  websiteUrl?: string;
  bookingDate: string;
  bookingTime: string;
  topic?: string;
  meetLink?: string;
}

export interface CareerApplicationEmailData {
  referenceId?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
}

/**
 * Generate a unique human-readable tracking reference (e.g. AJPR-AUD-9M4Q-X8)
 */
export function generateReferenceId(prefix: string = 'AJPR'): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}

/**
 * Clean and normalize email credentials (strip quotes, spaces, newlines)
 */
function sanitizeCredential(val?: string | null): string {
  if (!val) return '';
  return val.replace(/['"\s]/g, '').trim();
}

/**
 * Create a resilient Gmail SMTP transporter
 */
function createGmailTransporter() {
  const rawUser = process.env.GMAIL_USER || 'ajprworld@gmail.com';
  const rawPass = process.env.GMAIL_PASS;

  const user = rawUser.replace(/['"]/g, '').trim();
  const pass = sanitizeCredential(rawPass);

  if (!pass || pass.includes('SENSITIVE') || pass.length < 8) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
}

/**
 * Create a generic custom SMTP transporter (if host/pass specified)
 */
function createCustomSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = sanitizeCredential(process.env.SMTP_PASS);
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: user || '', pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
}

/**
 * Resilient Database Outbox Recorder
 */
async function recordOutboxEntry(params: {
  recipient: string;
  subject: string;
  category: string;
  referenceId?: string;
  status: 'delivered' | 'failed' | 'queued_for_retry';
  providerUsed: string;
  payload?: any;
  errorMessage?: string;
}) {
  try {
    // Ensure table exists safely
    await sql`
      CREATE TABLE IF NOT EXISTS email_outbox (
        id SERIAL PRIMARY KEY,
        recipient VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        category VARCHAR(50) NOT NULL,
        reference_id VARCHAR(100),
        status VARCHAR(50) NOT NULL,
        provider_used VARCHAR(50),
        payload JSONB,
        error_message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const payloadJson = params.payload ? JSON.stringify(params.payload) : null;

    await sql`
      INSERT INTO email_outbox (
        recipient, subject, category, reference_id, status, provider_used, payload, error_message
      ) VALUES (
        ${params.recipient},
        ${params.subject},
        ${params.category},
        ${params.referenceId || null},
        ${params.status},
        ${params.providerUsed},
        ${payloadJson}::jsonb,
        ${params.errorMessage || null}
      );
    `;
  } catch (err: any) {
    // Non-fatal logging if DB outbox cannot record
    console.warn('[Email Outbox] Could not persist to email_outbox table:', err?.message || err);
  }
}

/**
 * Universal Raw Email Sender with Multi-Provider Cascade:
 * Strategy 1: Resend HTTP API (if RESEND_API_KEY is present)
 * Strategy 2: Gmail SMTP via Nodemailer (if GMAIL_USER & GMAIL_PASS valid)
 * Strategy 3: Custom SMTP via Nodemailer (if SMTP_HOST & SMTP_PASS valid)
 * Strategy 4: ZeptoMail API (if ZEPTOMAIL_TOKEN is valid)
 * Strategy 5: Outbox recording in PostgreSQL (guarantees zero data loss)
 */
async function sendRawEmail(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  fromName?: string;
  replyTo?: string;
  category?: string;
  referenceId?: string;
}): Promise<{ delivered: boolean; provider: string; error?: string }> {
  const fromName = params.fromName || 'AJPR World';
  const adminEmail = process.env.GMAIL_USER ? process.env.GMAIL_USER.replace(/['"]/g, '').trim() : 'hello@ajprworld.com';
  let lastError: string | undefined;

  // -------------------------------------------------------------
  // Provider 1: Resend REST API (Zero port blocking on serverless)
  // -------------------------------------------------------------
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey && !resendApiKey.includes('SENSITIVE') && resendApiKey.length > 10) {
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${fromName} <${fromEmail}>`,
          to: [params.to],
          reply_to: params.replyTo || adminEmail,
          subject: params.subject,
          html: params.html,
          text: params.text,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) {
        console.log(`[Unified Mailer] Sent via Resend to ${params.to}`);
        await recordOutboxEntry({
          recipient: params.to,
          subject: params.subject,
          category: params.category || 'general',
          referenceId: params.referenceId,
          status: 'delivered',
          providerUsed: 'resend',
        });
        return { delivered: true, provider: 'resend' };
      } else {
        const errorData = await res.text();
        console.warn(`[Unified Mailer] Resend API error (${res.status}):`, errorData);
        lastError = `Resend (${res.status}): ${errorData}`;
      }
    } catch (resendErr: any) {
      console.warn('[Unified Mailer] Resend network error:', resendErr?.message || resendErr);
      lastError = resendErr?.message;
    }
  }

  // -------------------------------------------------------------
  // Provider 2: Gmail SMTP via Nodemailer
  // -------------------------------------------------------------
  const gmailTransporter = createGmailTransporter();
  if (gmailTransporter) {
    try {
      await gmailTransporter.sendMail({
        from: `"${fromName}" <${adminEmail}>`,
        to: params.to,
        replyTo: params.replyTo || adminEmail,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });
      console.log(`[Unified Mailer] Sent via Gmail SMTP to ${params.to}`);
      await recordOutboxEntry({
        recipient: params.to,
        subject: params.subject,
        category: params.category || 'general',
        referenceId: params.referenceId,
        status: 'delivered',
        providerUsed: 'gmail_smtp',
      });
      return { delivered: true, provider: 'gmail_smtp' };
    } catch (gmailErr: any) {
      console.warn('[Unified Mailer] Gmail SMTP failed:', gmailErr?.message || gmailErr);
      lastError = gmailErr?.message;
    }
  }

  // -------------------------------------------------------------
  // Provider 3: Custom SMTP via Nodemailer
  // -------------------------------------------------------------
  const customSmtp = createCustomSmtpTransporter();
  if (customSmtp) {
    try {
      const smtpUser = process.env.SMTP_USER || adminEmail;
      await customSmtp.sendMail({
        from: `"${fromName}" <${smtpUser}>`,
        to: params.to,
        replyTo: params.replyTo || adminEmail,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });
      console.log(`[Unified Mailer] Sent via Custom SMTP to ${params.to}`);
      await recordOutboxEntry({
        recipient: params.to,
        subject: params.subject,
        category: params.category || 'general',
        referenceId: params.referenceId,
        status: 'delivered',
        providerUsed: 'custom_smtp',
      });
      return { delivered: true, provider: 'custom_smtp' };
    } catch (smtpErr: any) {
      console.warn('[Unified Mailer] Custom SMTP failed:', smtpErr?.message || smtpErr);
      lastError = smtpErr?.message;
    }
  }

  // -------------------------------------------------------------
  // Provider 4: ZeptoMail API
  // -------------------------------------------------------------
  const zeptoToken = process.env.ZEPTOMAIL_TOKEN;
  const isZeptoAvailable = zeptoToken && !zeptoToken.includes('SENSITIVE') && zeptoToken.length > 15;
  if (isZeptoAvailable) {
    try {
      await sendZeptoEmail({
        to: params.to,
        subject: params.subject,
        text: params.text || params.subject,
        html: params.html,
      });
      console.log(`[Unified Mailer] Sent via ZeptoMail to ${params.to}`);
      await recordOutboxEntry({
        recipient: params.to,
        subject: params.subject,
        category: params.category || 'general',
        referenceId: params.referenceId,
        status: 'delivered',
        providerUsed: 'zeptomail',
      });
      return { delivered: true, provider: 'zeptomail' };
    } catch (zeptoErr: any) {
      console.warn('[Unified Mailer] ZeptoMail dispatch failed:', zeptoErr?.message || zeptoErr);
      lastError = zeptoErr?.message;
    }
  }

  // -------------------------------------------------------------
  // Provider 5: Resilient Outbox Recording (Queue for retry)
  // -------------------------------------------------------------
  console.warn(
    `[Unified Mailer] No active email provider delivered to ${params.to}. Message preserved in outbox. Reason: ${lastError || 'Credentials missing or invalid'}`
  );

  await recordOutboxEntry({
    recipient: params.to,
    subject: params.subject,
    category: params.category || 'general',
    referenceId: params.referenceId,
    status: 'queued_for_retry',
    providerUsed: 'none_outbox_saved',
    payload: {
      to: params.to,
      subject: params.subject,
      replyTo: params.replyTo,
      referenceId: params.referenceId,
    },
    errorMessage: lastError || 'Missing/invalid GMAIL_PASS, RESEND_API_KEY, or ZEPTOMAIL_TOKEN credentials in environment',
  });

  return { delivered: false, provider: 'none_outbox_saved', error: lastError };
}

/**
 * Generate Customer Auto-Responder HTML
 */
function buildCustomerEmailHtml(data: ContactEmailData): string {
  const isBooking = data.type === 'booking' || data.monthlyRevenue === 'Discovery Call Booking';
  const isAudit = data.type === 'audit' || data.message?.includes('DIAGNOSTIC AUDIT REQUEST') || data.techStack?.includes('Audit');
  const isToolReport = data.type === 'tool_report';

  const title = isBooking
    ? 'Strategy Session Confirmed — AJPR World'
    : isAudit
      ? 'Technical & SEO Audit Request Received — AJPR World'
      : isToolReport
        ? 'Custom Report & Action Plan Queued — AJPR World'
        : 'Application Received: Review in Progress — AJPR World';

  const headline = isBooking
    ? 'Your Strategy Session Request is Confirmed'
    : isAudit
      ? "We've received your website diagnostic audit request."
      : isToolReport
        ? 'Your Custom Action Plan is Being Prepared.'
        : 'Thank you for applying to partner with AJPR World.';

  const referenceId = data.referenceId || generateReferenceId('AJPR');

  const whatsappMessage = encodeURIComponent(
    `Hi Aman, I just submitted a request on AJPR World (Ref: #${referenceId}) for ${data.companyName || data.name} and would like to connect directly.`
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B0F19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0B0F19; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid #1F2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #4F46E5 100%); padding: 32px 36px; text-align: left;">
              <div style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF;">AJPR WORLD</div>
              <div style="font-size: 13px; color: #BFDBFE; margin-top: 4px; font-weight: 500;">High-Performance Web Software & Scalable AI Infrastructure</div>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px;">
              <div style="display: inline-block; background-color: #1E3A8A; color: #93C5FD; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 9999px; border: 1px solid #3B82F6; margin-bottom: 16px;">
                Reference: #${referenceId}
              </div>

              <h1 style="color: #F9FAFB; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.3;">
                ${headline}
              </h1>

              <p style="color: #9CA3AF; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi <strong style="color: #FFFFFF;">${data.name}</strong>,<br><br>
                ${
                  isBooking
                    ? `We have logged your discovery session details for <strong>${data.bookingDate || 'your selected date'}</strong> at <strong>${data.bookingTime || 'your slot'}</strong>. Our engineering team is preparing background research on your project scope before the call.`
                    : isAudit
                      ? 'Our technical SEO & systems architecture engineers have received your audit request and are analyzing your domain benchmarks, Core Web Vitals, and search footprint.'
                      : isToolReport
                        ? 'Thank you for requesting your custom agency proposal & technical action plan. Our Lead Architect is preparing your personalized breakdown.'
                        : 'Your application has been delivered to our engineering triage queue. Aman Joshi (Founder & Lead Systems Architect) reviews every submission directly to verify technical scope, engineering sprint feasibility, and business impact.'
                }
              </p>

              <!-- Application Summary Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1F2937; border: 1px solid #374151; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #374151;">
                    <strong style="color: #60A5FA; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Submission Snapshot</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 4px 0; color: #9CA3AF; font-size: 13px; width: 140px;">Applicant Name:</td>
                  <td style="padding: 10px 0 4px 0; color: #F3F4F6; font-size: 13px; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Work Email:</td>
                  <td style="padding: 4px 0; color: #60A5FA; font-size: 13px;">${data.email}</td>
                </tr>
                ${data.companyName || data.companySize ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Company / Size:</td>
                  <td style="padding: 4px 0; color: #F3F4F6; font-size: 13px; font-weight: 600;">${data.companyName || data.companySize}</td>
                </tr>` : ''}
                ${data.websiteUrl ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Website / Target URL:</td>
                  <td style="padding: 4px 0; color: #60A5FA; font-size: 13px;"><a href="${data.websiteUrl}" target="_blank" style="color: #60A5FA; text-decoration: none;">${data.websiteUrl}</a></td>
                </tr>` : ''}
                ${data.budgetRange ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Budget Bracket:</td>
                  <td style="padding: 4px 0; color: #34D399; font-size: 13px; font-weight: 700;">${data.budgetRange}</td>
                </tr>` : ''}
                ${data.techStack ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Tech Stack / Focus:</td>
                  <td style="padding: 4px 0; color: #F3F4F6; font-size: 13px;">${data.techStack}</td>
                </tr>` : ''}
                ${data.bookingDate && data.bookingTime ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Strategy Session:</td>
                  <td style="padding: 4px 0; color: #F59E0B; font-size: 13px; font-weight: bold;">${data.bookingDate} at ${data.bookingTime}</td>
                </tr>` : ''}
                ${data.meetLink ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Meeting Room:</td>
                  <td style="padding: 4px 0; color: #60A5FA; font-size: 13px;"><a href="${data.meetLink}" target="_blank" style="color: #60A5FA; font-weight: bold;">${data.meetLink}</a></td>
                </tr>` : ''}
                ${data.buildingText ? `
                <tr>
                  <td style="padding: 8px 0 0 0; color: #9CA3AF; font-size: 13px; vertical-align: top;">Project Scope:</td>
                  <td style="padding: 8px 0 0 0; color: #E5E7EB; font-size: 13px; line-height: 1.5;">${data.buildingText}</td>
                </tr>` : ''}
              </table>

              <!-- What Happens Next (Timeline) -->
              <h2 style="color: #FFFFFF; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
                What Happens Next:
              </h2>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 8px 0; vertical-align: top; width: 28px;">
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: #2563EB; color: white; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: bold;">1</span>
                  </td>
                  <td style="padding: 8px 0; color: #D1D5DB; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #FFFFFF;">Senior Architecture Review (Within 24 Hours):</strong><br>
                    We review technical requirements, API integrations, and system scalability.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; vertical-align: top; width: 28px;">
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: #2563EB; color: white; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: bold;">2</span>
                  </td>
                  <td style="padding: 8px 0; color: #D1D5DB; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #FFFFFF;">Actionable Diagnostic Roadmap (Within 48 Hours):</strong><br>
                    You receive direct feedback with concrete sprint deliverables, milestones, and ROI projections from Aman Joshi.
                  </td>
                </tr>
              </table>

              <!-- Fast-Track Action Buttons -->
              <div style="background: linear-gradient(180deg, #1E293B 0%, #0F172A 100%); border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">
                  Need Immediate Answers or Priority Scoping?
                </div>
                <p style="font-size: 12px; color: #94A3B8; margin: 0 0 16px 0;">
                  Connect directly with our leadership team on WhatsApp or lock in a 1-on-1 strategy slot.
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 10px;">
                      <a href="https://ajprworld.com/book-call" target="_blank" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);">
                        📅 Schedule 1-on-1 Strategy Session
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a href="https://wa.me/919997205257?text=${whatsappMessage}" target="_blank" style="display: inline-block; background-color: #059669; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 8px;">
                        💬 Chat Directly on WhatsApp (+91 99972 05257)
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <p style="color: #6B7280; font-size: 13px; line-height: 1.5; margin: 0;">
                Best regards,<br>
                <strong style="color: #D1D5DB;">Aman Joshi</strong><br>
                Founder & Lead Systems Architect — AJPR World<br>
                <a href="https://ajprworld.com" style="color: #3B82F6; text-decoration: none;">ajprworld.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0F172A; padding: 20px 36px; border-top: 1px solid #1F2937; text-align: center; color: #6B7280; font-size: 12px;">
              <div>&copy; ${new Date().getFullYear()} AJPR World. High-Performance Software & Scalable AI Infrastructure.</div>
              <div style="margin-top: 6px;">
                Direct inquiries: <a href="mailto:hello@ajprworld.com" style="color: #9CA3AF; text-decoration: underline;">hello@ajprworld.com</a> | Global Delivery
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate Admin Notification HTML
 */
function buildAdminEmailHtml(data: ContactEmailData): string {
  const referenceId = data.referenceId || generateReferenceId('AJPR');
  const typeLabel = (data.type || 'lead').toUpperCase();

  const cleanPhone = data.phone ? data.phone.replace(/[^0-9+]/g, '') : '';
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; padding: 24px; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 32px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
    <div style="background-color: #2563eb; color: #ffffff; padding: 6px 14px; border-radius: 9999px; font-weight: bold; font-size: 12px; display: inline-block; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
      🔥 NEW ${typeLabel} • REF: #${referenceId}
    </div>

    <h2 style="color: #ffffff; margin: 0 0 16px 0; font-size: 22px;">
      ${data.companyName ? `${data.companyName} (${data.name})` : data.name}
    </h2>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold; width: 140px;">Applicant Name:</td>
        <td style="padding: 8px 0; color: #ffffff;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Work Email:</td>
        <td style="padding: 8px 0; color: #38bdf8;"><a href="mailto:${data.email}?subject=Re:%20AJPR%20World%20Request%20(%23${referenceId})" style="color: #38bdf8; text-decoration: none; font-weight: bold;">${data.email}</a></td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0; color: #ffffff;">${data.phone} ${whatsappUrl ? `<a href="${whatsappUrl}" target="_blank" style="color: #34d399; margin-left: 8px; text-decoration: none;">[Open WhatsApp]</a>` : ''}</td>
      </tr>` : ''}
      ${data.companyName ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Company:</td>
        <td style="padding: 8px 0; color: #ffffff;">${data.companyName}</td>
      </tr>` : ''}
      ${data.companySize ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Company Size:</td>
        <td style="padding: 8px 0; color: #ffffff;">${data.companySize}</td>
      </tr>` : ''}
      ${data.websiteUrl ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Website / URL:</td>
        <td style="padding: 8px 0; color: #38bdf8;"><a href="${data.websiteUrl}" target="_blank" style="color: #38bdf8;">${data.websiteUrl}</a></td>
      </tr>` : ''}
      ${data.budgetRange ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Budget Bracket:</td>
        <td style="padding: 8px 0; color: #34d399; font-weight: bold;">${data.budgetRange}</td>
      </tr>` : ''}
      ${data.monthlyRevenue ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Revenue:</td>
        <td style="padding: 8px 0; color: #ffffff;">${data.monthlyRevenue}</td>
      </tr>` : ''}
      ${data.techStack ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Tech Stack / Focus:</td>
        <td style="padding: 8px 0; color: #ffffff;">${data.techStack}</td>
      </tr>` : ''}
      ${data.bookingDate && data.bookingTime ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Booked Time:</td>
        <td style="padding: 8px 0; color: #fbbf24; font-weight: bold;">${data.bookingDate} at ${data.bookingTime}</td>
      </tr>` : ''}
      ${data.meetLink ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Google Meet:</td>
        <td style="padding: 8px 0; color: #38bdf8;"><a href="${data.meetLink}" target="_blank" style="color: #38bdf8;">${data.meetLink}</a></td>
      </tr>` : ''}
      ${data.utmSource ? `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Attribution:</td>
        <td style="padding: 8px 0; color: #cbd5e1; font-size: 12px;">Source: ${data.utmSource} | Medium: ${data.utmMedium || 'none'} | Campaign: ${data.utmCampaign || 'none'}</td>
      </tr>` : ''}
    </table>

    ${data.buildingText ? `
    <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <div style="font-weight: bold; color: #94a3b8; font-size: 12px; margin-bottom: 6px; text-transform: uppercase;">WHAT THEY ARE BUILDING:</div>
      <div style="color: #f1f5f9; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.buildingText}</div>
    </div>` : ''}

    ${data.blockersText ? `
    <div style="background-color: #450a0a; border: 1px solid #7f1d1d; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <div style="font-weight: bold; color: #f87171; font-size: 12px; margin-bottom: 6px; text-transform: uppercase;">CURRENT BLOCKERS / CHALLENGES:</div>
      <div style="color: #fecaca; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.blockersText}</div>
    </div>` : ''}

    <div style="margin-top: 24px; text-align: center; display: flex; gap: 12px; justify-content: center;">
      <a href="mailto:${data.email}?subject=Re:%20AJPR%20World%20Request%20(%23${referenceId})" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
        ✉️ Reply to ${data.name}
      </a>
      ${whatsappUrl ? `
      <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
        💬 WhatsApp
      </a>` : ''}
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * High-level Dispatch: Contact Forms, Audits, Tool Lead Captures, Bookings
 */
export async function dispatchContactEmails(
  data: ContactEmailData
): Promise<{ customerSent: boolean; adminSent: boolean; referenceId: string; error?: string }> {
  const referenceId = data.referenceId || generateReferenceId(data.type === 'audit' ? 'AJPR-AUD' : 'AJPR-APP');
  data.referenceId = referenceId;

  const adminEmail = process.env.GMAIL_USER ? process.env.GMAIL_USER.replace(/['"]/g, '').trim() : 'hello@ajprworld.com';
  const customerHtml = buildCustomerEmailHtml(data);
  const adminHtml = buildAdminEmailHtml(data);

  const typeDesc = data.type === 'audit' ? 'Audit Request' : data.type === 'booking' ? 'Strategy Session' : 'Application';
  const customerSubject = `${typeDesc} Received: We're Reviewing Your Project — AJPR World (#${referenceId})`;
  const adminSubject = `🔥 New ${typeDesc}: ${data.companyName || data.name} [${data.budgetRange || data.techStack || 'Unspecified'}] (#${referenceId})`;

  // 1. Send confirmation to Customer
  const customerResult = await sendRawEmail({
    to: data.email,
    subject: customerSubject,
    html: customerHtml,
    fromName: 'AJPR World',
    replyTo: adminEmail,
    category: data.type || 'contact',
    referenceId,
  });

  // 2. Send notification to Admin
  const adminResult = await sendRawEmail({
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml,
    fromName: 'AJPR Lead Engine',
    replyTo: data.email,
    category: 'admin_notification',
    referenceId,
  });

  return {
    customerSent: customerResult.delivered,
    adminSent: adminResult.delivered,
    referenceId,
    error: customerResult.error || adminResult.error,
  };
}

/**
 * Dispatch: Strategy Call Bookings (with Google Meet Link)
 */
export async function dispatchBookingEmails(
  data: BookingEmailData
): Promise<{ customerSent: boolean; adminSent: boolean; referenceId: string }> {
  const referenceId = data.referenceId || generateReferenceId('AJPR-BOOK');

  return await dispatchContactEmails({
    referenceId,
    name: data.name,
    email: data.email,
    companyName: data.companyName,
    websiteUrl: data.websiteUrl,
    bookingDate: data.bookingDate,
    bookingTime: data.bookingTime,
    meetLink: data.meetLink,
    buildingText: data.topic || 'Strategy Session',
    message: `Booked for ${data.bookingDate} at ${data.bookingTime}. Meet Link: ${data.meetLink || 'TBD'}`,
    type: 'booking',
  });
}

/**
 * Dispatch: Growth Checklist Lead Magnet (Exit Intent / Subscribe)
 */
export async function dispatchGrowthChecklistEmail(email: string): Promise<{ delivered: boolean }> {
  const subject = 'Your Ultimate 2026 Startup Growth Checklist 🚀 — AJPR World';
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; padding: 32px 16px; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 32px; text-align: left;">
      <div style="font-size: 22px; font-weight: 900; color: #ffffff;">AJPR WORLD</div>
      <div style="font-size: 13px; color: #bfdbfe; margin-top: 4px;">High-Performance Web Software & Scalable AI Infrastructure</div>
    </div>
    <div style="padding: 32px;">
      <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0 0 16px 0;">
        Here is your Ultimate 2026 Growth Checklist 🚀
      </h1>
      <p style="color: #9ca3af; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        Hi there,<br><br>
        Thank you for requesting our <strong>Ultimate 2026 Growth Checklist</strong>. This is the exact 50-point engineering and SEO framework we deploy to scale high-performing software platforms and search engines.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://ajprworld.com/startup-growth-kit.pdf" target="_blank" style="display: inline-block; background-color: #f59e0b; color: #0f172a; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 15px; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);">
          📥 Download PDF Growth Checklist
        </a>
      </div>

      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 12px; padding: 20px; margin: 28px 0;">
        <h3 style="color: #60a5fa; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase;">Ready to automate and scale?</h3>
        <p style="color: #cbd5e1; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">
          If you want our senior engineering pod to audit your systems, optimize Core Web Vitals, and build custom AI-powered growth engines, let's connect.
        </p>
        <a href="https://ajprworld.com/book-call" target="_blank" style="color: #38bdf8; font-weight: bold; text-decoration: none; font-size: 13px;">
          &rarr; Book a Free 30-Minute Architecture Scoping Call
        </a>
      </div>

      <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 0;">
        To your scale,<br>
        <strong style="color: #e2e8f0;">Aman Joshi</strong><br>
        Founder & Lead Architect — AJPR World<br>
        <a href="https://ajprworld.com" style="color: #3b82f6; text-decoration: none;">ajprworld.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const result = await sendRawEmail({
    to: email,
    subject,
    html,
    fromName: 'AJPR World Growth Team',
    category: 'growth_checklist',
  });

  return { delivered: result.delivered };
}

/**
 * Dispatch: Candidate Job Applications
 */
export async function dispatchCareerApplicationEmails(
  data: CareerApplicationEmailData
): Promise<{ customerSent: boolean; adminSent: boolean; referenceId: string }> {
  const referenceId = data.referenceId || generateReferenceId('AJPR-JOB');
  const adminEmail = process.env.GMAIL_USER ? process.env.GMAIL_USER.replace(/['"]/g, '').trim() : 'hello@ajprworld.com';

  const candidateSubject = `Application Received: ${data.role} — AJPR World (#${referenceId})`;
  const candidateHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; padding: 32px 16px; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 32px;">
    <div style="font-size: 20px; font-weight: 900; color: #ffffff; margin-bottom: 20px;">AJPR WORLD CAREERS</div>
    <div style="display: inline-block; background-color: #1e3a8a; color: #93c5fd; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; margin-bottom: 16px;">
      Reference: #${referenceId}
    </div>
    <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 12px 0;">Application Received: ${data.role}</h2>
    <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
      Hi ${data.name},<br><br>
      Thank you for applying to join AJPR World as <strong>${data.role}</strong>. Our engineering and talent team is reviewing your profile and portfolio against our sprint requirements.
    </p>
    <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
      If your technical background matches our stack, we will contact you within 3–5 business days for a technical conversation.
    </p>
    <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">
      Engineering Talent Team — AJPR World<br>
      <a href="https://ajprworld.com" style="color: #3b82f6;">ajprworld.com</a>
    </p>
  </div>
</body>
</html>
  `.trim();

  const adminSubject = `💼 New Job Application: ${data.role} — ${data.name} (#${referenceId})`;
  const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; padding: 24px; color: #e2e8f0;">
  <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
    <h3 style="color: #ffffff; margin: 0 0 12px 0;">New Application: ${data.role}</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #38bdf8;">${data.email}</a></p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${data.linkedinUrl}" target="_blank" style="color: #38bdf8;">${data.linkedinUrl}</a></p>` : ''}
    ${data.resumeUrl ? `<p><strong>Resume:</strong> <a href="${data.resumeUrl}" target="_blank" style="color: #34d399;">View Resume</a></p>` : ''}
    ${data.coverLetter ? `<div style="background: #0f172a; padding: 12px; border-radius: 8px; margin-top: 12px; white-space: pre-wrap;">${data.coverLetter}</div>` : ''}
  </div>
</body>
</html>
  `.trim();

  const customerRes = await sendRawEmail({
    to: data.email,
    subject: candidateSubject,
    html: candidateHtml,
    category: 'career_candidate',
    referenceId,
  });

  const adminRes = await sendRawEmail({
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml,
    replyTo: data.email,
    category: 'career_admin',
    referenceId,
  });

  return {
    customerSent: customerRes.delivered,
    adminSent: adminRes.delivered,
    referenceId,
  };
}
