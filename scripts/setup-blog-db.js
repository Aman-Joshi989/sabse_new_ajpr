require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const url = process.env.DATABASE_URL;
if (!url) {
    console.error("DATABASE_URL is not defined in .env.local");
    process.exit(1);
}

const client = new Client({ connectionString: url });

async function setupDB() {
    try {
        await client.connect();
        console.log('Connected to Supabase DB');

        await client.query(`
            CREATE TABLE IF NOT EXISTS blog_posts (
                id SERIAL PRIMARY KEY,
                slug TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                meta_description TEXT NOT NULL,
                keywords TEXT,
                published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created blog_posts table successfully.');

        await client.end();
    } catch (err) {
        console.error('Error setting up DB:', err);
        process.exit(1);
    }
}

setupDB();
