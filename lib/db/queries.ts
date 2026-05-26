import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// --- Projects & Financials ---
export async function getProjectDetails() {
  const result = await sql`
    SELECT * FROM projects LIMIT 1;
  `;
  return result[0];
}

// --- Milestones ---
export async function getMilestones(projectId: number) {
  return await sql`
    SELECT * FROM milestones WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

// --- Tasks ---
export async function getTasks(projectId: number) {
  // Use a string literal specific to this simple use case or an enum in real apps
  // But here we just fetch all and group on client or separate queries
  return await sql`
    SELECT * FROM tasks WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

// --- Users ---
export async function getUsers() {
  return await sql`SELECT * FROM users;`;
}

export async function getUserByEmail(email: string) {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  return result[0];
}

// --- Chat ---
export async function getMessages() {
  // CONSTRAINT: Only fetch messages from the last 24 hours
  return await sql`
    SELECT * FROM messages 
    WHERE created_at > NOW() - INTERVAL '24 hours' 
    ORDER BY created_at ASC;
  `;
}

export async function sendMessage(content: string, senderName: string, senderRole: 'client' | 'developer') {
  // 1. Insert new message
  await sql`
    INSERT INTO messages (content, sender_name, sender_role) 
    VALUES (${content}, ${senderName}, ${senderRole});
  `;

  // 2. Cleanup old messages (Maintenance)
  // This ensures we don't just 'hide' them but actually remove them as requested
  // Doing it on write is a simple way to keep it clean without external cron
  await sql`
    DELETE FROM messages WHERE created_at <= NOW() - INTERVAL '24 hours';
  `;
}
// --- Mutations ---

export async function updateTaskStatus(taskId: number, status: string) {
  // Update the task status
  await sql`
    UPDATE tasks SET status = ${status} WHERE id = ${taskId};
  `;

  // Update Active Task logic: If moving to 'in_progress', potentially mark others as todo/done or just rely on the frontend to show it.
  // For this app, let's keep it simple.
  return { success: true };
}

export async function updateProjectHours(projectId: number, hoursToAdd: number) {
  await sql`
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
  await sql`
    INSERT INTO messages (content, sender_name, sender_role) 
    VALUES (${content}, ${data.name}, 'guest_request');
  `;
  return { success: true };
}

export async function getClientRequests() {
  return await sql`
    SELECT * FROM messages WHERE sender_role = 'guest_request' ORDER BY created_at DESC;
  `;
}

export async function getContactSubmissions() {
  // Safe dynamic migration to ensure all granular fields are supported
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS company_name TEXT;`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS website_url TEXT;`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS budget_range TEXT;`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS building_text TEXT;`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS blockers_text TEXT;`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;`;

  return await sql`
    SELECT * FROM contact_submissions ORDER BY created_at DESC;
  `;
}

export async function getDevelopers() {
  return await sql`SELECT * FROM users WHERE role = 'developer';`;
}

export async function createClientProfile(clientData: any) {
  const { name, email, password } = clientData;
  // Insert into users
  // Note: Password should be hashed. logic should be in actions.ts, queries just saves.
  await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${name}, ${email}, ${password}, 'client');
    `;
  return { success: true };
}

export async function assignDeveloper(clientId: number, developerId: number) {
  // 1. Create a project linking them? Or update user table?
  // Assuming 'projects' table links client_id and developer_id
  await sql`
        INSERT INTO projects (name, client_id, developer_id, status, progress_percent, hours_used, total_hours)
        VALUES ('New Project', ${clientId}, ${developerId}, 'ongoing', 0, 0, 100);
    `;
  return { success: true };
}

// --- Portfolio Management ---

export async function getPortfolioItems() {
  return await sql`SELECT * FROM portfolio_items ORDER BY created_at DESC;`;
}

export async function getPortfolioItemById(id: number) {
  const result = await sql`SELECT * FROM portfolio_items WHERE id = ${id}`;
  return result[0];
}

export async function createPortfolioItem(data: any) {
  const { title, url, category, tags, description, gradient, accent, year, featured, stats } = data;
  await sql`
    INSERT INTO portfolio_items (title, url, category, tags, description, gradient, accent, year, featured, stats)
    VALUES (${title}, ${url}, ${category}, ${tags}, ${description}, ${gradient}, ${accent}, ${year}, ${featured}, ${JSON.stringify(stats)});
  `;
  return { success: true };
}

export async function updatePortfolioItem(id: number, data: any) {
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
  await sql`DELETE FROM portfolio_items WHERE id = ${id}`;
  return { success: true };
}

// --- Blogs ---

export async function getBlogs() {
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology';`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS affiliate_product_slug VARCHAR(255);`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS amazon_asin VARCHAR(50);`;
  return await sql`
    SELECT id, slug, title, excerpt, category, author, cover_image, created_at, published, affiliate_product_slug, amazon_asin 
    FROM blog_posts 
    WHERE published = true 
    ORDER BY created_at DESC;
  `;
}

export async function getBlogBySlug(slug: string) {
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology';`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS affiliate_product_slug VARCHAR(255);`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS amazon_asin VARCHAR(50);`;
  const result = await sql`
    SELECT * FROM blog_posts 
    WHERE slug = ${slug} AND published = true;
  `;
  return result[0];
}

export async function createBlog(data: any) {
  const { slug, title, excerpt, content, category, author, cover_image, published, affiliate_product_slug, amazon_asin } = data;
  
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology';`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS affiliate_product_slug VARCHAR(255);`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS amazon_asin VARCHAR(50);`;

  await sql`
    INSERT INTO blog_posts (slug, title, excerpt, content, category, author, cover_image, published, affiliate_product_slug, amazon_asin)
    VALUES (${slug}, ${title}, ${excerpt}, ${content}, ${category}, ${author}, ${cover_image}, ${published ?? true}, ${affiliate_product_slug ?? null}, ${amazon_asin ?? null});
  `;
  return { success: true };
}

export async function getAllBlogs() {
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology';`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS affiliate_product_slug VARCHAR(255);`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS amazon_asin VARCHAR(50);`;
  return await sql`
    SELECT id, slug, title, excerpt, category, author, cover_image, created_at, published, affiliate_product_slug, amazon_asin 
    FROM blog_posts 
    ORDER BY created_at DESC;
  `;
}

export async function getBlogById(id: number) {
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology';`;
  const result = await sql`
    SELECT * FROM blog_posts WHERE id = ${id};
  `;
  return result[0];
}

export async function updateBlog(id: number, data: any) {
  const { slug, title, excerpt, content, category, author, cover_image, published, affiliate_product_slug, amazon_asin } = data;
  
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'Technology';`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS affiliate_product_slug VARCHAR(255);`;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS amazon_asin VARCHAR(50);`;

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
  await sql`DELETE FROM blog_posts WHERE id = ${id};`;
  return { success: true };
}

// --- Services / Products ---

export async function getAllServices() {
  return await sql`
    SELECT * FROM services 
    ORDER BY created_at DESC;
  `;
}

export async function getPublishedServices() {
  return await sql`
    SELECT * FROM services 
    WHERE published = true
    ORDER BY created_at DESC;
  `;
}

export async function getServiceBySlug(slug: string) {
  const result = await sql`
    SELECT * FROM services WHERE slug = ${slug} AND published = true;
  `;
  return result[0];
}

export async function getServiceById(id: number) {
  const result = await sql`
    SELECT * FROM services WHERE id = ${id};
  `;
  return result[0];
}

export async function createService(data: any) {
  const { sku, title, slug, category, description, features, price, price_type, delivery_time, icon_name, gradient, published } = data;
  await sql`
    INSERT INTO services (sku, title, slug, category, description, features, price, price_type, delivery_time, icon_name, gradient, published)
    VALUES (${sku}, ${title}, ${slug}, ${category}, ${description}, ${JSON.stringify(features)}::jsonb, ${price}, ${price_type}, ${delivery_time}, ${icon_name}, ${gradient}, ${published ?? true});
  `;
  return { success: true };
}

export async function updateService(id: number, data: any) {
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
  await initAffiliatesTable();
  const result = await sql`
    SELECT * FROM affiliate_links WHERE slug = ${slug};
  `;
  return result[0];
}

export async function recordAffiliateClick(slug: string) {
  await sql`
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
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INT PRIMARY KEY,
      seo_title VARCHAR(255) DEFAULT 'AJPR World – Premium Tech, Custom Software & Creative Branding',
      seo_description TEXT DEFAULT 'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding. We help startups and businesses grow with state-of-the-art tech support.',
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
  await initSiteSettingsTable();
  const result = await sql`SELECT * FROM site_settings WHERE id = 1;`;
  
  if (result.length === 0) {
    // Insert default settings row
    await sql`
      INSERT INTO site_settings (id, seo_title, seo_description, seo_keywords, canonical_url, geo_region, geo_placename, geo_position, geo_icbm) 
      VALUES (
        1, 
        'AJPR World – Premium Tech, Custom Software & Creative Branding',
        'AJPR World delivers premium digital solutions including custom web development, software engineering, UI/UX design, cloud architecture, and creative branding. We help startups and businesses grow with state-of-the-art tech support.',
        'Best Software, tech solutions, web development, custom software, UI/UX design, cloud deployment, digital branding, premium websites, AJPR World',
        'https://ajprworld.com',
        'IN-DL',
        'New Delhi',
        '28.6139;77.2090',
        '28.6139, 77.2090'
      );
    `;
    const newSettings = await sql`SELECT * FROM site_settings WHERE id = 1;`;
    return newSettings[0];
  }
  
  return result[0];
}

export async function updateSiteSettings(data: any) {
  await initSiteSettingsTable();
  const { seo_title, seo_description, seo_keywords, canonical_url, geo_region, geo_placename, geo_position, geo_icbm } = data;
  
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
        updated_at = CURRENT_TIMESTAMP
    WHERE id = 1;
  `;
  
  return { success: true };
}
