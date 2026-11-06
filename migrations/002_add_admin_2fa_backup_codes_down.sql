-- Migration 002 DOWN: Revert two_factor_backup_codes column
-- Reversible rollback migration

ALTER TABLE admin_users 
DROP COLUMN IF EXISTS two_factor_backup_codes;
