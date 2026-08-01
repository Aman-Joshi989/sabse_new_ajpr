require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

const url = process.env.DATABASE_URL;
const client = new Client({ connectionString: url });

async function setupDB() {
    try {
        await client.connect();
        console.log('Connected to Neon DB');

        // Enable pgvector
        await client.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
        console.log('Extension pgvector enabled.');

        // Create Contacts Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS network_contacts (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                company TEXT,
                job_title TEXT,
                email TEXT,
                linkedin_url TEXT,
                summary TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created network_contacts table.');

        // Create Interaction Context Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS network_interactions (
                id SERIAL PRIMARY KEY,
                contact_id INTEGER REFERENCES network_contacts(id) ON DELETE CASCADE,
                interaction_date TIMESTAMP,
                description TEXT,
                source TEXT -- 'gmail', 'calendar', 'linkedin'
            );
        `);
        console.log('Created network_interactions table.');

        // Create Vector Embeddings Table
        // Google text-embedding-004 produces 768-dimensional vectors
        await client.query(`
            CREATE TABLE IF NOT EXISTS network_embeddings (
                id SERIAL PRIMARY KEY,
                contact_id INTEGER REFERENCES network_contacts(id) ON DELETE CASCADE,
                embedding vector(768)
            );
        `);
        console.log('Created network_embeddings table.');

        await client.end();
        console.log('Database setup complete.');
    } catch (err) {
        console.error('Error setting up DB:', err);
        process.exit(1);
    }
}

setupDB();
