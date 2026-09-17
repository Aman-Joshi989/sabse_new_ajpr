const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS subscribers (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        const email = "test_sub_" + Date.now() + "@example.com";
        await sql`INSERT INTO subscribers (email) VALUES (${email})`;
        console.log("Success!");
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
