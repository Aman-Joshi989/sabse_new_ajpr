const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs"); // Import bcrypt

// Read .env manually
function getEnvValue(key) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
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
    console.error("Could not find DATABASE_URL in .env");
    process.exit(1);
  }

  const sql = neon(connectionString);
  console.log("Connected to database. Setting up schema...");

  try {
    // DROP TABLES to ensure fresh schema
    await sql`DROP TABLE IF EXISTS messages, tasks, milestones, projects, users CASCADE`;

    // 1. Users Table - Updated with email and password
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL, -- Added email
        password TEXT NOT NULL,     -- Added password
        role TEXT NOT NULL, -- 'client' or 'developer'
        avatar_url TEXT,
        status TEXT DEFAULT 'offline' -- 'online', 'working', 'offline'
      );
    `;

    // 2. Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        overview TEXT,
        progress_percent INT DEFAULT 0,
        total_hours INT DEFAULT 0,
        hours_used INT DEFAULT 0,
        deadline DATE,
        total_value INT DEFAULT 0,
        pending_value INT DEFAULT 0
      );
    `;

    // 3. Milestones Table
    await sql`
      CREATE TABLE IF NOT EXISTS milestones (
        id SERIAL PRIMARY KEY,
        project_id INT REFERENCES projects(id),
        name TEXT NOT NULL,
        status TEXT DEFAULT 'pending' -- 'completed', 'in_progress', 'pending'
      );
    `;

    // 4. Tasks Table
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        project_id INT REFERENCES projects(id),
        title TEXT NOT NULL,
        status TEXT DEFAULT 'todo', -- 'todo', 'in_progress', 'done'
        tag TEXT,
        tag_color TEXT -- e.g., 'blue', 'purple'
      );
    `;

    // 5. Messages Table
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        sender_name TEXT NOT NULL,
        sender_role TEXT NOT NULL, -- 'client', 'developer'
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log("Schema created. Seeding data...");

    // Clear existing data for a clean slate (optional, but good for dev)
    await sql`TRUNCATE TABLE messages, tasks, milestones, projects, users RESTART IDENTITY CASCADE;`;

    // Hash passwords
    const clientPassword = await bcrypt.hash("client123", 10);
    const devPassword = await bcrypt.hash("dev123", 10);

    // Seed User - Updated with credentials
    await sql`
      INSERT INTO users (name, email, password, role, avatar_url, status) VALUES
      ('Alex Rivera', 'alex@ajpr.com', ${devPassword}, 'developer', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJP8C2crw-apoYQJPPWluywOo9Aqkjn0liQCjX1RIIBRoRgKuLmCmhVwbUTD5Nlk5SfznSY3INIHx88DmBffSyqmpdjYbvGeshtOUr3NSiOH4r08oWjO17CJN8_7LFySfoeWjV_n4MZhAu2FsXZAPvy4Ek-nBsqQfhFJnp2H4ydGdVmFTdTVcFStKnvIKlfme6EVewWP8_1OsQ_5yKxQIOPTjX1lO63uCcEJu83wnu8gtINTNNkbRWyoJUMU5DhiJaLzMxGjY74g', 'working now'),
      ('Mark Thompson', 'mark@ajpr.com', ${clientPassword}, 'client', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_yJGRZvo9rmp4eug-5VT1zpdkoHQqhsn2msQZQKTOwEDQdPSZbJgERulJavO_1Gn16Yn7spfk14kxzOXNmSUzo5boHStdLoFXBWKXn9B5gNmJqAaKejJJXVnVi10uIfdSyqm70tFHCSA-mYfPW3a7cr13i5zZnEFwXHIGy9KlMtT6ZFvgjHUyK5EUIrZWwy2VDG1ZDnmJOGgyKMCRsotF-JtZ19_GWN7JNjRuquu9RQjgPD8dLBCuTPd39RYMGAcBoIaSiLTY5w', 'online');
    `;

    // Seed Project
    const project = await sql`
      INSERT INTO projects (title, status, overview, progress_percent, total_hours, hours_used, deadline, total_value, pending_value)
      VALUES ('Cloud Infrastructure Redesign', 'active', 'Infrastructure build is progressing rapidly. We are currently finalizing the API endpoints.', 75, 600, 450, '2026-07-15', 450000, 112500)
      RETURNING id;
    `;
    const pid = project[0].id;

    // Seed Milestones
    await sql`
      INSERT INTO milestones (project_id, name, status) VALUES
      (${pid}, 'User Authentication', 'completed'),
      (${pid}, 'Database Architecture', 'completed'),
      (${pid}, 'Cloud Cluster Config', 'completed'),
      (${pid}, 'Payment Integration', 'in_progress'),
      (${pid}, 'Dashboard UI/UX', 'pending'),
      (${pid}, 'API Documentation', 'pending');
    `;

    // Seed Tasks
    await sql`
      INSERT INTO tasks (project_id, title, status, tag, tag_color) VALUES
      (${pid}, 'Finalize API Auth', 'todo', 'Security', 'blue'),
      (${pid}, 'Unit Test Coverage', 'todo', 'Testing', 'purple'),
      (${pid}, 'Payment Stripe API', 'in_progress', 'Current Task', 'white'),
      (${pid}, 'Schema Design', 'done', 'Success', 'green');
    `;

    // Seed Messages
    await sql`
      INSERT INTO messages (content, sender_name, sender_role, created_at) VALUES
      ('Hey Mark! The live demo is updated with the new payment flow.', 'Alex Rivera', 'developer', NOW() - INTERVAL '30 minutes'),
      ('Awesome, checking the demo link now.', 'Mark Thompson', 'client', NOW() - INTERVAL '25 minutes'),
      ('Looks great! Can we increase the font size on success message?', 'Mark Thompson', 'client', NOW() - INTERVAL '20 minutes');
    `;

    console.log("Database setup complete!");
  } catch (error) {
    console.error("Setup failed:", error);
  }
}

setup();
