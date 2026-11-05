import test from 'node:test';
import assert from 'node:assert/strict';
import { isEmailAuthorizedAdmin, assertSameOrigin, SESSION_COOKIE_NAME } from '../lib/admin/guard';

test('SESSION_COOKIE_NAME is session', () => {
  assert.equal(SESSION_COOKIE_NAME, 'session');
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

