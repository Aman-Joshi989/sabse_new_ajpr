import test from 'node:test';
import assert from 'node:assert/strict';
import { requireAdminApi } from '../lib/admin/guard';
import { encrypt } from '../lib/auth';
import { NextRequest } from 'next/server';

test('requireAdminApi validates admin session and role hierarchy options', async () => {
  const orig = process.env.ADMIN_EMAILS;

  try {
    process.env.ADMIN_EMAILS = 'superadmin@example.com, staff@example.com, auditor@example.com';

    // 1. Valid superadmin session
    const superSession = await encrypt({
      user: {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'superadmin@example.com',
        role: 'admin',
        roleSlug: 'superadmin',
        hierarchyTier: 0,
      },
    });

    const validReq = new NextRequest('https://example.com/api/admin/test', {
      headers: {
        cookie: `session=${superSession}`,
      },
    });

    const check1 = await requireAdminApi(validReq);
    assert.equal(Boolean(check1.user), true);
    assert.equal(check1.user?.email, 'superadmin@example.com');

    // 2. Unauthenticated request returns 401
    const unauthReq = new NextRequest('https://example.com/api/admin/test');
    const check2 = await requireAdminApi(unauthReq);
    assert.equal(Boolean(check2.response), true);
    assert.equal(check2.response?.status, 401);

    // 3. Unauthorized email returns 403
    const evilSession = await encrypt({
      user: {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'attacker@evil.com',
        role: 'admin',
      },
    });
    const evilReq = new NextRequest('https://example.com/api/admin/test', {
      headers: {
        cookie: `session=${evilSession}`,
      },
    });
    const check3 = await requireAdminApi(evilReq);
    assert.equal(Boolean(check3.response), true);
    assert.equal(check3.response?.status, 403);

    // 4. Client role attempting admin API returns 403
    const clientSession = await encrypt({
      user: {
        id: '00000000-0000-0000-0000-000000000003',
        email: 'superadmin@example.com',
        role: 'client',
      },
    });
    const clientReq = new NextRequest('https://example.com/api/admin/test', {
      headers: {
        cookie: `session=${clientSession}`,
      },
    });
    const check4 = await requireAdminApi(clientReq);
    assert.equal(Boolean(check4.response), true);
    assert.equal(check4.response?.status, 403);

    // 5. Hierarchy Tier validation (superadmin passes tier 0)
    const checkTier = await requireAdminApi(validReq, { minTier: 0 });
    assert.equal(Boolean(checkTier.user), true);

    // 6. Role Slug validation (superadmin satisfies minRole='operations_admin')
    const checkRole = await requireAdminApi(validReq, { minRole: 'operations_admin' });
    assert.equal(Boolean(checkRole.user), true);
  } finally {
    process.env.ADMIN_EMAILS = orig;
  }
});
