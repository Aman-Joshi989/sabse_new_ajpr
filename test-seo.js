const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const seo = await sql`SELECT * FROM seo_metadata WHERE route = '/';`;
        console.log("SEO:", seo);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
