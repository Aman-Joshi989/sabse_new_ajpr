const { Client } = require('pg');

async function testConnection() {
  const uri = 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres';
  console.log('Testing connection to:', uri.replace('l6rsSEUrLngwtruJ', '***'));
  const client = new Client({
    connectionString: uri,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Connection successful!', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

testConnection();
