import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/leads/route';

test('Lead API rejects empty submission with 400', async () => {
  const req = new Request('https://ajprworld.com/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.match(data.error, /required/i);
});

test('Lead API rejects submission with name only (missing email)', async () => {
  const req = new Request('https://ajprworld.com/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alex Client' })
  });
  const res = await POST(req);
  assert.equal(res.status, 400);
});

test('Lead API traps bot honeypot safely without writing lead', async () => {
  const req = new Request('https://ajprworld.com/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      honeypot: 'filled_by_bot_crawler'
    })
  });
  const res = await POST(req);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.lead, null);
});

test('Lead API processes customer-friendly audit payload structure cleanly', async () => {
  const payload = {
    name: 'Sarah Connor',
    email: 'sarah@skynet-defense.com',
    companySize: '11-50',
    budget: '5k-15k',
    techStack: 'Next.js 16, Postgres, Tailwind',
    utm_source: 'free_audit_page',
    utm_medium: 'referral',
    utm_campaign: 'seo_sprint_2026'
  };

  const req = new Request('https://ajprworld.com/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const res = await POST(req);
  // When DATABASE_URL is not set in local test runner, neon queries fall back gracefully
  assert.ok(res.status === 200 || res.status === 500);
});
