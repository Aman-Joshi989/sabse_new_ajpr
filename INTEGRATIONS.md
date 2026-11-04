# AJPR Central Command — External Integrations Specification (INTEGRATIONS.md)

> **Document Version**: 1.0.0  
> **Status**: APPROVED FOR REVIEW (Phase 1 Planning)  
> **Target Application**: AJPR Central Command  
> **Entity**: AJPR World Private Limited  
> **Lead Architect**: AI Systems Architecture Team (Google Antigravity IDE)  
> **Classification**: Restricted — Technical Integration Blueprint  

---

## 1. Integration Landscape & Staged Onboarding

AJPR Central Command interfaces with six critical external platforms. Every integration adheres to three mandatory rules:
1. **Read-Only by Default**: Initial connections are strictly read-only. Write permissions are activated only as required and locked behind RBAC and Owner Approval.
2. **Cryptographic Isolation**: Integration credentials and refresh tokens are encrypted at rest with distinct initialization vectors (IVs) and master key derivation.
3. **Dual Access Modality**: Every integration is accessible via both the **Web Admin UI** (for human operators) and the **Antigravity MCP Server** (for AI engineering agents).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CENTRAL COMMAND INTEGRATION BUS                       │
│                                                                             │
│  [ Google Search Console ]  ──> SEO Visibility, Keywords, Indexing Health   │
│  [ Google Analytics 4 ]     ──> Traffic, Conversions, Attribution           │
│  [ Google Business Profile] ──> Local Reviews, Map Presence, Posts          │
│  [ Hostinger DNS API ]      ──> DNS Records, Zone Files (Owner Gate)        │
│  [ Vercel Cloud API ]       ──> Deployments, Edge Logs, Aliases (Owner Gate)│
│  [ GitHub GraphQL API ]     ──> Commits, Releases, CI/CD Status             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Integration 1: Google Search Console (GSC)

### 2.1 Overview & Authentication
- **Provider**: Google Cloud Platform.
- **API**: Google Search Console API v1 (`https://searchconsole.googleapis.com`).
- **Auth Modality**: Google OAuth 2.0 with offline refresh token.
- **Initial Scope**: `https://www.googleapis.com/auth/webmasters.readonly` (Strictly Read-Only).
- **Target Site Resource**: `sc-domain:ajprworld.com` and `https://ajprworld.com/`.

### 2.2 Telemetry & Operations
- **Data Ingested**:
  - Daily Search Performance: Organic clicks, impressions, average CTR, average SERP position.
  - Dimension Breakdowns: Query keyword, landing page URL, country, device, date.
  - Indexing & Crawl Health: Valid indexed URLs, URLs excluded by `noindex`, 404/500 errors, sitemap crawl status.
- **Caching Strategy**: Daily performance records cached in PostgreSQL (`analytics_cache`) with a 24-hour TTL (Google Search Console data carries a 48–72 hour finalization lag).

### 2.3 MCP Tool Specifications (Antigravity IDE)
- `gsc_get_search_analytics`: Query organic performance by date range, query, and page.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Company Owner, Super Admin, Technical Admin, SEO Manager, Marketing Manager.
- `gsc_get_sitemap_status`: Inspect submitted XML sitemaps and discovered URL counts.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Technical Admin, SEO Manager.
- `gsc_submit_sitemap`: Submit updated XML sitemap for indexing.
  - *Risk Level*: Medium (Write Operation).
  - *Allowed Roles*: SEO Manager, Technical Admin.

---

## 3. Integration 2: Google Analytics 4 (GA4) Data API

### 3.1 Overview & Authentication
- **Provider**: Google Cloud Platform.
- **API**: Google Analytics Data API v1beta (`https://analyticsdata.googleapis.com`).
- **Auth Modality**: Google OAuth 2.0 (shared corporate Google Workspace authentication).
- **Initial Scope**: `https://www.googleapis.com/auth/analytics.readonly` (Strictly Read-Only).
- **Property ID**: Linked GA4 property for `ajprworld.com`.

### 3.2 Telemetry & Operations
- **Real-Time Telemetry**: Active users in the last 30 minutes, real-time geographic breakdown.
- **Historical Reporting**: Sessions, bounce rate, average engagement time, conversion events (`lead_form_submitted`, `call_booked`, `checkout_completed`), channel grouping (Organic Search, Direct, Referral).
- **Alerting Triggers**: Automated alerts dispatched if daily organic sessions drop by >25% WoW.

### 3.3 MCP Tool Specifications (Antigravity IDE)
- `ga4_get_realtime_users`: Fetch instant live active user metrics.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: All roles except Viewer.
- `ga4_get_conversion_report`: Retrieve attribution metrics by campaign and landing page.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Company Owner, Super Admin, Marketing Manager, SEO Manager, Finance Manager.

---

## 4. Integration 3: Google Business Profile (GBP) API

### 4.1 Overview & Authentication
- **Provider**: Google Cloud Platform.
- **APIs**:
  - Google My Business Account Management API (`mybusinessaccountmanagement.googleapis.com`).
  - Google My Business Business Information API (`mybusinessbusinessinformation.googleapis.com`).
- **Auth Modality**: Google OAuth 2.0 with offline access.
- **Scopes**:
  - Read: `https://www.googleapis.com/auth/business.manage` (Filtered by role).
- **Location Target**: AJPR World Private Limited Headquarters (India & Global Delivery hubs).

### 4.2 Telemetry & Operations
- **Review Monitoring**: Automated sync of new client reviews, star ratings, and review response statuses.
- **Local Post Management**: Draft, schedule, and publish local update posts, case studies, and service announcements.

### 4.3 MCP Tool Specifications (Antigravity IDE)
- `gbp_list_reviews`: Fetch recent customer reviews and response statuses.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Marketing Manager, SEO Manager, Admins.
- `gbp_draft_local_post`: Generate and stage a local GBP promotional post.
  - *Risk Level*: Medium (Drafting / Staging).
  - *Allowed Roles*: Marketing Manager, SEO Manager.
- `gbp_publish_local_post`: Publish local post to live Google Maps profile.
  - *Risk Level*: Medium-High (Public Write).
  - *Allowed Roles*: Marketing Manager (requires Super Admin or Owner review).

---

## 5. Integration 4: Hostinger DNS API / MCP Server

### 5.1 Overview & Authentication
- **Provider**: Hostinger International Ltd.
- **Service**: Domain DNS & Nameserver Management (`ajprworld.com`).
- **Auth Modality**: Hostinger API Token with fine-grained DNS permissions.
- **Storage**: Stored in `integration_credentials` encrypted via AES-256-GCM.
- **Safety Gate**: **MANDATORY OWNER APPROVAL** for all write actions.

### 5.2 Telemetry & Operations
- **Read Operations**:
  - List all active DNS records (`A`, `AAAA`, `CNAME`, `MX`, `TXT`, `SRV`, `CAA`).
  - Verify nameserver propagation and DNSSEC status.
  - Export zone file backups before any change.
- **Write Operations (Locked under Two-Man Rule)**:
  - Add verification TXT records (Google Search Console, Microsoft Clarity, IndexNow, Resend/SendGrid).
  - Modify CNAME/A records for hosting cutovers.

### 5.3 MCP Tool Specifications (Antigravity IDE)
- `hostinger_list_dns_records`: Retrieve all active DNS zone entries.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Technical Admin, Super Admin, Company Owner.
- `hostinger_propose_dns_change`: Generate a formal DNS modification proposal.
  - *Risk Level*: High (Generates Pending Approval Request).
  - *Allowed Roles*: Technical Admin.
  - *Behavior*: Does NOT execute against Hostinger. Emits an `ApprovalRequest` record with exact before/after diff and alerts Company Owner.
- `hostinger_execute_approved_dns`: Dispatches the approved DNS mutation payload after Company Owner cryptographic signature.
  - *Risk Level*: Critical (Tier-0 Execution).
  - *Allowed Roles*: Company Owner Only.

---

## 6. Integration 5: Vercel Cloud Platform API

### 6.1 Overview & Authentication
- **Provider**: Vercel Inc.
- **API**: Vercel REST API v9 (`https://api.vercel.com`).
- **Auth Modality**: Vercel Scoped Access Token / Team Token.
- **Target Project**: `ajprworld` (public site) and `ajpr-central-command` (management plane).

### 6.2 Telemetry & Operations
- **Deployment Status**: Real-time inspection of active deployments, build status, errors, and Git commit references.
- **Domain & Alias Management**: Inspect custom domain SSL certificates, edge redirects, and canonical configuration.
- **Build Logs & Telemetry**: Pull real-time error traces and Edge Runtime function metrics.

### 6.3 MCP Tool Specifications (Antigravity IDE)
- `vercel_get_deployments`: List recent production and preview deployments with build health.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Technical Admin, Super Admin, Company Owner.
- `vercel_get_build_logs`: Retrieve build and runtime diagnostic logs for failed builds.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Technical Admin, Employee (Engineering).
- `vercel_trigger_revalidation`: Purge edge cache via `/api/revalidate`.
  - *Risk Level*: Medium.
  - *Allowed Roles*: Technical Admin, SEO Manager.
- `vercel_propose_rollback`: Request a rollback to a previous stable production deployment.
  - *Risk Level*: High (Requires Owner Approval).
  - *Allowed Roles*: Technical Admin (initiated) -> Company Owner (approved).

---

## 7. Integration 6: GitHub Integration (REST & GraphQL)

### 7.1 Overview & Authentication
- **Provider**: GitHub (Microsoft).
- **API**: GitHub REST API v3 & GraphQL API v4 (`https://api.github.com`).
- **Auth Modality**: GitHub App with Fine-Grained Installation Permissions or Fine-Grained Personal Access Token (PAT).
- **Target Repositories**:
  - `sabse_new_ajpr` (Public Next.js application).
  - `ajpr-central-command` (Central Command platform).

### 7.2 Telemetry & Operations
- **Repository Health**: Track open pull requests, release tags, Dependabot security vulnerabilities, and branch protection statuses.
- **CI/CD Telemetry**: Monitor GitHub Actions workflow runs, build durations, and deployment dispatch hooks.
- **Issue & Backlog Tracking**: Surface high-priority SEO and engineering bugs directly in the Central Command dashboard.

### 7.3 MCP Tool Specifications (Antigravity IDE)
- `github_list_pull_requests`: Inspect active PRs, reviews, and test pass rates.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Technical Admin, Super Admin, Employee.
- `github_get_security_alerts`: Fetch open Dependabot and CodeQL vulnerability summaries.
  - *Risk Level*: Low (Read-Only).
  - *Allowed Roles*: Technical Admin, Super Admin, Company Owner.
- `github_trigger_workflow`: Dispatch automated GitHub Actions workflow (e.g. nightly SEO crawl audit).
  - *Risk Level*: Medium.
  - *Allowed Roles*: Technical Admin.

---

## 8. Circuit Breakers, Rate Limiting & Failover

| Service | Rate Limit Policy | Exponential Backoff | Cache TTL | Circuit Breaker Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **Google Search Console** | 1,200 requests / min | 1s, 2s, 4s, 8s (max 3 retries) | 24 Hours | 5 consecutive 5xx errors -> 15 min cooldown |
| **Google Analytics 4** | 10,000 tokens / hour | 500ms, 1s, 2s | 15 Minutes | 5 consecutive 429 errors -> 10 min cooldown |
| **Google Business Profile**| 300 requests / min | 1s, 2s, 4s | 1 Hour | 3 consecutive errors -> 15 min cooldown |
| **Hostinger API** | 60 requests / min | 2s, 4s, 8s | 5 Minutes | 2 consecutive errors -> 30 min lock |
| **Vercel API** | 500 requests / min | 1s, 2s, 4s | 2 Minutes | 5 consecutive errors -> 5 min cooldown |
| **GitHub API** | 5,000 requests / hour | Header-based (`x-ratelimit-reset`) | 5 Minutes | Dynamic based on remaining quota |
