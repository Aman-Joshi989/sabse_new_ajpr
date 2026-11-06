-- ============================================================================
-- MIGRATION 001: Dedicated Admin Identity & Control System (DOWN)
-- Reversible rollback
-- ============================================================================

DROP TABLE IF EXISTS admin_audit_logs CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS admin_role_permissions CASCADE;
DROP TABLE IF EXISTS admin_permissions CASCADE;
DROP TABLE IF EXISTS admin_roles CASCADE;
