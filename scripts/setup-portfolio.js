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

async function setup() {
    const connectionString = getEnvValue("DATABASE_URL");
    if (!connectionString) {
        console.error("Could not find DATABASE_URL in .env.local");
        process.exit(1);
    }

    const sql = neon(connectionString);
    console.log("Connected to database. Setting up portfolio schema...");

    try {
        // Create Portfolio Table
        await sql`
      CREATE TABLE IF NOT EXISTS portfolio_items (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT,
        category TEXT NOT NULL,
        tags TEXT[],
        description TEXT,
        gradient TEXT,
        accent TEXT,
        year TEXT,
        featured BOOLEAN DEFAULT FALSE,
        stats JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

        console.log("Portfolio table created.");

        // Check if table is empty
        const count = await sql`SELECT COUNT(*) FROM portfolio_items`;
        if (parseInt(count[0].count) > 0) {
            console.log("Portfolio table already has data. Skipping seed.");
            return;
        }

        console.log("Seeding portfolio data...");

        const projects = [
            {
                title: 'Tarot Tanishk',
                url: 'https://tarottanishk.com',
                category: 'Spiritual & Wellness',
                tags: ['Wix', 'JavaScript', 'CSS'],
                description: 'A mystical tarot reading platform with immersive user experience and spiritual guidance.',
                gradient: 'from-purple-400 via-pink-400 to-indigo-400',
                accent: 'bg-gradient-to-r from-purple-400 to-pink-400',
                year: '2024',
                featured: true,
                stats: JSON.stringify({ users: '5K+', rating: '4.9', performance: '99%' })
            },
            {
                title: 'Soul Capture',
                url: null,
                category: 'Spiritual & Wellness',
                tags: ['Wordpress', 'PHP', 'Elementor'],
                description: 'A mystical stone healing e-commerce platform with immersive user experience and spiritual guidance.',
                gradient: 'from-indigo-400 via-purple-400 to-pink-400',
                accent: 'bg-gradient-to-r from-indigo-400 to-purple-400',
                year: '2024',
                featured: false,
                stats: JSON.stringify({ transactions: '100K+', uptime: '99.9%', users: '10K+' })
            },
            {
                title: 'Pankaj Sammal Arts',
                url: 'https://pankajsammalarts.com',
                category: 'Art & Portfolio',
                tags: ['Laravel', 'PHP', 'MySQL'],
                description: 'An elegant artist portfolio showcasing contemporary artworks with interactive galleries.',
                gradient: 'from-orange-400 via-red-400 to-pink-400',
                accent: 'bg-gradient-to-r from-orange-400 to-red-400',
                year: '2024',
                featured: true,
                stats: JSON.stringify({ views: '10K+', rating: '5.0', artworks: '200+' })
            },
            {
                title: 'Dwaparyug',
                url: 'https://dwaparyug.org',
                category: 'Cultural & Heritage',
                tags: ['Next.js', 'Neondb', 'Node.js', 'Tailwind CSS', 'Prisma'],
                description: 'A cultural heritage platform preserving ancient wisdom and traditions for modern audiences.',
                gradient: 'from-amber-400 via-yellow-400 to-orange-400',
                accent: 'bg-gradient-to-r from-amber-400 to-yellow-400',
                year: '2024',
                featured: true,
                stats: JSON.stringify({ articles: '500+', rating: '4.8', members: '3K+' })
            },
            {
                title: 'Kumaun University Nainital',
                url: 'https://www.kunainital.ac.in/',
                category: 'Education',
                tags: ['Laravel', 'PHP', 'MySQL'],
                description: 'Comprehensive university website with student portal, academic resources, and administration systems.',
                gradient: 'from-blue-400 via-cyan-400 to-teal-400',
                accent: 'bg-gradient-to-r from-blue-400 to-cyan-400',
                year: '2023',
                featured: true,
                stats: JSON.stringify({ students: '20K+', courses: '100+', rating: '4.7' })
            },
            {
                title: 'E-Commerce Platform',
                url: null,
                category: 'Retail & Commerce',
                tags: ['Next.js', 'Stripe', 'Prisma'],
                description: 'High-performance e-commerce solution with real-time inventory and seamless checkout experience.',
                gradient: 'from-green-400 via-emerald-400 to-teal-400',
                accent: 'bg-gradient-to-r from-green-400 to-emerald-400',
                year: '2024',
                featured: false,
                stats: JSON.stringify({ sales: '$1M+', products: '5K+', conversion: '3.5%' })
            },
            {
                title: 'FinTech Dashboard',
                url: null,
                category: 'Finance',
                tags: ['React', 'D3.js', 'WebSocket'],
                description: 'Real-time financial analytics dashboard with advanced data visualization and AI insights.',
                gradient: 'from-indigo-400 via-purple-400 to-pink-400',
                accent: 'bg-gradient-to-r from-indigo-400 to-purple-400',
                year: '2024',
                featured: false,
                stats: JSON.stringify({ transactions: '100K+', uptime: '99.9%', users: '10K+' })
            },
            {
                title: 'Healthcare App',
                url: null,
                category: 'Healthcare',
                tags: ['React Native', 'Firebase', 'AI/ML'],
                description: 'Telemedicine platform connecting patients with healthcare providers seamlessly.',
                gradient: 'from-cyan-400 via-blue-400 to-purple-400',
                accent: 'bg-gradient-to-r from-cyan-400 to-blue-400',
                year: '2023',
                featured: false,
                stats: JSON.stringify({ consultations: '50K+', doctors: '500+', rating: '4.9' })
            },
            {
                title: 'Social Impact Network',
                url: null,
                category: 'Social Good',
                tags: ['Vue.js', 'GraphQL', 'AWS'],
                description: 'Community platform driving social change through collaborative initiatives and impact tracking.',
                gradient: 'from-pink-400 via-rose-400 to-red-400',
                accent: 'bg-gradient-to-r from-pink-400 to-rose-400',
                year: '2023',
                featured: false,
                stats: JSON.stringify({ campaigns: '200+', volunteers: '15K+', impact: '$5M+' })
            }
        ];

        for (const p of projects) {
            await sql`
            INSERT INTO portfolio_items (title, url, category, tags, description, gradient, accent, year, featured, stats)
            VALUES (${p.title}, ${p.url}, ${p.category}, ${p.tags}, ${p.description}, ${p.gradient}, ${p.accent}, ${p.year}, ${p.featured}, ${p.stats});
        `;
        }

        console.log("Portfolio data seeded successfully!");

    } catch (error) {
        console.error("Setup failed:", error);
    }
}

setup();
