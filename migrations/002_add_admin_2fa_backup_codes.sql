-- Migration 002: Add two_factor_backup_codes to admin_users
-- Idempotent, reversible schema migration for Phase 4 TOTP 2FA

ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS two_factor_backup_codes JSONB DEFAULT '[]'::jsonb;
