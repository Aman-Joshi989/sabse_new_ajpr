import test from 'node:test';
import assert from 'node:assert/strict';
import { isEmailAuthorizedAdmin, assertSameOrigin, SESSION_COOKIE_NAME, isAuthorizedCron } from '../lib/admin/guard';
import { SESSION_COOKIE_OPTIONS, encrypt, decrypt } from '../lib/auth';

test('SESSION_COOKIE_NAME is session', () => {
  assert.equal(SESSION_COOKIE_NAME, 'session');
});

test('SESSION_COOKIE_OPTIONS enforces security flags', () => {
  assert.equal(SESSION_COOKIE_OPTIONS.httpOnly, true);
  assert.equal(SESSION_COOKIE_OPTIONS.sameSite, 'lax');
  assert.equal(SESSION_COOKIE_OPTIONS.path, '/');
});

test('encrypt and decrypt verify JWT round-trip', async () => {
  const payload = { user: { id: 1, email: 'test@example.com', role: 'admin' } };
  const token = await encrypt(payload);
  assert.ok(typeof token === 'string' && token.length > 20);

  const decrypted = await decrypt(token);
  assert.equal(decrypted.user.email, 'test@example.com');
  assert.equal(decrypted.user.role, 'admin');

  // Tampered token returns null
  const tampered = await decrypt(token.slice(0, -5) + 'abcde');
  assert.equal(tampered, null);
});

test('isEmailAuthorizedAdmin validation and fail-closed security', () => {
  const orig = process.env.ADMIN_EMAILS;

  try {
    process.env.ADMIN_EMAILS = 'admin@example.com, owner@example.com';
    assert.equal(isEmailAuthorizedAdmin('admin@example.com'), true);
    assert.equal(isEmailAuthorizedAdmin('ADMIN@EXAMPLE.COM'), true);
    assert.equal(isEmailAuthorizedAdmin('  owner@example.com  '), true);
    assert.equal(isEmailAuthorizedAdmin('attacker@example.com'), false);
    assert.equal(isEmailAuthorizedAdmin(''), false);
    assert.equal(isEmailAuthorizedAdmin(null), false);
    assert.equal(isEmailAuthorizedAdmin(undefined), false);

    // Fail-closed test: unset or empty ADMIN_EMAILS
    process.env.ADMIN_EMAILS = '';
    assert.equal(isEmailAuthorizedAdmin('admin@example.com'), false);

    delete process.env.ADMIN_EMAILS;
    assert.equal(isEmailAuthorizedAdmin('admin@example.com'), false);
  } finally {
    process.env.ADMIN_EMAILS = orig;
  }
});

test('assertSameOrigin verifies matching base url and Sec-Fetch-Site', () => {
  const orig = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';

    // Matching Origin on POST
    const validPost = new Request('https://example.com/api/test', {
      method: 'POST',
      headers: { origin: 'https://example.com' },
    });
    assert.equal(assertSameOrigin(validPost).valid, true);

    // Mismatched Origin on POST
    const maliciousPost = new Request('https://example.com/api/test', {
      method: 'POST',
      headers: { origin: 'https://evil.com' },
    });
    const malCheck = assertSameOrigin(maliciousPost);
    assert.equal(malCheck.valid, false);
    assert.equal(malCheck.error, 'Forbidden');

    // Missing Origin on POST with Sec-Fetch-Site same-origin
    const internalPost = new Request('https://example.com/api/test', {
      method: 'POST',
      headers: { 'sec-fetch-site': 'same-origin' },
    });
    assert.equal(assertSameOrigin(internalPost).valid, true);

    // Missing Origin on POST with Sec-Fetch-Site cross-site
    const crossSitePost = new Request('https://example.com/api/test', {
      method: 'POST',
      headers: { 'sec-fetch-site': 'cross-site' },
    });
    const crossCheck = assertSameOrigin(crossSitePost);
    assert.equal(crossCheck.valid, false);
    assert.equal(crossCheck.error, 'Forbidden');

    // Missing Origin on GET is permitted (standard browser navigation)
    const getReq = new Request('https://example.com/api/test', {
      method: 'GET',
    });
    assert.equal(assertSameOrigin(getReq).valid, true);

    // Fail-closed: NEXT_PUBLIC_BASE_URL unset
    delete process.env.NEXT_PUBLIC_BASE_URL;
    const noBaseCheck = assertSameOrigin(validPost);
    assert.equal(noBaseCheck.valid, false);
    assert.equal(noBaseCheck.error, 'Forbidden');
  } finally {
    process.env.NEXT_PUBLIC_BASE_URL = orig;
  }
});

test('isAuthorizedCron timing-safe and fail-closed validation', () => {
  const orig = process.env.CRON_SECRET;

  try {
    process.env.CRON_SECRET = 'super-secret-cron-key-at-least-16-bytes';

    // Valid Bearer
    const validReq = new Request('https://example.com/api/cron/test', {
      headers: { authorization: 'Bearer super-secret-cron-key-at-least-16-bytes' },
    });
    assert.equal(isAuthorizedCron(validReq), true);

    // Invalid Bearer token
    const invalidReq = new Request('https://example.com/api/cron/test', {
      headers: { authorization: 'Bearer wrong-secret-key-at-least-16-bytes' },
    });
    assert.equal(isAuthorizedCron(invalidReq), false);

    // Missing header
    const noHeaderReq = new Request('https://example.com/api/cron/test');
    assert.equal(isAuthorizedCron(noHeaderReq), false);

    // Query string bypass rejected
    const queryReq = new Request('https://example.com/api/cron/test?secret=super-secret-cron-key-at-least-16-bytes');
    assert.equal(isAuthorizedCron(queryReq), false);

    // Fail-closed if secret unset
    delete process.env.CRON_SECRET;
    delete process.env.AGENT_SECRET;
    assert.equal(isAuthorizedCron(validReq), false);
  } finally {
    process.env.CRON_SECRET = orig;
  }
});

