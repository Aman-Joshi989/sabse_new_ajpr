const { Client } = require('pg');

const url = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({ connectionString: url });

client.connect()
    .then(() => client.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'Admin',
      cover_image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      published BOOLEAN DEFAULT true
    );
  `))
    .then(() => {
        console.log('Success creating table blog_posts');
        
        // Let's insert a dummy blog post too for testing
        return client.query(`
          INSERT INTO blog_posts (slug, title, excerpt, content, author, cover_image) 
          VALUES (
            'welcome-to-our-new-blog', 
            'Welcome to the AJPR World Blog!', 
            'We are thrilled to launch our new daily blog focusing on business growth, software solutions, and legal advice.', 
            'Welcome to our daily blog! We will be posting valuable insights every day to help your business scale efficiently. Stay tuned for expert advice on tech stacks, GST changes, and legal frameworks that affect your company.', 
            'AJPR World Team', 
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop'
          ) ON CONFLICT (slug) DO NOTHING;
        `);
    })
    .then(() => {
        console.log('Dummy post inserted if not exists');
        return client.end();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
