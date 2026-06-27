const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const url = 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
const client = new Client({ connectionString: url });

async function checkUsers() {
    await client.connect();
    console.log("Connected");
    const res = await client.query("SELECT email, role FROM users");
    console.log(JSON.stringify(res.rows, null, 2));

    const adminEmail = 'admin@ajpr.world';
    const password = 'Ajpradmin123';
    const hashedPassword = bcrypt.hashSync(password, 10);

    await client.query("UPDATE users SET password = $1 WHERE email = $2 OR role = 'admin'", [hashedPassword, adminEmail]);
    const adminCheck = await client.query("SELECT email FROM users WHERE role = 'admin'");
    console.log('Admins found:', adminCheck.rows);

    await client.end();
}

checkUsers().catch(console.error);
