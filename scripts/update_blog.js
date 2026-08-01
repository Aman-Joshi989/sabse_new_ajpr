const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const res = await pool.query(`
      UPDATE blog_posts 
      SET 
        title = REPLACE(title, '2024', '2026'),
        slug = REPLACE(slug, '2024', '2026'),
        content = REPLACE(content, '2024', '2026')
      WHERE title LIKE '%2024%' OR slug LIKE '%2024%'
      RETURNING *;
    `);
    console.log("Updated blogs:", res.rows);
  } catch (err) {
    console.error("SQL Error:", err);
  } finally {
    pool.end();
  }
}

main();
