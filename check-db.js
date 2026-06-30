const { Client } = require('pg');
const url = 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({ connectionString: url });

client.connect()
    .then(() => client.query("SELECT COUNT(*) FROM blog_posts"))
    .then(countRes => {
        console.log("Total Count:", countRes.rows[0].count);
        return client.query("SELECT id, slug, title, published, created_at FROM blog_posts ORDER BY id DESC LIMIT 10");
    })
    .then(res => {
        console.log(JSON.stringify(res.rows, null, 2));
        return client.end();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
