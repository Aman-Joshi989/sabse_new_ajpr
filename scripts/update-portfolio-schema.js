const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

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

async function updateSchema() {
    const connectionString = getEnvValue("DATABASE_URL");
    if (!connectionString) {
        console.error("Could not find DATABASE_URL in .env.local");
        process.exit(1);
    }

    const sql = neon(connectionString);
    console.log("Connected to database. Updating portfolio schema...");

    try {
        // Add image_url column if not exists
        await sql`
      ALTER TABLE portfolio_items 
      ADD COLUMN IF NOT EXISTS image_url TEXT;
    `;
        console.log("Added image_url column.");

        // Update specific projects with thumbnails
        const updates = [
            {
                url: 'https://www.tarottanishk.com/',
                image: 'https://image.thum.io/get/width/800/crop/600/https://www.tarottanishk.com/'
            },
            {
                url: 'https://www.dwaparyug.org',
                image: 'https://image.thum.io/get/width/800/crop/600/https://www.dwaparyug.org'
            },
            {
                url: 'https://www.kunainital.ac.in/',
                image: 'https://image.thum.io/get/width/800/crop/600/https://www.kunainital.ac.in/'
            }
        ];

        for (const u of updates) {
            // match by URL (update if url matches)
            // Note: the original seed might have slightly different URLs or titles, but URL should be unique enough if present
            await sql`
            UPDATE portfolio_items 
            SET image_url = ${u.image}
            WHERE url = ${u.url} OR url LIKE ${'%' + u.url + '%'};
        `;
        }

        console.log("Updated thumbnail URLs for specific projects.");

    } catch (error) {
        console.error("Schema update failed:", error);
    }
}

updateSchema();
