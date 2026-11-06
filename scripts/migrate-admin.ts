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
      const migrationsDir = path.resolve(process.cwd(), 'migrations');
      const files = fs.readdirSync(migrationsDir)
        .filter(f => f.endsWith('.sql') && !f.endsWith('_down.sql'))
        .sort();

      for (const file of files) {
        const filePath = path.join(migrationsDir, file);
        const sqlContent = fs.readFileSync(filePath, 'utf8');
        console.log(`Executing migration ${file}...`);
        await client.query(sqlContent);
        console.log(`  ✓ Successfully applied ${file}`);
      }

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

      const colsRes = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'admin_users'
        ORDER BY ordinal_position;
      `);
      console.log('\nVerified admin_users Columns:');
      colsRes.rows.forEach(c => console.log(`  ✓ ${c.column_name} (${c.data_type})`));

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
