const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
envFile.split('\n').forEach(line => {
  const i = line.indexOf('=');
  if (i > -1) {
    const key = line.substring(0, i).trim();
    const value = line.substring(i + 1).trim().replace(/^"|"$/g, '');
    process.env[key] = value;
  }
});

async function createServicesTable() {
    console.log('Connecting to database...');
    const sql = neon(process.env.DATABASE_URL);

    try {
        console.log('Creating services table...');
        await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        features JSONB NOT NULL DEFAULT '[]',
        price DECIMAL(10, 2),
        price_type VARCHAR(50) DEFAULT 'fixed', -- fixed, starting_at, custom
        delivery_time VARCHAR(100),
        icon_name VARCHAR(50),
        gradient VARCHAR(100),
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('Services table created successfully!');

        // Optional: Insert initial mock data based on the current website to save time for the user
        const existingCount = await sql`SELECT COUNT(*) FROM services;`;
        if (existingCount[0].count === '0') {
            console.log('Inserting default services...');
            const defaultServices = [
                {
                    sku: 'WEB-DEV-001',
                    title: 'Custom Web Development',
                    slug: 'web-development',
                    category: 'Development',
                    description: 'Build modern, responsive web apps with Next.js, React, and TypeScript. Engineering scalable digital systems, robust cloud infrastructure, and data-driven growth strategies.',
                    features: JSON.stringify(['Next.js 14', 'TypeScript', 'SEO Optimization', 'PWA', 'Database Integration']),
                    price: 34999.00,
                    price_type: 'starting_at',
                    delivery_time: '2-4 weeks',
                    icon_name: 'Code2',
                    gradient: 'from-blue-500 to-cyan-500'
                },
                {
                    sku: 'DIG-MKT-001',
                    title: 'Digital Marketing',
                    slug: 'digital-marketing',
                    category: 'Marketing',
                    description: 'Data-driven strategies to grow your online presence and reach your target audience with maximum ROI.',
                    features: JSON.stringify(['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting']),
                    price: 0.00,
                    price_type: 'custom',
                    delivery_time: 'Monthly Retainer',
                    icon_name: 'Globe',
                    gradient: 'from-blue-400 to-indigo-500'
                }
            ];

            for (const s of defaultServices) {
                await sql`
          INSERT INTO services (sku, title, slug, category, description, features, price, price_type, delivery_time, icon_name, gradient)
          VALUES (${s.sku}, ${s.title}, ${s.slug}, ${s.category}, ${s.description}, ${s.features}::jsonb, ${s.price}, ${s.price_type}, ${s.delivery_time}, ${s.icon_name}, ${s.gradient})
        `;
            }
            console.log('Default services inserted!');
        }

    } catch (error) {
        console.error('Error creating services table:', error);
    }
}

createServicesTable();
