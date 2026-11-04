# AJPR Central Command — Security Policy & Controls (SECURITY.md)

> **Document Version**: 1.0.0  
> **Status**: APPROVED FOR REVIEW (Phase 1 Planning)  
> **Target Application**: AJPR Central Command  
> **Entity**: AJPR World Private Limited  
> **Lead Architect**: AI Systems Architecture Team (Google Antigravity IDE)  
> **Classification**: Restricted — Internal Security Framework  

---

## 1. Security Philosophy & Zero-Trust Governance

AJPR Central Command serves as the master operations center for AJPR World Private Limited. Because it commands access to root DNS (Hostinger), production hosting (Vercel), source code (GitHub), and corporate telemetry (Google Cloud), security is architected on **Zero-Trust Principles**:

1. **Verify Explicitly**: Every API call, whether initiated by a human operator or an AI Agent in Google Antigravity IDE, is dynamically authenticated, authorized, and validated against the active RBAC matrix.
2. **Least-Privilege Access**: All accounts and integrations receive only the absolute minimum permissions required for their specific function.
3. **Assume Breach & Blast Radius Containment**: Third-party integration credentials are cryptographic silos; a compromise of an SEO analytics token provides zero lateral access to DNS or GitHub repositories.
4. **Separation of Duties (Two-Man Rule)**: No single person or AI agent, other than the Company Owner via explicit dual-step confirmation, can unilaterally execute high-consequence operations.

---

## 2. Authentication & Identity Management

### 2.1 Google Workspace OAuth 2.0
- **Corporate Domain Enforcement**: Only authenticated users with an `@ajprworld.com` Google Workspace account are permitted to sign in. All personal Gmail or unauthorized domains are rejected at the OAuth callback handler.
- **Hosted Domain Parameter**: OAuth authentication requests include `hd=ajprworld.com` and perform strict backend verification of the verified email domain in the Google ID token.
- **Mandatory 2FA**: Multi-Factor Authentication is enforced at the Google Workspace level for all employees.

### 2.2 Session Security
- **Cookie Flags**:
  - `HttpOnly`: Mitigates script access and XSS cookie exfiltration.
  - `Secure`: Transmitted strictly over TLS 1.3 HTTPS.
  - `SameSite=Strict`: Protects against Cross-Site Request Forgery (CSRF).
- **Session Lifetimes**:
  - Access Token TTL: **15 minutes**.
  - Refresh Token TTL: **7 days**, stored with sliding-window rotation.
  - On every refresh, the previous refresh token is invalidated. If a token reuse attempt is detected, the entire session tree for that user is immediately revoked.
- **Device & Location Fingerprinting**: Significant IP or User-Agent deviations trigger mandatory re-authentication.

---

## 3. Secret & Credential Management

### 3.1 Envelope Encryption for External Tokens
All external integration tokens (Google OAuth refresh tokens, Hostinger API keys, Vercel personal tokens, GitHub fine-grained PATs) are encrypted at rest using **AES-256-GCM** authenticated envelope encryption:

```
[ Master Encryption Key (KMS / Environment) ]
                   │
                   ▼ (Key Derivation / HKDF)
    [ Unique Per-Credential Salt + IV (12 bytes) ]
                   │
                   ▼
  [ AES-256-GCM Ciphertext + 16-byte Auth Tag ]
                   │
                   ▼
  [ Stored in PostgreSQL: integration_credentials ]
```

- **Zero Plaintext Secrets in Code or Database**: No API key, token, or secret is ever stored in plaintext or exposed to client-side code.
- **Key Versioning**: Credential records store a `key_version` tag enabling seamless zero-downtime rotation of master keys.
- **Ephemeral Decryption**: Tokens are decrypted strictly in server-side memory for the immediate duration of an API request and immediately scrubbed.

### 3.2 Git & Repository Protection
- **Zero Secrets in Git**:
  - Strict `.gitignore` rules prevent staging of `.env*`, `*.pem`, `*.key`, or service account JSON files.
  - Automated pre-commit hooks run `gitleaks` / secret scanning prior to staging.
  - GitHub Secret Scanning and Dependabot alerts are enabled on the repository.
- **Server Environment Management**:
  - Production secrets are injected dynamically via Vercel Encrypted Environment Variables.
  - Local development utilizes `.env.local` templates with dummy credentials.

---

## 4. Critical Action Guardrails & The Approval Workflow

### 4.1 High-Risk Action Classification
Certain actions carry existential risk to the business and are categorized as **Tier-0 Operations**:

| Category | Operation | Impact | Required Sign-Off |
| :--- | :--- | :--- | :--- |
| **DNS / Hostinger** | Create, Update, or Delete DNS Records | Website downtime, email hijacking, subdomain takeover | **Company Owner Only** |
| **Hosting / Vercel** | Production Domain Transfer or Purge | Complete site outage | **Company Owner Only** |
| **Hosting / Vercel** | Production Deployment Promotion / Rollback | Breaking production releases | **Technical Admin + Owner** |
| **GitHub** | Force Push, Branch Protection Alteration | Code tampering, loss of history | **Company Owner Only** |
| **Credentials** | Master Secret Revocation / Re-keying | System-wide integration reset | **Company Owner Only** |
| **Team** | Super Admin Provisioning / Role Escalation | Privilege compromise | **Company Owner Only** |

### 4.2 Two-Man Rule Implementation
1. When an engineer or AI agent initiates a Tier-0 operation, Central Command:
   - Blocks direct execution.
   - Computes a cryptographic hash of the requested payload diff (e.g. `Old A Record: 76.76.21.21 -> New A Record: 198.51.100.1`).
   - Inserts a record into `approval_requests` with status `PENDING`.
   - Sends an urgent encrypted alert to the Company Owner via webhook (Telegram / WhatsApp / Email).
2. The Company Owner logs into `command.ajprworld.com/approvals`, inspects the exact diff, justification, and requester ID, and signs the approval.
3. Once approved, the backend executes the external call and locks the record as `EXECUTED`.

---

## 5. Audit Logging Architecture

### 5.1 Immutable Audit Stream
Every operational action is recorded in an immutable, append-only PostgreSQL table (`audit_logs`):
- **Actor Identity**: User ID, email, assigned role, session ID.
- **Client Metadata**: Originating IP address, User-Agent, geo-location.
- **Action Context**: Target integration, HTTP method, endpoint, resource ID.
- **Payload State**: `payload_before` (redacted JSON) and `payload_after` (redacted JSON).
- **Execution Telemetry**: Status code, latency (ms), error traceback (if failed).
- **Cryptographic Hash Chaining**: Each audit row includes `previous_hash` and `current_hash` (SHA-256 over row contents + previous hash), making any retroactive tampering immediately detectable.

### 5.2 Emergency Credential Revocation (Killswitch)
Central Command provides a dedicated emergency killswitch available exclusively to the Company Owner:
- **Scope Revocation**: Invalidate credentials for a specific provider (e.g. revoke all Hostinger tokens).
- **Global Killswitch (`/api/v1/security/revoke-all`)**:
  - Immediately flushes all active user sessions and refresh tokens in Redis / PostgreSQL.
  - Invalidates all decrypted integration pools in memory.
  - Puts the API into read-only emergency maintenance mode.

---

## 6. Application Vulnerability Defense

### 6.1 Cross-Site Request Forgery (CSRF)
- Double-Submit Cookie Pattern utilizing cryptographically generated HMAC-SHA256 tokens.
- Strict validation on all state-altering requests (`POST`, `PUT`, `PATCH`, `DELETE`).

### 6.2 Cross-Site Scripting (XSS) & Content Security Policy (CSP)
- Strict Content Security Policy headers enforced at the Next.js middleware:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-random'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.googleapis.com; frame-ancestors 'none';
  ```
- All dynamic HTML rendering sanitized via `DOMPurify`.
- React JSX automatic encoding prevents injection attacks.

### 6.3 Server-Side Request Forgery (SSRF)
- All external API connectors use hardcoded, vetted endpoint constants (e.g. `https://searchconsole.googleapis.com`, `https://api.hostinger.com`).
- No user-supplied URLs are fetched directly without passing through strict URL scheme (`https:` only) and private IP blocklist filters (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, AWS/Cloud metadata IPs `169.254.169.254`).

### 6.4 API Rate Limiting & Abuse Prevention
- Token Bucket rate limiting applied at the middleware level:
  - Public/Auth Endpoints: **5 requests per minute per IP**.
  - Standard Admin API: **60 requests per minute per user**.
  - AI MCP Server Calls: **30 requests per minute per agent session**.
- Automated IP blacklisting triggered upon repeated 401/403 anomalies.
