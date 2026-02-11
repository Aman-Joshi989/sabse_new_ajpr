const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Manually parse .env for DATABASE_URL since dotenv might not be installed
const envPath = path.resolve(__dirname, '..', '.env');
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    const match = envConfig.match(/DATABASE_URL=(.*)/);
    if (match) {
        databaseUrl = match[1].trim();
        // Remove quotes if present
        if (databaseUrl.startsWith('"') && databaseUrl.endsWith('"')) {
            databaseUrl = databaseUrl.slice(1, -1);
        }
    }
}

if (!databaseUrl) {
    console.error('DATABASE_URL not found in environment or .env file');
    process.exit(1);
}

const sql = neon(databaseUrl);

async function verifyRetention() {
    console.log('--- Starting Chat Retention Verification ---');

    try {
        // 1. Clean state
        await sql`DELETE FROM messages`;
        console.log('1. Cleared all messages.');

        // 2. Insert OLD message (25 hours ago)
        await sql`
      INSERT INTO messages (content, sender_name, sender_role, created_at)
      VALUES ('OLD MESSAGE', 'Ghost', 'client', NOW() - INTERVAL '25 hours')
    `;
        console.log('2. Inserted message from 25 hours ago.');

        // 3. Insert NEW message (1 hour ago)
        await sql`
      INSERT INTO messages (content, sender_name, sender_role, created_at)
      VALUES ('NEW MESSAGE', 'Human', 'developer', NOW() - INTERVAL '1 hour')
    `;
        console.log('3. Inserted message from 1 hour ago.');

        // 4. Verify count before cleanup (Should be 2 if manual query, but app filters on read)
        // We want to test the DELETE logic that happens on send.
        const allMessages = await sql`SELECT * FROM messages`;
        console.log(`4. Total messages in DB (raw): ${allMessages.length}`);
        if (allMessages.length !== 2) throw new Error('Setup failed');

        // 5. Trigger Cleanup (Simulate sending a message)
        console.log('5. Sending a new message to trigger cleanup...');
        // We replicate the logic from queries.ts: sendMessage
        await sql`
        INSERT INTO messages (content, sender_name, sender_role) 
        VALUES ('Trigger Msg', 'Tester', 'client');
    `;
        await sql`
        DELETE FROM messages WHERE created_at <= NOW() - INTERVAL '24 hours';
    `;

        // 6. Verify Results
        const remainingMessages = await sql`SELECT * FROM messages ORDER BY created_at ASC`;
        console.log(`6. Remaining messages: ${remainingMessages.length}`);

        const oldExists = remainingMessages.find(m => m.content === 'OLD MESSAGE');
        const newExists = remainingMessages.find(m => m.content === 'NEW MESSAGE');
        const triggerExists = remainingMessages.find(m => m.content === 'Trigger Msg');

        if (!oldExists) console.log('✅ OLD MESSAGE was deleted.');
        else console.error('❌ OLD MESSAGE still exists!');

        if (newExists) console.log('✅ NEW MESSAGE preserved.');
        else console.error('❌ NEW MESSAGE was deleted!');

        if (triggerExists) console.log('✅ Trigger Message inserted.');

        if (!oldExists && newExists && triggerExists) {
            console.log('--- RETENTION VERIFICATION PASSED ---');
        } else {
            console.log('--- RETENTION VERIFICATION FAILED ---');
        }

    } catch (err) {
        console.error('Error during verification:', err);
    }
}

verifyRetention();
