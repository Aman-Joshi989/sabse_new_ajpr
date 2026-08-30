const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});

async function main() {
  await client.connect();

  const rlsRes = await client.query(`
    SELECT relname, nspname, relrowsecurity
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE relkind = 'r' AND nspname NOT IN ('pg_catalog', 'information_schema')
      AND c.relrowsecurity = false;
  `);
  console.log("\nTables with RLS Disabled:");
  rlsRes.rows.forEach(r => console.log(`${r.nspname}.${r.relname}`));
  
  await client.end();
}

main().catch(console.error);
