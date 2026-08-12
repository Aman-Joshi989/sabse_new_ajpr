import { NextResponse } from 'next/server';
import { sql, ensureDbInitialized } from '@/lib/db/queries';

export async function GET() {
  try {
    // Ensure DB schemas are initialized first (this handles sales_leads alter table and products creation)
    await ensureDbInitialized();

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
        features: JSON.stringify(['High-fidelity Figma Designs', 'Micro-interactions', 'Design System', 'Responsive Layouts'])
      },
      {
        name: 'Startup MVP Engineering',
        slug: 'startup-mvp',
        description: 'End-to-end development of your Minimum Viable Product using modern tech stack (Next.js, Postgres, AI Integrations).',
        price: 4999,
        currency: 'USD',
        features: JSON.stringify(['Full-stack Development', 'Database Architecture', 'Authentication & Payments', 'Cloud Deployment'])
      }
    ];

    for (const p of products) {
      await sql`
        INSERT INTO products (name, slug, description, price, currency, features)
        VALUES (${p.name}, ${p.slug}, ${p.description}, ${p.price}, ${p.currency}, ${p.features}::jsonb)
        ON CONFLICT (slug) DO UPDATE 
        SET price = EXCLUDED.price, features = EXCLUDED.features, description = EXCLUDED.description
      `;
    }

    return NextResponse.json({ success: true, message: 'Products seeded successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error seeding products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
