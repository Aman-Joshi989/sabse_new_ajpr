const { Pool } = require('pg');
const fs = require('fs');

async function run() {
  const code = fs.readFileSync('lib/db/queries.ts', 'utf-8');
  // Match all CREATE TABLE statements (very basic regex)
  const regex = /CREATE TABLE IF NOT EXISTS [^;]+;/g;
  const matches = code.match(regex);
  console.log('Found', matches.length, 'create tables');
  
  const pool = new Pool({
    connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });

  for (const m of matches) {
    console.log('Running:', m.split('\n')[0]);
    try {
      await pool.query(m);
    } catch (e) {
      console.error('Failed on:', m.split('\n')[0], e.message);
    }
  }
  console.log('Schema complete');
  process.exit(0);
}
run();
