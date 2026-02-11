const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

// Manually parse .env for DATABASE_URL
const envPath = path.resolve(__dirname, '..', '.env');
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    const match = envConfig.match(/DATABASE_URL=(.*)/);
    if (match) {
        databaseUrl = match[1].trim();
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

async function addDevelopers() {
    console.log("Adding new developers...");

    try {
        const amanPass = await bcrypt.hash("aman123", 10);
        const pourushPass = await bcrypt.hash("pourush123", 10);
        const defaultAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJP8C2crw-apoYQJPPWluywOo9Aqkjn0liQCjX1RIIBRoRgKuLmCmhVwbUTD5Nlk5SfznSY3INIHx88DmBffSyqmpdjYbvGeshtOUr3NSiOH4r08oWjO17CJN8_7LFySfoeWjV_n4MZhAu2FsXZAPvy4Ek-nBsqQfhFJnp2H4ydGdVmFTdTVcFStKnvIKlfme6EVewWP8_1OsQ_5yKxQIOPTjX1lO63uCcEJu83wnu8gtINTNNkbRWyoJUMU5DhiJaLzMxGjY74g'; // reusing Alex's avatar for now

        await sql`
      INSERT INTO users (name, email, password, role, avatar_url, status) VALUES
      ('Aman Joshi', 'aman@ajpr.com', ${amanPass}, 'developer', ${defaultAvatar}, 'offline'),
      ('Pourush Siddharth', 'pourush@ajpr.com', ${pourushPass}, 'developer', ${defaultAvatar}, 'offline')
      ON CONFLICT (email) DO NOTHING;
    `;

        console.log("Successfully added Aman Joshi and Pourush Siddharth.");
    } catch (error) {
        console.error("Error adding developers:", error);
    }
}

addDevelopers();
