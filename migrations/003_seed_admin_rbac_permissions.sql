-- Migration 003: Seed Admin RBAC Permissions and Role Mappings
-- Idempotent, reversible schema migration for Phase 5 RBAC

INSERT INTO admin_permissions (slug, name, category, description) VALUES
    ('agents:trigger', 'Trigger Autonomous Agents', 'AGENTS', 'Authorize execution of autonomous background agents and workflows'),
    ('resumes:download', 'Download Job Resumes', 'CAREERS', 'Access and download private candidate resumes from storage'),
    ('leads:manage', 'Manage CRM Leads', 'CRM', 'View, update, and manage inbound sales leads and contacts'),
    ('users:manage', 'Manage System Users', 'USERS', 'Create, update, and manage client and staff workspaces'),
    ('security:manage', 'Manage Security & Roles', 'SECURITY', 'Configure two-factor authentication, administrative roles, and keys'),
    ('audit:view', 'View Security Audit Logs', 'AUDIT', 'Inspect immutable security audit ledger and telemetry'),
    ('seo:manage', 'Manage SEO & Indexing', 'SEO', 'Submit IndexNow pings and manage search engine configurations'),
    ('billing:manage', 'Manage Invoices & Payments', 'BILLING', 'Create and modify client billing records and payments')
ON CONFLICT (slug) DO NOTHING;

-- Grant all permissions to superadmin role
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
CROSS JOIN admin_permissions p
WHERE r.slug = 'superadmin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Grant operational permissions to operations_admin role
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
JOIN admin_permissions p ON p.slug IN (
    'agents:trigger', 
    'resumes:download', 
    'leads:manage', 
    'seo:manage', 
    'audit:view', 
    'billing:manage'
)
WHERE r.slug = 'operations_admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Grant audit permissions to technical_auditor role
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM admin_roles r
JOIN admin_permissions p ON p.slug IN (
    'audit:view'
)
WHERE r.slug = 'technical_auditor'
ON CONFLICT (role_id, permission_id) DO NOTHING;
