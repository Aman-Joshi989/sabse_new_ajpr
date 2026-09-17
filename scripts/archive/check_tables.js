const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});

async function main() {
  await client.connect();
  const res = await client.query(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public';
  `);
  console.log("Tables:");
  res.rows.forEach(r => console.log(r.tablename));

  const rlsRes = await client.query(`
    SELECT relname, relrowsecurity
    FROM pg_class
    WHERE relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      AND relkind = 'r';
  `);
  console.log("\nRLS Status:");
  rlsRes.rows.forEach(r => console.log(`${r.relname}: ${r.relrowsecurity ? 'Enabled' : 'Disabled'}`));
  
  await client.end();
}

main().catch(console.error);
