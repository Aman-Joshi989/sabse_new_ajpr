const { Client } = require('pg');

const url = 'postgresql://postgres.xvrqawsxjagjhknatwkr:l6rsSEUrLngwtruJ@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres';

const client = new Client({ connectionString: url });

client.connect()
    .then(() => client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS affiliate_product_slug TEXT;`))
    .then(() => client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS amazon_asin TEXT;`))
    .then(() => client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT;`))
    .then(() => {
        console.log('Success adding additional missing columns to blog_posts');
        return client.end();
    })
    .catch(e => {
        console.error('Error:', e);
        return client.end();
    });
