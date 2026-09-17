const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});
async function main() {
  await client.connect();
  const res = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'blog_posts';
  `);
  console.log('blog_posts schema:', res.rows);
  await client.end();
}
main().catch(console.error);
