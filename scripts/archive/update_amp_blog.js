const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres'
});

async function main() {
  await client.connect();
  const res = await client.query(`
    UPDATE blog_posts 
    SET 
      category = 'AMP',
      meta_description = 'Learn about AMP (Accelerated Mobile Pages), a Google-authorized web component framework for creating fast, mobile-friendly pages, and its impact on Google Search.',
      keywords = 'AMP, Google Authorized, Google Search, SEO, Accelerated Mobile Pages'
    WHERE slug = 'about-amp-on-google-search'
    RETURNING id;
  `);
  
  console.log('Updated blog post metadata and category for ID:', res.rows[0]?.id);
  await client.end();
}

main().catch(console.error);
