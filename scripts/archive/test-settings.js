const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const settings = await sql`SELECT seo_title FROM site_settings LIMIT 1;`;
        console.log("Settings:", settings);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
