import { SendMailClient } from 'zeptomail';

const rawUrl = process.env.ZEPTOMAIL_URL || 'https://api.zeptomail.in/v1.1/email';
const rawToken = process.env.ZEPTOMAIL_TOKEN || '';

const isTokenValid = Boolean(rawToken && !rawToken.includes('SENSITIVE') && rawToken.length >= 15);
const isUrlValid = Boolean(rawUrl && !rawUrl.includes('SENSITIVE') && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')));

let client: any = null;
if (isTokenValid && isUrlValid) {
  try {
    client = new SendMailClient({ url: rawUrl, token: rawToken });
  } catch (initErr) {
    console.warn('[ZeptoMail] Failed to initialize client:', initErr);
  }
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  if (!client) {
    console.log('[ZeptoMail] Not configured or credentials invalid. Target:', { to, subject });
    return false;
  }

  try {
    await client.sendMail({
      bounce_address: 'noreply@ajprworld.com',
      from: {
        address: 'noreply@ajprworld.com',
        name: 'AJPR World',
      },
      to: [
        {
          email_address: {
            address: to,
            name: to.split('@')[0],
          },
        },
      ],
      subject: subject,
      textbody: text,
      htmlbody: html || `<p>${text}</p>`,
    });
    return true;
  } catch (error) {
    console.error('[ZeptoMail] Send error:', error);
    throw error;
  }
}
