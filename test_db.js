const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        let res = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';`;
        console.log("Users Schema:", res);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
