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
