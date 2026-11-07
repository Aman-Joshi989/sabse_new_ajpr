import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Email mailer implementation exports all required point-of-contact methods', async () => {
  const mailerPath = path.resolve(process.cwd(), 'lib/email/contact-mailer.ts');
  const content = fs.readFileSync(mailerPath, 'utf8');

  assert.ok(content.includes('export async function dispatchContactEmails'), 'Missing dispatchContactEmails');
  assert.ok(content.includes('export async function dispatchBookingEmails'), 'Missing dispatchBookingEmails');
  assert.ok(content.includes('export async function dispatchGrowthChecklistEmail'), 'Missing dispatchGrowthChecklistEmail');
  assert.ok(content.includes('export async function dispatchCareerApplicationEmails'), 'Missing dispatchCareerApplicationEmails');
  assert.ok(content.includes('export function generateReferenceId'), 'Missing generateReferenceId');
});

test('Lead API route connects to unified mailer and dispatches to customer and admin', () => {
  const routePath = path.resolve(process.cwd(), 'app/api/leads/route.ts');
  const content = fs.readFileSync(routePath, 'utf8');

  assert.ok(content.includes('dispatchContactEmails'), 'Lead API does not dispatch emails');
  assert.ok(content.includes('generateReferenceId'), 'Lead API does not generate referenceId');
  assert.ok(content.includes('clientEmailSent'), 'Lead API does not report clientEmailSent');
  assert.ok(content.includes('adminEmailSent'), 'Lead API does not report adminEmailSent');
});

test('Booking API route connects to unified mailer and dispatches immediate confirmations', () => {
  const routePath = path.resolve(process.cwd(), 'app/api/bookings/route.ts');
  const content = fs.readFileSync(routePath, 'utf8');

  assert.ok(content.includes('dispatchBookingEmails'), 'Booking API does not dispatch booking emails');
  assert.ok(content.includes('generateReferenceId'), 'Booking API does not generate referenceId');
  assert.ok(content.includes('generateGoogleMeetLink'), 'Booking API does not generate Google Meet link');
});

test('Subscribe API route connects to unified mailer and dispatches growth checklist', () => {
  const routePath = path.resolve(process.cwd(), 'app/api/subscribe/route.ts');
  const content = fs.readFileSync(routePath, 'utf8');

  assert.ok(content.includes('dispatchGrowthChecklistEmail'), 'Subscribe API does not dispatch checklist email');
});

test('Careers Apply API route connects to unified mailer for applicant and admin', () => {
  const routePath = path.resolve(process.cwd(), 'app/api/careers/apply/route.ts');
  const content = fs.readFileSync(routePath, 'utf8');

  assert.ok(content.includes('dispatchCareerApplicationEmails'), 'Careers Apply API does not dispatch application emails');
});

test('LeadForm and ToolLeadCapture display reference tracking IDs to clients', () => {
  const leadForm = fs.readFileSync(path.resolve(process.cwd(), 'components/LeadForm.tsx'), 'utf8');
  assert.ok(leadForm.includes('referenceId'), 'LeadForm does not track referenceId');
  assert.ok(leadForm.includes('Ref: #{referenceId}'), 'LeadForm does not display referenceId to client');

  const toolCapture = fs.readFileSync(path.resolve(process.cwd(), 'components/ToolLeadCapture.tsx'), 'utf8');
  assert.ok(toolCapture.includes('referenceId'), 'ToolLeadCapture does not track referenceId');
  assert.ok(toolCapture.includes('Ref: #{referenceId}'), 'ToolLeadCapture does not display referenceId to client');
});

test('Multi-provider resilience includes Resend, Gmail SMTP, Custom SMTP, ZeptoMail, and PostgreSQL Outbox', () => {
  const content = fs.readFileSync(path.resolve(process.cwd(), 'lib/email/contact-mailer.ts'), 'utf8');

  assert.ok(content.includes('api.resend.com/emails'), 'Resend REST API support missing');
  assert.ok(content.includes('createGmailTransporter'), 'Gmail SMTP support missing');
  assert.ok(content.includes('createCustomSmtpTransporter'), 'Custom SMTP support missing');
  assert.ok(content.includes('recordOutboxEntry'), 'Database outbox persistence missing');
  assert.ok(content.includes('email_outbox'), 'email_outbox table definition missing');
});

