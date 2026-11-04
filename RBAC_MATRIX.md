# AJPR Central Command — Role-Based Access Control Matrix (RBAC_MATRIX.md)

> **Document Version**: 1.0.0  
> **Status**: APPROVED FOR REVIEW (Phase 1 Planning)  
> **Target Application**: AJPR Central Command  
> **Entity**: AJPR World Private Limited  
> **Lead Architect**: AI Systems Architecture Team (Google Antigravity IDE)  
> **Classification**: Restricted — Access Governance Framework  

---

## 1. Hierarchy of Authority & Team Roles

Central Command categorizes team access into an 8-tier hierarchical privilege model. Lower tier numbers denote higher administrative authority:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CENTRAL COMMAND ROLE HIERARCHY                        │
│                                                                             │
│  [ Tier 0 ]  Company Owner       ──> Ultimate Authority & Sole DNS Approver │
│  [ Tier 1 ]  Super Admin         ──> Operational Governance & User Admin    │
│  [ Tier 2 ]  Technical Admin     ──> Infrastructure, Vercel & GitHub Ops    │
│  [ Tier 3 ]  SEO Manager         ──> Search Console, GA4 & Sitemaps         │
│  [ Tier 4 ]  Marketing Manager   ──> Business Profile, Local Posts, Leads   │
│  [ Tier 5 ]  Finance Manager     ──> Payment Invoicing & Revenue Audits     │
│  [ Tier 6 ]  Employee            ──> Assigned Operational Tasks             │
│  [ Tier 7 ]  Viewer              ──> Read-Only High-Level Telemetry         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Granular Functional Permission Matrix

### Legend
- **`EXEC`**: Full execution authority (direct write/mutation).
- **`PROP`**: Proposal authority (can initiate a change that is routed to the Approval Queue).
- **`READ`**: Read-only inspection / querying.
- **`NONE`**: Explicitly blocked; zero access.
- **`APPV`**: Sole authorization to review, cryptographically sign, and execute pending requests.

| Functional Module & Permission Slug | Company Owner (Tier 0) | Super Admin (Tier 1) | Technical Admin (Tier 2) | SEO Manager (Tier 3) | Marketing Manager (Tier 4) | Finance Manager (Tier 5) | Employee (Tier 6) | Viewer (Tier 7) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **DNS / Hostinger** | | | | | | | | |
| `dns:read` (Inspect records, zone files) | `EXEC` | `READ` | `READ` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `dns:propose` (Draft new record / edit) | `EXEC` | `PROP` | `PROP` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `dns:approve` (Sign DNS mutation) | `APPV` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| **Hosting & Deployments / Vercel** | | | | | | | | |
| `deploy:read` (Inspect builds, logs) | `EXEC` | `READ` | `READ` | `READ` | `NONE` | `NONE` | `READ` | `NONE` |
| `deploy:cache_purge` (Trigger revalidation)| `EXEC` | `EXEC` | `EXEC` | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` |
| `deploy:rollback_propose` (Draft rollback) | `EXEC` | `PROP` | `PROP` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `deploy:prod_approve` (Promote / Rollback)| `APPV` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| **Source Control / GitHub** | | | | | | | | |
| `github:read` (View PRs, commits, tests)| `EXEC` | `READ` | `READ` | `READ` | `NONE` | `NONE` | `READ` | `NONE` |
| `github:workflow_trigger` (Run CI/CD) | `EXEC` | `EXEC` | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `github:branch_protect` (Manage rules) | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| **Google Search Console (GSC)** | | | | | | | | |
| `gsc:read` (Queries, CTR, impressions) | `EXEC` | `READ` | `READ` | `EXEC` | `READ` | `NONE` | `READ` | `READ` |
| `gsc:sitemap_submit` (Submit XML sitemaps)| `EXEC` | `EXEC` | `EXEC` | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` |
| `gsc:crawl_inspect` (URL inspection) | `EXEC` | `READ` | `EXEC` | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` |
| **Google Analytics 4 (GA4)** | | | | | | | | |
| `ga4:read_realtime` (Live visitors) | `EXEC` | `READ` | `READ` | `READ` | `READ` | `READ` | `READ` | `READ` |
| `ga4:read_reports` (Campaigns, channels)| `EXEC` | `READ` | `READ` | `READ` | `READ` | `READ` | `READ` | `READ` |
| `ga4:conversion_audit` (Revenue/goals) | `EXEC` | `READ` | `NONE` | `READ` | `READ` | `READ` | `NONE` | `NONE` |
| **Google Business Profile (GBP)** | | | | | | | | |
| `gbp:reviews_read` (View incoming reviews)| `EXEC` | `READ` | `NONE` | `READ` | `EXEC` | `NONE` | `READ` | `NONE` |
| `gbp:post_draft` (Draft local map post) | `EXEC` | `EXEC` | `NONE` | `PROP` | `EXEC` | `NONE` | `PROP` | `NONE` |
| `gbp:post_publish` (Publish live to Maps)| `EXEC` | `EXEC` | `NONE` | `NONE` | `EXEC` | `NONE` | `NONE` | `NONE` |
| **User & Team Management** | | | | | | | | |
| `users:read` (List team accounts) | `EXEC` | `READ` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `users:invite` (Onboard team members) | `EXEC` | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `users:role_assign` (Change role up to T2)| `EXEC` | `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `users:super_admin_assign` (Promote T1)| `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| **Approvals & Governance** | | | | | | | | |
| `approvals:view_queue` (Inspect pending)| `EXEC` | `READ` | `READ` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `approvals:sign_tier0` (DNS, Master Key) | `APPV` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `approvals:sign_tier1` (Deployments, Blog)| `APPV` | `APPV` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| **Audit Logs & Security** | | | | | | | | |
| `audit:read` (Search audit log stream) | `EXEC` | `READ` | `READ` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |
| `security:killswitch` (Revoke all tokens)| `EXEC` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` | `NONE` |

---

## 3. Role Profile Definitions

### 3.1 Company Owner (Tier 0)
- **Identity**: Aman Joshi (`aman@ajprworld.com`).
- **Core Authority**: Unrestricted root administrative privileges. The sole entity empowered to approve Hostinger DNS changes, sign off on production domain switches, grant Super Admin status, or trigger the emergency security killswitch.

### 3.2 Super Admin (Tier 1)
- **Role Purpose**: Day-to-day operational commander.
- **Core Authority**: Team onboarding, role allocation (up to Technical Admin), integration health monitoring, operational dispute resolution. Cannot approve Tier-0 operations (DNS mutations or root credential revocation).

### 3.3 Technical Admin (Tier 2)
- **Role Purpose**: Systems architecture, hosting pipelines, and DevOps governance.
- **Core Authority**: Inspecting Vercel deployments, debugging build failures, managing GitHub workflows, monitoring edge caches, and preparing structured DNS change proposals.

### 3.4 SEO Manager (Tier 3)
- **Role Purpose**: Organic SERP domination and technical crawl optimization.
- **Core Authority**: Full access to Google Search Console telemetry, XML sitemap re-indexation, GA4 organic traffic attribution, keyword tracking, and edge cache revalidation.

### 3.5 Marketing Manager (Tier 4)
- **Role Purpose**: Brand presence, lead nurturing, and local profile authority.
- **Core Authority**: Managing Google Business Profile posts, responding to customer reviews, analyzing campaign conversion paths, and reviewing top-of-funnel inbound leads.

### 3.6 Finance Manager (Tier 5)
- **Role Purpose**: Financial reconciliation and commercial billing audit.
- **Core Authority**: Inspecting project value milestones, auditing Skydo / Stripe / wire transactions, reviewing active client sprint balances, and viewing high-level financial reports. Zero access to DNS, hosting, or repository code.

### 3.7 Employee (Tier 6)
- **Role Purpose**: General staff contributor.
- **Core Authority**: Execution of assigned operational tasks, read access to operational manuals, submission of draft proposals, and viewing personal productivity telemetry.

### 3.8 Viewer (Tier 7)
- **Role Purpose**: External stakeholders, auditors, or non-technical advisors.
- **Core Authority**: Strictly read-only access to selected dashboard summary views. Cannot view API credentials, audit logs, raw customer PII, or draft modifications.

---

## 4. AI Agent Governance within Google Antigravity IDE

When an AI Agent (e.g. Claude / Artemis / Hermes) is launched inside the Google Antigravity IDE, its MCP session inherits the exact RBAC privileges of the authenticated developer's session:

1. **Authentication Token Binding**: The Antigravity IDE initiates an MCP connection with a signed developer token.
2. **Context Snapshotting**: The MCP daemon verifies the developer's role and scopes tool definitions dynamically. If an SEO Manager invokes Antigravity, Hostinger DNS tools and Vercel rollback tools are completely hidden from the agent's tool schema.
3. **High-Risk Proposal Interception**: If an agent attempts to change infrastructure on behalf of a Technical Admin, the MCP server returns a pending approval reference ID rather than executing the external API call.
