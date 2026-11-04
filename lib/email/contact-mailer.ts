import nodemailer from 'nodemailer';
import { sendEmail as sendZeptoEmail } from '@/lib/zeptomail';

interface ContactEmailData {
  referenceId: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  websiteUrl?: string;
  monthlyRevenue?: string;
  budgetRange?: string;
  buildingText?: string;
  blockersText?: string;
  message?: string;
  type?: 'contact_application' | 'booking' | 'audit';
}

function createGmailTransporter() {
  const user = process.env.GMAIL_USER || 'ajprworld@gmail.com';
  const pass = process.env.GMAIL_PASS;

  if (!pass) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

function buildCustomerEmailHtml(data: ContactEmailData): string {
  const isBooking = data.monthlyRevenue === 'Discovery Call Booking' || data.type === 'booking';
  const isAudit = data.type === 'audit' || data.message?.includes('DIAGNOSTIC AUDIT REQUEST');

  const title = isBooking 
    ? 'Strategy Session Request Received' 
    : isAudit 
      ? 'Diagnostic Audit Request Received' 
      : 'Application Received: Review in Progress';

  const headline = isBooking
    ? `We've received your strategy call booking request.`
    : isAudit
      ? `We've received your website diagnostic audit request.`
      : `Thank you for applying to partner with AJPR World.`;

  const whatsappMessage = encodeURIComponent(
    `Hi Aman, I just submitted an application on AJPR World (Ref: ${data.referenceId}) for ${data.companyName || data.name} and would like to connect directly.`
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
            <td style="background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%); padding: 32px 36px; text-align: left;">
              <div style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF;">AJPR WORLD</div>
              <div style="font-size: 13px; color: #BFDBFE; margin-top: 4px; font-weight: 500;">High-Performance Web Software & Scalable AI Infrastructure</div>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px;">
              <div style="display: inline-block; background-color: #1E3A8A; color: #93C5FD; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 9999px; border: 1px solid #3B82F6; margin-bottom: 16px;">
                Reference: #${data.referenceId}
              </div>

              <h1 style="color: #F9FAFB; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; line-height: 1.3;">
                ${headline}
              </h1>

              <p style="color: #9CA3AF; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi <strong style="color: #FFFFFF;">${data.name}</strong>,<br><br>
                ${isBooking 
                  ? "We have logged your discovery session details. Our team is confirming the slot and preparing technical background research before we jump on the call."
                  : isAudit
                    ? "Our technical SEO & systems architecture engineers have received your audit request and are analyzing your domain benchmarks."
                    : "Your application has been delivered to our engineering triage queue. Aman Joshi (Founder & Lead Systems Architect) reviews every application directly to verify technical scope, engineering sprint feasibility, and business impact."
                }
              </p>

              <!-- Application Summary Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1F2937; border: 1px solid #374151; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #374151;">
                    <strong style="color: #60A5FA; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Submission Snapshot</strong>
                  </td>
                </tr>
                ${data.companyName ? `
                <tr>
                  <td style="padding: 10px 0 4px 0; color: #9CA3AF; font-size: 13px; width: 140px;">Company / Brand:</td>
                  <td style="padding: 10px 0 4px 0; color: #F3F4F6; font-size: 13px; font-weight: 600;">${data.companyName}</td>
                </tr>` : ''}
                ${data.websiteUrl ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Website / URL:</td>
                  <td style="padding: 4px 0; color: #60A5FA; font-size: 13px;"><a href="${data.websiteUrl}" style="color: #60A5FA; text-decoration: none;">${data.websiteUrl}</a></td>
                </tr>` : ''}
                ${data.budgetRange ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Budget Bracket:</td>
                  <td style="padding: 4px 0; color: #34D399; font-size: 13px; font-weight: 700;">${data.budgetRange}</td>
                </tr>` : ''}
                ${data.monthlyRevenue ? `
                <tr>
                  <td style="padding: 4px 0; color: #9CA3AF; font-size: 13px;">Revenue Bracket:</td>
                  <td style="padding: 4px 0; color: #F3F4F6; font-size: 13px;">${data.monthlyRevenue}</td>
                </tr>` : ''}
                ${data.buildingText ? `
                <tr>
                  <td style="padding: 8px 0 0 0; color: #9CA3AF; font-size: 13px; vertical-align: top;">Project Scope:</td>
                  <td style="padding: 8px 0 0 0; color: #E5E7EB; font-size: 13px; line-height: 1.5;">${data.buildingText}</td>
                </tr>` : ''}
              </table>

              <!-- SLA / What Happens Next -->
              <h2 style="color: #FFFFFF; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
                What Happens Next:
              </h2>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 8px 0; vertical-align: top; width: 28px;">
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: #2563EB; color: white; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: bold;">1</span>
                  </td>
                  <td style="padding: 8px 0; color: #D1D5DB; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #FFFFFF;">Senior Architecture Review (Within 24–48 Hours):</strong><br>
                    We analyze your technical bottlenecks, required API integrations, and sprint scope.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; vertical-align: top; width: 28px;">
                    <span style="display: inline-block; width: 20px; height: 20px; background-color: #2563EB; color: white; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: bold;">2</span>
                  </td>
                  <td style="padding: 8px 0; color: #D1D5DB; font-size: 14px; line-height: 1.5;">
                    <strong style="color: #FFFFFF;">Direct Engineering Response:</strong><br>
                    You will receive direct feedback, transparent sprint estimation, or next calendar steps from Aman Joshi.
                  </td>
                </tr>
              </table>

              <!-- Fast-Track Action Buttons -->
              <div style="background: linear-gradient(180deg, #1E293B 0%, #0F172A 100%); border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 14px; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">
                  Need Immediate Answers or Urgent Delivery?
                </div>
                <p style="font-size: 12px; color: #94A3B8; margin: 0 0 16px 0;">
                  Skip the email backlog by booking a strategy call or reaching out directly on WhatsApp.
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 10px;">
                      <a href="https://ajprworld.com/book-call" target="_blank" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);">
                        📅 Book 15-Min Scoping Call
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
              <div>&copy; ${new Date().getFullYear()} AJPR World. All rights reserved.</div>
              <div style="margin-top: 6px;">
                Direct inquiries: <a href="mailto:hello@ajprworld.com" style="color: #9CA3AF; text-decoration: underline;">hello@ajprworld.com</a> | India & Global Delivery
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

function buildAdminEmailHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #1e40af; color: #ffffff; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; margin-bottom: 20px;">
      NEW CLIENT LEAD • REF: #${data.referenceId}
    </div>

    <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 22px;">
      ${data.companyName ? `${data.companyName} (${data.name})` : data.name}
    </h2>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold; width: 140px;">Name:</td>
        <td style="padding: 8px 0; color: #111827;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Work Email:</td>
        <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      ${data.phone ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0; color: #111827;">${data.phone}</td>
      </tr>` : ''}
      ${data.companyName ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Company:</td>
        <td style="padding: 8px 0; color: #111827;">${data.companyName}</td>
      </tr>` : ''}
      ${data.websiteUrl ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Website / URL:</td>
        <td style="padding: 8px 0; color: #2563eb;"><a href="${data.websiteUrl}" target="_blank">${data.websiteUrl}</a></td>
      </tr>` : ''}
      ${data.monthlyRevenue ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Monthly Revenue:</td>
        <td style="padding: 8px 0; color: #111827;">${data.monthlyRevenue}</td>
      </tr>` : ''}
      ${data.budgetRange ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Budget Range:</td>
        <td style="padding: 8px 0; color: #059669; font-weight: bold;">${data.budgetRange}</td>
      </tr>` : ''}
    </table>

    ${data.buildingText ? `
    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <div style="font-weight: bold; color: #374151; font-size: 13px; margin-bottom: 6px;">WHAT THEY ARE BUILDING:</div>
      <div style="color: #1f2937; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.buildingText}</div>
    </div>` : ''}

    ${data.blockersText ? `
    <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <div style="font-weight: bold; color: #991b1b; font-size: 13px; margin-bottom: 6px;">CURRENT BLOCKERS / CHALLENGES:</div>
      <div style="color: #7f1d1d; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${data.blockersText}</div>
    </div>` : ''}

    <div style="margin-top: 24px; text-align: center;">
      <a href="mailto:${data.email}?subject=Re:%20AJPR%20World%20Partnership%20Application%20(%23${data.referenceId})" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
        Reply to Client (${data.name})
      </a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function dispatchContactEmails(data: ContactEmailData): Promise<{ customerSent: boolean; adminSent: boolean; error?: string }> {
  let customerSent = false;
  let adminSent = false;
  let lastError: string | undefined;

  const adminEmail = process.env.GMAIL_USER || 'hello@ajprworld.com';
  const customerHtml = buildCustomerEmailHtml(data);
  const adminHtml = buildAdminEmailHtml(data);
  const customerSubject = `Application Received: We're Reviewing Your Project — AJPR World (#${data.referenceId})`;
  const adminSubject = `🔥 New Client Lead: ${data.companyName || data.name} [${data.budgetRange || 'Unspecified'}] (#${data.referenceId})`;

  // Strategy A: Try Gmail SMTP via Nodemailer
  const transporter = createGmailTransporter();
  if (transporter) {
    try {
      // 1. Send to Customer
      await transporter.sendMail({
        from: `"AJPR World" <${adminEmail}>`,
        to: data.email,
        subject: customerSubject,
        html: customerHtml,
      });
      customerSent = true;
      console.log(`[Contact Mailer] Customer auto-responder delivered to: ${data.email}`);
    } catch (err: any) {
      console.error(`[Contact Mailer] Failed to deliver to customer via Gmail SMTP:`, err?.message || err);
      lastError = err?.message;
    }

    try {
      // 2. Send to Admin
      await transporter.sendMail({
        from: `"AJPR Lead Engine" <${adminEmail}>`,
        to: adminEmail,
        replyTo: data.email,
        subject: adminSubject,
        html: adminHtml,
      });
      adminSent = true;
      console.log(`[Contact Mailer] Admin alert delivered to: ${adminEmail}`);
    } catch (err: any) {
      console.error(`[Contact Mailer] Failed to deliver to admin via Gmail SMTP:`, err?.message || err);
      lastError = err?.message;
    }
  }

  // Strategy B: If customer email wasn't delivered via SMTP, try ZeptoMail
  const zeptoToken = process.env.ZEPTOMAIL_TOKEN;
  const isZeptoAvailable = zeptoToken && !zeptoToken.includes('SENSITIVE');

  if (!customerSent && isZeptoAvailable) {
    try {
      await sendZeptoEmail({
        to: data.email,
        subject: customerSubject,
        text: `Hi ${data.name}, we received your application (Ref: #${data.referenceId}). We will review and reach out within 48 hours. Schedule a call at https://ajprworld.com/book-call or chat on WhatsApp at +91 9997205257.`,
        html: customerHtml,
      });
      customerSent = true;
      console.log(`[Contact Mailer] Customer auto-responder delivered via ZeptoMail to: ${data.email}`);
    } catch (err: any) {
      console.error(`[Contact Mailer] ZeptoMail dispatch failed:`, err?.message || err);
    }
  }

  if (!adminSent && isZeptoAvailable) {
    try {
      await sendZeptoEmail({
        to: adminEmail,
        subject: adminSubject,
        text: `New lead from ${data.name} (${data.email}). Reference: #${data.referenceId}`,
        html: adminHtml,
      });
      adminSent = true;
      console.log(`[Contact Mailer] Admin alert delivered via ZeptoMail to: ${adminEmail}`);
    } catch (err: any) {
      console.error(`[Contact Mailer] ZeptoMail admin dispatch failed:`, err?.message || err);
    }
  }

  return { customerSent, adminSent, error: lastError };
}
