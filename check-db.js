const { Client } = require('pg');
const url = 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({ connectionString: url });

client.connect()
    .then(() => client.query("SELECT title, content FROM blog_posts ORDER BY id DESC LIMIT 1"))
    .then(res => {
        console.log(res.rows[0].content);
        return client.end();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
