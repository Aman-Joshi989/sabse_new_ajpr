import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Create a reusable transporter using Gmail SMTP
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // This should be an App Password, not the regular account password
  },
});

export const sendColdEmail = async (to: string, subject: string, htmlBody: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"AJPR World Team" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: htmlBody,
    });
    console.log(`✉️ Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    return false;
  }
};
