const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const res = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'projects';
        `;
        console.log(res);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
