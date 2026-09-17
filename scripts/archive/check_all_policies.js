const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});

async function main() {
  await client.connect();
  const res = await client.query(`
    SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public';
  `);
  console.log("Policies:");
  if (res.rows.length === 0) {
    console.log("No policies found in public schema.");
  } else {
    res.rows.forEach(r => console.log(JSON.stringify(r)));
  }
  
  await client.end();
}

main().catch(console.error);
