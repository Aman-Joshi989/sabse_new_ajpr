const { Pool } = require('pg');

async function syncSchemaAndData() {
  const oldUrl = 'postgresql://neondb_owner:npg_5QXuaV4efjtN@ep-billowing-bonus-adwcp218-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require';
  const newUrl = 'postgresql://postgres:l6rsSEUrLngwtruJ@db.xvrqawsxjagjhknatwkr.supabase.co:5432/postgres';

  const oldDb = new Pool({ connectionString: oldUrl, ssl: { rejectUnauthorized: false } });
  const newDb = new Pool({ connectionString: newUrl, ssl: { rejectUnauthorized: false } });

  console.log('Fetching tables from Neon...');
  const res = await oldDb.query(`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`);
  const tables = res.rows.map(r => r.tablename);

  for (const tableName of tables) {
    console.log(`\n--- Syncing ${tableName} ---`);
    
    // Get schema from oldDb
    const oldCols = await oldDb.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`, [tableName]);
    
    // Ensure table exists on newDb
    // We assume the table is created. If missing columns exist, we add them.
    const newCols = await newDb.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`, [tableName]);
    const newColNames = newCols.rows.map(r => r.column_name);

    for (const col of oldCols.rows) {
      if (!newColNames.includes(col.column_name)) {
        let type = col.data_type;
        if (type === 'ARRAY') type = 'TEXT[]';
        console.log(`Adding missing column ${col.column_name} (${type}) to ${tableName}`);
        await newDb.query(`ALTER TABLE public."${tableName}" ADD COLUMN "${col.column_name}" ${type}`);
      }
    }

    // Now copy data
    try {
      const rowsRes = await oldDb.query(`SELECT * FROM public."${tableName}"`);
      const rows = rowsRes.rows;
      if (rows.length > 0) {
        await newDb.query(`DELETE FROM public."${tableName}"`);
        
        let successCount = 0;
        for (const row of rows) {
          const columns = Object.keys(row);
          const values = Object.values(row);
          const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
          
          try {
            await newDb.query(
              `INSERT INTO public."${tableName}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`,
              values
            );
            successCount++;
          } catch(e) {
            console.error(`Failed to insert row into ${tableName}:`, e.message);
          }
        }
        console.log(`✅ Migrated ${successCount}/${rows.length} rows to ${tableName}`);
      } else {
        console.log(`⚠️  No rows in ${tableName}`);
      }
    } catch (e) {
      console.error(`❌ Failed to migrate ${tableName}:`, e.message);
    }
  }

  console.log('Migration complete!');
  process.exit(0);
}

syncSchemaAndData().catch(e => {
  console.error(e);
  process.exit(1);
});
