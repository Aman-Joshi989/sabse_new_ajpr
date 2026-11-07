import nodemailer from 'nodemailer';

const rawUser = process.env.GMAIL_USER || 'ajprworld@gmail.com';
const rawPass = process.env.GMAIL_PASS || '';

const user = rawUser.replace(/['"]/g, '').trim();
const pass = rawPass.replace(/['"\s]/g, '').trim();

// Create a reusable transporter using Gmail SMTP with timeouts
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 8000,
});

export const sendColdEmail = async (to: string, subject: string, htmlBody: string): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: `"AJPR World Team" <${user}>`,
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
