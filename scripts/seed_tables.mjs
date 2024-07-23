import { db } from '@vercel/postgres';
import { table_infos } from '../src/lib/tables/table-data.mjs';

async function seedTables(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "tables" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tables (
      table_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      creator_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      updated_at DATE DEFAULT CURRENT_DATE,
      view INT DEFAULT 0
      );
    `;

    console.log(`Created "tables" table`);

    // Insert data into the "tables" table
    const insertedTables = await Promise.all(
      table_infos.map(
        (info) => client.sql`
        INSERT INTO tables (creator_id, title)
        VALUES (${info.creator_id}, ${info.title})
        ON CONFLICT (table_id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTables.length} tables`);

    return {
      createTable,
      insertedTables,
    };
  } catch (error) {
    console.error('Error seeding tables:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  
  await seedTables(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
