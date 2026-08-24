const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const createTableQuery = `
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_applied_for VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  linkedin_url VARCHAR(1024),
  resume_url TEXT,
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createTableQuery)
  .then(() => console.log('Table job_applications created successfully'))
  .catch(console.error)
  .finally(() => pool.end());
