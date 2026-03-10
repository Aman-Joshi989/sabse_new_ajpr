const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const url = 'postgresql://neondb_owner:npg_hwWgGF9ex3ko@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
const client = new Client({ connectionString: url });

async function setupAdmin() {
    await client.connect();

    const res = await client.query("SELECT * FROM users WHERE role = 'admin'");
    const password = 'Ajpradmin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    if (res.rows.length > 0) {
        const adminEmail = res.rows[0].email;
        await client.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, adminEmail]);
        console.log(`Admin user found and password updated. Email: ${adminEmail}, Password: ${password}`);
    } else {
        const adminEmail = 'admin@ajpr.world';
        await client.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)", ['Admin', adminEmail, hashedPassword, 'admin']);
        console.log(`Created new admin user. Email: ${adminEmail}, Password: ${password}`);
    }

    await client.end();
}

setupAdmin().catch(console.error);
