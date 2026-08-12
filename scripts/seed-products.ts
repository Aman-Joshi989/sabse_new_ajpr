import { sql } from '../lib/db/queries';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function seed() {
  try {
    console.log('Creating schemas directly...');
    
    await sql`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          price NUMERIC NOT NULL,
          currency VARCHAR(10) DEFAULT 'USD',
          features JSONB,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    console.log('✅ Created products table');

    await sql`
      ALTER TABLE sales_leads 
        ADD COLUMN IF NOT EXISTS budget VARCHAR(100),
        ADD COLUMN IF NOT EXISTS tech_stack TEXT,
        ADD COLUMN IF NOT EXISTS company_size VARCHAR(100);
    `;
    console.log('✅ Altered sales_leads table');

    const products = [
      {
        name: 'Technical SEO & Performance Audit',
        slug: 'seo-audit',
        description: 'A deep-dive technical audit of your web platform to uncover performance bottlenecks, SEO errors, and conversion blockers.',
        price: 299,
        currency: 'USD',
        features: JSON.stringify(['Core Web Vitals Analysis', 'On-page SEO Review', 'Architecture Assessment', 'Actionable Report'])
      },
      {
        name: 'Custom UI/UX Redesign',
        slug: 'ui-ux-redesign',
        description: 'A complete premium overhaul of your core product or landing pages designed to maximize conversion and aesthetic appeal.',
        price: 999,
        currency: 'USD',
        features: JSON.stringify(['Wireframing', 'High-Fidelity Mockups', 'Conversion Optimization', 'Figma Source Files'])
      }
    ];

    console.log('Inserting products...');
    for (const product of products) {
        try {
            await sql`
                INSERT INTO products (name, slug, description, price, currency, features)
                VALUES (${product.name}, ${product.slug}, ${product.description}, ${product.price}, ${product.currency}, ${product.features}::jsonb)
                ON CONFLICT (slug) DO UPDATE 
                SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, features = EXCLUDED.features;
            `;
            console.log(`✅ Seeded product: ${product.name}`);
        } catch (err) {
            console.error(`Failed to insert ${product.name}:`, err);
        }
    }

    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
