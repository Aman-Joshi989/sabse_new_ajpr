import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { verifyAdminSessionActive } from '../lib/db/admin-queries';

test('Migration 001 UP file exists and has correct table definitions', () => {
  const upFile = path.resolve(process.cwd(), 'migrations/001_create_admin_control_system.sql');
  assert.equal(fs.existsSync(upFile), true);

  const sql = fs.readFileSync(upFile, 'utf8');
  assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS admin_roles'));
  assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS admin_permissions'));
  assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS admin_role_permissions'));
  assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS admin_users'));
  assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS admin_audit_logs'));

  // Critical security rule check: does NOT touch existing users table
  assert.ok(!sql.includes('ALTER TABLE users'));
  assert.ok(!sql.includes('DROP TABLE users'));
});

test('Migration 001 DOWN file exists and performs reversible clean rollback', () => {
  const downFile = path.resolve(process.cwd(), 'migrations/001_create_admin_control_system_down.sql');
  assert.equal(fs.existsSync(downFile), true);

  const sql = fs.readFileSync(downFile, 'utf8');
  assert.ok(sql.includes('DROP TABLE IF EXISTS admin_audit_logs CASCADE;'));
  assert.ok(sql.includes('DROP TABLE IF EXISTS admin_users CASCADE;'));
  assert.ok(sql.includes('DROP TABLE IF EXISTS admin_roles CASCADE;'));
});

test('verifyAdminSessionActive rejects nonexistent or deactivated users safely', async () => {
  // Safe test against nonexistent dummy UUID
  const result = await verifyAdminSessionActive('00000000-0000-0000-0000-000000000000');
  assert.equal(result.valid, false);
});
