const { Pool } = require('pg');

async function run() {
  const pool = new Pool({
    connectionString: 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });

  const query = `CREATE TABLE IF NOT EXISTS site_settings (
      id INT PRIMARY KEY,
      seo_title VARCHAR(255) DEFAULT 'AJPR World – Premium Tech, Custom Software & Creative Branding',
      seo_description TEXT DEFAULT 'AJPR World delivers premium web development, custom software engineering, UI/UX design, and AI solutions to scale your business with state-of-the-art tech.',
      seo_keywords TEXT DEFAULT 'Best Software, tech solutions, web development, custom software, UI/UX design, cloud deployment, digital branding, premium websites, AJPR World',
      canonical_url VARCHAR(255) DEFAULT 'https://ajprworld.com',
      geo_region VARCHAR(100) DEFAULT 'IN-DL',
      geo_placename VARCHAR(255) DEFAULT 'New Delhi',
      geo_position VARCHAR(100) DEFAULT '28.6139;77.2090',
      geo_icbm VARCHAR(100) DEFAULT '28.6139, 77.2090',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      contact_email VARCHAR(255),
      contact_phone VARCHAR(50),
      founder_name VARCHAR(100),
      founder_title VARCHAR(100),
      founder_bio TEXT,
      founder_badge VARCHAR(100),
      founder_linkedin VARCHAR(255),
      founder_github VARCHAR(255),
      founder_exp1_title VARCHAR(255),
      founder_exp1_desc TEXT,
      founder_exp2_title VARCHAR(255),
      founder_exp2_desc TEXT,
      founder_exp3_title VARCHAR(255),
      founder_exp3_desc TEXT,
      global_price_multiplier DECIMAL(5,2) DEFAULT 1.0
  );`;

  try {
    await pool.query(query);
    console.log('site_settings created!');
  } catch (e) {
    console.error('Failed', e.message);
  }
  process.exit(0);
}
run();
