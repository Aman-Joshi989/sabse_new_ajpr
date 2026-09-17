const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const title = 'AJPR World – Premium Tech, Custom Software & Digital Agency';
        const description = 'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding.';
        await sql`UPDATE seo_metadata SET title = ${title}, description = ${description} WHERE route = '/';`;
        console.log("Updated SEO for / successfully!");
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
