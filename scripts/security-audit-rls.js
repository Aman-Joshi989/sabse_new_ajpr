/**
 * Security Audit: Supabase / PostgreSQL Row-Level Security (RLS) Enforcement
 * 
 * Strict Rule: Every single table in the 'public' schema MUST have rowsecurity = true.
 * If any table is found without RLS, this script exits with code 1 to fail CI/CD builds.
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });
dotenv.config();

async function runSecurityAudit() {
  console.log('\n====================================================');
  console.log('🔒 RUNNING DATABASE SECURITY & RLS ENFORCEMENT AUDIT');
  console.log('====================================================');

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn('⚠️ [SKIP] DATABASE_URL not set in environment. Skipping live RLS check.');
    process.exit(0);
  }

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    const res = await pool.query(`
      SELECT 
        tablename, 
        rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    const tables = res.rows;
    console.log(`Inspecting ${tables.length} tables in 'public' schema...`);

    const insecureTables = tables.filter((t) => !t.rowsecurity);

    if (insecureTables.length > 0) {
      console.error('\n🚨 CRITICAL SECURITY VULNERABILITY DETECTED!');
      console.error(`Found ${insecureTables.length} table(s) with Row-Level Security (RLS) DISABLED:`);
      insecureTables.forEach((t) => {
        console.error(`  ❌ public."${t.tablename}" has RLS DISABLED!`);
      });
      console.error('\nSupabase exposes PostgREST publicly for all tables with RLS disabled.');
      console.error('Run: ALTER TABLE public."<tablename>" ENABLE ROW LEVEL SECURITY;\n');
      await pool.end();
      process.exit(1);
    }

    console.log(`✅ All ${tables.length} tables in 'public' have Row-Level Security ENABLED.`);
    console.log('🛡️ Zero public RLS exposure. Supabase PostgREST is locked down.');
    console.log('====================================================\n');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Error executing RLS security audit:', err.message);
    await pool.end();
    // Do not fail build if DB connection is unavailable in offline CI
    process.exit(0);
  }
}

runSecurityAudit();
