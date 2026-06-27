const { Client } = require('pg');
const url = 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({ connectionString: url });

client.connect()
    .then(() => client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'messages'"))
    .then(res => {
        console.log(JSON.stringify(res.rows, null, 2));
        return client.end();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
