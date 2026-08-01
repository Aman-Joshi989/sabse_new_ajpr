import { config } from 'dotenv';
config({ path: '.env.local' });
import { Pool } from 'pg';

async function updateToken() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const platform = 'linkedin';
  const token = 'AQ.Ab8RN6JGvpg-gztCVDaPSs3lrKiISmQFEOBTg_5g30av7U7GYw';
  
  try {
    const query = `
      INSERT INTO social_tokens (platform, access_token, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '60 days')
      ON CONFLICT (platform)
      DO UPDATE SET 
        access_token = EXCLUDED.access_token,
        expires_at = EXCLUDED.expires_at,
        created_at = NOW();
    `;
    await pool.query(query, [platform, token]);
    console.log('✅ Successfully updated LinkedIn token in social_tokens table!');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await pool.end();
  }
}

updateToken();
