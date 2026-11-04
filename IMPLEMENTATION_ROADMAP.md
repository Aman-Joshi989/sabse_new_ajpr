# AJPR Central Command — Implementation Roadmap & Execution Plan (IMPLEMENTATION_ROADMAP.md)

> **Document Version**: 1.0.0  
> **Status**: APPROVED FOR REVIEW (Phase 1 Planning)  
> **Target Application**: AJPR Central Command (`ajpr-central-command`)  
> **Entity**: AJPR World Private Limited  
> **Lead Architect**: AI Systems Architecture Team (Google Antigravity IDE)  
> **Classification**: Restricted — Engineering Roadmap  

---

## 1. 7-Phase Strategic Roadmap Overview

```
Phase 1: Architecture & Documentation (COMPLETED)
   │
   ▼ [Owner Sign-Off Gate]
Phase 2: Authentication & Team Permissions
   │
   ▼ [Owner Sign-Off Gate]
Phase 3: Dashboard UI & Shell
   │
   ▼ [Owner Sign-Off Gate]
Phase 4: Google Integrations (GSC, GA4, GBP)
   │
   ▼ [Owner Sign-Off Gate]
Phase 5: Hosting & Repository Integrations (Hostinger, Vercel, GitHub)
   │
   ▼ [Owner Sign-Off Gate]
Phase 6: Approval-Based Automation & Antigravity MCP Server
   │
   ▼ [Owner Sign-Off Gate]
Phase 7: Production Deployment & Monitoring (command.ajprworld.com)
```

---

## 2. Phase-by-Phase Execution Plan

### Phase 1: Architecture and Documentation
*Status*: **COMPLETE (Awaiting Owner Review)**  
*Goal*: Establish architectural consensus, security guardrails, data schemas, and role boundaries before writing a single line of application code.

- **Tasks**:
  1. Complete system architecture blueprint ([`ARCHITECTURE.md`](./ARCHITECTURE.md)).
  2. Define zero-trust security controls and envelope encryption ([`SECURITY.md`](./SECURITY.md)).
  3. Formalize external API connectors and MCP tool signatures ([`INTEGRATIONS.md`](./INTEGRATIONS.md)).
  4. Write production PostgreSQL DDL and RLS policies ([`DATABASE_SCHEMA.md`](./DATABASE_SCHEMA.md)).
  5. Structure the 8-tier RBAC authorization matrix ([`RBAC_MATRIX.md`](./RBAC_MATRIX.md)).
  6. Map implementation milestones and safety checkpoints ([`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md)).
- **Deliverables**: All 6 core architecture specifications approved.
- **Approval Checkpoint 1**: Company Owner signs off on repository split and architectural blueprint.

---

### Phase 2: Authentication and Team Permissions
*Target Duration*: 5 Engineering Days  
*Goal*: Initialize the isolated repository, configure database migrations, and enforce Google Workspace OAuth with RBAC.

- **Tasks**:
  1. Initialize repository: `github.com/Aman-Joshi989/ajpr-central-command`.
  2. Setup Next.js 15+ (App Router, TypeScript, Tailwind CSS, shadcn/ui).
  3. Apply PostgreSQL DDL (`roles`, `permissions`, `users`, `user_sessions`).
  4. Implement Google OAuth 2.0 flow restricted to `@ajprworld.com` domain.
  5. Build JWT session management with HttpOnly SameSite=Strict cookies and rotation.
  6. Create route middleware enforcing the 8-tier RBAC matrix on all API endpoints.
  7. Seed initial roles and assign Company Owner to Aman Joshi (`aman@ajprworld.com`).
- **Verification Criteria**:
  - Personal Gmail logins are strictly rejected with 403 Forbidden.
  - Authenticated `@ajprworld.com` users receive valid role-scoped session tokens.
  - Non-authorized role attempts return standard 403 Forbidden without info leaks.
- **Approval Checkpoint 2**: Company Owner verifies team authentication and role enforcement.

---

### Phase 3: Dashboard UI & Shell
*Target Duration*: 7 Engineering Days  
*Goal*: Build the modern, accessible human interface for team operators.

- **Tasks**:
  1. Build responsive enterprise dashboard shell with collapsible navigation.
  2. Dynamic sidebar navigation filtered by the authenticated user's active role.
  3. Overview screen (`/overview`): Key health metrics, active alerts, quick actions.
  4. Team management interface (`/team`): Member invitation, role assignment, active session revocation.
  5. Approval Queue UI (`/approvals`): Dedicated view with before/after diffs, justification notes, and 1-click Approve / Reject buttons.
  6. Audit Log Explorer (`/audit-log`): Real-time event feed with keyword search, actor filtering, and date ranges.
- **Verification Criteria**:
  - UI seamlessly adapts across desktop, tablet, and mobile browsers.
  - Zero hydration errors, WCAG 2.1 AA accessibility compliance.
  - Protected navigation prevents any unauthorized module flash.
- **Approval Checkpoint 3**: Company Owner reviews dashboard UX, approval queue, and audit views.

---

### Phase 4: Google Integrations (GSC, GA4, GBP)
*Target Duration*: 8 Engineering Days  
*Goal*: Connect Google Cloud APIs and build live telemetry dashboards.

- **Tasks**:
  1. Configure Google Cloud Console OAuth Consent Screen (Internal Organization).
  2. Enable Google Search Console API, GA4 Data API, and Business Profile APIs.
  3. Build secure token exchange and encrypted storage in `integration_credentials`.
  4. Implement GSC connector: Performance curves, keyword rank trends, crawl errors.
  5. Implement GA4 connector: Real-time visitor counts, channel breakdown, conversion rates.
  6. Implement GBP connector: Star ratings, review feeds, and local post drafting.
  7. Deploy automated 24-hour analytics caching layer in PostgreSQL.
- **Verification Criteria**:
  - Live data from `ajprworld.com` renders with sub-200ms latency from cache.
  - Token refresh occurs transparently in background with zero expired-token errors.
  - Initial connection operates strictly in Read-Only mode.
- **Approval Checkpoint 4**: Company Owner verifies Search Console, GA4, and GBP telemetry accuracy.

---

### Phase 5: Hosting & Repository Integrations (Hostinger, Vercel, GitHub)
*Target Duration*: 7 Engineering Days  
*Goal*: Establish secure, read-only connectors for DNS, Vercel deployments, and GitHub repositories.

- **Tasks**:
  1. Implement Hostinger DNS read-only client: Pull and display active zone records for `ajprworld.com`.
  2. Implement Vercel API client: Monitor production build status, edge logs, and deployment hashes.
  3. Implement GitHub App / PAT connector: Display open pull requests, CI/CD workflow health, and security alerts.
  4. Build health check daemons that poll all 6 integrations every 15 minutes.
  5. Build the Emergency Credential Revocation console (`/integrations`).
- **Verification Criteria**:
  - Zero write access granted directly to Hostinger or Vercel.
  - Active DNS zone file safely backed up to database snapshot before any simulated test.
  - Emergency token revocation instantly clears credentials from server memory.
- **Approval Checkpoint 5**: Company Owner inspects integration health monitors and DNS read safety.

---

### Phase 6: Approval-Based Automation & Antigravity MCP Server
*Target Duration*: 8 Engineering Days  
*Goal*: Build the two-man rule approval engine and launch the Google Antigravity MCP server.

- **Tasks**:
  1. Build the Approval Engine state machine in backend API (`/api/v1/approvals`).
  2. Implement Hostinger DNS change proposer: Technical Admin proposes -> Owner approves -> Engine executes.
  3. Implement Vercel production deployment promotion gate.
  4. Build the Google Antigravity MCP Server package (`@ajpr/mcp-server`):
     - stdio transport for local Antigravity IDE integration.
     - Role-aware tool discovery and parameter validation via Zod.
     - Intercept high-risk tool invocations and reroute to Approval Queue.
  5. Configure immediate encrypted alerts (Telegram / WhatsApp / Email) when an approval request is lodged.
- **Verification Criteria**:
  - AI Agent in Antigravity cannot modify DNS without generating a pending approval ticket.
  - Company Owner approval instantly triggers the external API mutation and writes to immutable audit log.
  - Rejection cleanly halts the workflow with recorded justification.
- **Approval Checkpoint 6**: Live simulated end-to-end DNS verification proposal and sign-off test with Company Owner.

---

### Phase 7: Production Deployment & Monitoring
*Target Duration*: 5 Engineering Days  
*Goal*: Deploy AJPR Central Command to production under enterprise security isolation.

- **Tasks**:
  1. Configure isolated Vercel project for `ajpr-central-command`.
  2. Provision subdomain: `command.ajprworld.com`.
  3. Configure Cloudflare WAF, DDoS protection, and rate limiting rules.
  4. Enable Sentry error tracking and real-time uptime monitoring.
  5. Establish automated nightly PostgreSQL backups with point-in-time recovery (PITR).
  6. Conduct comprehensive penetration test, CSRF verification, and RBAC privilege escalation tests.
  7. Final operational handover and staff briefing.
- **Verification Criteria**:
  - 100% test pass rate across all security, RBAC, and approval test suites.
  - Subdomain inaccessible to unauthorized public traffic.
  - All audit trails operational and tamper-evident.
- **Final Sign-Off**: Official production launch authorized by Company Owner Aman Joshi.
