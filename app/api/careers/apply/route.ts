import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { sql } from '@/lib/db/queries';
import { sendEmail } from '@/lib/zeptomail'; 

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Honeypot check for bots
    if (formData.get('honeypot')) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const role_applied_for = formData.get('role_applied_for') as string || 'Open Application';
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const linkedin_url = formData.get('linkedin_url') as string;
    const cover_letter = formData.get('cover_letter') as string;
    
    // UTM parameters
    const utm_source = formData.get('utm_source') as string;
    const utm_medium = formData.get('utm_medium') as string;
    const utm_campaign = formData.get('utm_campaign') as string;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    let resume_url = '';
    const file = formData.get('resume') as File;
    
    // Upload resume to Vercel Blob if provided
    if (file && file.size > 0) {
      try {
        const blob = await put(`resumes/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`, file, {
          access: 'public',
        });
        resume_url = blob.url;
      } catch (uploadError: any) {
        console.error('Error uploading to Vercel Blob (make sure BLOB_READ_WRITE_TOKEN is set):', uploadError);
        // We continue even if upload fails, just leave resume_url empty or log the error
      }
    }

    // Insert into database
    await sql`
      INSERT INTO job_applications (
        role_applied_for, name, email, phone, linkedin_url, resume_url, cover_letter, utm_source, utm_medium, utm_campaign
      ) VALUES (
        ${role_applied_for}, ${name}, ${email}, ${phone}, ${linkedin_url}, ${resume_url}, ${cover_letter}, ${utm_source}, ${utm_medium}, ${utm_campaign}
      )
    `;

    // Send Notification Email
    try {
      const emailContent = `
        New Job Application: ${role_applied_for}
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        LinkedIn: ${linkedin_url}
        Resume: ${resume_url || 'No file uploaded'}
        
        Cover Letter: 
        ${cover_letter}
        
        --- Tracking Data ---
        Source: ${utm_source || 'direct'}
        Medium: ${utm_medium || 'N/A'}
        Campaign: ${utm_campaign || 'N/A'}
      `;

      if (typeof sendEmail === 'function') {
        await sendEmail({
          to: 'hello@ajprworld.com',
          subject: `New Application: ${role_applied_for} - ${name}`,
          text: emailContent,
          html: `<pre>${emailContent}</pre>`
        });
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing application:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit application' }, { status: 500 });
  }
}
