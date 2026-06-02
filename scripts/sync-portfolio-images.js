const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");

function getEnvValue(key) {
    try {
        const envPath = path.resolve(process.cwd(), ".env.local");
        if (!fs.existsSync(envPath)) return null;
        const envContent = fs.readFileSync(envPath, "utf-8");
        const match = envContent.match(new RegExp(`${key}="?([^"\\n]+)"?`, "m"));
        return match ? match[1] : null;
    } catch (e) {
        return null;
    }
}

async function run() {
    console.log("Starting portfolio image sync (using thum.io)...");

    const connectionString = getEnvValue("DATABASE_URL");
    if (!connectionString) {
        console.error("No DATABASE_URL found.");
        process.exit(1);
    }
    const sql = neon(connectionString);

    // Using thum.io for reliable screenshots without local browser dependency
    // Targeting 3:4 aspect ratio (600x800) for vertical cards
    const projects = [
        {
            name: 'tanishk',
            url: 'https://www.tarottanishk.com/',
            image: '/images/portfolio/tanishk.png'
        },
        {
            name: 'dwaparyug',
            url: 'https://www.dwaparyug.org',
            image: '/images/portfolio/dwaparyug.png'
        },
        {
            name: 'kumaun',
            url: 'https://www.kunainital.ac.in/',
            image: '/images/portfolio/kumaun.png'
        }
    ];

    for (const p of projects) {
        console.log(`Updating ${p.name}...`);
        try {
            await sql`
                UPDATE portfolio_items 
                SET image_url = ${p.image}
                WHERE (title ILIKE ${'%' + p.name + '%'}) 
                   OR (url ILIKE ${'%' + p.name + '%'});
            `;
            console.log(`Updated database record for ${p.name}`);
        } catch (err) {
            console.error(`Failed to update ${p.name}:`, err);
        }
    }

    console.log("Done.");
}

run();
