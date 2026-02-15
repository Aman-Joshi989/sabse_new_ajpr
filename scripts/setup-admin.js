const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

function getEnvValue(key) {
    try {
        const envPath = path.resolve(process.cwd(), ".env.local");
        const envContent = fs.readFileSync(envPath, "utf-8");
        const match = envContent.match(new RegExp(`${key}="?([^"\\n]+)"?`, "m"));
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
}

async function setupAdmin() {
    const connectionString = getEnvValue("DATABASE_URL");
    if (!connectionString) {
        console.error("Could not find DATABASE_URL in .env");
        process.exit(1);
    }

    const sql = neon(connectionString);
    console.log("Setting up Admin User...");

    try {
        const email = "admin@ajpr.com";
        const password = "admin";
        const hashedPassword = await bcrypt.hash(password, 10);
        const name = "Super Admin";

        // Upsert Admin User (Insert if not exists, update if exists)
        // Note: Since email is UNIQUE, we can use ON CONFLICT
        // BUT we need to ensure the constraint name or just do a manual check to be safer in raw SQL without knowing constraint names perfectly

        // Check if exists
        const existing = await sql`SELECT * FROM users WHERE email = ${email}`;

        if (existing.length > 0) {
            console.log("Admin user already exists. Updating password and role...");
            await sql`
            UPDATE users 
            SET password = ${hashedPassword}, role = 'admin', name = ${name}
            WHERE email = ${email}
        `;
        } else {
            console.log("Creating new Admin user...");
            await sql`
            INSERT INTO users (name, email, password, role, status)
            VALUES (${name}, ${email}, ${hashedPassword}, 'admin', 'online');
        `;
        }

        console.log(`Admin user ready!`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

    } catch (error) {
        console.error("Setup failed:", error);
    }
}

setupAdmin();
