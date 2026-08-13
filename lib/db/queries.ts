import { Pool } from 'pg';
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { submitToIndexNow } from "../indexnow";

// Instantiate pg client once globally to reuse connections
let cachedPool: Pool | null = null;
const getPool = () => {
  if (cachedPool) return cachedPool;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  cachedPool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });
  return cachedPool;
};

// Standard sql — does NOT call noStore(), allowing Next.js response caching (ISR)
export const sql = async (strings: TemplateStringsArray, ...values: any[]) => {
  const pool = getPool();
  if (!pool) {
    console.warn("WARNING: DATABASE_URL is not defined in this environment. Returning a safe empty fallback.");
    return [] as any;
  }
  
  // Convert tagged template into parameterized query
  let text = '';
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) {
      text += `$${i + 1}`;
    }
  }
  
  try {
    const res = values.length > 0 
      ? await pool.query(text, values)
      : await pool.query(text); // Simple query protocol allows multiple statements
    return res.rows || (Array.isArray(res) ? res[res.length-1]?.rows || [] : []);
  } catch (err) {
    console.error("SQL Error:", err);
    throw err;
  }
};

// Dynamic sql — calls noStore() to force fresh data on every request (for mutations, admin pages)
const dynamicSql = (strings: TemplateStringsArray, ...values: any[]) => {
  noStore();
  return sql(strings, ...values);
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
  dbInitialized = true; // Mark immediately to prevent concurrent triggers
  const url = process.env.DATABASE_URL;
  if (!url) return;

  // Run in background without blocking the request (improves TTFB)
  (async () => {
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
          ADD COLUMN IF NOT EXISTS founder_exp3_desc TEXT DEFAULT 'Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.',
          ADD COLUMN IF NOT EXISTS global_price_multiplier NUMERIC DEFAULT 1.3334;
      `;

      // 5. Ensure projects has client_id
      await sql`
        ALTER TABLE projects 
          ADD COLUMN IF NOT EXISTS client_id INTEGER;
      `;

      // 6. Ensure payments table exists
      await sql`
        CREATE TABLE IF NOT EXISTS payments (
          id SERIAL PRIMARY KEY,
          client_name VARCHAR(255) NOT NULL,
          client_email VARCHAR(255) NOT NULL,
          client_phone VARCHAR(50),
          amount NUMERIC NOT NULL,
          currency VARCHAR(10) DEFAULT 'INR',
          payment_status VARCHAR(50) DEFAULT 'completed',
          payment_method VARCHAR(50) NOT NULL,
          payment_id VARCHAR(255),
          payment_type VARCHAR(50) DEFAULT 'advance',
          order_details JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 6.5. Ensure products table exists
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

      // 7. Ensure seo_metadata table exists for dynamic AI SEO updates
      await sql`
        CREATE TABLE IF NOT EXISTS seo_metadata (
          route VARCHAR(255) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 8. Ensure social_leads table exists for autonomous lead agent
      await sql`
        CREATE TABLE IF NOT EXISTS social_leads (
          id SERIAL PRIMARY KEY,
          niche VARCHAR(255),
          platform_url TEXT,
          content TEXT,
          reason TEXT,
          draft_dm TEXT,
          status VARCHAR(50) DEFAULT 'new',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 8.5 Ensure sales_leads table exists for autonomous cold email engine
      await sql`
        CREATE TABLE IF NOT EXISTS sales_leads (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          company VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          industry VARCHAR(255),
          focus TEXT,
          budget VARCHAR(100),
          tech_stack TEXT,
          company_size VARCHAR(100),
          status VARCHAR(50) DEFAULT 'new',
          utm_source VARCHAR(255),
          utm_medium VARCHAR(255),
          utm_campaign VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        ALTER TABLE sales_leads
          ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
          ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
          ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255);
      `;

      // 9. Ensure social_tokens table exists for OAuth connections
      await sql`
        CREATE TABLE IF NOT EXISTS social_tokens (
          id SERIAL PRIMARY KEY,
          platform VARCHAR(50) NOT NULL,
          access_token TEXT NOT NULL,
          refresh_token TEXT,
          expires_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 10. Ensure programmatic_seo table exists for AI-generated localized content
      await sql`
        CREATE TABLE IF NOT EXISTS programmatic_seo (
          id SERIAL PRIMARY KEY,
          route VARCHAR(255) UNIQUE NOT NULL,
          city VARCHAR(100) NOT NULL,
          service VARCHAR(100) NOT NULL,
          h1_title VARCHAR(255) NOT NULL,
          hero_subtitle TEXT NOT NULL,
          body_html TEXT NOT NULL,
          meta_title VARCHAR(255) NOT NULL,
          meta_description TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      // Safely add refresh_token if it doesn't exist (in case the table was already created)
      try {
          await sql`ALTER TABLE social_tokens ADD COLUMN IF NOT EXISTS refresh_token TEXT;`;
      } catch (e) {
          console.error("Error adding refresh_token column:", e);
      }

      // 10. Ensure subscribers table exists for lead capture
      await sql`
        CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // 11. Core tables for dashboard and communication
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role VARCHAR(50) DEFAULT 'client',
          skills TEXT,
          portfolio_url TEXT,
          hourly_rate INTEGER,
          approved_status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      await sql`
        ALTER TABLE users 
          ADD COLUMN IF NOT EXISTS skills TEXT,
          ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
          ADD COLUMN IF NOT EXISTS hourly_rate INTEGER,
          ADD COLUMN IF NOT EXISTS approved_status VARCHAR(50) DEFAULT 'pending';
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          content TEXT NOT NULL,
          sender_name VARCHAR(255),
          sender_role VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          status VARCHAR(100) DEFAULT 'Not Started',
          progress_percent INTEGER DEFAULT 0,
          hours_used INTEGER DEFAULT 0,
          total_hours INTEGER DEFAULT 0,
          total_value NUMERIC DEFAULT 0,
          pending_value NUMERIC DEFAULT 0,
          deadline DATE,
          client_id INTEGER,
          developer_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        ALTER TABLE projects
          ADD COLUMN IF NOT EXISTS developer_id INTEGER;
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          project_id INTEGER,
          title VARCHAR(255) NOT NULL,
          status VARCHAR(100) DEFAULT 'todo',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS milestones (
          id SERIAL PRIMARY KEY,
          project_id INTEGER,
          title VARCHAR(255) NOT NULL,
          status VARCHAR(100) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company_name TEXT,
            website_url TEXT,
            booking_date DATE NOT NULL,
            booking_time VARCHAR(50) NOT NULL,
            topic TEXT,
            status VARCHAR(20) DEFAULT 'Pending',
            meet_link TEXT,
            payment_id TEXT,
            payment_status VARCHAR(20) DEFAULT 'Unpaid',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

    } catch (err) {
      console.error("Database lazy-initialization migration failed:", err);
      dbInitialized = false;
    }
  })();
}

// --- Projects & Financials ---
export async function getProjectDetails({ clientId, developerId }: { clientId?: number, developerId?: number } = {}) {
  if (clientId) {
    const result = await dynamicSql`
      SELECT * FROM projects WHERE client_id = ${clientId} LIMIT 1;
    `;
    return result[0] || null;
  }
  if (developerId) {
    const result = await dynamicSql`
      SELECT * FROM projects WHERE developer_id = ${developerId} LIMIT 1;
    `;
    return result[0] || null;
  }
  const result = await dynamicSql`
    SELECT * FROM projects LIMIT 1;
  `;
  return result[0];
}

export async function getAllProjects() {
  return await dynamicSql`
    SELECT * FROM projects ORDER BY id DESC;
  `;
}

export async function createProject(data: { title: string, client_id?: number, developer_id?: number }) {
  const result = await dynamicSql`
    INSERT INTO projects (title, status, progress_percent, hours_used, total_hours, total_value, pending_value, deadline, client_id, developer_id)
    VALUES (${data.title}, 'Not Started', 0, 0, 100, 0, 0, CURRENT_DATE + INTERVAL '30 days', ${data.client_id || null}, ${data.developer_id || null})
    RETURNING *;
  `;
  return result[0];
}

export async function assignProjectToClient(projectId: number, clientId: number) {
  const result = await dynamicSql`
    UPDATE projects SET client_id = ${clientId} WHERE id = ${projectId} RETURNING *;
  `;
  return result[0];
}

export async function assignProjectToDeveloper(projectId: number, developerId: number) {
  const result = await dynamicSql`
    UPDATE projects SET developer_id = ${developerId} WHERE id = ${projectId} RETURNING *;
  `;
  return result[0];
}

export async function updateProject(projectId: number, data: { title: string, status: string, progress_percent: number, hours_used: number, total_hours: number, total_value: number, pending_value: number }) {
  const result = await dynamicSql`
    UPDATE projects 
    SET title = ${data.title},
        status = ${data.status},
        progress_percent = ${data.progress_percent},
        hours_used = ${data.hours_used},
        total_hours = ${data.total_hours},
        total_value = ${data.total_value},
        pending_value = ${data.pending_value}
    WHERE id = ${projectId}
    RETURNING *;
  `;
  return result[0];
}

export async function deleteProject(projectId: number) {
  // Need to delete associated milestones and tasks first
  await dynamicSql`DELETE FROM milestones WHERE project_id = ${projectId}`;
  await dynamicSql`DELETE FROM tasks WHERE project_id = ${projectId}`;
  return await dynamicSql`DELETE FROM projects WHERE id = ${projectId}`;
}

// --- Milestones ---
export async function getAllMilestones() {
  return await dynamicSql`
    SELECT * FROM milestones ORDER BY id ASC;
  `;
}

export async function getMilestones(projectId: number) {
  return await dynamicSql`
    SELECT * FROM milestones WHERE project_id = ${projectId} ORDER BY id ASC;
  `;
}

export async function createMilestone(projectId: number, name: string, status: string = 'pending') {
  const result = await dynamicSql`
    INSERT INTO milestones (project_id, name, status)
    VALUES (${projectId}, ${name}, ${status})
    RETURNING *;
  `;
  return result[0];
}

export async function updateMilestone(milestoneId: number, name: string, status: string) {
  const result = await dynamicSql`
    UPDATE milestones 
    SET name = ${name}, status = ${status}
    WHERE id = ${milestoneId}
    RETURNING *;
  `;
  return result[0];
}

export async function deleteMilestone(milestoneId: number) {
  return await dynamicSql`
    DELETE FROM milestones WHERE id = ${milestoneId};
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
  return await dynamicSql`SELECT * FROM users ORDER BY id DESC;`;
}

export async function getUserByEmail(email: string) {
  const result = await dynamicSql`SELECT * FROM users WHERE email = ${email}`;
  return result[0];
}

export async function registerUser(data: { name: string, email: string, passwordHash: string, role: string, skills?: string, portfolio_url?: string, hourly_rate?: number }) {
  const result = await dynamicSql`
    INSERT INTO users (name, email, password, role, skills, portfolio_url, hourly_rate, approved_status)
    VALUES (${data.name}, ${data.email}, ${data.passwordHash}, ${data.role}, ${data.skills || null}, ${data.portfolio_url || null}, ${data.hourly_rate || null}, ${data.role === 'client' ? 'approved' : 'pending'})
    RETURNING *;
  `;
  return result[0];
}

export async function updateUser(userId: number, data: { name: string, email: string, role: string, skills?: string, portfolio_url?: string, hourly_rate?: number, approved_status?: string }) {
  const result = await dynamicSql`
    UPDATE users 
    SET name = ${data.name},
        email = ${data.email},
        role = ${data.role},
        skills = ${data.skills || null},
        portfolio_url = ${data.portfolio_url || null},
        hourly_rate = ${data.hourly_rate || null},
        approved_status = ${data.approved_status || 'pending'}
    WHERE id = ${userId}
    RETURNING *;
  `;
  return result[0];
}

export async function deleteUser(userId: number) {
  // Optional: Nullify references in projects before deleting user
  await dynamicSql`UPDATE projects SET client_id = NULL WHERE client_id = ${userId}`;
  await dynamicSql`UPDATE projects SET developer_id = NULL WHERE developer_id = ${userId}`;
  return await dynamicSql`DELETE FROM users WHERE id = ${userId}`;
}

export async function updateUserStatus(userId: number, status: string) {
  const result = await dynamicSql`
    UPDATE users SET approved_status = ${status} WHERE id = ${userId} RETURNING *;
  `;
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

// --- Sales Leads (Autonomous Email Engine) ---
export async function getUncontactedLeads() {
  await ensureDbInitialized();
  return await dynamicSql`
    SELECT * FROM sales_leads WHERE status = 'new' ORDER BY created_at ASC LIMIT 10;
  `;
}

export async function markLeadAsContacted(id: number) {
  await ensureDbInitialized();
  return await dynamicSql`
    UPDATE sales_leads SET status = 'contacted' WHERE id = ${id} RETURNING *;
  `;
}

// --- Payments ---
export async function getPayments() {
  await ensureDbInitialized();
  return await dynamicSql`
    SELECT * FROM payments ORDER BY created_at DESC;
  `;
}

export async function createPayment(data: any) {
  await ensureDbInitialized();
  const { client_name, client_email, client_phone, amount, currency, payment_status, payment_method, payment_id, payment_type, order_details } = data;
  
  const result = await dynamicSql`
    INSERT INTO payments (client_name, client_email, client_phone, amount, currency, payment_status, payment_method, payment_id, payment_type, order_details)
    VALUES (${client_name}, ${client_email}, ${client_phone}, ${amount}, ${currency || 'INR'}, ${payment_status || 'completed'}, ${payment_method}, ${payment_id}, ${payment_type || 'advance'}, ${JSON.stringify(order_details)}::jsonb)
    RETURNING *;
  `;
  return result[0];
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
  submitToIndexNow('portfolio');
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
  submitToIndexNow('portfolio');
  return { success: true };
}

export async function deletePortfolioItem(id: number) {
  invalidateLayoutCache();
  await sql`DELETE FROM portfolio_items WHERE id = ${id}`;
  submitToIndexNow('portfolio');
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
  if (published ?? true) submitToIndexNow(`blog/${slug}`);
  try {
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  } catch(e) {}
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
  if (published ?? true) submitToIndexNow(`blog/${slug}`);
  try {
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  } catch(e) {}
  return { success: true };
}

export async function deleteBlog(id: number) {
  invalidateLayoutCache();
  // Fetch slug before deleting to ping IndexNow
  const blog = await getBlogById(id);
  await sql`DELETE FROM blog_posts WHERE id = ${id};`;
  if (blog?.slug) {
    submitToIndexNow(`blog/${blog.slug}`);
    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${blog.slug}`);
    } catch(e) {}
  }
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
  if (published ?? true) submitToIndexNow(`services/${slug}`);
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
  if (published ?? true) submitToIndexNow(`services/${slug}`);
  return { success: true };
}

export async function deleteService(id: number) {
  invalidateLayoutCache();
  const service = await getServiceById(id);
  await sql`DELETE FROM services WHERE id = ${id}`;
  if (service?.slug) submitToIndexNow(`services/${service.slug}`);
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

export async function incrementClicks(route: string) {
  try {
    await dynamicSql`
      UPDATE seo_metadata 
      SET clicks = clicks + 1 
      WHERE route = ${route}
    `;
  } catch (err) {
    console.error("Failed to increment clicks:", err);
  }
}

export async function saveSubscriber(email: string) {
  try {
    await dynamicSql`
      CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await dynamicSql`INSERT INTO subscribers (email) VALUES (${email})`;
    return { success: true };
  } catch (error: any) {
    if (error.message?.includes("duplicate key")) {
      return { success: false, error: "Already subscribed" };
    }
    console.error("Failed to save subscriber:", error);
    return { success: false, error: "Database error" };
  }
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
        founder_exp3_title, founder_exp3_desc,
        global_price_multiplier
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
        'Maintaining rigorous, tech-debt-free clean code guidelines using typescript and modern frameworks to ensure perfect product delivery.',
        1.3334
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
    founder_exp3_title, founder_exp3_desc,
    global_price_multiplier
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
        global_price_multiplier = ${global_price_multiplier},
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
    VALUES (${slug}, ${term}, ${definition}, ${detailed_explanation}, ${related_terms || []})
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

export async function getSeoMetadata(route: string) {
  // Use standard sql (cached) for fast layout reads
  const result = await sql`
    SELECT * FROM seo_metadata WHERE route = ${route} LIMIT 1;
  `;
  return result[0] || null;
}

export async function getAllSeoMetadata() {
  return await dynamicSql`
    SELECT * FROM seo_metadata ORDER BY route ASC;
  `;
}

// ---------------------------------------------------------------------------
// SOCIAL LEADS QUERIES
// ---------------------------------------------------------------------------

export async function saveSocialLead(data: any) {
  const { niche, platform_url, content, reason, draft_dm } = data;
  const result = await dynamicSql`
    INSERT INTO social_leads (niche, platform_url, content, reason, draft_dm, status)
    VALUES (${niche}, ${platform_url}, ${content}, ${reason}, ${draft_dm}, 'new')
    RETURNING *;
  `;
  return result[0];
}

export async function getSocialLeads() {
  return await dynamicSql`
    SELECT * FROM social_leads ORDER BY created_at DESC LIMIT 50;
  `;
}

export async function updateSocialLeadStatus(id: number, status: string) {
    try {
        await sql`
            UPDATE social_leads
            SET status = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Error updating social lead status:', error);
        throw error;
    }
}

// --- Social Tokens (OAuth) Queries ---

export async function saveSocialToken(platform: string, access_token: string, expires_in_seconds?: number, refresh_token?: string) {
    try {
        const expires_at = expires_in_seconds 
            ? new Date(Date.now() + expires_in_seconds * 1000).toISOString()
            : null;
            
        await sql`
            INSERT INTO social_tokens (platform, access_token, refresh_token, expires_at)
            VALUES (${platform}, ${access_token}, ${refresh_token || null}, ${expires_at})
            ON CONFLICT (platform) DO UPDATE 
            SET access_token = EXCLUDED.access_token,
                refresh_token = COALESCE(EXCLUDED.refresh_token, social_tokens.refresh_token),
                expires_at = EXCLUDED.expires_at,
                created_at = CURRENT_TIMESTAMP
        `;
    } catch (error) {
        console.error('Error saving social token:', error);
        throw error;
    }
}

export async function getSocialToken(platform: string) {
    try {
        const result = await sql`
            SELECT access_token, expires_at FROM social_tokens 
            WHERE platform = ${platform}
            LIMIT 1
        `;
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching social token:', error);
        throw error;
    }
}

export async function getProducts() {
  return await sql`SELECT * FROM products WHERE is_active = true ORDER BY price ASC`;
}

export async function getAllProducts() {
  return await dynamicSql`SELECT * FROM products ORDER BY id DESC`;
}

export async function createProduct(data: any) {
  return await dynamicSql`
    INSERT INTO products (name, slug, description, price, currency, features, is_active)
    VALUES (${data.name}, ${data.slug}, ${data.description}, ${data.price}, ${data.currency}, ${data.features}::jsonb, ${data.is_active})
    RETURNING *;
  `;
}

export async function updateProduct(id: number, data: any) {
  return await dynamicSql`
    UPDATE products 
    SET name = ${data.name}, slug = ${data.slug}, description = ${data.description}, 
        price = ${data.price}, currency = ${data.currency}, features = ${data.features}::jsonb, 
        is_active = ${data.is_active}
    WHERE id = ${id}
    RETURNING *;
  `;
}

export async function getProductBySlug(slug: string) {
  const result = await sql`SELECT * FROM products WHERE slug = ${slug} LIMIT 1`;
  return result[0] || null;
}

export async function saveSalesLead(data: any) {
  const { name, email, companySize, budget, techStack, utm_source, utm_medium, utm_campaign } = data;
  const result = await sql`
    INSERT INTO sales_leads (name, email, company_size, budget, tech_stack, status, utm_source, utm_medium, utm_campaign)
    VALUES (${name}, ${email}, ${companySize || null}, ${budget || null}, ${techStack || null}, 'new', ${utm_source || null}, ${utm_medium || null}, ${utm_campaign || null})
    RETURNING *;
  `;
  return result[0];
}

export async function getSalesLeads() {
  return await dynamicSql`SELECT * FROM sales_leads ORDER BY created_at DESC`;
}

export async function updateLeadStatus(id: number, status: string) {
  return await dynamicSql`
    UPDATE sales_leads SET status = ${status} WHERE id = ${id} RETURNING *;
  `;
}

export async function getSeoContent(route: string) {
  try {
    const res = await sql`SELECT * FROM programmatic_seo WHERE route = ${route} LIMIT 1`;
    return res[0] || null;
  } catch (err: any) {
    if (err.code === '42P01') {
      ensureDbInitialized().catch(console.error);
      return null;
    }
    throw err;
  }
}

export async function saveSeoContent(data: any) {
  return await dynamicSql`
    INSERT INTO programmatic_seo (route, city, service, h1_title, hero_subtitle, body_html, meta_title, meta_description)
    VALUES (${data.route}, ${data.city}, ${data.service}, ${data.h1_title}, ${data.hero_subtitle}, ${data.body_html}, ${data.meta_title}, ${data.meta_description})
    ON CONFLICT (route) DO UPDATE SET 
      h1_title = EXCLUDED.h1_title,
      hero_subtitle = EXCLUDED.hero_subtitle,
      body_html = EXCLUDED.body_html,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
}

export async function getAllSeoRoutes() {
  try {
    return await sql`SELECT route, updated_at FROM programmatic_seo ORDER BY updated_at DESC`;
  } catch (err: any) {
    if (err.code === '42P01') {
      ensureDbInitialized().catch(console.error);
      return [];
    }
    throw err;
  }
}
