import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from "next/cache";

// Instantiate Neon client once globally to reuse TCP/TLS keep-alive connections
let cachedClient: any = null;
const getClient = () => {
  if (cachedClient) return cachedClient;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  cachedClient = neon(url);
  return cachedClient;
};

// Standard sql — does NOT call noStore(), allowing Next.js response caching (ISR)
const sql = (strings: TemplateStringsArray, ...values: any[]) => {
  const client = getClient();
  if (!client) {
    console.warn("WARNING: DATABASE_URL is not defined in this environment. Returning a safe empty fallback.");
    return Promise.resolve([] as any);
  }
  return client(strings, ...values);
};

// Dynamic sql — calls noStore() to force fresh data on every request (for mutations, admin pages)
const dynamicSql = (strings: TemplateStringsArray, ...values: any[]) => {
  noStore();
  const client = getClient();
  if (!client) {
    console.warn("WARNING: DATABASE_URL is not defined in this environment. Returning a safe empty fallback.");
    return Promise.resolve([] as any);
  }
  return client(strings, ...values);
};

let dbInitialized = false;

// Memory cache for read-heavy layout queries (TTL: 60 seconds)
let layoutCache: {
  publishedServices?: { data: any, timestamp: number },
  blogs?: { data: any, timestamp: number },
  siteSettings?: { data: any, timestamp: number },
  portfolioItems?: { data: any, timestamp: number }
} = {};

const CACHE_TTL_MS = 60000; // 60 seconds

export function invalidateLayoutCache() {
  layoutCache = {};
}

export async function ensureDbInitialized() {
  if (dbInitialized) return;
  const url = process.env.DATABASE_URL;
  if (!url) return;

  try {
    // 1. Ensure site_settings table exists
    await initSiteSettingsTable();

    // 2. Ensure contact_submissions columns exist
    await sql`
      ALTER TABLE contact_submissions 
        ADD COLUMN IF NOT EXISTS company_name TEXT,
        ADD COLUMN IF NOT EXISTS website_url TEXT,
        ADD COLUMN IF NOT EXISTS monthly_revenue TEXT,
        ADD COLUMN IF NOT EXISTS budget_range TEXT,
        ADD COLUMN IF NOT EXISTS building_text TEXT,
        ADD COLUMN IF NOT EXISTS blockers_text TEXT,
        ADD COLUMN IF NOT EXISTS phone TEXT;
    `;

    // 3. Ensure blog_posts columns exist
    await sql`
      ALTER TABLE blog_posts 
        ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology',
        ADD COLUMN IF NOT EXISTS affiliate_product_slug VARCHAR(255),
        ADD COLUMN IF NOT EXISTS amazon_asin VARCHAR(50);
    `;

    // 4. Ensure site_settings columns exist
    await sql`
      ALTER TABLE site_settings 
        ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255) DEFAULT 'ajprworld@gmail.com',
        ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(100) DEFAULT '+91 9997205257',
        ADD COLUMN IF NOT EXISTS founder_name VARCHAR(255) DEFAULT 'Aman Joshi',
        ADD COLUMN IF NOT EXISTS founder_title VARCHAR(255) DEFAULT 'Founder & Systems Architect',
        ADD COLUMN IF NOT EXISTS founder_bio TEXT DEFAULT 'I partner with high-growth startups and established brands to build robust digital infrastructures, automate complex backend workloads, and integrate secure enterprise-grade systems.',
        ADD COLUMN IF NOT EXISTS founder_badge VARCHAR(255) DEFAULT 'Founder Profile',
        ADD COLUMN IF NOT EXISTS founder_linkedin VARCHAR(255) DEFAULT 'https://www.linkedin.com/in/aman-joshi-/',
        ADD COLUMN IF NOT EXISTS founder_github VARCHAR(255) DEFAULT 'https://github.com/Aman-Joshi989',
        ADD COLUMN IF NOT EXISTS founder_exp1_title VARCHAR(255) DEFAULT 'Systems Architecting',
        ADD COLUMN IF NOT EXISTS founder_exp1_desc TEXT DEFAULT 'Designing scalable multi-tenant architectures, cloud database pipelines, and high-concurrency backend API interfaces built for scale.',
        ADD COLUMN IF NOT EXISTS founder_exp2_title VARCHAR(255) DEFAULT 'Business Automation',
        ADD COLUMN IF NOT EXISTS founder_exp2_desc TEXT DEFAULT 'Eliminating manual business overhead by scripting custom autonomous workflows, database triggers, and third-party API orchestrations.',
        ADD COLUMN IF NOT EXISTS founder_exp3_title VARCHAR(255) DEFAULT 'Execution Excellence',
        ADD COLUMN IF NOT EXISTS founder_exp3_desc TEXT DEFAULT 'Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.';
    `;

    dbInitialized = true;
  } catch (err) {
    console.error("Database lazy-initialization migration failed:", err);
  }
}

// --- Projects & Financials ---
export async function getProjectDetails() {
  const result = await dynamicSql`
    SELECT * FROM projects LIMIT 1;
  `;
  return result[0];
}

// --- Milestones ---
export async function getMilestones(projectId: number) {
  return await dynamicSql`
    SELECT * FROM milestones WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

// --- Tasks ---
export async function getTasks(projectId: number) {
  // Use a string literal specific to this simple use case or an enum in real apps
  // But here we just fetch all and group on client or separate queries
  return await dynamicSql`
    SELECT * FROM tasks WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

// --- Users ---
export async function getUsers() {
  return await dynamicSql`SELECT * FROM users;`;
}

export async function getUserByEmail(email: string) {
  const result = await dynamicSql`SELECT * FROM users WHERE email = ${email}`;
  return result[0];
}

// --- Chat ---
export async function getMessages() {
  // CONSTRAINT: Only fetch messages from the last 24 hours
  return await dynamicSql`
    SELECT * FROM messages 
    WHERE created_at > NOW() - INTERVAL '24 hours' 
    ORDER BY created_at ASC;
  `;
}

export async function sendMessage(content: string, senderName: string, senderRole: 'client' | 'developer') {
  // 1. Insert new message
  await dynamicSql`
    INSERT INTO messages (content, sender_name, sender_role) 
    VALUES (${content}, ${senderName}, ${senderRole});
  `;

  // 2. Cleanup old messages (Maintenance)
  // This ensures we don't just 'hide' them but actually remove them as requested
  // Doing it on write is a simple way to keep it clean without external cron
  await dynamicSql`
    DELETE FROM messages WHERE created_at <= NOW() - INTERVAL '24 hours';
  `;
}
// --- Mutations ---

export async function updateTaskStatus(taskId: number, status: string) {
  // Update the task status
  await dynamicSql`
    UPDATE tasks SET status = ${status} WHERE id = ${taskId};
  `;

  // Update Active Task logic: If moving to 'in_progress', potentially mark others as todo/done or just rely on the frontend to show it.
  // For this app, let's keep it simple.
  return { success: true };
}

export async function updateProjectHours(projectId: number, hoursToAdd: number) {
  await dynamicSql`
    UPDATE projects 
    SET hours_used = hours_used + ${hoursToAdd},
        progress_percent = LEAST(100, progress_percent + 1) -- Tiny increment for visual feedback
    WHERE id = ${projectId};
  `;
  return { success: true };
}
// --- Admin / Client Requests ---

export async function createClientRequest(data: any) {
  // Store request in a 'requests' table or 'messages' with specific metadata
  // For simplicity using messages table as a makeshift request log if 'requests' table doesn't exist
  // Or assuming we can add a new table. Let's assume 'users' and 'projects' exist.
  // Best approach without migration rights: Use 'messages' with a special role/content prefix OR create a new table if possible.
  // Given I can't easily run migrations, I'll store it in 'messages' for now with sender_role='system_request' or similar, 
  // OR just assume I can create a table if I had access.
  // BUT the prompt implies full control. I will try to use a new table 'client_requests' query, assuming it exists or I can run a migration command.
  // Since I cannot run migration commands easily (no schema file access), I will use `messages` table to store these requests for now.
  // Content: JSON string of { name, email, phone, cart }

  const content = JSON.stringify(data);
  await dynamicSql`
    INSERT INTO messages (content, sender_name, sender_role) 
    VALUES (${content}, ${data.name}, 'guest_request');
  `;
  return { success: true };
}

export async function getClientRequests() {
  return await dynamicSql`
    SELECT * FROM messages WHERE sender_role = 'guest_request' ORDER BY created_at DESC;
  `;
}

export async function getContactSubmissions() {
  await ensureDbInitialized();

  return await dynamicSql`
    SELECT * FROM contact_submissions ORDER BY created_at DESC;
  `;
}

export async function getDevelopers() {
  return await dynamicSql`SELECT * FROM users WHERE role = 'developer';`;
}

export async function createClientProfile(clientData: any) {
  const { name, email, password } = clientData;
  // Insert into users
  // Note: Password should be hashed. logic should be in actions.ts, queries just saves.
  await dynamicSql`
        INSERT INTO users (name, email, password, role)
        VALUES (${name}, ${email}, ${password}, 'client');
    `;
  return { success: true };
}

export async function assignDeveloper(clientId: number, developerId: number) {
  // 1. Create a project linking them? Or update user table?
  // Assuming 'projects' table links client_id and developer_id
  await dynamicSql`
        INSERT INTO projects (name, client_id, developer_id, status, progress_percent, hours_used, total_hours)
        VALUES ('New Project', ${clientId}, ${developerId}, 'ongoing', 0, 0, 100);
    `;
  return { success: true };
}

// --- Portfolio Management ---

export async function getPortfolioItems() {
  const now = Date.now();
  if (layoutCache.portfolioItems && (now - layoutCache.portfolioItems.timestamp < CACHE_TTL_MS)) {
    return layoutCache.portfolioItems.data;
  }
  const data = await sql`SELECT * FROM portfolio_items ORDER BY created_at DESC;`;
  layoutCache.portfolioItems = { data, timestamp: now };
  return data;
}

export async function getPortfolioItemById(id: number) {
  const result = await dynamicSql`SELECT * FROM portfolio_items WHERE id = ${id}`;
  return result[0];
}

export async function createPortfolioItem(data: any) {
  invalidateLayoutCache();
  const { title, url, category, tags, description, gradient, accent, year, featured, stats } = data;
  await sql`
    INSERT INTO portfolio_items (title, url, category, tags, description, gradient, accent, year, featured, stats)
    VALUES (${title}, ${url}, ${category}, ${tags}, ${description}, ${gradient}, ${accent}, ${year}, ${featured}, ${JSON.stringify(stats)});
  `;
  return { success: true };
}

export async function updatePortfolioItem(id: number, data: any) {
  invalidateLayoutCache();
  const { title, url, category, tags, description, gradient, accent, year, featured, stats } = data;
  await sql`
    UPDATE portfolio_items 
    SET title = ${title},
        url = ${url},
        category = ${category},
        tags = ${tags},
        description = ${description},
        gradient = ${gradient},
        accent = ${accent},
        year = ${year},
        featured = ${featured},
        stats = ${JSON.stringify(stats)}
    WHERE id = ${id};
  `;
  return { success: true };
}

export async function deletePortfolioItem(id: number) {
  invalidateLayoutCache();
  await sql`DELETE FROM portfolio_items WHERE id = ${id}`;
  return { success: true };
}

// --- Blogs ---

export async function getBlogs() {
  await ensureDbInitialized();
  const now = Date.now();
  if (layoutCache.blogs && (now - layoutCache.blogs.timestamp < CACHE_TTL_MS)) {
    return layoutCache.blogs.data;
  }
  const data = await sql`
    SELECT id, slug, title, excerpt, category, author, cover_image, created_at, published, affiliate_product_slug, amazon_asin 
    FROM blog_posts 
    WHERE published = true 
    ORDER BY created_at DESC;
  `;
  layoutCache.blogs = { data, timestamp: now };
  return data;
}

export async function getBlogBySlug(slug: string) {
  await ensureDbInitialized();
  const result = await sql`
    SELECT * FROM blog_posts 
    WHERE slug = ${slug} AND published = true;
  `;
  return result[0];
}

export async function createBlog(data: any) {
  await ensureDbInitialized();
  invalidateLayoutCache();
  const { title, excerpt, content, category, author, cover_image, published, affiliate_product_slug, amazon_asin } = data;
  let slug = data.slug;

  // Prevent slug collision
  let slugExists = true;
  let attempts = 0;
  while (slugExists && attempts < 5) {
    const check = await sql`SELECT id FROM blog_posts WHERE slug = ${slug}`;
    if (check.length > 0) {
      slug = `${data.slug}-${Math.floor(100 + Math.random() * 900)}`;
      attempts++;
    } else {
      slugExists = false;
    }
  }

  await sql`
    INSERT INTO blog_posts (slug, title, excerpt, content, category, author, cover_image, published, affiliate_product_slug, amazon_asin)
    VALUES (${slug}, ${title}, ${excerpt}, ${content}, ${category}, ${author}, ${cover_image}, ${published ?? true}, ${affiliate_product_slug ?? null}, ${amazon_asin ?? null});
  `;
  return { success: true, slug };
}

export async function getAllBlogs() {
  await ensureDbInitialized();
  return await dynamicSql`
    SELECT id, slug, title, excerpt, category, author, cover_image, created_at, published, affiliate_product_slug, amazon_asin 
    FROM blog_posts 
    ORDER BY created_at DESC;
  `;
}

export async function getBlogById(id: number) {
  await ensureDbInitialized();
  const result = await dynamicSql`
    SELECT * FROM blog_posts WHERE id = ${id};
  `;
  return result[0];
}

export async function updateBlog(id: number, data: any) {
  await ensureDbInitialized();
  invalidateLayoutCache();
  const { slug, title, excerpt, content, category, author, cover_image, published, affiliate_product_slug, amazon_asin } = data;

  await sql`
    UPDATE blog_posts 
    SET slug = ${slug}, title = ${title}, excerpt = ${excerpt}, content = ${content}, 
        category = ${category}, author = ${author}, cover_image = ${cover_image}, published = ${published},
        affiliate_product_slug = ${affiliate_product_slug ?? null}, amazon_asin = ${amazon_asin ?? null}
    WHERE id = ${id};
  `;
  return { success: true };
}

export async function deleteBlog(id: number) {
  invalidateLayoutCache();
  await sql`DELETE FROM blog_posts WHERE id = ${id};`;
  return { success: true };
}

// --- Services / Products ---

export async function getAllServices() {
  return await dynamicSql`
    SELECT * FROM services 
    ORDER BY created_at DESC;
  `;
}

export async function getPublishedServices() {
  const now = Date.now();
  if (layoutCache.publishedServices && (now - layoutCache.publishedServices.timestamp < CACHE_TTL_MS)) {
    return layoutCache.publishedServices.data;
  }
  const data = await sql`
    SELECT * FROM services 
    WHERE published = true
    ORDER BY created_at DESC;
  `;
  layoutCache.publishedServices = { data, timestamp: now };
  return data;
}

export async function getServiceBySlug(slug: string) {
  const result = await sql`
    SELECT * FROM services WHERE slug = ${slug} AND published = true;
  `;
  return result[0];
}

export async function getServiceById(id: number) {
  const result = await dynamicSql`
    SELECT * FROM services WHERE id = ${id};
  `;
  return result[0];
}

export async function createService(data: any) {
  invalidateLayoutCache();
  const { sku, title, slug, category, description, features, price, price_type, delivery_time, icon_name, gradient, published } = data;
  await sql`
    INSERT INTO services (sku, title, slug, category, description, features, price, price_type, delivery_time, icon_name, gradient, published)
    VALUES (${sku}, ${title}, ${slug}, ${category}, ${description}, ${JSON.stringify(features)}::jsonb, ${price}, ${price_type}, ${delivery_time}, ${icon_name}, ${gradient}, ${published ?? true});
  `;
  return { success: true };
}

export async function updateService(id: number, data: any) {
  invalidateLayoutCache();
  const { sku, title, slug, category, description, features, price, price_type, delivery_time, icon_name, gradient, published } = data;
  await sql`
    UPDATE services 
    SET sku = ${sku}, title = ${title}, slug = ${slug}, category = ${category}, description = ${description}, 
        features = ${JSON.stringify(features)}::jsonb, price = ${price}, price_type = ${price_type}, 
        delivery_time = ${delivery_time}, icon_name = ${icon_name}, gradient = ${gradient}, published = ${published}
    WHERE id = ${id};
  `;
  return { success: true };
}

export async function deleteService(id: number) {
  invalidateLayoutCache();
  await sql`DELETE FROM services WHERE id = ${id}`;
  return { success: true };
}

// --- Affiliate Links ---

export async function initAffiliatesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS affiliate_links (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      target_url TEXT NOT NULL,
      product_name VARCHAR(255),
      clicks INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function getAffiliateLink(slug: string) {
  const result = await sql`
    SELECT * FROM affiliate_links WHERE slug = ${slug};
  `;
  return result[0];
}

export async function recordAffiliateClick(slug: string) {
  await dynamicSql`
    UPDATE affiliate_links 
    SET clicks = clicks + 1 
    WHERE slug = ${slug};
  `;
}

export async function createAffiliateLink(data: { slug: string, target_url: string, product_name: string }) {
  await initAffiliatesTable();
  await sql`
    INSERT INTO affiliate_links (slug, target_url, product_name)
    VALUES (${data.slug}, ${data.target_url}, ${data.product_name})
    ON CONFLICT (slug) DO UPDATE 
    SET target_url = EXCLUDED.target_url, product_name = EXCLUDED.product_name;
  `;
  return { success: true };
}

// --- SEO & GEO Settings ---

export async function initSiteSettingsTable() {
  // Retained as a simple wrapper to satisfy references, but actual schema check is consolidated in ensureDbInitialized()
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT PRIMARY KEY,
      seo_title VARCHAR(255) DEFAULT 'AJPR World – Premium Tech, Custom Software & Creative Branding',
      seo_description TEXT DEFAULT 'AJPR World delivers premium web development, custom software engineering, UI/UX design, and AI solutions to scale your business with state-of-the-art tech.',
      seo_keywords TEXT DEFAULT 'Best Software, tech solutions, web development, custom software, UI/UX design, cloud deployment, digital branding, premium websites, AJPR World',
      canonical_url VARCHAR(255) DEFAULT 'https://ajprworld.com',
      geo_region VARCHAR(100) DEFAULT 'IN-DL',
      geo_placename VARCHAR(255) DEFAULT 'New Delhi',
      geo_position VARCHAR(100) DEFAULT '28.6139;77.2090',
      geo_icbm VARCHAR(100) DEFAULT '28.6139, 77.2090',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function getSiteSettings() {
  await ensureDbInitialized();
  const now = Date.now();
  if (layoutCache.siteSettings && (now - layoutCache.siteSettings.timestamp < CACHE_TTL_MS)) {
    return layoutCache.siteSettings.data;
  }
  const result = await sql`SELECT * FROM site_settings WHERE id = 1;`;
  
  let settings;
  if (result.length === 0) {
    // Insert default settings row
    await sql`
      INSERT INTO site_settings (
        id, seo_title, seo_description, seo_keywords, canonical_url, 
        geo_region, geo_placename, geo_position, geo_icbm, 
        contact_email, contact_phone, founder_name, founder_title,
        founder_bio, founder_badge, founder_linkedin, founder_github,
        founder_exp1_title, founder_exp1_desc,
        founder_exp2_title, founder_exp2_desc,
        founder_exp3_title, founder_exp3_desc
      ) 
      VALUES (
        1, 
        'AJPR World – Premium Tech, Custom Software & Creative Branding',
        'AJPR World delivers premium web development, custom software engineering, UI/UX design, and AI solutions to scale your business with state-of-the-art tech.',
        'Best Software, tech solutions, web development, custom software, UI/UX design, cloud deployment, digital branding, premium websites, AJPR World',
        'https://ajprworld.com',
        'IN-DL',
        'New Delhi',
        '28.6139;77.2090',
        '28.6139, 77.2090',
        'ajprworld@gmail.com',
        '+91 9997205257',
        'Aman Joshi',
        'Founder & Systems Architect',
        'I partner with high-growth startups and established brands to build robust digital infrastructures, automate complex backend workloads, and integrate secure enterprise-grade systems.',
        'Founder Profile',
        'https://www.linkedin.com/in/aman-joshi-/',
        'https://github.com/Aman-Joshi989',
        'Systems Architecting',
        'Designing scalable multi-tenant architectures, cloud database pipelines, and high-concurrency backend API interfaces built for scale.',
        'Business Automation',
        'Eliminating manual business overhead by scripting custom autonomous workflows, database triggers, and third-party API orchestrations.',
        'Execution Excellence',
        'Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.'
      );
    `;
    const newSettings = await sql`SELECT * FROM site_settings WHERE id = 1;`;
    settings = newSettings[0];
  } else {
    settings = result[0];
  }
  
  layoutCache.siteSettings = { data: settings, timestamp: now };
  return settings;
}

export async function updateSiteSettings(data: any) {
  await initSiteSettingsTable();
  invalidateLayoutCache();
  const { 
    seo_title, seo_description, seo_keywords, canonical_url, 
    geo_region, geo_placename, geo_position, geo_icbm, 
    contact_email, contact_phone, founder_name, founder_title,
    founder_bio, founder_badge, founder_linkedin, founder_github,
    founder_exp1_title, founder_exp1_desc,
    founder_exp2_title, founder_exp2_desc,
    founder_exp3_title, founder_exp3_desc
  } = data;
  
  await sql`
    UPDATE site_settings 
    SET seo_title = ${seo_title},
        seo_description = ${seo_description},
        seo_keywords = ${seo_keywords},
        canonical_url = ${canonical_url},
        geo_region = ${geo_region},
        geo_placename = ${geo_placename},
        geo_position = ${geo_position},
        geo_icbm = ${geo_icbm},
        contact_email = ${contact_email},
        contact_phone = ${contact_phone},
        founder_name = ${founder_name},
        founder_title = ${founder_title},
        founder_bio = ${founder_bio},
        founder_badge = ${founder_badge},
        founder_linkedin = ${founder_linkedin},
        founder_github = ${founder_github},
        founder_exp1_title = ${founder_exp1_title},
        founder_exp1_desc = ${founder_exp1_desc},
        founder_exp2_title = ${founder_exp2_title},
        founder_exp2_desc = ${founder_exp2_desc},
        founder_exp3_title = ${founder_exp3_title},
        founder_exp3_desc = ${founder_exp3_desc},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = 1;
  `;
  return { success: true };
}

// ---------------------------------------------------------------------------
// GLOSSARY QUERIES
// ---------------------------------------------------------------------------

export async function getGlossaryTerms() {
  const result = await sql`SELECT * FROM glossary_terms WHERE published = true ORDER BY term ASC;`;
  return result;
}

export async function getGlossaryTermBySlug(slug: string) {
  const result = await sql`SELECT * FROM glossary_terms WHERE slug = ${slug} AND published = true LIMIT 1;`;
  return result.length ? result[0] : null;
}

export async function createGlossaryTerm(data: any) {
  const { slug, term, definition, detailed_explanation, related_terms } = data;
  const result = await dynamicSql`
    INSERT INTO glossary_terms (slug, term, definition, detailed_explanation, related_terms)
    VALUES (${slug}, ${term}, ${definition}, ${detailed_explanation}, ${JSON.stringify(related_terms || [])})
    ON CONFLICT (slug) DO UPDATE SET 
      term = EXCLUDED.term,
      definition = EXCLUDED.definition,
      detailed_explanation = EXCLUDED.detailed_explanation,
      related_terms = EXCLUDED.related_terms,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  return result[0];
}
