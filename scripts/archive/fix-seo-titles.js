const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

async function run() {
  try {
    // 1. Fix blog post title
    const blogRoute = '/blog/generative-engine-optimization-geo-the-complete-2026-strategy-guide-edition-428';
    const newBlogTitle = 'Generative Engine Optimization (GEO) 2026 Guide';
    await pool.query('UPDATE seo_metadata SET title = $1 WHERE route = $2', [newBlogTitle, blogRoute]);
    await pool.query('UPDATE blog_posts SET title = $1 WHERE slug = $2', [newBlogTitle, 'generative-engine-optimization-geo-the-complete-2026-strategy-guide-edition-428']);
    console.log('Fixed blog post title.');

    // 2. Fix services location titles
    const res = await pool.query("SELECT route, title FROM seo_metadata WHERE route LIKE '/services/%/%'");
    let updated = 0;
    
    for (const row of res.rows) {
      if (row.title.length > 60) {
        // e.g., "SaaS Product Development in Singapore | Premium Engineering | AJPR World"
        // We want to extract "SaaS Product Development in Singapore"
        const parts = row.title.split('|').map(p => p.trim());
        let newTitle = parts[0]; 
        
        // Append | AJPR
        newTitle = `${newTitle} | AJPR`;
        
        if (newTitle.length > 60) {
            // If still too long, remove " Development" or " Services"
            newTitle = newTitle.replace(' Development ', ' ');
            newTitle = newTitle.replace(' Services ', ' ');
        }
        if (newTitle.length > 60) {
            newTitle = newTitle.replace(' | AJPR', ''); // Fallback
        }

        await pool.query('UPDATE seo_metadata SET title = $1 WHERE route = $2', [newTitle, row.route]);
        updated++;
      }
    }
    
    console.log(`Updated ${updated} service location titles.`);
    
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
