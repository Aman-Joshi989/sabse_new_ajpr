# AJPR Central Command — Database Schema Specification (DATABASE_SCHEMA.md)

> **Document Version**: 1.0.0  
> **Status**: APPROVED FOR REVIEW (Phase 1 Planning)  
> **Target Database Engine**: PostgreSQL 16+ (Supabase / Neon / AWS Aurora)  
> **Entity**: AJPR World Private Limited  
> **Lead Architect**: AI Systems Architecture Team (Google Antigravity IDE)  
> **Classification**: Restricted — Internal Database DDL  

---

## 1. Schema Architecture & Design Principles

The database for AJPR Central Command is built upon five foundational guarantees:
1. **Strict Relational Integrity**: Full foreign key cascading, not-null constraints, and enumeration checks.
2. **Granular Role-Based Access Control**: Fully normalized `roles`, `permissions`, and `role_permissions` tables mapped directly to application middleware and PostgreSQL Row Level Security (RLS).
3. **Encrypted Token Vault**: Third-party integration credentials are stored strictly as encrypted ciphertext with unique initialization vectors (IVs) and authentication tags.
4. **Immutable Audit Trail**: The `audit_logs` table is append-only; database triggers disallow `UPDATE` or `DELETE` statements on audit records.
5. **Two-Man Rule Approval State Machine**: `approval_requests` track state transitions from `PENDING` -> `APPROVED` / `REJECTED` -> `EXECUTED`.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CENTRAL COMMAND RELATIONAL MAP                        │
│                                                                             │
│   ┌──────────────┐          ┌───────────────────┐          ┌─────────────┐  │
│   │    roles     │──(1:N)───│  role_permissions │───(N:1)──│ permissions │  │
│   └──────┬───────┘          └───────────────────┘          └─────────────┘  │
│          │ (1:N)                                                            │
│          ▼                                                                  │
│   ┌──────────────┐          ┌───────────────────┐                           │
│   │    users     │──(1:N)───│   mcp_sessions    │                           │
│   └──────┬───────┘          └───────────────────┘                           │
│          │ (1:N)                                                            │
│          ├─────────────────────────────────────────────────┐                │
│          │ (1:N)                                           │ (1:N)          │
│          ▼                                                 ▼                │
│   ┌───────────────────┐                             ┌─────────────┐         │
│   │ approval_requests │                             │ audit_logs  │         │
│   └───────────────────┘                             └─────────────┘         │
│          │                                                                  │
│          ▼ (N:1)                                                            │
│   ┌───────────────────┐          ┌─────────────────────────┐                │
│   │   integrations    │──(1:N)───│ integration_credentials │                │
│   └──────┬────────────┘          └─────────────────────────┘                │
│          │ (1:N)                                                            │
│          ▼                                                                  │
│   ┌───────────────────┐                                                     │
│   │  analytics_cache  │                                                     │
│   └───────────────────┘                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Production PostgreSQL DDL (Data Definition Language)

```sql
-- ============================================================================
-- AJPR CENTRAL COMMAND — CORE DATABASE SCHEMA
-- Extensions & Utilities
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ROLES & PERMISSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hierarchy_tier INTEGER NOT NULL, -- 0 = Company Owner, 1 = Super Admin, ..., 7 = Viewer
    is_system_role BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL, -- e.g. 'dns.propose', 'dns.execute', 'ga4.view'
    module VARCHAR(50) NOT NULL,       -- 'dns', 'deployments', 'gsc', 'ga4', 'gbp', 'github', 'audit'
    action VARCHAR(50) NOT NULL,       -- 'view', 'propose', 'execute', 'admin'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id)
);

-- ============================================================================
-- 2. USERS & SESSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    google_subject_id VARCHAR(255) UNIQUE,
    role_id UUID NOT NULL REFERENCES roles(id),
    is_active BOOLEAN DEFAULT true,
    mfa_enforced BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_corporate_domain CHECK (email LIKE '%@ajprworld.com')
);

CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    user_agent TEXT,
    ip_address VARCHAR(45) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. INTEGRATIONS & ENCRYPTED CREDENTIAL VAULT
-- ============================================================================

CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_slug VARCHAR(50) UNIQUE NOT NULL, -- 'gsc', 'ga4', 'gbp', 'hostinger', 'vercel', 'github'
    display_name VARCHAR(100) NOT NULL,
    service_type VARCHAR(50) NOT NULL,        -- 'google', 'hosting', 'dns', 'git'
    status VARCHAR(30) DEFAULT 'inactive',     -- 'active', 'inactive', 'revoked', 'degraded'
    config_metadata JSONB DEFAULT '{}'::jsonb, -- non-sensitive settings (e.g. site URL, property ID)
    last_health_check_at TIMESTAMP WITH TIME ZONE,
    health_error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS integration_credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    auth_mechanism VARCHAR(30) NOT NULL,       -- 'oauth2', 'api_token', 'pat'
    encrypted_access_token BYTEA NOT NULL,     -- AES-256-GCM ciphertext
    encrypted_refresh_token BYTEA,            -- AES-256-GCM ciphertext (if OAuth)
    encryption_iv BYTEA NOT NULL,             -- 12-byte initialization vector
    encryption_auth_tag BYTEA NOT NULL,        -- 16-byte authentication tag
    key_version INTEGER NOT NULL DEFAULT 1,
    granted_scopes TEXT[] DEFAULT ARRAY[]::TEXT[],
    token_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. TWO-MAN APPROVAL WORKFLOW
-- ============================================================================

CREATE TABLE IF NOT EXISTS approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'APR-2026-X8KJ'
    operation_type VARCHAR(50) NOT NULL,      -- 'DNS_CHANGE', 'PROD_DEPLOY', 'KEY_ROTATION'
    integration_id UUID NOT NULL REFERENCES integrations(id),
    requester_id UUID NOT NULL REFERENCES users(id),
    approver_id UUID REFERENCES users(id),    -- Must have hierarchy_tier = 0 (Company Owner)
    status VARCHAR(30) DEFAULT 'PENDING',     -- 'PENDING', 'APPROVED', 'REJECTED', 'EXECUTED', 'FAILED', 'EXPIRED'
    justification TEXT NOT NULL,
    target_resource VARCHAR(255) NOT NULL,    -- e.g. 'ajprworld.com:DNS:A:76.76.21.21'
    payload_before JSONB,                     -- snapshot prior to modification
    payload_proposed JSONB NOT NULL,          -- requested modification
    execution_result JSONB,                   -- API response telemetry upon execution
    rejection_reason TEXT,
    approved_at TIMESTAMP WITH TIME ZONE,
    executed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL, -- auto-expires after 24h if untouched
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. IMMUTABLE AUDIT LOG & TAMPER-EVIDENT HASH CHAIN
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id),
    actor_email VARCHAR(255) NOT NULL,
    actor_role_slug VARCHAR(50) NOT NULL,
    action_slug VARCHAR(100) NOT NULL,        -- e.g. 'dns.record.create', 'user.login'
    module VARCHAR(50) NOT NULL,
    target_resource_id VARCHAR(255),
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    payload_diff JSONB,
    status VARCHAR(30) NOT NULL,              -- 'SUCCESS', 'DENIED', 'ERROR'
    error_message TEXT,
    previous_hash VARCHAR(64) NOT NULL,       -- SHA-256 of preceding row
    current_hash VARCHAR(64) NOT NULL,        -- SHA-256 (row_id + previous_hash + payload)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enforce append-only on audit_logs: disallow updates and deletions
CREATE OR REPLACE FUNCTION prevent_audit_tampering()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit log records are immutable and cannot be modified or deleted.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_immutable ON audit_logs;
CREATE TRIGGER trg_audit_immutable
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW
EXECUTE FUNCTION prevent_audit_tampering();

-- ============================================================================
-- 6. ANTIGRAVITY MCP SESSIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS mcp_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_name VARCHAR(100) DEFAULT 'Google Antigravity IDE',
    permissions_snapshot JSONB NOT NULL,
    status VARCHAR(30) DEFAULT 'ACTIVE',      -- 'ACTIVE', 'REVOKED', 'EXPIRED'
    last_tool_invoked VARCHAR(100),
    invocations_count INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- ============================================================================
-- 7. PERFORMANCE ANALYTICS CACHE
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_slug VARCHAR(50) NOT NULL,
    cache_key VARCHAR(255) UNIQUE NOT NULL,  -- e.g. 'gsc:daily:2026-10-01:2026-11-01'
    data_payload JSONB NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. High-Performance Indexing Strategy

```sql
-- Indexes for Users & Sessions
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_lookup ON user_sessions(user_id, expires_at) WHERE revoked_at IS NULL;

-- Indexes for Approval Requests
CREATE INDEX IF NOT EXISTS idx_approval_status ON approval_requests(status);
CREATE INDEX IF NOT EXISTS idx_approval_requester ON approval_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_approval_reference ON approval_requests(reference_id);

-- Indexes for Audit Logs (Temporal & Identity Lookups)
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_email);
CREATE INDEX IF NOT EXISTS idx_audit_module ON audit_logs(module);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action_slug);

-- Indexes for Integrations & Cache
CREATE INDEX IF NOT EXISTS idx_integration_credentials_lookup ON integration_credentials(integration_id);
CREATE INDEX IF NOT EXISTS idx_analytics_cache_expiry ON analytics_cache(expires_at);
```

---

## 4. Default System Seed Data (Roles)

```sql
INSERT INTO roles (slug, name, description, hierarchy_tier, is_system_role)
VALUES 
    ('company_owner', 'Company Owner', 'Ultimate authority, full infrastructure access, mandatory approver for DNS and production deploys', 0, true),
    ('super_admin', 'Super Admin', 'Full day-to-day administrative authority, user onboarding, role management', 1, true),
    ('technical_admin', 'Technical Admin', 'Infrastructure management, Vercel & GitHub configurations, DNS change proposer', 2, true),
    ('seo_manager', 'SEO Manager', 'Google Search Console, GA4 organic performance, sitemaps, ranking trackers', 3, true),
    ('marketing_manager', 'Marketing Manager', 'Google Business Profile, campaigns, local posts, client lead review', 4, true),
    ('finance_manager', 'Finance Manager', 'Invoicing telemetry, payments, project values, Skydo/Stripe audits', 5, true),
    ('employee', 'Employee', 'Internal staff operational tasks, viewing assigned metrics, submitting draft requests', 6, true),
    ('viewer', 'Viewer', 'Read-only access to select dashboard metrics with zero write capabilities', 7, true)
ON CONFLICT (slug) DO NOTHING;
```
