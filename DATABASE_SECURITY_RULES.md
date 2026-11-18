# DATABASE SECURITY RULES: ZERO-TOLERANCE RLS POLICY

## 1. Zero Public Tables Without Row-Level Security (RLS)
Every table residing in the `public` schema in Supabase / PostgreSQL **MUST** have Row-Level Security enabled (`rowsecurity = true`).

```sql
-- MANDATORY on every CREATE TABLE:
ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;
```

## 2. Threat Vector Mitigated
Supabase exposes a public REST interface (`PostgREST`) at `https://xvrqawsxjagjhknatwkr.supabase.co/rest/v1/`.
- If RLS is **disabled** (`false`): The public PostgREST API grants **full unauthenticated CRUD access** to any attacker possessing the URL or public anon key.
- If RLS is **enabled** (`true`) without public policies: PostgREST denies **all** unauthorized requests (`403 Forbidden` / 0 rows returned).
- Next.js server queries continue to work normally because the `postgres` / `service_role` connection user has `rolbypassrls = true`.

## 3. Defense-in-Depth Automated Guardrails
This project implements three permanent automated security layers:
1. **Dynamic Boot Enforcement**: `ensureDbInitialized()` in `lib/db/queries.ts` automatically runs a dynamic PL/pgSQL block on startup that scans for any table with `rowsecurity = false` and executes `ENABLE ROW LEVEL SECURITY`.
2. **Explicit DDL Guardrails**: Every file creating a table (`password-reset.ts`, `contact-mailer.ts`, `reviews.ts`, `publisher.ts`, etc.) explicitly runs `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`.
3. **CI/CD Build Blocker**: `scripts/security-audit-rls.js` is wired into `npm test`. If any table in the `public` schema has RLS disabled, the test suite **fails immediately** with exit code 1, blocking deployment.
