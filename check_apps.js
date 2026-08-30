const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});

async function main() {
  await client.connect();
  const res = await client.query(`SELECT * FROM job_applications ORDER BY created_at DESC;`);
  console.log("Job Applications:", res.rows);
  await client.end();
}

main().catch(console.error);
