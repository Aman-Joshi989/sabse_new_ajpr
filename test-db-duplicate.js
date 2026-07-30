const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const email = "amanjoshi254@gmail.com";
        await sql`INSERT INTO subscribers (email) VALUES (${email})`;
        console.log("Success!");
    } catch (e) {
        console.error("Error Object keys:", Object.keys(e));
        console.error("Error Code:", e.code);
        console.error("Error Message:", e.message);
    }
}
run();
