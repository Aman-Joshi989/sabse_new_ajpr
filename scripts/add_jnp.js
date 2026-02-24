const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function addJNP() {
    try {
        const stats = {
            "Active Students": "100k+",
            "Load Time": "< 0.8s",
            "Conversions": "+45%"
        };
        const title = "JNP's Classes";
        const url = "https://jnpcoachingclasses.in/";
        const category = "EdTech Platform";
        const tags = ["Next.js", "Tailwind CSS", "React", "Glassmorphism"];
        const description = "A high-performance modern learning portal for K-12 and professional students. Built with progressive disclosure UI, smooth animations, and optimized load times.";
        const imageUrl = "/images/portfolio/jnp-coaching.png";

        await sql`
            INSERT INTO portfolio_items (title, url, category, tags, description, image_url, stats, featured, year)
            VALUES (
                ${title}, 
                ${url}, 
                ${category}, 
                ${tags}, 
                ${description}, 
                ${imageUrl}, 
                ${JSON.stringify(stats)}, 
                true, 
                '2024'
            )
        `;
        console.log("Database inserted successfully!");
    } catch (err) {
        console.error("Error inserting:", err);
    }
}
addJNP();
