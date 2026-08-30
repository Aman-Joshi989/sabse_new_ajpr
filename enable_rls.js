const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});

async function main() {
  await client.connect();
  const tables = [
    'products',
    'programmatic_seo',
    'agent_logs',
    'backlink_outreach',
    'job_applications'
  ];

  for (const table of tables) {
    console.log(`Enabling RLS on ${table}...`);
    await client.query(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`);
    console.log(`RLS enabled for ${table}`);
  }
  
  await client.end();
}

main().catch(console.error);
