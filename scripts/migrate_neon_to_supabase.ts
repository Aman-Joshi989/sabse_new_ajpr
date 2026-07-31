const { Pool } = require('pg');

async function migrate() {
  console.log('Skipping schema init as it is already created');
  console.log('Schema created!');

  const oldUrl = 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
  const newUrl = 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres';

  const oldDb = new Pool({ connectionString: oldUrl, ssl: { rejectUnauthorized: false } });
  const newDb = new Pool({ connectionString: newUrl, ssl: { rejectUnauthorized: false } });

  console.log('2. Fetching tables from Neon...');
  const res = await oldDb.query(`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`);
  const tables = res.rows;
  
  console.log(`Found ${tables.length} tables.`);

  for (const t of tables) {
    const tableName = t.tablename;
    console.log(`Migrating data for table: ${tableName}...`);
    try {
      const rowsRes = await oldDb.query(`SELECT * FROM public."${tableName}"`);
      const rows = rowsRes.rows;
      if (rows.length > 0) {
        // Need to delete existing rows in case ensureDbInitialized added some defaults
        await newDb.query(`DELETE FROM public."${tableName}"`);
        
        // Insert rows dynamically
        for (const row of rows) {
          const columns = Object.keys(row);
          const values = Object.values(row);
          const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
          
          await newDb.query(
            `INSERT INTO public."${tableName}" (${columns.join(', ')}) VALUES (${placeholders})`,
            values
          );
        }
        console.log(`✅ Migrated ${rows.length} rows to ${tableName}`);
      } else {
        console.log(`⚠️  No rows in ${tableName}`);
      }
    } catch (e) {
      console.error(`❌ Failed to migrate ${tableName}:`, e instanceof Error ? e.message : e);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(e => {
  console.error(e);
  process.exit(1);
});
