import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load .env or .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('ERROR: DATABASE_URL is not set in environment.');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    console.log('Connecting to database...');
    const client = await pool.connect();

    try {
      const migrationFile = path.resolve(process.cwd(), 'migrations/001_create_admin_control_system.sql');
      const migrationSql = fs.readFileSync(migrationFile, 'utf8');

      console.log('Executing Migration 001: Dedicated Admin Control System...');
      await client.query(migrationSql);
      console.log('Migration executed successfully!');

      // Verification queries
      const tablesRes = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name IN ('admin_roles', 'admin_permissions', 'admin_role_permissions', 'admin_users', 'admin_audit_logs')
        ORDER BY table_name;
      `);

      console.log('\nVerified Created Tables:');
      tablesRes.rows.forEach(r => console.log(`  ✓ ${r.table_name}`));

      const rolesRes = await client.query('SELECT slug, name, hierarchy_tier FROM admin_roles ORDER BY hierarchy_tier ASC;');
      console.log('\nVerified Seeded Admin Roles:');
      rolesRes.rows.forEach(r => console.log(`  ✓ ${r.slug} (${r.name}, tier: ${r.hierarchy_tier})`));

    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
