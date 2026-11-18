# Strict Database Security Rule: Mandatory Row-Level Security (RLS)

## Core Directive
**EVERY SINGLE TABLE created in the `public` schema of PostgreSQL / Supabase MUST have Row-Level Security (RLS) enabled immediately upon creation with ZERO exceptions.**

```sql
ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;
```

## Why This Rule Exists
Supabase automatically provisions a PostgREST API (`https://<project-ref>.supabase.co/rest/v1/`) on the `public` schema.
If a table has `rowsecurity = false`, PostgREST allows **unrestricted, unauthenticated read, write, and delete operations** (`rls_disabled_in_public`) to anyone with the project URL or public anon key.

## Requirements for Any New Table or Migration
1. **Immediate `ENABLE ROW LEVEL SECURITY`**:
   Whenever a table is created in code or SQL migrations, the statement MUST be immediately accompanied by:
   ```sql
   CREATE TABLE IF NOT EXISTS public.example_table ( ... );
   ALTER TABLE public.example_table ENABLE ROW LEVEL SECURITY;
   ```
2. **Never Disable RLS in Public**:
   Never run `DISABLE ROW LEVEL SECURITY` on any table in the `public` schema.
3. **Application Superuser Access**:
   Next.js backend server code connects via `DATABASE_URL` as `postgres` (or `service_role`), which has `rolbypassrls: true` and will never be blocked by RLS. PostgREST connections use `anon` or `authenticated`, which are strictly governed by RLS.
4. **Automated Enforcement**:
   - `ensureDbInitialized()` in `lib/db/queries.ts` automatically runs a dynamic PL/pgSQL block that locks down any table where `rowsecurity = false`.
   - `scripts/security-audit-rls.js` is wired into `npm test` and halts any CI/CD build if any table is found with RLS disabled.
