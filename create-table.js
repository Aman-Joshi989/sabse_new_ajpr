const { Client } = require('pg');
const url = 'postgresql://neondb_owner:npg_hwWgGF9ex3ko@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({ connectionString: url });

client.connect()
    .then(() => client.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `))
    .then(() => {
        console.log('Success creating table contact_submissions');
        return client.end();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
