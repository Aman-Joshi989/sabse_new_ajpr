-- Migration 003 DOWN: Revert Seeded RBAC Permissions
-- Reversible rollback migration

DELETE FROM admin_role_permissions 
WHERE permission_id IN (
    SELECT id FROM admin_permissions 
    WHERE slug IN (
        'agents:trigger', 'resumes:download', 'leads:manage', 
        'users:manage', 'security:manage', 'audit:view', 
        'seo:manage', 'billing:manage'
    )
);

DELETE FROM admin_permissions 
WHERE slug IN (
    'agents:trigger', 'resumes:download', 'leads:manage', 
    'users:manage', 'security:manage', 'audit:view', 
    'seo:manage', 'billing:manage'
);

