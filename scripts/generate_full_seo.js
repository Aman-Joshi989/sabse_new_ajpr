const fs = require('fs');
const { neon } = require('@neondatabase/serverless');

// Load environment variables (fallback if not in next.js context)
require('dotenv').config({ path: '.env.local' });

async function generateFullSEO() {
  console.log("Fetching data from Neon Database...");
  
  const sql = neon(process.env.DATABASE_URL);
  
  const services = await sql`SELECT slug, title, excerpt, description FROM services WHERE published = true`;
  const blogs = await sql`SELECT slug, title, excerpt FROM blog_posts WHERE published = true`;
  
  const locations = [
    { slug: 'san-francisco', name: 'San Francisco' },
    { slug: 'new-york', name: 'New York' },
    { slug: 'london', name: 'London' },
    { slug: 'dubai', name: 'Dubai' },
    { slug: 'singapore', name: 'Singapore' }
  ];

  let csvContent = 'URL,New Title,New Meta Description\n';

  // Helper to escape CSV quotes
  const esc = (str) => {
    if (!str) return '""';
    return '"' + str.replace(/"/g, '""').replace(/\n/g, ' ') + '"';
  };

  // 1. Static Pages
  const staticPages = [
    { url: 'https://ajprworld.com/', title: 'AJPR World | Premium Custom Software, AI Solutions & Web Development', desc: 'Accelerate your business growth with AJPR World. We engineer scalable custom software, high-concurrency web platforms, and automated AI systems.' },
    { url: 'https://ajprworld.com/portfolio', title: 'Our Engineering Portfolio | High-Growth Systems by AJPR World', desc: 'Explore our portfolio of premium web development, custom software engineering, and AI automation projects designed to scale revenue and eliminate tech debt.' },
    { url: 'https://ajprworld.com/about', title: 'About AJPR World | Systems Architects & Software Engineers', desc: 'Discover AJPR World, a premier technology agency specializing in building scalable digital platforms, automated business pipelines, and robust brand identities.' },
    { url: 'https://ajprworld.com/blog', title: 'AJPR World Blog | Insights on AI, SEO & Software Engineering', desc: 'Read expert strategies and insights on custom software development, AI automation, generative engine optimization (GEO), and scaling your digital growth.' },
    { url: 'https://ajprworld.com/services', title: 'Premium Technology Services | Software, AI & DevOps | AJPR World', desc: 'We engineer growth. Explore our premium services including custom web development, SaaS product engineering, AI voice agents, and technical SEO.' },
    { url: 'https://ajprworld.com/contact', title: 'Contact AJPR World | Book a Strategy Session with Our Experts', desc: 'Ready to scale? Contact our engineering and legal teams to discuss custom software development, AI swarm orchestration, and compliance consulting.' },
    { url: 'https://ajprworld.com/privacy', title: 'Privacy Policy | AJPR World', desc: 'Review the AJPR World Privacy Policy to understand how we collect, use, and protect your data while delivering premium software and AI solutions.' },
    { url: 'https://ajprworld.com/terms', title: 'Terms of Service | AJPR World', desc: 'Read the Terms of Service for AJPR World. Review our guidelines for services, intellectual property, acceptable use, and secure digital partnerships.' },
    { url: 'https://ajprworld.com/startup-growth-kit', title: 'LaunchPad Pro: All-In-One Startup Growth Kit | AJPR World', desc: 'Accelerate your launch with the LaunchPad Pro Startup Growth Kit. Get the essential digital infrastructure, software, and tools to scale your business instantly.' },
    { url: 'https://ajprworld.com/aman-joshi', title: 'Aman Joshi | Founder & Systems Architect at AJPR World', desc: 'Meet Aman Joshi, Founder of AJPR World. Partnering with high-growth startups to build robust digital infrastructures, automate workflows, and integrate AI.' },
    { url: 'https://ajprworld.com/careers', title: 'Careers at AJPR World | Build Autonomous AI & Software Systems', desc: 'Join AJPR World\'s elite team of systems engineers, AI automation specialists, and legal professionals. Discover our active openings and build the future.' },
    { url: 'https://ajprworld.com/demo-ruflo', title: 'RuFlo V3 Swarm Simulator | Interactive AI Agent Demo | AJPR World', desc: 'Experience the future of automation. Watch the RuFlo V3 multi-agent swarm achieve consensus, write code, and perform security audits in real-time.' },
    { url: 'https://ajprworld.com/book-call', title: 'Book a 30-Minute Strategy Session | AJPR World', desc: 'Schedule a 30-minute discovery call to discuss your business goals, software needs, and AI automation requirements with the AJPR World team.' }
  ];

  staticPages.forEach(p => {
    csvContent += `${p.url},${esc(p.title)},${esc(p.desc)}\n`;
  });

  // 2. Services Base Pages
  services.forEach(s => {
    const url = `https://ajprworld.com/services/${s.slug}`;
    const title = `${s.title} | Premium Engineering | AJPR World`;
    const desc = s.excerpt || s.description?.substring(0, 150) + '...';
    csvContent += `${url},${esc(title)},${esc(desc)}\n`;
  });

  // 3. Services Location Pages
  services.forEach(s => {
    locations.forEach(l => {
      const url = `https://ajprworld.com/services/${s.slug}/${l.slug}`;
      const title = `${s.title} in ${l.name} | Expert Services | AJPR World`;
      const desc = `Looking for top-tier ${s.title} in ${l.name}? AJPR World delivers scalable, high-performance solutions tailored to your business needs in ${l.name}.`;
      csvContent += `${url},${esc(title)},${esc(desc)}\n`;
    });
  });

  // 4. Blog Posts
  blogs.forEach(b => {
    const url = `https://ajprworld.com/blog/${b.slug}`;
    let title = b.title;
    if (title.length > 50) {
      title = title.substring(0, 50) + '... | AJPR Blog';
    } else {
      title = title + ' | AJPR World Blog';
    }
    const desc = b.excerpt || `Read our latest insights on ${b.title}. Discover how AJPR World leverages advanced engineering to drive results.`;
    csvContent += `${url},${esc(title)},${esc(desc)}\n`;
  });

  fs.writeFileSync('ajpr_full_seo_metadata.csv', csvContent);
  console.log("✅ Successfully generated ajpr_full_seo_metadata.csv with all routes!");
}

generateFullSEO().catch(console.error);
